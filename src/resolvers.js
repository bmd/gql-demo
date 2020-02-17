import { conn } from './db'
import { sql2epoch } from './util'

const EmployeeResolver = {
  Employee: {
    id: (obj) => obj.emp_no,
    firstName: (obj) => obj.first_name,
    lastName: (obj) => obj.last_name,
    hireDate: (obj) => sql2epoch(obj.hire_date),
    birthDate: (obj) => sql2epoch(obj.birth_date),
    title: async (obj) => {
      const t = await conn.select()
        .from('titles')
        .where('emp_no', obj.emp_no)
        .orderBy('from_date', 'desc')
        .first()

      return t.title
    },
    currentSalary: async (obj) => {
      const s = await conn.select()
        .from('salaries')
        .where('emp_no', obj.emp_no)
        .orderBy('from_date', 'desc')
        .first()

      return s.salary
    },
    department: async (obj) => {
      return conn.select()
        .from('departments')
        .join('current_dept_emp', 'departments.dept_no', 'current_dept_emp.dept_no')
        .where('emp_no', obj.emp_no)
        .first()
    }
  }
}

const DepartmentResolver = {
  Department: {
    id: (obj) => obj.dept_no,
    name: (obj) => obj.dept_name,
    manager: async (obj) => {
      return conn.select()
        .from('dept_manager')
        .join('v_full_employees', 'v_full_employees.emp_no', 'dept_manager.emp_no')
        .where(conn.raw('to_date >= NOW()'))
        .andWhere('dept_no', obj.dept_no)
        .first()
    },
    employees: async (obj) => {
      return conn.select() // TODO
    }
  }
}

export const resolvers = {
  Query: {
    departments: async () => conn.select().from('departments').orderBy('dept_no', 'asc'),
    department: async (_, { id }) => conn.select().from('departments').where('dept_no', id).first(),
    employees: async (_, { limit, offset }) => conn.select().from('v_full_employees').limit(limit).offset(offset),
    employee: async (_, { id }) => conn.select().from('v_full_employees').where('emp_no', id).first()
  },
  ...EmployeeResolver,
  ...DepartmentResolver
}
