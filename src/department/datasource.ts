/// <reference types="../../typings/datasource-sql" />
import { SQLDataSource } from 'datasource-sql'

export class DepartmentDataSource extends SQLDataSource {
  async listDepartments (limit: number, offset: number) {
    return this.knex.select()
      .from('departments')
      .join('dept_manager', 'departments.dept_no', 'dept_manager.dept_no')
      .whereRaw('dept_manager.to_date >= NOW()')
      .orderBy('departments.dept_no', 'asc')
      .limit(limit)
      .offset(offset)
  }

  async getDepartment (id: number) {
    return this.knex.select()
      .from('departments')
      .join('dept_manager', 'departments.dept_no', 'dept_manager.dept_no')
      .where('departments.dept_no', id)
      .whereRaw('dept_manager.to_date >= NOW()')
      .first()
  }

  async listEmployees (id: number, limit: number, offset: number) {
    return this.knex.select()
      .from('departments')
      .join('current_dept_emp', 'departments.dept_no', 'current_dept_emp.dept_no')
      .join('v_full_employees', 'current_dept_emp.emp_no', 'v_full_employees.emp_no')
      .where('departments.dept_no', id)
      .limit(limit)
      .offset(offset)
  }
}
