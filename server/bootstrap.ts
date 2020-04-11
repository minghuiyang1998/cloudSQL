import '@babel/polyfill';
const Koa = require('koa')
import nextApp from './nextApp';

nextApp
    .prepare()
    .then(() => {
        const app = new (Koa as any)({
            root: process.cwd(),
            router: {
                sensitive: true,
            },
        });
        app.proxy = true;
        app.load(process.cwd()).listen(process.env.PORT || 3000);
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
