import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Theme {
    // 기본키
    @PrimaryColumn()
    id!: number;

    // 테마 제목
    @Column({ type: 'text', nullable: false })
    title!: string;

    // 테마 내용
    @Column({ type: 'varchar', length: 100, nullable: false })
    content!: string;

    // 장르
    @Column({ type: 'varchar', length: 50, nullable: false })
    genre!: string;

    // 난이도
    @Column({ type: 'int', nullable: false, default: 3 })
    difficulty!: number;

    // 시간 제한
    @Column({ type: 'int', nullable: false })
    time_limit!: number;

    // 잠금 상태
    @Column({ type: 'boolean', default: true })
    is_locked!: boolean;

    // 테마 썸네일 URL
    @Column({ type: 'varchar', length: 255, nullable: true })
    thumbnail_url!: string;

    // 생성일
    @CreateDateColumn()
    created_at!: Date;
}
