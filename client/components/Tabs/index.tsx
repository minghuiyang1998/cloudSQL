import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import clsn from 'classnames';
import withAppStore from '../HOC/withAppStore';
import style from './index.scss';
import Panel from '../Panel';
import { TAB_EVENT } from '../../utils/event';
import CloseIcon from '../../assets/close.svg';

@withAppStore
@observer
class Tabs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: '',
      func: 'sql',
    };
  }

  componentDidMount() {
    document.addEventListener(TAB_EVENT, (e) => {
      const { detail = {} } = e || {};
      const { schema = '', type = 'sql' } = detail || {};
      this.setState({
        current: schema,
        func: type,
      });
    });
  }

    tabHandle = (value) => {
      this.setState({
        current: value,
      });
    }

    render() {
      const { store = {} } = this.props || {};
      const { selectedSchemas = [] } = store.app || {};
      const { current = '', func = '' } = this.state || {};
      return (
        <div className="tabs-container">
          <style jsx>{style}</style>
          <div className="tabs">
            {
              selectedSchemas.map((i) => (
                <div key={i} className={clsn('tab', { active: i === current })} onClick={() => { this.tabHandle(i); }}>
                  <span className="tab-name">{i}</span>
                  <span onClick={() => {}} className="close-btn">
                    <CloseIcon />
                  </span>
                </div>
              ))
            }
          </div>
          <div className="fill">
            { current ? <Panel schema={current} func={func} /> : null }
          </div>
        </div>
      );
    }
}

export default Tabs;
