import React, { PureComponent } from 'react';
import serialize from 'form-serialize';
import style from './index.scss';

class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  render() {
    const { inputList = [], children = null, submitBtn = '', onSubmit = () => {} } = this.props || {};

    let data = {};
    if (this.formRef) {
      const $form = this.formRef;
      data = serialize($form, { hash: true });
    }

    return (
      <form className="form" ref={this.formRef}>
        <style jsx>{style}</style>
        {
          inputList.map((i) => {
            const { name, required } = i || {};
            return (
              <div key={name} className="row">
                <label htmlFor={name} required={required}>{name}</label>
                <input type="text" name={name} id={name} autoCapitalize="off" autoCorrect="off" />
              </div>
            );
          })
        }
        <div className="btn-primary" onClick={() => { onSubmit(data); }}>{submitBtn}</div>
        { children }
      </form>
    );
  }
}

export default Form;
