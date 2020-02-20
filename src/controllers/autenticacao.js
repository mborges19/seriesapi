const {check, validationResult} = require('express-validator')
const usuarioDao = new (require('../models/Usuarios'))()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const authConfig = require('../config/auth')

gerarToken = (params) => {
    // console.log(params)
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 120,
    })
}
module.exports = {
    async registra(req, res){
        const erros = validationResult(req)
        if(!erros.isEmpty()){
            return res.status(400).send(erros)
        }
        let usuario = req.body     
        try{
        usuario.senha = await bcrypt.hash(usuario.senha, 10)
        const resultado = await usuarioDao.insere(usuario)
        usuario = {id: resultado.insertId, ...usuario}
        return res.status(201).send({
                usuario,
                token: gerarToken({id: usuario.id})
            })
        }catch(erro){
            return res.status(500).send(erro)
        }
    },

    async autentica(req, res){
        const {email, senha} = req.body

        try{

            let usuario = await usuarioDao.buscarPorEmail(email)
            usuario = usuario[0]

            if(!usuario){
                return res.status(400).send({erro: 'Usuário não cadrastado'})
            }
            //console.log(usuario[0].senha)
            if(!await bcrypt.compare(senha, usuario.senha)){
                return res.status(400).send({erro: 'Senha inválida'})
            }

            delete usuario.senha

            res.send({
                usuario,
                token: gerarToken({id: usuario.id})
            })
        }catch(erro){
            console.log(erro)
            res.status(500).send(erro)
        }
    },
}
