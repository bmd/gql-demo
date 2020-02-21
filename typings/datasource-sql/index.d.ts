declare module 'datasource-sql' {
  import { DataSource, DataSourceConfig } from 'apollo-datasource';
  import { QueryBuilder, Config } from 'knex'

  export class SQLDataSource<TContext = any> extends DataSource {
    knex: QueryBuilder
    constructor(knexConfig: Config)
  }
}
