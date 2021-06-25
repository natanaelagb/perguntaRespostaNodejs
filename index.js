const express    = require("express");
const app        = express();
const bodyParser = require("body-parser");
const connection = require("./models/database");
const Pergunta   = require("./models/Pergunta");
const Resposta   = require("./models/Resposta");

// Minhas Variáveis
var data    = new Date();
var horario = data.toLocaleDateString() + data.toLocaleTimeString();
var modulos = require("./models/myFunctions");



// Estou dizendo par ao Express usar o EJS com View engine
app.set("view engine","ejs");
app.use(express.static("public"));

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rotas
app.get("/",(request,response)=>{
    Pergunta.findAll({
        raw:true,
        order:[['id','DESC']]
    }).then((conteudo) => {
        response.render("index",{
            conteudo: conteudo
        })
    })
})

app.get("/perguntar?",(request,response)=>{
    let form = request.query;

    response.render("perguntar",{
        nome: form.nome,
        idade: form.idade
    }) 
})

app.post("/salvarpergunta",(request,response) => {

    let title       = request.body['titulo'];
    let conteudo = request.body['conteudo'];

   Pergunta.create({
       titulo: title,
       conteudo: conteudo
   })
        .then(()=>{
            response.redirect("/");
        })
            .catch((erro)=>{
                response.send(erro);
            })
})

app.get("/pergunta/:id",(request,response)=>{
    let id = request.params.id;

    Pergunta.findOne({
        where: {id: id}
    })
        .then((conteudo)=>{
            if(conteudo != undefined){
                Resposta.findAll({
                    raw:true,
                    where: {idPergunta: conteudo.id},
                    order: [["id","DESC"]]
                })
                    .then((respostas)=>{
                        if(respostas == undefined)
                            respostas = [];
                        response.render("pergunta",{
                            respostas: respostas, 
                            conteudo: conteudo
                        })
                    })
            }
            else
                response.redirect("/");
        })

})

app.post("/salvarresposta",(request,response)=>{
    let form  = request.body;
    Resposta.create({
        idPergunta: form.idPergunta,
        conteudo:   form.conteudo
    })
        .then(()=>{
            response.redirect("pergunta/"+form.idPergunta)
        })
        .catch((erro)=>{
            response.send(erro);
        })
})

app.listen(80,(erro)=>{
    if(erro){
        console.log(erro);
    }else{
        console.log("Servidor iniciado com sucesso.");
    }
})