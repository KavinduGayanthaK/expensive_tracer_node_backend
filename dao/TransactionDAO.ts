export default class TransactionDAO {
    category: string;
    type: TransactionType;
    amount: number;
    date: string;

    constructor(category: string,type: TransactionType,amount: number,date: string) {
        this.category = category;
        this.type = type;
        this.amount = amount;
        this.date = date;
    }
}

export enum TransactionType {
    INCOME = "INCOME",
    EXPENSE = "EXPENSE"
}