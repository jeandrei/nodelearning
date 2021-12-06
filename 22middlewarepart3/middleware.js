module.exports.exemploMiddleware = (req, res, next) => {
    console.log('Middleware executada do arquivo middleware.js');
    next();
}