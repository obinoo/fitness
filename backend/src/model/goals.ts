import {Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

class Goals extends Model {
    public userId!: string;
    public targetType!: string;
    public targetNumber!: number;
}

Goals.init({

    userId:{
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: 'Users',
            key: 'id'
        }
    },
    targetType:{
        type: DataTypes.STRING,
        allowNull: false
    },
    targetNumber:{
        type: DataTypes.NUMBER,
        allowNull: false
    },

}, {
    sequelize,
    tableName: 'Goals'
})

export default Goals;