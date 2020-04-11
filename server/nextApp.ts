import * as path from 'path';
import next from 'next';
import { isDev } from './utils/index';

const app = next({
    dir: path.join(__dirname, '../client'),
    dev: isDev(),
});
export const handle = app.getRequestHandler();

export default app;
