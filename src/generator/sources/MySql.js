let mysql = require('mysql2')

class MySQL
{
    constructor(){
        this.name = 'mysql';

        this.config = {
            host     : 'localhost',
            user     : 'test',
            password : 'test',
            database : 'test'
        }

        this.connection = null;
    }

    async getTables(options){
        let result = await this.query(options, 'show tables');

        return result.map(x=> x[Object.keys(x)[0]]);
    }

    async getColumns(options, table){
        let result = await this.query(options, "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = ?", [table]);
        return result.map(function(x){
            return {
                name: x.COLUMN_NAME,
                dataType: x.DATA_TYPE,
                nullable: x.IS_NULLABLE !== 'NO'
            }
        });
    }

    async query(options, sql, params = []){

        // note this reuses the connection....
        let connection = await this.connect(options);

        return new Promise(function(resolve, reject){
            connection.execute(sql, params, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);               
            });
        });
    }

    connect(options){

        if(this.connection) return this.connection;

        const self = this;

        return new Promise(function(resolve, reject){
            let connection = mysql.createConnection(options);

            connection.connect(function(err) {
                if (err) return reject(err);
              
                self.connection = connection;

                resolve(connection);
            });
        });
    }
}

export default new MySQL();