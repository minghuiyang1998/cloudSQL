import React, { PureComponent } from 'react';
import clsn from 'classnames';
import style from './index.scss';

const DEFAULT_ICON = <img alt="" src="" />;

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
    const { icon = DEFAULT_ICON, menu, withArrow = true } = this.props || {};
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
          {withArrow ? (
            <svg className="arrow-down" viewBox="64 64 896 896" focusable="false" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
              <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" />
            </svg>
          ) : null}
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
