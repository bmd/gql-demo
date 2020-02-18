import { SQLDataSource } from 'datasource-sql'

export class EmployeeDataSource extends SQLDataSource {
  async getEmployee (id) {
    return this.knex.select('*')
      .from('v_full_employees')
      .join('titles', 'v_full_employees.emp_no', '=', 'titles.emp_no')
      .join('salaries', 'v_full_employees.emp_no', '=', 'salaries.emp_no')
      .where('v_full_employees.emp_no', id)
      .whereRaw('salaries.to_date >= NOW()')
      .whereRaw('titles.to_date >= NOW()')
      .first()
  }

  async getPage (limit, offset) {
    return this.knex.select('*')
      .from('v_full_employees')
      .join('titles', 'v_full_employees.emp_no', '=', 'titles.emp_no')
      .join('salaries', 'v_full_employees.emp_no', '=', 'salaries.emp_no')
      .whereRaw('salaries.to_date >= NOW()')
      .whereRaw('titles.to_date >= NOW()')
      .limit(limit)
      .offset(offset)
  }

  async getDepartment (id) {
    return this.knex.select()
      .from('departments')
      .join('current_dept_emp', 'departments.dept_no', 'current_dept_emp.dept_no')
      .where('emp_no', id)
      .first()
  }
}
