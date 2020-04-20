import createStore from 'unistore';
import connections from '@/dao/connections';
import queries from '@/dao/queries';
import schema from '@/dao/schema';
import tags from '@/dao/tags';

const Store = createStore({
  ...queries.initialState,
  ...schema.initialState,
  ...connections.initialState,
  ...tags.initialState
});

export default Store;
