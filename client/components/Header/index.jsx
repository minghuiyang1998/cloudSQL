import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import withAppStore from '../HOC/withAppStore';
import Dropdown from '../Dropdown';
import style from './index.scss';

@withAppStore
@observer
class Header extends PureComponent {
  render() {
    const { store, action } = this.props || {};
    const { user = {} } = store.user || {};
    const { username = '' } = user || {};
    const menu = <div className="dropdown-item" onClick={action.user.signOut}>Sign out</div>;
    return (
      <header className="header">
        <style jsx>{style}</style>
        <a to="/" className="title">Cloud SQL</a>
        <div className="right-items">
          <span>{username}</span>
          <Dropdown menu={menu} />
        </div>
      </header>
    );
  }
}

export default Header;
