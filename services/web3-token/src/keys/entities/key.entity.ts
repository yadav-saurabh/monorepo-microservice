import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Key {
  @PrimaryColumn('uuid')
  key: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'req_rate', default: 100 })
  reqRate: number;

  @Column({ type: 'date' })
  expiration: Date;

  @Column({ name: 'is_active' })
  isActive: boolean;
}
