const conexao = require('../infra/conexao');

class Series {
    lista() {
        return new Promise((resolve, reject) => {
            const sql = 'select * from series';
            conexao.query(sql, (erro, retorno) => {
                if (erro) {
                    reject('Erro ao consultar: ' + erro);
                } else {
                    console.log('Foiiiiiii!');
                    resolve(retorno);
                }
            });
        });
    }

    insere(serie) {
        return new Promise((resolve, retorno) => {
            const sql = "insert into series set ? "

            conexao.query(sql, serie, (erro, retorna) => {
                if (erro) {
                    reject('Erro ao inserir: ' + erro);
                } else {
                    resolve(retorno);
                }
            })
        });
    }

    buscaPorId(id){
        return new Promise((resolve, reject)=>{
            const sql = 'select * from series where id = ?'
    
            conexao.query(sql, id, (erro, retorno) => {
                if(erro){
                    reject('Erro ao buscar: ' + erro);
                }else{
                    resolve(retorno[0]);
                }
            })
        })
    }

    delete(id){
        return new Promise((resolve, reject) => {
            const sql = 'delete from series where id = ?'

            conexao.query(sql, id, (erro, retorno) =>{
                if(erro){
                    reject('Erro ao deletar: ' + erro)
                }else{
                    resolve(retorno)
                }
            })
        })
    }

    atualiza(serie) {
        return new Promise((resolve, retorno) => {
            const sql = "update series set ? where id = ?"

            conexao.query(sql, [serie, serie.id], (erro, retorna) => {
                if (erro) {
                    reject('Erro ao atualizar: ' + erro);
                } else {
                    resolve(retorna);
                }
            })
        });
    }
}

module.exports = new Series();