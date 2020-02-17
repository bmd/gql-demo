import moment from 'moment'

export const sql2epoch = (ts) => moment(ts, 'YYYY-MM-DDTHH:MM:SS.SSSZ').unix()
