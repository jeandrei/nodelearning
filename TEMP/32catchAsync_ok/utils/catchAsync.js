//Retorna uma função que executa essa função que pega qualquer erro
//e passa para o next se tiver algum erro
//Essa função é usada para wrap automaticamente as async functions
module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}