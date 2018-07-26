import { Ticketdetails } from './ticketdetails';

export class Ticket {
    public pre: string;
    public fName: string;
    public lName: string;
    public sfId: string;
    public type: number;
    public depPhone: string;
    public desPhone: string;
    public comment: string;
    public email: string;
    public tDetails: Array<Ticketdetails> ;
}
