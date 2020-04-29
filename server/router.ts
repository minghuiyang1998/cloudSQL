import { controller } from './controller'
import Router from 'koa-router';
const router = new Router();

/**
 * @name auth 
 */
router.post('/node/signup', controller.auth.newUser);
router.post('/node/signin', controller.auth.signIn); 
router.get('/node/signout', controller.auth.signOut);

/**
 * @name home 
 */
router.get('/', async ctx => {
  ctx.body = 'index.html';
});

export default router;

