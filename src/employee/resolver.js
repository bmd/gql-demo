import { sql2epoch, b64 } from '../util'

export const resolver = {
  Employee: {
    id: (obj) => b64(`employee:${obj.emp_no}`),
    employeeId: (obj) => obj.emp_no,
    firstName: (obj) => obj.first_name,
    lastName: (obj) => obj.last_name,
    hireDate: (obj) => sql2epoch(obj.hire_date),
    birthDate: (obj) => sql2epoch(obj.birth_date),
    title: (obj) => obj.title,
    salary: (obj) => obj.salary,
    department: async (obj, _, { dataSources }) => {
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
