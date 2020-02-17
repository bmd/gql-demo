import { gql } from 'apollo-server'

export const typeDefs = gql`
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
`
