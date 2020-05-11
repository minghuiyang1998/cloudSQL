import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import withAppStore from '../../HOC/withAppStore';
import style from './index.scss';
import Editor from './Editor';

@withAppStore
@observer
class Panel extends PureComponent {
  render() {
    const { store = {} } = this.props || {};
    const { connection = {} } = store.app || {};
    const { host = '', type = '', port = '' } = connection || {};
    const { schema = '', func = '' } = this.props || {};
    return (
      <div className="panel">
        <style jsx>{style}</style>
        { host ? <div className="panel-header">{`${type}: ${host}:${port}`}</div> : null }
        { func === 'sql' ? <Editor current={schema} /> : null}
      </div>
    );
  }
}

export default Panel;
