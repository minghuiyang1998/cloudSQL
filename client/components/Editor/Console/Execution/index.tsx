import React, { PureComponent } from 'react';
import { ExportToCsv } from 'export-to-csv';
import { saveAs } from 'file-saver';
import ReactJson from 'react-json-view';
import style from './index.scss';
import Loading from '../../../Loading';
import Table from '../Table';
import Select from '../../../Select';
import Modal from '../../../Modal';
import Chart from '../../../Chart';
import { formatTableData } from '../../../../utils/format';
import Error from '../../../Error';
import * as Message from '../../../Message';
import SearchIcon from '../../../../assets/search.svg';

const D_CSV = 'csv';
const D_JSON = 'json';
const DOWNLOAD_ALLOWED = [D_CSV, D_JSON];

class Execution extends PureComponent {
  selectedData = []

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      search: '',
    };
  }

  setSearch = (value) => {
    this.setState({
      search: value,
    });
  }

  filterResult = (key, array) => {
    if (!key) return array;
    const result = array.filter((i) => {
      const str = Object.values(i).join('______').toLowerCase();
      return str.search(key.toLowerCase()) >= 0;
    });
    return result;
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
    const data = this.selectedData || [];
    if (!data.length) {
      Message.error({ content: 'Please select data !' });
      return;
    }
    let content = '';
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    const json = JSON.stringify(data);
    switch (type) {
    case D_CSV:
      content = csvExporter.generateCsv(data);
      break;
    case D_JSON:
      content = new Blob([json], { type: 'text/plain;charset=utf-8' });
      saveAs(content, 'data.json');
      break;
    default:
      break;
    }
  }

  getSelectedColumns = (array = []) => {
    this.selectedData = array;
  }

  render() {
    const { info = {}, isNoSQL = false } = this.props || {};
    const { status = '', result = [], timeCount = 0, rows = 0, msg = '' } = info || {};
    const { isModalVisible = false, search = '' } = this.state || {};
    const _result = this.filterResult(search, result);
    const { columns = [], data = [] } = formatTableData(_result) || {};
    return (
      <>
        <Modal title="Generate Chart" width="800" visible={isModalVisible} onClose={this.closeModal}>
          <Chart getData={() => this.selectedData} />
        </Modal>
        <div className="execution">
          <style jsx>{style}</style>
          { status === 'loading' ? <Loading /> : null }
          { status === 'error' ? <Error msg={msg} /> : null }
          {
            isNoSQL ? (
              <>
                <div className="tools">
                  <div className="time-count">
                    {timeCount}
                    <span>seconds</span>
                  </div>
                  <div className="rows">
                    {rows}
                    <span>rows</span>
                  </div>
                  <div className="search-wrapper">
                    <input className="search" value={search} placeholder="Search schema" onChange={(event) => this.setSearch(event.target.value)} />
                    <div className="icon">
                      <SearchIcon />
                    </div>
                  </div>
                  <div className="btn-link mg-l-auto" onClick={this.showModal}>Generate Charts</div>
                  <Select width={150} placeHolder="Export File" options={DOWNLOAD_ALLOWED} onChange={this.downloadHandle} />
                </div>
                <div className="flex-fill">
                  { data && data.length ? <Table columns={columns} data={data} getSelectedColumns={this.getSelectedColumns} /> : null }
                </div>
              </>
            ) : (
              <>
                <div className="tools">
                  <div className="time-count">
                    {timeCount}
                    <span>seconds</span>
                  </div>
                  <div className="rows">
                    {rows}
                    <span>rows</span>
                  </div>
                  <Select width={150} placeHolder="Export File" options={[JSON]} onChange={this.downloadHandle} />
                </div>
                <div className="flex-fill">
                  <ReactJson src={{}} theme="rjv-default" />
                </div>
              </>
            )
          }
        </div>
      </>
    );
  }
}


export default Execution;
