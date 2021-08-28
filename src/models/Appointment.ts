import { uuid } from 'uuidv4';

class Appointment {
    id: string;

    field: string;

    date: Date;

    constructor(field: string, date: Date) {
        this.id = uuid();
        this.field = field;
        this.date = date;
    }
}

export default Appointment;