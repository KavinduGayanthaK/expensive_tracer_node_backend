export default class TransactionDTO {
    category: string;
    type: string;
    amount: number;
    date: string;

    constructor(category: string,type: string,amount: number,date: string) {
        this.category = category;
        this.type = type;
        this.amount = amount;
        this.date = date;
    }
}