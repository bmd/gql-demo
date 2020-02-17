export const ENV = {
  DB_HOST: process.env.DB_HOST || '127.0.0.1',
  DB_PORT: process.env.DB_PORT || '3306',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASS: process.env.DB_PASS || 'college',
  DB_NAME: process.env.DB_NAME || 'employees',
  DB_DIALECT: process.env.DB_DIALECT || 'mysql'
}
