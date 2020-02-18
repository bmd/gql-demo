import { gql } from 'apollo-server'

export const typeDef = gql`
  type Employee {
    id: String
    employeeId: Int
    firstName: String
    lastName: String
    gender: String
    title: String
    salary: Int
    hireDate: Int
    department: Department
  }

  extend type Query {
    employees(limit: Int!, offset: Int!): [Employee]
    employee(id: Int!): Employee
  }
`
