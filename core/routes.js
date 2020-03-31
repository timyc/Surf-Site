exports.home = function(req, res) {
    res.render('home', {
        user: req.user,
        title: 'YOUR SITE'
    });
};

exports.nojs = function(req, res) {
    res.render('nojs');
};
