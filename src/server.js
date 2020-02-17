import { ENV } from './config'
import moment from 'moment';
const { ApolloServer, gql } = require('apollo-server');
const Knex = require('knex');

const sql2epoch = (ts) => moment(ts, 'YYYY-MM-DDTHH:MM:SS.SSSZ').unix()

const conn = Knex({
  client: 'mysql',
  useNullAsDefault: true,
  log: true,
  connection: {
    host: ENV.DB_HOST,
    database: ENV.DB_NAME,
    port: ENV.DB_PORT,
    user: ENV.DB_USER,
    password: ENV.DB_PASS,
  }
});

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Department {
    id: String
    name: String
    manager: Employee
    employees: [Employee]
  }

  type Employee {
    id: Int
    firstName: String
    lastName: String
    gender: String
    hireDate: Int
    birthDate: Int
    department: Department
    title: String
    currentSalary: Int
  }

  type Query {
    departments: [Department]
    department(id: String!): Department
    employees(limit: Int!, offset: Int!): [Employee]
    employee(id: Int!): Employee
  }
`;

const resolvers = {
  Query: {
    departments: async () => await conn.select().from('departments').orderBy('dept_no', 'asc'),
    department: async(_, { id }) => await conn.select().from('departments').where('dept_no', id).first(),
    employees: async (_, { limit, offset }) => conn.select().from('v_full_employees').limit(limit).offset(offset),
    employee: async (_, { id }) => await conn.select().from('v_full_employees').where('emp_no', id).first(),
  },
  Employee: {
    id: (obj) => obj.emp_no,
    firstName: (obj) => obj.first_name,
    lastName: (obj) => obj.last_name,
    hireDate: (obj) => sql2epoch(obj.hire_date),
    birthDate: (obj) => sql2epoch(obj.birth_date),
    title: async (obj) => {
      const t = await conn.select()
        .from('titles')
        .where('emp_no', obj.emp_no)
        .orderBy('from_date', 'desc')
        .first();

      return t.title;
    },
    currentSalary: async (obj) => {
      const s = await conn.select()
        .from('salaries')
        .where('emp_no', obj.emp_no)
        .orderBy('from_date', 'desc')
        .first();

      return s.salary;
    },
    department: async (obj) => {
      const d = await conn.select()
        .from('departments')
        .join('current_dept_emp', 'departments.dept_no', 'current_dept_emp.dept_no')
        .where('emp_no', obj.emp_no)
        .first();

      return d;
    }
  },
  Department: {
    id: (obj) => obj.dept_no,
    name: (obj) => obj.dept_name,
    manager: async (obj) => {
      return await conn.select()
        .from('dept_manager')
        .join('v_full_employees', 'v_full_employees.emp_no', 'dept_manager.emp_no')
        .where(conn.raw('to_date >= NOW()'))
        .andWhere('dept_no', obj.dept_no)
        .first();
    },
    employees: async (obj) => {
      return await conn.select()
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});