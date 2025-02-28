import express from 'express'
import TransactionDTO from '../dto/TransactionDTO';
import { TransactionService } from '../service/TransactionService';

const router = express.Router();

const transactionService = new TransactionService()
router.post("/add",async(req,res) => {
    try {
        const transaction: TransactionDTO = req.body;
        const savedTransaction = await transactionService.addTransaction(transaction);
        res.status(201).json(savedTransaction);
        console.log(savedTransaction);
        
    }catch(error) {
        console.log(error);  
    }
});

router.get("/getAll", async(req,res) => {
    try {
        const getall = await transactionService.getAllTransaction()
        res.json(getall)
    }catch(err){
        console.log("error getting transaction", err);
    }
}) 

router.put("/update/:id",async(req,res) => {
    try {
        const id:string = req.params.id;   
        const transaction: TransactionDTO = req.body;
        const savedTransaction = await transactionService.updateTransaction(id,transaction);
        res.status(201).json(savedTransaction);
        console.log(savedTransaction);
        
    }catch(error) {
        console.log(error);  
    }
});

router.delete("/delete/:id", async (req, res) => {
    const id: string  = req.params.id;
    try{
        const deletedTransaction = await transactionService.deleteTransaction(id);
        res.json(deletedTransaction);
    }catch(err){
        console.log("error deleting transaction", err);
    }
})

export default router;