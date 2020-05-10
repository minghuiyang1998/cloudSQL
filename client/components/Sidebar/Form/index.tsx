/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent } from 'react';
import style from './index.scss';
import Dropdown from '../../Dropdown';

const DB_TYPE_CONFIG = [
  {
    type: 'MySQL',
    list: ['host', 'port', 'account', 'password'],
  },
  {
    type: 'Postgre',
    list: ['host', 'port', 'database', 'account', 'password'],
  },
];

class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: 'MySQL',
      host: '',
      port: '',
      databse: '',
      account: '',
      password: '',
    };
  }

  selectHandle = (value) => {
    this.setState({
      type: value,
    });
  }

  render() {
    const menu = DB_TYPE_CONFIG.map((i) => <div className="dropdown-item" onClick={() => { this.selectHandle(i.type); }}>{i.type}</div>);
    const { state = {} } = this || {};
    const { type = '' } = state || {};
    const config = DB_TYPE_CONFIG.find((i) => i.type === type);
    const { list = [] } = config || {};
    return (
      <form className="form">
        <style jsx>{style}</style>
        <div className="row">
          <label htmlFor="" required>Type</label>
          <Dropdown icon={<span>{type}</span>} menu={menu} onSelect={this.selectHandle} />
        </div>
        {
          list.map((name) => (
            <div key={name} className="row">
              <label htmlFor={name} required>{name}</label>
              <input
                type="text"
                name={name}
                id={name}
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                value={state[name] || ''}
                onChange={(event) => {
                  const { value = '' } = event.target;
                  this.setState({
                    [name]: value,
                  });
                }}
              />
            </div>
          ))
        }
        <div className="btn-group">
          <div className="btn-primary" onClick={() => { }}>Test</div>
          <div className="btn-primary" onClick={() => { }}>Connect</div>
        </div>
      </form>
    );
  }
}

export default Form;
