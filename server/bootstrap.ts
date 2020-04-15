const Koa = require('koa')
const app = new Koa();
import router from './router';

app.use(router.routes())
app.listen(3000)