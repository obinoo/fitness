import { Request, Response, NextFunction } from "express";
import Goals from '../model/goals';


export const setGoals = async(req: Request, res: Response,next: NextFunction) => {

    try{

        const {targetType, targetNumber} = req.body;

        const goals = await Goals.create({

            targetNumber,
            targetType
        })
         res.status(201).json({message: `goals created successfully`, goals})
         return;
    }catch(error){
        console.error('Error in creating goals, try again')
    }
}

export const getGoals = async (req: Request, res:Response, next: NextFunction) => {

    try{
        const getGoals = await Goals.findOne({
         where: {
            userId : req.params.userId
         }
        })
         res.status(200).json({message: `this goals are: `, getGoals})
         return;
    }catch(err){
       console.log(err);
       res.status(500).json({message: `Error in getting goals`})
       return;
    }
}
