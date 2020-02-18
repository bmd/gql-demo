import moment from 'moment'

export const sql2epoch = (ts) => moment(ts, 'YYYY-MM-DDTHH:MM:SS.SSSZ').unix()

export const b64 = (s) => Buffer.from(s).toString('base64')
