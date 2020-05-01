import { controller } from './controller'
import Router from 'koa-router';
import { authenticate } from './middleware/authenticate'
const router = new Router();

/**
 * @name auth 
 */
router.post('/node/signup', controller.auth.newUser);
router.post('/node/signin', controller.auth.signIn); 
router.get('/node/signout', authenticate, controller.auth.signOut);

/**
 * @name connections 
 */
router.post('/node/connection',authenticate, controller.connection.createConnection)
router.get('/node/connection/:id',authenticate, controller.connection.getConnectionInfos)
router.put('/node/connection/:id',authenticate, controller.connection.modifyConnectionInfos)
router.delete('/node/connection/:id',authenticate, controller.connection.deleteConnection)

/**
 * @name history 
 */
router.get('/node/history',authenticate, controller.connection.getAllConnections)

/**
 *lConnections
 */
router.get('/', async ctx => {
  ctx.body = 'index.html';
});

export default router;

