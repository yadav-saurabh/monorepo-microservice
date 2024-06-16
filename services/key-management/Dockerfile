FROM node:lts-alpine  AS base
 
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN yarn global add turbo@^2
COPY . .
 
# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "@nestjs-microservices/keys" is the name entered in the project's package.json: { name: "@nestjs-microservices/keys" }
RUN turbo prune @nestjs-microservices/keys --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package*.json ./
RUN npm install
 
# Build the project
COPY --from=builder /app/out/full/ .
RUN npm run build -- --filter=@nestjs-microservices/keys...
 
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=installer /app .
CMD node services/keys/dist/main.js