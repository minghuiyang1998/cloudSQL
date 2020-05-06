import React, { PureComponent } from "react";
// eslint-disable-next-line no-unused-vars
import { AppState, getStore } from "../../store";

type Props = {
  store: AppState
}

const withAppStore = <P extends Props>(WrappedComponent: React.ComponentType<P>) => class extends PureComponent<Props> {
  render() {
    const store = getStore();
    return <WrappedComponent store={store} {...this.props as P} />;
  }
};

export default withAppStore;
