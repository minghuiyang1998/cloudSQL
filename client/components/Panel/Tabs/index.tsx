import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import withAppStore from '../../HOC/withAppStore';

@withAppStore
@observer
class Tabs extends PureComponent {
   current = 0;

  renderDOM = () => {
    const { list = [] } = this.state || {};
    const item = list.find((i) => i.id === this.current);
    return item.component;
  }

  render() {
    const { store } = this.props || {};
    const { list } = store || {};
    return (
      <div>
        <header>{list.map((i) => <span className="Tab">{i.label}</span>)}</header>
        {this.renderDOM()}
      </div>
    );
  }
}

export default Tabs;
