const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

series = (app) => {

    app.use((req,res, next) =>{
        const authHeader = req.headers.authorization

        if(!authHeader){
            return res.status(401).send({erro: 'Token não encontrado'})
        }
        const parts = authHeader.split(' ')
        
        if(!parts.length == 2){
            res.status(401).send({erro: 'Token mal formatado'})
        }

        const [bearer, token] = parts

        jwt.verify(token, authConfig.secret, (erro, user) =>{
            if(erro) return res.status(401).send({erro: 'Token inválido'})

            req.userId = user.id;

            return next()
        })
    })

    app.get('/series', (req, res) => {
        var seriesDao = app.models.Series;
        seriesDao.lista()
        .then(resultado =>{
            res.send(resultado)
        })
        .catch(erro => {
            console.log('Erro ao consultar' + erro)
            res.status(500).send(erro);
        })
    })

    app.post('/series', (req, res) => {
        const seriesDao = app.models.Series;
        let serie = req.body;

        seriesDao.insere(serie)
            .then(resultado =>{
                const insertId = resultado.insertId;
                serie = {id:insertId, ...serie}
                res.status(201).send(serie)
            })
            .catch(erro => {
                console.log('Erro ao inserir' + erro)
                res.status(500).send(erro)
            })


    })

    app.get('/series/:id', (req, res) => {
        const id = req.params.id
        const seriesDao = app.models.Series
        seriesDao.buscaPorId(id)
            .then(serie => {
                if(!serie){
                    res.status(404).send({erro: 'Série não encontrada!'})
                }else{
                    res.send(serie)
                }
            })
            .catch(erro => {
                console.log('Erro ao buscar série!')
                res.status(500).send({erro: 'Erro ao buscar!'})
            })

    })

    app.put('/series/:id', (req, res) => {
        const id = req.params.id;
        const serie = req.body;
        serie.id = id;

        seriesDao = app.models.Series
        seriesDao.atualiza(serie)
            .then(retorno => {
                if(!retorno.affectedRows){
                    res.status(404).send({erro: 'Série não encontrada'})
                    return
                }
                res.send(serie)
            })
            .catch(erro => res.status(500).send(erro))


    })

    app.delete('/series/:id', (req, res) =>{
        const id = req.params.id
        const seriesDao = app.models.Series

        seriesDao.delete(id)
            .then(retorno =>{
                if(retorno.affectedRows == 0){
                    res.status(404).send({erro: 'Série não encontrada!'})
                    return
                }
                res.send(retorno).send()
            })
            .catch(erro => {
                console.log('Erro ao deletar série! ' + erro)
            })
    })
}

module.exports = series;