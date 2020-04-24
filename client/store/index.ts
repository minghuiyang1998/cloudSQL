import { createStore } from 'redux';
import connections from '../dao/connections';
import queries from '../dao/queries';
import schema from '../dao/schema';
import tags from '../dao/tags';

export const store = createStore({
  ...queries.initialState,
  ...schema.initialState,
  ...connections.initialState,
  ...tags.initialState
}, ()=>{});
