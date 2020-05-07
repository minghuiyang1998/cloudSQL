import React, { PureComponent } from 'react';
import { getStore, getAction } from '../../store';

const withAppStore = (WrappedComponent) => class extends PureComponent {
  render() {
    const store = getStore();
    const action = getAction();
    return <WrappedComponent store={store} action={action} {...this.props as P} />;
  }
};

export default withAppStore;
