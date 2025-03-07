import express from 'express'
import authRoutes, { authenticateToken } from './routes/UserRoutes';
import transactionRoutes from './routes/TransactinRoutes';
import  dotenv  from 'dotenv';
import cors from 'cors';

const app  = express();

dotenv.config();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:8081',  // Allow frontend origin
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    credentials: true  // Allow credentials (cookies, authentication headers)
}));

app.use('/auth',authRoutes)
app.use('/transaction',authenticateToken,transactionRoutes)

app.use(authenticateToken);


app.listen(3001,"0.0.0.0",(err)=>{
    console.log("server running on port 3000");
})

app.use('/',(req, res)=>{
    res.status(400).send("Not Found Server")
})