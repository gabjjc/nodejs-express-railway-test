import {createPool} from 'mysql2/promise'


export const pool = createPool({
    
    host: 'containers-us-west-36.railway.app',
    user: 'root',
    password:  'TGOnf4PwxRIPJGMH8Vwj',
    port : 6907,
    database: 'railway'

    
})

