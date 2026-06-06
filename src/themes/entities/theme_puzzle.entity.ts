import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Theme } from "./theme.entity";
import { ThemeHint } from "./theme_hint.entity";
import { ThemeAnswer } from "./theme_answer.entity";

@Entity()
export class ThemePuzzle {
    // 기본키
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    sequence!: number;

    @OneToOne(() => ThemeHint, hint => hint.themePuzzle)
    hint!: ThemeHint;

    @OneToOne(() => ThemeAnswer, answer => answer.themePuzzle)
    answer!: ThemeAnswer;

    // 테마 외래키
    @ManyToOne(() => Theme, theme => theme.id, { nullable: false }) 
    @JoinColumn({ name: 'theme_id' })
    theme!: Theme;
}