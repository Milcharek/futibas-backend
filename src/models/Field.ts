import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import User from './User';

@Entity('appointments')
class Field {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    manager_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'manager_id' })
    manager: User;

    @Column()
    address: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Field;