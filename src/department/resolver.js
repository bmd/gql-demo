import { b64 } from '../util'

export const resolver = {
  Department: {
    id: (obj) => b64(`department:${obj.dept_no}`),
    departmentId: (obj) => obj.dept_no,
    name: (obj) => obj.dept_name,
    manager: async (obj, _, { dataSources }) => {
      return dataSources.employee.getEmployee(obj.emp_no)
    },
    employees: async (obj, { limit, offset }, { dataSources }) => {
      return dataSources.department.listEmployees(
        obj.dept_no, limit || 25, offset || 0
      )
    }
  },
  Query: {
    departments: async (_, { limit, offset }, { dataSources }) => {
      return dataSources.department.listDepartments(
        limit || 5, offset || 0
      )
    },
    department: async (_, { id }, { dataSources }) => {
      return dataSources.department.getDepartment(id)
    }
  }
}
