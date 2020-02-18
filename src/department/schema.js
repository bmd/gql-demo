import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Department {
    id: String
    name: String
    manager: Employee
    employees: [Employee]
  }

  extend type Query {
    departments: [Department]
    department(id: String!): Department
  }
`
