const User = require('../models/users');
module.exports.getMethod = function (req, res) {
    res.render('setup');
};

module.exports.postMethod = function (req, res) {
    const query = req.body;
    User.findById(req.user, async function(err,user) {
        if(!err) {
            if(user) {
            user.given_name = query.givenname;
            user.family_name = query.familyname;
            user.shipping_address.home = query.detailaddress;
            user.shipping_address.district = query.district;
            user.shipping_address.street = query.road;
            user.shipping_address.city = query.city;
            user.user_name = query.username;
            await user.save();
            res.redirect('/home');
        }
        else {
            res.status('404').send('Lỗi không tìm thấy người dùng')
        }
    }
    else {
        res.status('500').send('Lỗi hệ thống')
    }
    })
};
