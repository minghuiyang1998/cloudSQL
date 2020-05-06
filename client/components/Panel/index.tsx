import React, { PureComponent } from 'react';
import style from './index.scss';

class Panel extends PureComponent {
  render() {
    return (
      <div>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default Panel;
