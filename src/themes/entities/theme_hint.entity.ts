import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ThemePuzzle } from "./theme_puzzle.entity";
import { Theme } from "./theme.entity";

@Entity()
export class ThemeHint {
    // 기본키
    @PrimaryGeneratedColumn()
    id!: number; 

    @ManyToOne(() => ThemePuzzle, themePuzzle => themePuzzle.id, { nullable: false }) 
    @JoinColumn({ name: 'puzzle_id' })
    themePuzzle!: ThemePuzzle;

    @ManyToOne(() => Theme, theme => theme.id, { nullable: false })
    @JoinColumn({ name: 'theme_id' })
    theme!: Theme;

    // 힌트 내용
    @Column({ type: 'text', nullable: false })
    content!: string;

    @Column({ type: 'int', nullable: false })
    step!: number;

    // 이 힌트가 표시될 최소 진행도
    @Column({ type: 'float', nullable: true })
    progress_required!: number;
}