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
 * @name app-basic
 * @description update userinfos and connect history
 * @output use cookie info return user + history
 */
router.get('/node/app',authenticate, controller.history.getHistory)
/**
 * @name connect-test
 */
router.post('/node/test-connect',authenticate, controller.sql.connectDB)
/**
 * @name DBconnections 
 * @description only modify connection in history
 */
router.post('/node/connection',authenticate, controller.connection.createConnection)// connect and return basic infos
router.put('/node/connection/:cid',authenticate, controller.connection.modifyConnectionInfos)// connect and return basic infos
router.delete('/node/connection/:cid',authenticate, controller.connection.deleteConnection)
/**
 * @name SQL
 * @description all sql operation 
 * @input database info + sql, get all infos
 * @output redult
 */
router.post('/node/sql', authenticate, controller.sql.runSQL)
/**
 * @name app
 */
router.get('/', async ctx => {
  ctx.body = 'index.html';
});

export default router;

