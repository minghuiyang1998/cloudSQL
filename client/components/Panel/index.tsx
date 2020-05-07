import React, { PureComponent } from 'react';
import style from './index.scss';
import Toolbar from './Toolbar';
import Tabs from './Tabs';

class Panel extends PureComponent {
  render() {
    return (
      <div>
        <style jsx>{style}</style>
        {/* <Toolbar />
        <Tabs /> */}
      </div>
    );
  }
}

export default Panel;
