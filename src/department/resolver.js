import { conn } from '../db'

export const resolver = {
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
  },
  Query: {
    departments: async () => conn.select().from('departments').orderBy('dept_no', 'asc'),
    department: async (_, { id }) => conn.select().from('departments').where('dept_no', id).first()
  }
}
