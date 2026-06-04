import { Rank } from "@/ranks/entities/rank.entity";
import { Theme } from "@/themes/entities/theme.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Guestbook {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Rank, rank => rank.id, { nullable: true })
    @JoinColumn({ name: 'rank_id' })
    rank?: Rank;

    @ManyToOne(() => Theme, theme => theme.id, { nullable: false })
    @JoinColumn({ name: 'theme_id' })
    theme!: Theme;

    @Column({ type: 'varchar', length: 50, nullable: false })
    user_name!: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    message!: string;

    @CreateDateColumn()
    createdAt!: Date;
}
