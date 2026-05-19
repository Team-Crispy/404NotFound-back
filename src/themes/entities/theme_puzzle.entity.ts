import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Theme } from "./theme.entity";

@Entity()
export class ThemePuzzle {
    // 기본키
    @PrimaryColumn() 
    id!: number; 

    // 테마 외래키
    @ManyToOne(() => Theme, theme => theme.id, { nullable: false }) 
    @JoinColumn({ name: 'theme_id' })
    theme!: Theme;

}