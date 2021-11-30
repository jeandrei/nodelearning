module.exports.newPeople = (req, res) => {
    console.log('Entrou no controller');
    res.render('people/new');
}