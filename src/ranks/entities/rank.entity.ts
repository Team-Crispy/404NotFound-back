import { Theme } from '@/themes/entities/theme.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Rank {
    @PrimaryColumn()
    id!: number;

    @ManyToOne(() => Theme, theme => theme.id, { nullable: false })
    @JoinColumn({ name: 'theme_id' })
    theme!: Theme;

    @Column({ type: 'varchar', length: 50, nullable: false })
    user_name!: string;

    @Column({ type: 'int', nullable: false })
    clear_time!: number;

    @Column({ type: 'int', nullable: false, default: 0 })
    hint_count!: number;

    @Column({ type: 'varchar', length: 10, nullable: false })
    ending_type!: string;

    @CreateDateColumn()
    createdAt!: Date;
}
