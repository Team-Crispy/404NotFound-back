import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ThemePuzzle } from "./theme_puzzle.entity";

@Entity()
export class ThemeAnswer {
    // 기본키
    @PrimaryColumn()
    id!: number;

    // 퍼즐 아이디
    @ManyToOne(() => ThemePuzzle, themePuzzle => themePuzzle.id, { nullable: false })
    @JoinColumn({ name: 'puzzle_id' })
    themePuzzle!: ThemePuzzle;

    // 정답 내용
    @Column({ type: 'varchar', length: 255, nullable: false })
    answer_value!: string;

    // 이 정답이 맞았을 때의 진행도
    @Column({ type: 'float', nullable: false })
    progress_after!: number;
}