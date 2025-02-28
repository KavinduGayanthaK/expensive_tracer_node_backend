import { PrismaClient } from "@prisma/client";
import TransactionDAO, { TransactionType } from "../dao/TransactionDAO";
import TransactionDTO from "../dto/TransactionDTO";
import { TransactionRepository } from "../repository/TransactionRepository";

export class TransactionService {

    transactionRepository = new TransactionRepository();
    prisma = new PrismaClient();

    async generateTransactionId() {
        try {
            const lastTransaction = await this.prisma.transacton.findFirst({
                orderBy: { id: 'desc' }, // Get the last user by ID in descending order
                select: { id: true } // Select only the ID field
            });

            if (lastTransaction?.id) {
                const lastIdNumber = parseInt(lastTransaction.id.replace("TRANSACTION-", ""), 10);
                return `TRANSACTION-${(lastIdNumber + 1).toString().padStart(3, "0")}`;
            }

            return "TRANSACTION-001"; // Default ID if no users exist
        } catch (error) {
            console.error("Error generating user ID:", error);
            throw new Error("Failed to generate user ID.");
        }
    }

    async addTransaction(transaction: TransactionDTO) {
        try {
            const transactonId = await this.generateTransactionId();
            const transactionType = TransactionType[transaction.type as keyof typeof TransactionType]
            const transactionDao = new TransactionDAO(
                transactonId,
                transaction.category,
                transactionType,
                transaction.amount,
                transaction.date
            )

           await this.transactionRepository.createTransaction(transactionDao);
           
        }catch(error) {
            console.log(" can't added trnasaction.this error service layer : ",error);
            throw new Error("Failed to add transaction.");
        }
    }

    async getAllTransaction() {
        try {
            const getTransaction = await this.transactionRepository.getAllTransaction();
            return getTransaction;
        }catch(error) {
            console.log("Can't get transactions. This error service layer : ",error);
            throw new Error("Failed to get transaction.");
        }
    }

    async updateTransaction(id: string, transaction: TransactionDTO) {
        try {
            const transactionType = TransactionType[transaction.type.toUpperCase() as keyof typeof TransactionType]

            if (!transactionType) {
                throw new Error("Invalid transaction type. Must be INCOME or EXPENSE.");
            }
    
            const updateTransaction = await this.transactionRepository.updateTransaction(
                id, new TransactionDAO(id,transaction.category,transactionType,transaction.amount,transaction.date)
            );

            console.log(updateTransaction);
            
        }  catch (error) {
            console.log("Can't update transaction. This error occurred in the service layer:", error);
            throw new Error("Failed to update transaction.");
        }
    }

    async deleteTransaction(id: string) {
        try {
            const deleteTransaction = await this.transactionRepository.deleteTransaction(id);
            console.log(deleteTransaction);
            
        } catch(error) {
            console.log("Can't delete transaction. This error occurred in the service layer:", error);
            throw new Error("Failed to delete transaction.");
            
        }
    }
 }