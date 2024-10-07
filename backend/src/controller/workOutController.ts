import { Request, Response, NextFunction } from "express";
import Workout from "../model/workout";

export const createPlan = async (req: Request, res: Response) : Promise<any> => {

    const {caloriesBurned, duration, type } = req.body;

    try{

        const creating = await Workout.create({
            caloriesBurned,
            duration,
            type
        })

       return res.status(201).json({message: `Workout plan created successfully`, creating})
    }catch(error){
        console.error('Error creating workout:', error);
       return res.status(500).json({
      message: 'Failed to create workout'
    });
}
}

export async function getWorkouts(req: Request, res: Response, next: NextFunction): Promise<any>{

    try{
        const getAll = await Workout.findAll();
        return res.status(200).json({message: `All workout plans gotten`, getAll})
    }catch(error){
        console.error(`Error getting the workout plans`, error)
        return res.status(500).json({message: `Failed to fetch the workout plans`})
    }
}

export async function getWorkoutId(req: Request, res:Response): Promise<any>{

    try{

        const getById = await Workout.findOne({
            where:{
               userId : req.params.userId
            }
        })
        return res.status(200).json({message: `thie workout plan belongs to `, getById})
    }catch(err){
       console.log(err);
       return res.status(500).json({message: `Error in getting workout plans`})
    }
}


export async function updatePlan (req: Request, res: Response): Promise<any>{

    try{
        const {type, duration} = req.body;

        const updates = await Workout.findOne({
            where: {
                userId: req.params.userId
            }
        })
        if(!updates)  return res.status(400).json({ message: "User workout plan not found" });
            
        await Workout.update(
            { type, duration }, 
            { where: { userId: req.params.userId } } 
        );
            return  res.status(200).json({message: "Plans were changed"})
        
    }catch(error){
        console.error(`Error in chnaging the plans`)
        return res.json({message: `Error in performing updates`})
    }
}


export const deletes = async (req: Request, res: Response) : Promise<any>=>{

    try{

       const deletes = await Workout.findOne({
        where: {
            userId: req.params.userId
        }
       })

       if(!deletes) return  res.status(400).json({ message: "User workout plan not found" });

       await Workout.destroy();
       res.status(200).json({ message: 'Worjout deleted successfully' });
    } catch (err) {
      console.error('Error deleting workout:', err);
      res.status(500).json({ error: 'Internal server error' });
    }


}