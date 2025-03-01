import { TransactionType } from "@prisma/client";

export default class TransactionDAO {
    id: string
    category: string;
    type: TransactionType;
    amount: number;
    date: string;

    constructor(id: string,category: string,type: TransactionType,amount: number,date: string) {
        this.id = id;
        this.category = category;
        this.type = type;
        this.amount = amount;
        this.date = date;
    }
}
