import { Customer } from "./customer";
import { Movement } from "./movement";
import { AccountType } from "./accountType";

export interface CustomerAccount{
    customer : Customer;
    accountType: AccountType;
    movement: Movement[]
    availableAmount: number;
    createdAt: Date;
    accountNumber : String;
}