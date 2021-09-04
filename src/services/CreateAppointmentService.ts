import { startOfHour } from "date-fns";
import { getCustomRepository } from 'typeorm';

import Appointment from "../models/Appointment";
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface IRequest {
    field: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ field, date }: IRequest): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);
    
        if(findAppointmentInSameDate) {
            throw Error('This appointment is already booked!');
        }
    
        const appointment = appointmentsRepository.create({
            field, 
            date: appointmentDate
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;