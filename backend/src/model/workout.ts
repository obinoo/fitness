import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize'; 

class Workout extends Model {
    public id!: string;
    public userId!: string | undefined;
    public type!: string;
    public  duration!: number;
    public  caloriesBurned!: number;
    public  date!: Date;
}

Workout.init({
    id:{
      type: DataTypes.UUID,
      allowNull: false
    },

    userId:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references:{
            model: 'Users', 
            key: 'id',
        }
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false
    },
    duration:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    caloriesBurned:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {
    sequelize,
    tableName: 'Workout'
});

export default Workout;