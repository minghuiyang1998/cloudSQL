import React, { PureComponent } from 'react';
import clsn from 'classnames';
import style from './index.scss';
import ArrowDown from '../../assets/arrow_down.svg';

// const DEFAULT_ICON = <img alt="" src="" />;

class Dropdown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    };
  }

  onHover = () => {
    this.setState({
      isHover: true,
    });
  }

  onOut = () => {
    this.setState({
      isHover: false,
    });
  }

  render() {
    const { isHover = false } = this.state || {};
    const { icon = '', menu, withArrow = true } = this.props || {};
    return (
      <div
        className={clsn('dropdown')}
        onMouseOver={this.onHover}
        onFocus={this.onHover}
        onMouseOut={this.onOut}
        onBlur={this.onOut}
      >
        <style jsx>{style}</style>
        <div className="summary">
          {icon}
          {withArrow ? <ArrowDown /> : null}
        </div>
        <div
          className={clsn('main', { spread: isHover })}
          onMouseOver={this.onHover}
          onFocus={this.onHover}
          onMouseOut={this.onOut}
          onBlur={this.onOut}
        >
          {menu}
        </div>
      </div>
    );
  }
}

export default Dropdown;
