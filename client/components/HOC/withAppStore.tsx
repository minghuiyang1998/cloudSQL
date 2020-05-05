import React, { PureComponent } from 'React';
import { getStore } from '../../store'
export const withAppStore = <P extends Object>(WrappedComponent: React.ComponentType<P> ) => {
    return class extends PureComponent<P> {
        render() {
            const store = getStore()
            console.log("extends -> render -> store", store)
            return <WrappedComponent store={store} {...this.props} />
        }
    }
}
