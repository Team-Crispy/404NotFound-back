import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ThemePuzzle } from "./theme_puzzle.entity";

@Entity()
export class ThemeHint {
    // 기본키
    @PrimaryColumn() 
    id!: number; 

    @ManyToOne(() => ThemePuzzle, themePuzzle => themePuzzle.id, { nullable: false }) 
    @JoinColumn({ name: 'puzzle_id' })
    themePuzzle!: ThemePuzzle;

    // 힌트 단계
    @Column({ type: 'int', nullable: false })
    step!: number;

    // 힌트 내용
    @Column({ type: 'text', nullable: false })
    content!: string;

    // 이 힌트가 표시될 최소 진행도
    @Column({ type: 'float', nullable: false })
    progress_required!: number;
}