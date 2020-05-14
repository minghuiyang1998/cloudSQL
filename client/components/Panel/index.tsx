import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import withAppStore from '../HOC/withAppStore';
import style from './index.scss';
import Editor from '../Editor';
import Modal from '../Modal';
import Form from '../Form';
import * as Message from '../Message';

@withAppStore
@observer
class Panel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }

  componentDidUpdate() {
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

  render() {
    const { loadingId = {} } = this.props || {};
    if (Object.keys(loadingId).length) {
      Message.endLoading(loadingId);
      console.log(Date.now());
    }
    const { store = {} } = this.props || {};
    const { connection = {} } = store.app || {};
    const { host = '', type = '', port = '' } = connection || {};
    const { schema = '', func = '' } = this.props || {};
    const { isModalVisible = false } = this.state || {};

    return (
      <>
        <Modal width="400" visible={isModalVisible} onClose={this.closeModal}>
          <Form config={connection} onClose={this.closeModal} />
        </Modal>
        <div className="panel">
          <style jsx>{style}</style>
          { host ? (
            <div className="panel-header">
              <span>{`${type}: ${host}:${port}`}</span>
              <div className="btn-link mg-l-auto" onClick={this.showModal}>Edit Connection</div>
              /
              <div className="btn-link" onClick={this.showModal}>Change account</div>
            </div>
          ) : null }
          { func === 'sql' ? <Editor current={schema} /> : null}
        </div>
      </>
    );
  }
}

export default Panel;
