import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
    const { field, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate);

    if(findAppointmentInSameDate) {
        return response.status(400).json({ message: "This appointment is already booked!" })
    }

    const appointment = appointmentsRepository.create(field, parsedDate);

    return response.json(appointment);
})

export default appointmentsRouter;