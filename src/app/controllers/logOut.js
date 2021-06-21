module.exports.logOut = function (req, res) {
    res.clearCookie('c_user', { httpOnly: true, secure: true });
    res.redirect('/home');
}