import React, { PureComponent } from 'react';
import style from './index.scss';
import Loading from '../../../Loading';
import Table from '../Table';
import Select from '../../../Select';
import Modal from '../../../Modal';
import { formatTableData } from '../../../../utils/format';

const Error = ({ msg = '' }) => (<div>{msg}</div>);
const DOWNLOAD_ALLOWED = ['csv', 'Excel', 'Text'];
class Execution extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      selectedData: [],
    };
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

  downloadHandle = (type) => {
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

  getSelectedColumns = (array = []) => {
    this.setState({
      selectedData: array,
    });
  }

  render() {
    const { info = {} } = this.props || {};
    const { status = '', result = [], timeCount = 0, rows = 0, msg = '' } = info || {};
    const { isModalVisible = false } = this.state || {};
    const { columns = [], data = [] } = formatTableData(result) || {};
    return (
      <>
        <Modal title="Generate Chart" width="400" visible={isModalVisible} onClose={this.closeModal}>
          {/* <Charts data={} /> */}
        </Modal>
        <div className="execution">
          <style jsx>{style}</style>
          { status === 'loading' ? <Loading /> : null }
          { status === 'error' ? <Error msg={msg} /> : null }
          <div className="tools">
            <div className="time-count">
              {timeCount}
              <span>seconds</span>
            </div>
            <div className="rows">
              {rows}
              <span>rows</span>
            </div>
            <div className="btn-link mg-l-auto" onClick={this.showModal}>Generate Charts</div>
            <Select width={150} placeHolder="Export File" options={DOWNLOAD_ALLOWED} onChange={this.downloadHandle} />
          </div>
          <div className="flex-fill">
            { data.length ? <Table columns={columns} data={data} getSelectedColumns={this.getSelectedColumns} /> : null }
          </div>
        </div>
      </>
    );
  }
}


export default Execution;
