import { SQLDataSource } from 'datasource-sql'

export class DepartmentDataSource extends SQLDataSource {
    async listDepartments() {
        return this.knex.select()
            .from('departments')
            .join('dept_manager', 'departments.dept_no', 'dept_manager.dept_no')
            .whereRaw('dept_manager.to_date >= NOW()')
            .orderBy('departments.dept_no', 'asc')
    }

    async getDepartment(id) {
        return this.knex.select()
            .from('departments')
            .join('dept_manager', 'departments.dept_no', 'dept_manager.dept_no')
            .where('dept_no', id)
            .whereRaw('dept_manager.to_date >= NOW()')
            .first()
    }
}
