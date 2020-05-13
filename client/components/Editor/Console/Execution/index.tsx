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
          { status === 'loading' ? <Loading /> : null }
          { status === 'error' ? <Error msg={msg} /> : null }
          <div className="tools">
            <span>{timeCount}</span>
            <span>{rows}</span>
            <div className="btn-outline">Charts</div>
            <Select width={100} placeHolder="Export File" options={DOWNLOAD_ALLOWED} onChange={this.downloadHandle} />
          </div>
          {/* <Table data={result} /> */}
        </div>
      </>
    );
  }
}


export default Execution;
