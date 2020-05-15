import React, { PureComponent } from 'react';
import clsn from 'classnames';
import { observer } from 'mobx-react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import withAppStore from '../HOC/withAppStore';
import style from './index.scss';
import Tree from '../Tree';
import Modal from '../Modal';
import Form from '../Form';
import { NEW_TAB_EVENT, emitEvent } from '../../utils/event';
import RefreshIcon from '../../assets/refresh.svg';
import SearchIcon from '../../assets/search.svg';
import {
  TYPE_INS,
  TYPE_SCHEMA,
} from '../Tree/config';
import * as Message from '../Message';

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
      config: connection,
    });
  }

  refreshHandle = () => {
    const { action = {} } = this.props || {};
    action.app.refreshSchema();
    action.user.getHistory();
  }

  schemaHandle = (value) => {
    const _loadingItem = Message.startLoading();
    console.log(Date.now());
    setTimeout(() => {
      const { action = {} } = this.props || {};
      action.app.addSelectedSchemas(value);
      emitEvent(NEW_TAB_EVENT, { schema: value, loadingId: _loadingItem });
    }, 0);
  }

  render() {
    const { darkTheme = true } = this.props || {};
    const { search = '', isModalVisible = false, config = {} } = this.state || {};
    const { store = {}, action = {} } = this.props || {};
    const { history = [] } = store.user || {};
    const notLoggedIn = history.map((i) => {
      const { cid = '', host = '', type = '', port = '' } = i || {};
      return {
        key: cid,
        name: (
          <>
            <ContextMenuTrigger id={cid}>
              <div className="instance">{`${type}: ${host}:${port}`}</div>
            </ContextMenuTrigger>
            <ContextMenu id={cid}>
              <MenuItem data={{ connection: i }} onClick={(event) => { event.stopPropagation(); action.user.deleteInstance(i); }}>
                Delete Connection
              </MenuItem>
            </ContextMenu>
          </>
        ),
        type: TYPE_INS,
        clickHandle: () => { this.instanceHandle({ connection: i }); },
      };
    });

    const { connection = {} } = store.app || {};
    const { cid = '', host = '', type = '', port = '', children = [] } = connection || {};
    let loggedIn = [];
    if (cid) {
      loggedIn = [{
        key: cid,
        type: TYPE_INS,
        name: (
          <>
            <ContextMenuTrigger id={cid}>
              <div className="instance">{`${type}: ${host}:${port}`}</div>
            </ContextMenuTrigger>
            <ContextMenu id={cid}>
              <MenuItem data={{ connection }} onClick={(event) => { event.stopPropagation(); this.instanceHandle({ connection }); }}>
                Edit Connection
              </MenuItem>
              <MenuItem data={{ connection }} onClick={(event) => { event.stopPropagation(); action.user.deleteInstance(connection); }}>
                Delete Connection
              </MenuItem>
            </ContextMenu>
          </>
        ),
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
      name: `Instance not logged in(${notLoggedIn.length})`,
      children: notLoggedIn,
    }, {
      key: 'logged in instance',
      name: `logged in instance(${loggedIn.length})`,
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
          <Tree data={content} unique="sidebar" backgroundColor="#252526" />
        </div>
      </>
    );
  }
}

export default Sidebar;
