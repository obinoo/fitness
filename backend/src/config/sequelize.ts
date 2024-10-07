import dotenv from 'dotenv';
dotenv.config();

console.log("Database URL:", process.env.DATABASE_URL); 

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL as string );

export default sequelize;
