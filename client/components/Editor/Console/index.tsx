import React, { PureComponent } from 'react';
import dayjs from 'dayjs';
import Table from './Table';
import style from './index.scss';
import { genHashID } from '../../../utils/common';
import Execution from './Execution';

const columns = [
  {
    Header: 'Name',
    columns: [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
    ],
  },
  {
    Header: 'Info',
    columns: [
      {
        Header: 'Age',
        accessor: 'age',
        width: 50,
        align: 'right',
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        width: 50,
        align: 'right',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Profile Progress',
        accessor: 'progress',
      },
    ],
  },
];

const data = [];

const TAB_DEFAULT = 'default';
class Console extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: TAB_DEFAULT,
      history: [{
        time: '',
        sql: '',
        status: '',
        rows: 0,
        timeCount: 0,
      }],
      statusList: {},
    };
  }

  formatList = () => {
    const { databse = '', runningList = [] } = this.props || {};
    const _list = runningList.map((sql) => {
      const execId = genHashID();
      return {
        [execId]: {
          execId,
          time: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          databse,
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
    this.setStatus({
      statusList: status,
      current: keys[keys.length - 1],
    });
  }

  refreshStatus = () => {

  }

  renderDefault = () => {
    const { history = [] } = this.state || {};
    console.log('Console -> renderDefault -> history', history);
    return (
      <div>
        <Table columns={columns} data={data} />
      </div>
    );
  }

  render() {
    const { runningList = [] } = this.props || {};
    if (runningList.length) {
      this.formatList();
    }
    const { current = '', statusList = {} } = this.state || {};
    const isDefault = current === TAB_DEFAULT;
    return (
      <div className="console">
        <style jsx>{style}</style>
        <div className="toolbar">header</div>
        <div className="fill">
          { isDefault ? this.renderDefault() : (<Execution info={statusList[current]} refreshStatus={this.refreshStatus} />) }
        </div>
      </div>
    );
  }
}

export default Console;
