import {
  ExecutionContext,
  Inject,
  Injectable,
  MethodNotAllowedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ThrottlerException,
  ThrottlerGuard,
  ThrottlerModuleOptions,
  ThrottlerOptions,
  ThrottlerStorage,
  minutes,
} from '@nestjs/throttler';
import { Request, Response } from 'express';
import * as dayjs from 'dayjs';

import { KeysService } from 'src/keys/keys.service';

type ExpressObject = { req: Request; res: Response };

@Injectable()
export class UserThrottlerGuardGuard extends ThrottlerGuard {
  constructor(
    options: ThrottlerModuleOptions,
    storageService: ThrottlerStorage,
    reflector: Reflector,
    @Inject(KeysService) private keyService: KeysService,
  ) {
    super(options, storageService, reflector);
  }

  async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number,
    throttler: ThrottlerOptions,
  ): Promise<boolean> {
    const { req, res } = this.getRequestResponse(context) as ExpressObject;

    const ignoreUserAgents =
      throttler.ignoreUserAgents ?? this.commonOptions.ignoreUserAgents;

    // Return early if the current user agent should be ignored.
    if (Array.isArray(ignoreUserAgents)) {
      for (const pattern of ignoreUserAgents) {
        if (pattern.test(req.headers['user-agent'])) {
          return true;
        }
      }
    }

    const tracker = await this.getTracker(req);
    const data = await this.keyService.findOne(req.user.id, tracker);
    const isInvalid =
      !data || !data.isActive || dayjs().isAfter(dayjs(data.expiration));
    if (isInvalid) {
      throw new MethodNotAllowedException('accessKey invalid');
    }
    ttl = ttl || minutes(1);
    limit = data.reqRate || limit;

    const key = this.generateKey(context, tracker, throttler.name);
    const { totalHits, timeToExpire } = await this.storageService.increment(
      key,
      ttl,
    );

    if (totalHits > limit) {
      throw new ThrottlerException();
    }

    res.header(`${this.headerPrefix}-Limit`, limit.toString());
    // We're about to add a record so we need to take that into account here.
    // Otherwise the header says we have a request left when there are none.
    res.header(
      `${this.headerPrefix}-Remaining`,
      Math.max(0, limit - totalHits).toString(),
    );
    res.header(`${this.headerPrefix}-Reset`, timeToExpire.toString());

    return true;
  }

  protected async getTracker(req: Record<string, any>): Promise<string> {
    const accessKey = req.get('access-key');
    if (!req?.user?.id || !accessKey) {
      throw new MethodNotAllowedException('userId or accessKey missing');
    }
    return accessKey;
  }
}
