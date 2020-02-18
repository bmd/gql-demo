import { gql, ApolloServer } from 'apollo-server'

import { merge } from 'lodash'
import { knexConfig } from './db'

import {
  EmployeeResolver, EmployeeSchema, EmployeeDataSource
} from './employee'

import {
  DepartmentResolver, DepartmentSchema, DepartmentDataSource
} from './department'

// We need this because you can't extend query unless Query
// type is already defined.
const baseTypeDef = gql`
  type Query {
    version: String
  }
`

// Run the Apollo server
const server = new ApolloServer({
  typeDefs: [baseTypeDef, EmployeeSchema, DepartmentSchema],
  resolvers: merge({}, EmployeeResolver, DepartmentResolver),
  dataSources: () => ({
    employee: new EmployeeDataSource(knexConfig),
    department: new DepartmentDataSource(knexConfig)
  })
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
