import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

import Field from './Field';
import User from './User';

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    field_id: string;

    @OneToOne(() => Field)
    @JoinColumn({ name: 'field_id' })
    field: Field;

    @Column()
    client_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'client_id' })
    client: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Appointment;