import React, { PureComponent } from 'react';
import clsn from 'classnames';
import { observer } from 'mobx-react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import withAppStore from '../HOC/withAppStore';
import style from './index.scss';
import Tree from '../Tree';
import Modal from '../Modal';
import Form from '../Form';
import { emitTabEvent } from '../../utils/event';
import RefreshIcon from '../../assets/refresh.svg';
import SearchIcon from '../../assets/search.svg';
import {
  TYPE_INS,
  TYPE_SCHEMA,
} from '../Tree/config';


@withAppStore
@observer
class Sidebar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      isModalVisible: false,
      config: {},
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
      config: {},
    });
  }

  setSearch = (value) => {
    this.setState({
      search: value,
    });
  }

  instanceHandle = ({ connection = {} }) => {
    this.setState({
      isModalVisible: true,
      connection,
    });
  }

  refreshHandle = () => {
    const { action = {} } = this.props || {};
    action.app.refreshSchema();
  }

  schemaHandle = (value) => {
    const { action = {} } = this.props || {};
    action.app.addSelectedSchemas(value);
    emitTabEvent({ schema: value });
  }

  render() {
    const { darkTheme = true } = this.props || {};
    const { search = '', isModalVisible = false, config = {} } = this.state || {};
    const { store = {} } = this.props || {};
    const { history = [] } = store.user || {};
    const notLoggedIn = history.map((i) => {
      const { cid = '', host = '', type = '', port = '' } = i || {};
      return {
        key: cid,
        name: (
          <div>
            <ContextMenuTrigger id={cid}>
              <div className="instance">{`${type}: ${host}:${port}`}</div>
            </ContextMenuTrigger>
            <ContextMenu id={cid}>
              <MenuItem data={{ connection: i }} onClick={() => { }}>
                Delete Connection
              </MenuItem>
            </ContextMenu>
          </div>
        ),
        clickHandle: () => { this.instanceHandle({ connection: i }); },
      };
    });

    const { connection = {} } = store.app || {};
    const { cid = '', host = '', type = '', port = '', children = [] } = connection || {};
    let loggedIn = [];
    if (cid) {
      loggedIn = [{
        key: cid,
        name: (
          <div>
            <ContextMenuTrigger id={cid}>
              <div className="instance">{`${type}: ${host}:${port}`}</div>
            </ContextMenuTrigger>
            <ContextMenu id={cid}>
              <MenuItem data={{ connection }} onClick={this.instanceHandle}>
                Edit Connection
              </MenuItem>
              <MenuItem data={{ connection }} onClick={() => {}}>
                Delete Connection
              </MenuItem>
            </ContextMenu>
          </div>
        ),
        type: TYPE_INS,
        children: children.map((i) => ({
          key: i,
          type: TYPE_SCHEMA,
          name: <div className="schema">{i}</div>,
          clickHandle: () => {
            this.schemaHandle(i);
          },
        })),
      }];
    }

    const content = [{
      key: 'Instance not logged in',
      name: 'Instance not logged in',
      children: notLoggedIn,
    }, {
      key: 'logged in instance',
      name: 'logged in instance',
      children: loggedIn,
    }];
    return (
      <>
        <Modal width="400" visible={isModalVisible} onClose={this.closeModal}>
          <Form config={config} onClose={this.closeModal} />
        </Modal>
        <div className={clsn('sidebar', darkTheme ? 'dark' : 'light')}>
          <style jsx>{style}</style>
          <div className="new">
            New Instance
            <span className="plus" onClick={this.showModal}>+</span>
          </div>
          <div className="toolbar">
            <div className="search-wrapper">
              <input className="search" value={search} placeholder="Search schema" onChange={(event) => this.setSearch(event.target.value)} />
              <div className="icon">
                <SearchIcon />
              </div>
            </div>
            <div className="refresh-btn" onClick={this.refreshHandle}>
              <RefreshIcon />
            </div>
          </div>
          <Tree data={content} />
        </div>
      </>
    );
  }
}

export default Sidebar;
