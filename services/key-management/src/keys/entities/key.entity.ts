import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Key {
  @PrimaryGeneratedColumn('uuid')
  key: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'req_rate', default: 100 })
  reqRate: number;

  @Column({
    type: 'date',
    default: () => `now() + interval '10 day'`,
  })
  expiration: Date;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
