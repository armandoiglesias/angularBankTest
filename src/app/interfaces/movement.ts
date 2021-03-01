import { AccountType } from "./accountType";
import { Customer } from "./customer";
import { MovementType } from "./movementType";

export interface Movement{
    id:Number;
    createdAt: Date;
    description?: String;
    amount: Number;
    type: MovementType; 
    to?: Customer;
}