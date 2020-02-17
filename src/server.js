import { ENV } from './config'
const { ApolloServer, gql } = require('apollo-server');
const Knex = require('knex');

const conn = Knex({
  client: 'mysql',
  useNullAsDefault: true,
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
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Department {
    id: String
    name: String
    manager: Employee
  }

  type Employee {
    id: Int
    firstName: String
    lastName: String
    gender: String
    hireDate: Int
    department: Department
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    departments: [Department]
    department(id: String!): Department
    employees: [Employee]
  }
`;

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const resolvers = {
  Query: {
    books: () => books,
    departments: async () => await conn.select().from('departments').orderBy('dept_no', 'asc'),
    department: async(_, { id }) => await conn.select().from('departments').where('dept_no', id).first(),
  },
  Department: {
    id: (obj) => obj.dept_no,
    name: (obj) => obj.dept_name,
    manager: async (obj) => {
      const x = await conn.select()
        .from('dept_manager')
        .join('employees', 'employees.emp_no', 'dept_manager.emp_no')
        .where(conn.raw('to_date >= NOW()'))
        .andWhere('dept_no', obj.dept_no).first();
      console.log(x)
      return x
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