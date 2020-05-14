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

    closeTab = (value) => {
      const { store = {}, action = {} } = this.props || {};
      const { selectedSchemas = [] } = store.app || {};
      const { current = '' } = this.state || {};
      action.app.deleteSelectedSchemas(value);
      if (value === current) {
        this.setState({
          current: selectedSchemas[selectedSchemas.length - 2],
        });
      }
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
                <div key={i} className={clsn('tab', { active: i === current })}>
                  <span className="tab-name" onClick={() => { this.tabHandle(i); }}>{i}</span>
                  <span onClick={() => { this.closeTab(i); }} className="close-btn">
                    <CloseIcon />
                  </span>
                </div>
              ))
            }
          </div>
          <div className="flex-fill">
            { current ? <Panel schema={current} func={func} /> : null }
          </div>
        </div>
      );
    }
}

export default Tabs;
