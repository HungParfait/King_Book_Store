const homePageRouter = require('./home_page');
const categoryRouter = require('./category');
const searchRouter = require('./search');
const pageRouter = require('../app/controllers/PageController')
const listRouter = require('./list');
const loginRouter = require('../app/controllers/Login');
const login = require('../app/controllers/loginEmail')
const signup = require('../app/controllers/SignUp')
const setup = require('../app/controllers/Setup')
const detail = require('../app/controllers/Detail');
const discount = require('../app/controllers/checkOut')
const load = require('../app/controllers/scrollInfinit')
const checkOut = require('../app/Middleware/checkCookie')
const log = require('../app/controllers/logOut');
const order = require('../app/controllers/order')
const multer= require('multer')
const upload = multer()

function route(app) {
    app.get('/home', homePageRouter)

    app.get('/category/:category', categoryRouter)

    app.get('/search/result', searchRouter)

    app.post('/search/result/page', pageRouter.index)

    app.post('/list/:category',listRouter);

    app.post('/login/google-oauth',loginRouter.googleAuth)
    
    app.get('/login/email', login.getMethod)

    app.post('/login/email',login.postMethod)

    app.get('/signup', signup.getMethod)

    app.post('/signup',signup.postMethod)

    app.get('/setup',setup.getMethod)

    app.post('/setup',checkOut.check,setup.postMethod)

    app.get('/books/:_id',detail.path)
    
    app.post('/books/:_id',checkOut.check,detail.add)

    app.put('/books/:_id',checkOut.check,detail.update)

    app.delete('/books/:_id',checkOut.check,detail.delete)

    app.get('/checkout/cart',checkOut.check,discount.checkOut)
    
    app.post('/checkout/cart',checkOut.check,discount.pay)

    app.get('/order',checkOut.check,order.loadHistory)

    app.post('/order',upload.none(),checkOut.check,order.loadComment)
    
    app.post('/infinite/scroll',load.loadInfinite)

    app.post('/logout',log.logOut);

}

module.exports = route;