import { BehaviorSubject, Subject } from "rxjs";
import { Customer } from "../interfaces/customer";

export class SharedDataService {
    constructor() {

     }

    public currentCustomer: Customer = {
        FullName : "",
        Email : "",
        Pwd : "",
        Rut : "", 
        id : 0
    }

    public subject = new Subject<any>();
    private messageSource = new BehaviorSubject(this.currentCustomer);
    currentMessage = this.messageSource.asObservable();
    
    changeMessage(message: Customer) {
        this.messageSource.next(message)
    }
}