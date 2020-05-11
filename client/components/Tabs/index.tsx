import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import clsn from 'classnames';
import withAppStore from '../HOC/withAppStore';
import style from './index.scss';
import Panel from './Panel';
import { TAB_EVENT } from '../../utils/event';

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
                <div key={i} className={clsn('tab', { active: i === current })}>
                  {i}
                  <span onClick={() => {}} className="close-btn">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                      <path d="M818.1 872.1c-15.4 0-30.7-5.9-42.4-17.6l-613-612.9c-23.4-23.4-23.4-61.4 0-84.9 23.4-23.4 61.4-23.4 84.9 0l612.9 612.9c23.4 23.4 23.4 61.4 0 84.9a59.914 59.914 0 0 1-42.4 17.6z" fill="currentColor" />
                      <path d="M205.1 872.1c-15.4 0-30.7-5.9-42.4-17.6-23.4-23.4-23.4-61.4 0-84.9l612.9-612.9c23.4-23.4 61.4-23.4 84.9 0 23.4 23.4 23.4 61.4 0 84.9L247.6 854.5c-11.7 11.7-27.1 17.6-42.5 17.6z" fill="currentColor" p-id="2626" />
                      <path d="M818.1 872.1c-15.4 0-30.7-5.9-42.4-17.6l-613-612.9c-23.4-23.4-23.4-61.4 0-84.9 23.4-23.4 61.4-23.4 84.9 0l612.9 612.9c23.4 23.4 23.4 61.4 0 84.9a59.914 59.914 0 0 1-42.4 17.6z" fill="currentColor" p-id="2627" />
                      <path d="M205.1 872.1c-15.4 0-30.7-5.9-42.4-17.6-23.4-23.4-23.4-61.4 0-84.9l612.9-612.9c23.4-23.4 61.4-23.4 84.9 0 23.4 23.4 23.4 61.4 0 84.9L247.6 854.5c-11.7 11.7-27.1 17.6-42.5 17.6z" fill="currentColor" p-id="2628" />
                      <path d="M818.1 872.1c-15.4 0-30.7-5.9-42.4-17.6l-613-612.9c-23.4-23.4-23.4-61.4 0-84.9 23.4-23.4 61.4-23.4 84.9 0l612.9 612.9c23.4 23.4 23.4 61.4 0 84.9a59.914 59.914 0 0 1-42.4 17.6z" fill="currentColor" p-id="2629" />
                      <path d="M205.1 872.1c-15.4 0-30.7-5.9-42.4-17.6-23.4-23.4-23.4-61.4 0-84.9l612.9-612.9c23.4-23.4 61.4-23.4 84.9 0 23.4 23.4 23.4 61.4 0 84.9L247.6 854.5c-11.7 11.7-27.1 17.6-42.5 17.6z" fill="currentColor" p-id="2630" />
                      <path d="M818.1 872.1c-15.4 0-30.7-5.9-42.4-17.6l-613-612.9c-23.4-23.4-23.4-61.4 0-84.9 23.4-23.4 61.4-23.4 84.9 0l612.9 612.9c23.4 23.4 23.4 61.4 0 84.9a59.914 59.914 0 0 1-42.4 17.6z" fill="currentColor" p-id="2631" />
                      <path d="M205.1 872.1c-15.4 0-30.7-5.9-42.4-17.6-23.4-23.4-23.4-61.4 0-84.9l612.9-612.9c23.4-23.4 61.4-23.4 84.9 0 23.4 23.4 23.4 61.4 0 84.9L247.6 854.5c-11.7 11.7-27.1 17.6-42.5 17.6z" fill="currentColor" p-id="2632" />
                    </svg>
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
