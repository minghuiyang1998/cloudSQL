import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import withAppStore from '../../HOC/withAppStore';

@withAppStore
@observer
class Tabs extends PureComponent {
  render() {
    const { store } = this.props || {};
    const { list, currentTab } = store || {};
    return (
      <div>
        <header>{list.map((i) => <span className="Tab">{i.label}</span>)}</header>
        {currentTab}
      </div>
    );
  }
}

export default Tabs;
