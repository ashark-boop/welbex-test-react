const db = require('../database')

class RecordController {
    async getRecords(req, res){
        const {column, condition, value} = req.query;
        var responseClient;

        if(column && condition && value){
            switch(condition){
                case "more":
                    responseClient = await db.query(`SELECT * FROM record WHERE ${column} > ${value}`);
                break;

                case "less":
                    responseClient = await db.query(`SELECT * FROM record WHERE ${column} < ${value}`);
                break;

                case "equal":
                    responseClient = await db.query(`SELECT * FROM record WHERE ${column} = ${value}`);
                break;

                case "contained":
                    responseClient = await db.query(`SELECT * FROM record WHERE ${column} ~ ${"'"+value+"'"}`);
                break;

                default:
                    responseClient = await db.query(`SELECT * FROM record`)
                break;
            }
        } else {
            responseClient = await db.query(`SELECT * FROM record`)
        }
        res.json(responseClient.rows)
    }
}

module.exports = new RecordController()