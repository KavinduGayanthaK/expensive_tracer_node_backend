import { PrismaClient, TransactionType } from "@prisma/client";
import TransactionDTO from "../dto/TransactionDTO";
import { TransactionRepository } from "../repository/TransactionRepository";
import TransactionDAO from "../dao/TransactionDAO";

export class TransactionService {
    transactionRepository = new TransactionRepository();
    prisma = new PrismaClient();

    async generateTransactionId() {
        try {
            const lastTransaction = await this.prisma.transacton.findFirst({
                orderBy: { id: 'desc' }, // Get the last transaction by ID in descending order
                select: { id: true } // Select only the ID field
            });

            if (lastTransaction?.id) {
                const lastIdNumber = parseInt(lastTransaction.id.replace("TRANSACTION-", ""), 10);
                return `TRANSACTION-${(lastIdNumber + 1).toString().padStart(3, "0")}`;
            }

            return "TRANSACTION-001"; // Default ID if no transactions exist
        } catch (error) {
            console.error("Error generating transaction ID:", error);
            throw new Error("Failed to generate transaction ID.");
        }
    }

    async addTransaction(transaction: TransactionDTO) {
        try {
            // Validate the type to ensure it is either INCOME or EXPENSE
            const transactionType = this.getTransactionType(transaction.type);
            
            const transactionId = await this.generateTransactionId();
            const transactionDao = new TransactionDAO(
                transactionId,
                transaction.category,
                transactionType,
                transaction.amount,
                transaction.date
            );

            await this.transactionRepository.createTransaction(transactionDao);

        } catch (error) {
            console.log("Can't add transaction. Error in service layer:", error);
            throw new Error("Failed to add transaction.");
        }
    }

    async getAllTransaction() {
        try {
            return await this.transactionRepository.getAllTransaction();
        } catch (error) {
            console.log("Can't get transactions. Error in service layer:", error);
            throw new Error("Failed to get transactions.");
        }
    }

    async updateTransaction(id: string, transaction: TransactionDTO) {
        try {
            const transactionType = this.getTransactionType(transaction.type);

            const updateTransaction = await this.transactionRepository.updateTransaction(
                id,
                new TransactionDAO(id, transaction.category, transactionType, transaction.amount, transaction.date)
            );

            console.log(updateTransaction);

        } catch (error) {
            console.log("Can't update transaction. Error in service layer:", error);
            throw new Error("Failed to update transaction.");
        }
    }

    async deleteTransaction(id: string) {
        try {
            const deleteTransaction = await this.transactionRepository.deleteTransaction(id);
            console.log(deleteTransaction);
        } catch (error) {
            console.log("Can't delete transaction. Error in service layer:", error);
            throw new Error("Failed to delete transaction.");
        }
    }

    // Helper method to convert string type to TransactionType
    private getTransactionType(type: string): TransactionType {
        const validTypes: TransactionType[] = [TransactionType.INCOME, TransactionType.EXPENSE];
        
        if (validTypes.includes(type as TransactionType)) {
            return type as TransactionType;  // Safely cast to TransactionType
        } else {
            throw new Error("Invalid transaction type. Must be INCOME or EXPENSE.");
        }
    }
}
