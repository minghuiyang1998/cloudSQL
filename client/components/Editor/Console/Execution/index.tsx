import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import withAppStore from '../HOC/withAppStore';
import style from './index.scss';
import Loading from '../../../Loading';
import Table from '../Table';
import { runSQL } from '../../../../dao/sql';
import Select from '../../../Select';
import Modal from '../../../Modal';

const Error = ({ msg = '' }) => (<div>{msg}</div>);
const DOWNLOAD_ALLOWED = ['csv', 'Excel', 'Text'];

@withAppStore
@observer
class Execution extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      selectData: [],
    };
  }

  componentDidMount() {
    const { info = {}, refreshStatus = () => {}, store = {} } = this.props || {};
    const { connection = {} } = store.app || {};
    const { sql = '', status = '', database = '' } = info || {};
    if (status !== 'loading') return;
    const result = await runSQL({ sql, connectionInfo: { ...connection, database } });
    const { code = '', msg = '', data = [], timeCount = 0 } = result || {};
    let _status = 'complete';
    if (code !== 200) {
      _status = 'error';
    }
    refreshStatus({
      ...info,
      ...{
        status: _status,
        timeCount,
        rows: data.length,
        result: data,
        msg,
      },
    });
  }

  showModal = () => {
    this.setState({
      isModalVisible: true,
    });
  }

  closeModal = () => {
    this.setState({
      isModalVisible: false,
    });
  }

  selectHandle = (type) => {
    switch (type) {
    case 'csv':
      break;
    case 'Excel':
      break;
    case 'Text':
      break;
    default:
      break;
    }
  }

  render() {
    const { info = {} } = this.props || {};
    const { status = '', result = [], timeCount = 0, rows = 0, msg = '' } = info || {};
    const { isModalVisible = false } = this.state || {};
    return (
      <>
        <Modal width="400" visible={isModalVisible} onClose={this.closeModal}>
          {/* <Charts data={} /> */}
        </Modal>
        <div className="execution">
          <style jsx>{style}</style>
          {status === 'loading' ? <Loading /> : null }
          { status === 'error' ? <Error msg={msg} /> : null }
          <div className="tools">
            <span>{timeCount}</span>
            <span>{rows}</span>
            <div className="btn-outline">Charts</div>
            <Select placeHolder="Export File" options={DOWNLOAD_ALLOWED} onChange={this.selectHandle} />
          </div>
          <Table data={result} />
        </div>
      </>
    );
  }
}


export default Execution;
