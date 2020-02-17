import { DataTypes } from 'sequelize'
import { sequelize } from '.'

console.log("HERE2")

export const Department = sequelize.define('Department', {
    deptNo: {
        type: DataTypes.CHAR(4),
        field: 'dept_no',
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
    },

    deptName: {
        type: DataTypes.STRING(40),
        field: 'dept_name',
        allowNull: false,
        defaultValue: null,
        unique: true,
    },
})