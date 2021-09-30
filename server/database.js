const Pool = require('pg').Pool
const pool = new Pool({
   user: "postgres",
   password: "heromuda-abraham-123-hero",
   host: "localhost",
   port: 5432,
   database: "welbex_task",
})

module.exports = pool