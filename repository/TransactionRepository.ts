import { PrismaClient } from "@prisma/client";
import TransactionDAO from "../dao/TransactionDAO";

export class TransactionRepository {
  prisma = new PrismaClient();

  async createTransaction(transaction: TransactionDAO) {
    try {
      const addedTransaction = await this.prisma.transacton.create({
        data: {
          id: transaction.id,
          category: transaction.category,
          type: transaction.type,
          amount: transaction.amount,
          date: transaction.date,
        },
      });

      console.log("Added transaction : ", addedTransaction);
    } catch (error) {
      console.log("Can't added transction : ", error);
    }
  }

  async getAllTransaction() {
    try {
      return await this.prisma.transacton.findMany();
    } catch (error) {
      console.log("Can't get transctions : ", error);
    }
  }

  async updateTransaction(id: string, transaction: TransactionDAO) {
    try {
      const updateTransaction = await this.prisma.transacton.update({
        where: {
          id: id,
        },
        data: {
          category: transaction.category,
          type: transaction.type,
          amount: transaction.amount,
          date: transaction.date,
        },
      });

      console.log("Update transaction : ", updateTransaction);
    } catch (error) {
      console.log("Can't update transction : ", error);
    }
  }

  async deleteTransaction(id: string) {
    try {
      const deleteTransaction = await this.prisma.transacton.delete({
        where: {
          id: id,
        },
      });
      console.log("Delete transaction : ", deleteTransaction);
    } catch (error) {
      console.log("Can't delete transction : ", error);
    }
  }
}
