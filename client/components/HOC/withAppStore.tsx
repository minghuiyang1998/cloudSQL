import React, { PureComponent } from 'react';
import { AppState, getStore } from '../../store'

type Props = {
    store: AppState
}

export const withAppStore = <P extends Props>(WrappedComponent: React.ComponentType<P> ) => {
    return class extends PureComponent<Props> {
        render() {
            const store = getStore()
            return <WrappedComponent store={store} {...this.props as P} />
        }
    }
}
