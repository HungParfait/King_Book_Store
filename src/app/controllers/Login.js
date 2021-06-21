const Google_user = require('../models/google_users');
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('27989214340-o51ss69m1hgdsb6qcamnaocuh08mssfq.apps.googleusercontent.com');

module.exports.googleAuth = function (req, res) {
    const { idtoken } = req.body;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: idtoken,
            audience: '27989214340-o51ss69m1hgdsb6qcamnaocuh08mssfq.apps.googleusercontent.com',
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        Google_user.findOne({ id: userid }, async function (err, user) {
            if (!err) {
                if (!user) {
                    const newUser = new Google_user({
                        name: {
                            first_name: payload.given_name,
                            last_name: payload.family_name
                        },
                        email: payload.email,
                        id: payload.sub,
                        user_name: payload.name
                    })
                    await newUser.save();
                    const token = jwt.sign({ _id: newUser._id, username: newUser.user_name }, 'duchung-email', { expiresIn: '2h' });
                    res.cookie('c_user',token, {httpOnly: true, secure: true})
                    res.status('200').end();
                }
                else {
                    const token = jwt.sign({ _id: user._id, username: user.user_name }, 'duchung-email', { expiresIn: '2h' });
                    res.cookie('c_user',token, {httpOnly: true, secure: true})
                    res.status('200').end();
                }
            }
        })
    }
    verify().catch(console.error);
}

