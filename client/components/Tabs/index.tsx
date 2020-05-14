import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import clsn from 'classnames';
import withAppStore from '../HOC/withAppStore';
import style from './index.scss';
import Panel from '../Panel';
import { TAB_EVENT } from '../../utils/event';
import CloseIcon from '../../assets/close.svg';
import * as Message from '../Message';

@withAppStore
@observer
class Tabs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: '',
      clist: [],
    };
  }

  componentDidMount() {
    document.addEventListener(TAB_EVENT, (e) => {
      const { detail = {} } = e || {};
      const { schema = '', loadingId = { lid: '' }, type = 'sql' } = detail || {};
      const { clist = [] } = this.state || {};
      const index = clist.findIndex((i) => i.name === schema);
      if (index === -1) {
        clist.push({
          name: schema,
          component: <Panel schema={schema} loadingId={loadingId} func={type} />,
        });
      } else {
        Message.endLoading(loadingId);
      }
      this.setState({
        current: schema,
        clist,
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
      const { current = '', clist = [] } = this.state || {};
      action.app.deleteSelectedSchemas(value);
      const index = clist.findIndex((i) => i.name === value);
      if (index !== -1) {
        clist.splice(index, 1);
      }
      if (value === current) {
        this.setState({
          current: selectedSchemas[selectedSchemas.length - 2],
          clist,
        });
      }
    }

    render() {
      const { store = {} } = this.props || {};
      const { selectedSchemas = [] } = store.app || {};
      const { current = '', clist = [] } = this.state || {};
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
            {
              clist.map((i) => {
                const { name = '', component = null } = i || {};
                return (
                  <div key={name} className={clsn('panel-wrapper', { active: current === name })}>
                    {component}
                  </div>
                );
              })
            }
          </div>
        </div>
      );
    }
}

export default Tabs;
