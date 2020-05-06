import React, { PureComponent } from 'react';
import clsn from 'classnames';
import style from './index.scss';

class Sidebar extends PureComponent {
  render() {
    const { darkTheme = true } = this.props || {};
    return (
      <div className={clsn('sidebar', darkTheme ? 'dark' : 'light')}>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default Sidebar;
