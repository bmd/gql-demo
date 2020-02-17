import { Sequelize } from 'sequelize';
import { ENV } from '../config/env.config';

console.log("HERE")

export const sequelize = new Sequelize({
        host: ENV.DB_HOST,
        database: ENV.DB_NAME,
        port: ENV.DB_PORT,
        dialect: ENV.DB_DIALECT,
        username: ENV.DB_USER,
        password: ENV.DB_PASSWORD,
        operatorsAliases: false,
        logging: true,
        storage: ':memory:',
        modelPaths: [__dirname + '/*.model.js'],
        modelMatch: (filename, member) => {
           return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
        },
});

console.log(sequelize)

export { Department } from './department.model';
