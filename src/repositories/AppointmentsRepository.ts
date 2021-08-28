import Appointment from "../models/Appointment";
import { isEqual } from 'date-fns';

class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public findByDate(date: Date): Appointment | null {
        const findAppointment = this.appointments.find(appointment => 
            isEqual(date, appointment.date)
        );

        return findAppointment || null;
    }

    public create(field: string, date: Date): Appointment {
        const appointment = new Appointment(field, date);
        
        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;