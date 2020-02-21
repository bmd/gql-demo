import { sql2epoch, b64 } from '../util'

interface Employee {
  emp_no: Number
  first_name: String
  last_name: String
  hire_date: Number
}

export const resolver = {
  Employee: {
    id: (obj: Employee) => b64(`employee:${obj.emp_no}`),
    employeeId: (obj: Employee) => obj.emp_no,
    firstName: (obj: Employee) => obj.first_name,
    lastName: (obj: Employee) => obj.last_name,
    hireDate: (obj: Employee) => sql2epoch(obj.hire_date),
    department: async (obj: Employee, _, { dataSources }) => {
      return dataSources.employee.getDepartment(obj.emp_no)
    }
  },
  Query: {
    employees: async (_, { limit, offset }, { dataSources }) => {
      return dataSources.employee.getPage(limit, offset)
    },
    employee: async (_, { id }, { dataSources }) => {
      return dataSources.employee.getEmployee(id)
    }
  }
}
