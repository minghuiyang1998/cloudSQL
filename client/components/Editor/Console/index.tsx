import React, { PureComponent } from 'react';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import clsn from 'classnames';
import withAppStore from '../../HOC/withAppStore';
import BasicTable from './BasicTable';
import style from './index.scss';
import { genHashID } from '../../../utils/common';
import { formatTableData } from '../../../utils/format';
import Execution from './Execution';
import { runSQL } from '../../../dao/sql';

const TAB_DEFAULT = 'default';

const formatList = ({ database = '', runningList = [] }) => {
  const _list = runningList.map((sql) => {
    const execId = genHashID();
    return {
      [execId]: {
        execId,
        time: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        database,
        sql,
        status: 'loading',
        rows: 0,
        timeCount: 0,
        result: [],
      },
    };
  });
  let status = {};
  _list.forEach((e) => {
    status = {
      ...status,
      ...e,
    };
  });
  const keys = Object.keys(status);
  return {
    statusList: status,
    current: keys[keys.length - 1],
  };
};

let isRuned = true;

@withAppStore
@observer
class Console extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: TAB_DEFAULT,
      history: [],
      statusList: {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { database = '', runningList = [], setRunning = () => {} } = nextProps || {};
    if (runningList.length) {
      const _formated = formatList({ database, runningList }) || [];
      isRuned = false;
      setRunning({
        isRunning: true,
        runningList: [],
      });
      return {
        ...prevState,
        ..._formated,
      };
    }
    return {
      ...prevState,
    };
  }

  componentDidUpdate() {
    if (!isRuned) {
      const { store = {} } = this.props || {};
      const { connection = {} } = store.app || {};
      const { statusList = [] } = this.state || {};
      Object.keys(statusList).forEach((k) => {
        const info = statusList[k];
        const { sql = '', status = '', database = '' } = info || {};
        if (status !== 'loading') return;
        // order is important, if there is a database in connection don't use tab current replace it
        const { database: defaultDB = '' } = connection || {};
        this.asyncRunSQL({
          sql,
          connection:
          {
            ...connection,
            database: defaultDB || database,
          },
          info,
        });
      });
      isRuned = true;
    }
  }

  asyncRunSQL = async ({ sql = '', connection = {}, info = {} }) => {
    const result = await runSQL({ sql, connection });
    const { code = '', msg = '', data = [], timeCount = 0 } = result || {};
    let _status = 'complete';
    if (code !== 200) {
      _status = 'error';
    }
    this.refreshStatus({
      ...info,
      status: _status,
      timeCount,
      rows: data.length,
      result: data,
      msg,
    });
  }

  refreshStatus = (execution) => {
    const {
      execId = '',
      status = '',
      timeCount = 0,
      rows = 0,
      database = '',
      sql = '',
    } = execution || {};
    this.setState((prevState) => {
      const { statusList = {}, history = [] } = prevState || {};
      const prev = statusList[execId];
      history.unshift({ database, sql, status, timeCount, rows });
      return {
        statusList: {
          ...statusList,
          [execId]: {
            ...prev,
            ...execution,
          },
        },
        history,
      };
    });
    const allComplete = this.checkAllStatus();
    if (allComplete) {
      const { setRunning = () => {} } = this.props || {};
      setRunning({
        isRunning: false,
        runningList: [],
      });
    }
  }

  checkAllStatus = () => {
    const { statusList = {} } = this.state || {};
    const allStatus = Object.keys(statusList).map((k) => k.status);
    const allComplete = allStatus.every((s) => s !== 'loading');
    return allComplete;
  }

  renderDefault = () => {
    const { history = [] } = this.state || {};
    const { columns = [], data = [] } = formatTableData(history) || {};
    if (!history.length) return null;
    return (<BasicTable columns={columns} data={data} />);
  }

  tabHandle = (id = '') => {
    if (!id) return;
    this.setState({
      current: id,
    });
  }

  render() {
    const { current = '', statusList = {} } = this.state || {};
    const isDefault = current === TAB_DEFAULT;
    const tabs = Object.keys(statusList).map((k) => {
      const info = statusList[k];
      const { execId = '' } = info || {};
      return {
        label: 'execution',
        id: execId,
      };
    });
    return (
      <div className="console">
        <style jsx>{style}</style>
        <div className="executions">
          {
            [{ label: 'Execution History', id: TAB_DEFAULT }, ...tabs].map((i) => <div key={i.id} className={clsn('tab', { active: current === i.id })} onClick={() => { this.tabHandle(i.id); }}>{i.label}</div>)
          }
        </div>
        <div className="fill">
          { isDefault ? this.renderDefault() : (<Execution info={statusList[current]} />) }
        </div>
      </div>
    );
  }
}

export default Console;
