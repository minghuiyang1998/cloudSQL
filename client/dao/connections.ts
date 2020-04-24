import * as localforage from 'localforage';
import Message from '../utils/message';
import { request } from '../utils/request';

export const postConnectingClient = connectionId => {
  const json = await request('POST', '/api/connection-clients', { connectionId });
  return json;
};

export const putConnectingClient = () => {
  if (json.error) {
    return Message.error('Problem connecting to database');
  }

  // Poll connection-clients api to keep it alive
  const connectionClientInterval = setInterval(async () => {
    const updateJson = await request(
      'PUT',
      `/api/connection-clients/${json.connectionClient.id}`
    );

    // Not sure if this should message user here
    // In the event of an error this could get really noisy
    if (updateJson.error) {
      Message.error(updateJson.error);
    }

    // If the PUT didn't return a connectionClient object,
    // the connectionClient has been disconnected
    if (!updateJson.connectionClient && connectionClientInterval) {
      clearInterval(connectionClientInterval);
      store.setState({
        connectionClientInterval: null,
        connectionClient: null
      });
    } else {
      store.setState({
        connectionClient: updateJson.connectionClient
      });
    }
  }, 10000);

  return { connectionClient: json.connectionClient, connectionClientInterval };
};

export const disconnectConnectionClient = async state => {
  const { connectionClient, connectionClientInterval } = state;
  if (connectionClientInterval) {
    clearInterval(connectionClientInterval);
  }
  if (connectionClient) {
    request('DELETE', `/api/connection-clients/${connectionClient.id}`).then(
      json => {
        if (json.error) {
          Message.error(json.error);
        }
      }
    );
  }
  return { connectionClient: null, connectionClientInterval: null };
};

/**
 * Select connection and disconnect connectionClient if it exists
 * @param {*} state
 * @param {*} selectedConnectionId
 */
export const selectConnectionId = (state, selectedConnectionId) => {
  const { connectionClient, connectionClientInterval } = state;
  localforage
    .setItem('selectedConnectionId', selectedConnectionId)
    .catch(error => Message.error(error));

  if (connectionClient) {
    request('DELETE', `/api/connection-clients/${connectionClient.id}`).then(
      json => {
        if (json.error) {
          Message.error(json.error);
        }
      }
    );
  }

  if (connectionClientInterval) {
    clearInterval(connectionClientInterval);
  }

  return {
    selectedConnectionId,
    connectionClient: null,
    connectionClientInterval: null
  };
};

export const deleteConnection = async (state, connectionId) => {
  const { connections } = state;
  const json = await request('DELETE', `/api/connections/${ connectionId}`);
  if (json.error) {
    return Message.error('Delete failed');
  }
  const filtered = connections.filter(c => c._id !== connectionId);
  return { connections: sortConnections(filtered) };
};

// Updates store (is not resonponsible for API call)
export const addUpdateConnection = async (state, connection) => {
  const { connections } = state;
  const found = connections.find(c => c._id === connection._id);
  if (found) {
    const mappedConnections = connections.map(c => {
      if (c._id === connection._id) {
        return connection;
      }
      return c;
    });
    return { connections: sortConnections(mappedConnections) };
  }
  return { connections: sortConnections([connection].concat(connections)) };
};

export const loadConnections = store => async (state, force) => {
  const { connections, connectionsLoading, connectionsLastUpdated } = state;
  if (connectionsLoading) {
    return;
  }

  if (
    force ||
    !connections.length ||
    (connectionsLastUpdated &&
      new Date() - connectionsLastUpdated > ONE_HOUR_MS)
  ) {
    store.setState({ connectionsLoading: true });
    const { error, connections } = await request('GET', '/api/connections/');
    if (error) {
      Message.error(error);
    }
    const update = {
      connectionsLoading: false,
      connectionsLastUpdated: new Date(),
      connections: sortConnections(connections)
    };

    if (connections && connections.length === 1) {
      update.selectedConnectionId = connections[0]._id;
    }

    store.setState(update);
  }
};

export default {
  initialState,
  selectConnectionId,
  deleteConnection,
  addUpdateConnection,
  loadConnections
};
