import React, { PureComponent } from 'react';
import style from './index.scss';

class Form extends PureComponent {
  constructor(props) {
    super(props);
    const { inputList = [], formId = 0 } = this.props || {};
    const valueStore = {};
    // name must be lowercase
    inputList.forEach((i) => {
      const { name } = i || {};
      valueStore[name] = '';
    });
    this.state = {
      formId,
      valueStore,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.formId !== prevState.formId) {
      return {
        valueStore: {},
        formId: nextProps.formId,
      };
    }
    return null;
  }

  render() {
    const { inputList = [], children = null, submitBtn = '', onSubmit = () => {}, formId = 0 } = this.props || {};
    const { valueStore = {} } = this.state || {};

    return (
      <form className="form" key={formId}>
        <style jsx>{style}</style>
        {
          inputList.map((i) => {
            const { name, required } = i || {};
            return (
              <div key={name} className="row">
                <label htmlFor={name} required={required}>{name}</label>
                <input
                  type="text"
                  name={name}
                  id={name}
                  autoCapitalize="off"
                  autoCorrect="off"
                  autoComplete="off"
                  value={valueStore[name] || ''}
                  onChange={(event) => {
                    const { value = '' } = event.target;
                    this.setState((prevState) => ({
                      valueStore: {
                        ...prevState.valueStore,
                        [name]: value,
                      },
                    }));
                  }}
                />
              </div>
            );
          })
        }
        <div className="btn-primary" onClick={() => { onSubmit(valueStore); }}>{submitBtn}</div>
        { children }
      </form>
    );
  }
}

export default Form;
