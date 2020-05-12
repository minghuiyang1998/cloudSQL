/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import Select from '../Select';
import withAppStore from '../HOC/withAppStore';
import style from './index.scss';
import Loading from '../Loading';
import { testConnection } from '../../dao/connection';

@withAppStore
@observer
class Form extends PureComponent {
  constructor(props) {
    super(props);
    const { config = {} } = this.props || {};
    const {
      cid = null,
      type = 'MySQL',
      host = '',
      port = '',
      database = '',
      user = '',
      password = '',
    } = config || {};

    this.state = {
      isLoading: false,
      status: '',
      cid,
      type,
      host,
      port,
      database,
      user,
      password,
    };
  }

  componentDidMount() {
    const { action } = this.props || {};
    action.app.drivers();
  }

  selectHandle = (value) => {
    this.setState({
      type: value,
    });
  }

  setLoading = (value) => {
    this.setState({
      isLoading: value,
    });
  }

  getData = () => {
    const {
      cid = '',
      type = 'MySQL',
      host = '',
      port = '',
      database = '',
      user = '',
      password = '',
    } = this.state || {};

    return {
      cid,
      type,
      host,
      port,
      database,
      user,
      password,
    };
  }

  testConnection = async () => {
    this.setLoading(true);
    const data = this.getData();
    const result = await testConnection(data);
    const { msg = '' } = result || {};
    this.setLoading(false);
    this.setState({
      status: msg,
    });
  };

  saveConnection = async () => {
    this.setLoading(true);
    const data = this.getData();
    const { cid = null } = this.state || {};
    const { action, onClose = () => {} } = this.props || {};
    if (cid) {
      const { code = 0, msg = '' } = await action.user.reviseConnection(data);
      this.setState({
        status: msg,
      });
      this.setLoading(false);
      if (code === 200) {
        onClose();
      }
    } else {
      const { code = 0, msg = '' } = await action.user.newConnection(data);
      this.setState({
        status: msg,
      });
      this.setLoading(false);
      if (code === 200) {
        onClose();
      }
    }
  };

  render() {
    const { store, onClose = () => {} } = this.props || {};
    const { drivers = [] } = store.app || {};
    const menu = drivers.map((i) => i.type);
    const { state = {} } = this || {};
    const { type = '', isLoading = false, status = '' } = state || {};
    const driver = drivers.find((i) => i.type === type);
    const { config = [] } = driver || {};
    return (
      <form className="form">
        { isLoading ? <Loading /> : null }
        <style jsx>{style}</style>
        <div className="row">
          <label htmlFor="" required>Type</label>
          <Select defaultValue={type} options={menu} onChange={this.selectHandle} />
        </div>
        {
          config.map((i) => {
            const { key = '', formType = '', label = '' } = i || {};
            return (
              <div key={key} className="row">
                <label htmlFor={key} required>{key}</label>
                <input
                  type={formType}
                  name={key}
                  id={key}
                  autoCapitalize="off"
                  autoCorrect="off"
                  autoComplete="off"
                  value={state[key] || ''}
                  onChange={(event) => {
                    const { value = '' } = event.target;
                    this.setState({
                      [key]: value,
                    });
                  }}
                />
              </div>
            );
          })
        }
        { status ? <div className="error">{status}</div> : null }
        <div className="btn-group">
          <div className="btn-outline" onClick={this.testConnection}>Test</div>
          <div className="btn-primary mg-l-auto" onClick={this.saveConnection}>Connect</div>
          <div className="btn-outline" onClick={onClose}>Cancel</div>
        </div>
      </form>
    );
  }
}

export default Form;
