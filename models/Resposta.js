const Sequelize     = require("sequelize");
const connection    = require("./database");
const Pergunta = require("./Pergunta");

const Resposta = connection.define("resposta",{
    idPergunta:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    conteudo:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Resposta.sync({force: false}).then(() => {});

module.exports = Resposta;