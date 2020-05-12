import React, { PureComponent } from 'react';
import ArrowDown from '../../assets/arrow_down.svg';
import ArrowRight from '../../assets/arrow_right.svg';
import SchemaIcon from '../../assets/schema.svg';
import TableIcon from '../../assets/table.svg';
import ColIcon from '../../assets/col.svg';
import {
  TYPE_COL,
  TYPE_TABLE,
  TYPE_SCHEMA,
} from './config';


class Branch extends PureComponent {
  count = 0;

  constructor(props) {
    super(props);
    this.state = {
      isSpread: false,
    };
  }

  renderTypeIcon = (type) => {
    let icon = null;
    switch (type) {
    case TYPE_SCHEMA:
      icon = <SchemaIcon />;
      break;
    case TYPE_TABLE:
      icon = <TableIcon />;
      break;
    case TYPE_COL:
      icon = <ColIcon />;
      break;
    default:
      break;
    }
    return icon;
  }

  renderStateIcon = () => {
    const { isSpread = false } = this.state || {};
    let icon = <ArrowRight />;
    if (isSpread) {
      icon = <ArrowDown />;
    }
    return icon;
  }

  spreadHandle = () => {
    const { isSpread = false } = this.state || {};
    this.setState({
      isSpread: !isSpread,
    });
  }

  // ondoubleclick: 生成sql， 有children单击spread， 无使用传入instance， 右键打开菜单
  render() {
    const { name = '', children = null, iconType = '', clickHandle = () => {}, doubleClickEvent = null } = this.props || {};
    const { isSpread = false } = this.state || {};
    let clickEvent = children ? this.spreadHandle : clickHandle;
    const handleClick = (single = () => {}, double = () => {}) => () => {
      this.count += 1;
      setTimeout(() => {
        if (this.count === 1) {
          single();
          this.count = 0;
        } else if (this.count > 1) {
          double();
          this.count = 0;
        }
        this.count = 0;
      }, 150);
    };
    if (doubleClickEvent) {
      clickEvent = handleClick(clickEvent, doubleClickEvent);
    }
    return (
      <div className="branch">
        <div onClick={clickEvent} onDoubleClick={doubleClickEvent ? clickEvent : null} className={`branch-title ${iconType}`}>
          {!iconType ? this.renderStateIcon() : null}
          {this.renderTypeIcon(iconType)}
          <div className="name-wrapper">
            {name}
          </div>
        </div>
        {
          children ? (
            <div className="children" style={{ height: isSpread ? 'auto' : 0 }}>
              {children}
            </div>
          ) : null
        }
      </div>
    );
  }
}

export default Branch;
