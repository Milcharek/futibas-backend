import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
    const { field, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));
    const findAppointmentInSameDate = appointments.find(appointment => 
        isEqual(parsedDate, appointment.date)
    );

    if(findAppointmentInSameDate) {
        return response.status(400).json({ message: "This appointment is already booked!" })
    }

    const appointment = new Appointment(field, parsedDate);

    appointments.push(appointment);

    return response.json(appointment);
})

export default appointmentsRouter;