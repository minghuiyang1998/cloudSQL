import Router from 'koa-router';
import { controller } from './controller';
import { authenticate } from './middleware/authenticate';

const router = new Router();

/**
 * @name auth
 */
router.post('/node/signup', controller.auth.newUser);
router.post('/node/signin', controller.auth.signIn);
router.get('/node/userinfo', authenticate, controller.auth.getUserInfo);
router.get('/node/signout', authenticate, controller.auth.signOut);
/**
 * @name DBconnections
 * @description only modify connection in history
 */
router.get('/node/history', authenticate, controller.connection.getHistory);
router.post('/node/connection', authenticate, controller.connection.createConnection);
router.put('/node/connection/:cid', authenticate, controller.connection.modifyConnectionInfos);
router.delete('/node/connection/:cid', authenticate, controller.connection.deleteConnection);
/**
 * @name SQL
 * @description all sql operation
 * @input database info + sql, get all infos
 * @output redult
 */
router.post('/node/test-connect', authenticate, controller.sql.connectDB);
router.post('/node/schemainfos', controller.sql.getUserInfo);
router.post('/node/sql', controller.sql.runSQL);
router.get('/node/drivers', controller.sql.getDrivers);

export default router;
