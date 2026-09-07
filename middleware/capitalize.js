module.exports = (req, res, next) => {
    req.originalName = req.params.name;
    req.params.name = req.params.name.toUpperCase();
    next();
}