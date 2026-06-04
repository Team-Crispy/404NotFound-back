import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Theme } from "./theme.entity";


@Entity()
export class ThemeEnding {
    // 기본키
    @PrimaryColumn() 
    id!: number;

    // 테마 외래키
    @ManyToOne(() => Theme, theme => theme.id, { nullable: false })
    @JoinColumn({ name: 'theme_id' })
    theme!: Theme;

    // 엔딩 타입 (예: 'success', 'failure')
    @Column({ type: 'varchar', length: 10, nullable: false })
    end_type!: string;

    // 엔딩 제목
    @Column({ type: 'varchar', length: 100, nullable: false })
    title!: string;

    // 엔딩 내용
    @Column({ type: 'text', nullable: false })
    content!: string;

    // 엔딩 조건 설명
    @Column({ type: 'text', nullable: false })
    condition_desc!: string;
}