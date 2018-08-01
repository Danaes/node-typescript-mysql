import mysql = require('mysql');

export default class MySQL{

    private static _instance: MySQL;

    connection: mysql.Connection;
    connected: boolean = false;

    constructor(  ){
        console.log('Clase inicialicida');

        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'user2',
            password: '12345',
            database: 'node_db'
          });

          this.connectDb();
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    static executeQuery( query: string, callback: Function) {

        this.instance.connection.query(query, (err, results: Object[], fields) => {

            if(err){
                console.log('ERROR QUERY:', err);
                return callback(err);
            }
            if( results.length === 0)
                callback('El registro solicitado no existe');
            else
                callback(null, results);

        })

    }

    private connectDb () {
        this.connection.connect( (err: mysql.MysqlError ) => {
            if( err ){
                console.log(err);
                return;
            }
            
            this.connected = true;
            console.log('Conectado a la base de datos');
        })
    }

}