export default class TransactionDTO {
    id?: string;
    category: string;
    type: string;
    amount: number;
    date: string;

    constructor(id: string,category: string,type: string,amount: number,date: string) {
        this.id = id;
        this.category = category;
        this.type = type;
        this.amount = amount;
        this.date = date;
    }
}