
export const resolver = {
  Department: {
    id: (obj) => b64(`employee:${obj.dept_no}`),
    departmentId: (obj) => obj.dept_no,
    name: (obj) => obj.dept_name,
    manager: async (obj, _, { dataSources }) => {
      return dataSources.employee.getEmployee(obj.emp_no)
    },
    employees: async (obj) => {
      return 'FOO' // TODO
    }
  },
  Query: {
    departments: async (_, { limit, offset }, { dataSources }) => {
      return dataSources.department.listDepartments()
    },
    department: async (_, { id }, { dataSources }) => {
      return dataSources.department.getDepartment(id)
    }
  }
}
