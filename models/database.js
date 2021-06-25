const Sequelize     = require("sequelize");
const connection    = new Sequelize("projeto02", "root", "natan9618", {
    host: 'localhost',
    dialect: 'mysql'
})


connection.authenticate()
    .then(()=>{
        console.log('Conexão estabelecida com o banco de dados.');
    }).catch((erro)=>{
        console.error('Não foi possível conectar ao banco de dados:', error);
    });

module.exports = connection;