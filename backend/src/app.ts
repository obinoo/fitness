import dotenv from 'dotenv'
dotenv.config();
import sequelize from './config/sequelize';
import authRoutes from './route/authRoute';
import goalRoute from './route/goalRoute'; 
import workoutroute from './route/workoutroute';
import express, { Request, Response, NextFunction} from "express";

const app = express();

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api', authRoutes); 
app.use('/api', goalRoute);
app.use('/api', workoutroute);

sequelize.sync()
.then(()=>{
    console.log("Database URL:", process.env.DATABASE_URL); 
console.log('Databse synchronised succesfully');

const PORT = process.env.PORT || 3000; 
app.listen(PORT, ()=>{
console.log('Server is up and running')
})
})
.catch(error => {
    console.error(`Database synchronization error: ${error}`);
})