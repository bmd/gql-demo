import { gql } from 'apollo-server'

export const typeDef = gql`
  type Employee {
    id: String
    employeeId: Int
    firstName: String
    lastName: String
    gender: String
    hireDate: Int
    birthDate: Int
    department: Department
    title: String
    salary: Int
  }

  extend type Query {
    employees(limit: Int!, offset: Int!): [Employee]
    employee(id: Int!): Employee
  }
`
