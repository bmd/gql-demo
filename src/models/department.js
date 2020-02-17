import { DataTypes } from 'sequelize'
import { knex } from '.'
const { Model } = require('objection');

export class Department extends Model {
    static get tableName() {
        return 'departments';
    }

    static get idColumn() {
        return 'dept_no';
    }
}
