import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  note: string;

  @Column({
    default: false,
  })
  archived: boolean;

  @Column({
    nullable: false,
  })
  created: string;

  @Column({
    nullable: false,
  })
  category: string;

  @Column({
    nullable: false,
  })
  content: string;

  @Column({
    nullable: true,
  })
  dates: string;
}
