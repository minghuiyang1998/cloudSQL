/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import withAppStore from '../HOC/withAppStore';
import style from './index.scss';
import Dropdown from '../Dropdown';
import Loading from '../Loading';
import { testConnection } from '../../dao/connection';

@withAppStore
@observer
class Form extends PureComponent {
  constructor(props) {
    super(props);
    const {
      id = null,
      type = 'MySQL',
      host = '',
      port = '',
      database = '',
      user = '',
      password = '',
    } = this.props || {};

    this.state = {
      isLoading: false,
      status: '',
      id,
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
    this.setState = ({
      isLoading: value,
    });
  }

  getData = () => {
    const {
      type = 'MySQL',
      host = '',
      port = '',
      database = '',
      account = '',
      password = '',
    } = this.state || {};

    return {
      type,
      host,
      port,
      database,
      account,
      password,
    };
  }

  testConnection = async () => {
    this.setLoading(true);
    const data = this.getData();
    const result = await testConnection(data);
    const { msg = '' } = result || {};
    this.setLoading(false);
    this.setState = ({
      status: msg,
    });
  };

  saveConnection = async () => {
    this.setLoading(true);
    const data = this.getData();
    const { id = null } = this.state || {};
    const { action } = this.props || {};
    if (id) {
      const { msg = '' } = await action.user.reviseConnection(data);
      this.setState = ({
        status: msg,
      });
    } else {
      const { msg = '' } = await action.user.newConnection(data);
      this.setState = ({
        status: msg,
      });
    }
    this.setLoading(true);
  };

  render() {
    const { store } = this.props || {};
    const { drivers = [] } = store.app || {};
    const menu = drivers.map((i) => <div key={`dropdown-item-${i.type}`} className="dropdown-item" onClick={() => { this.selectHandle(i.type); }}>{i.type}</div>);
    const { state = {} } = this || {};
    const { type = '', isLoading = false, status = '' } = state || {};
    const driver = drivers.find((i) => i.type === type);
    const { config = [] } = driver || {};
    return (
      <>
        {isLoading ? <Loading /> : (
          <form className="form">
            <style jsx>{style}</style>
            <div className="row">
              <label htmlFor="" required>Type</label>
              <Dropdown icon={<span>{type}</span>} menu={menu} onSelect={this.selectHandle} />
            </div>
            {
              config.map((i) => {
                const { key = '', formType = '', label = '' } = i || {};
                return (
                  <div key={key} className="row">
                    <label htmlFor={key} required>{label}</label>
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
            <div className="btn-group">
              <div className="btn-primary" onClick={this.testConnection}>Test</div>
              <div className="btn-primary" onClick={this.saveConnection}>Connect</div>
            </div>
            { status ? <div>{state}</div> : null }
          </form>
        )}
      </>
    );
  }
}

export default Form;
