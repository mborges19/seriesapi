const conexao = require('../infra/conexao')

module.exports = (sql, params) => {
    return new Promise((resolve, reject) => {
        conexao.query(sql, params || "", (erro, retorno) => {
            if(erro) reject(erro)
            resolve(retorno)
        })
    })
}