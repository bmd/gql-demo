import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Department {
    id: String
    departmentId: String
    name: String
    manager: Employee
    employees(limit: Int, offset: Int): [Employee]
  }

  extend type Query {
    departments(limit: Int, offset: Int): [Department]
    department(id: String!): Department
  }
`
