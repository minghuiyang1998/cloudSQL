import React, { PureComponent } from 'react';
import serialize from 'form-serialize';
import style from './index.scss';

class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  render() {
    const { action = '', inputList = [], enctype = 'multipart/form-data', method = 'POST', onSubmit = () => {} } = this.props || {};
    let data = {};
    if (this.formRef) {
      const $form = this.formRef;
      data = serialize($form, { hash: true });
    }
    return (
      <form className="form" ref={this.formRef} action={action} method={method} encType={enctype} acceptCharset="UTF-8">
        <style jsx>{style}</style>
        {
            inputList.map((i) => (
              <div key={i} className="row">
                <label htmlFor={i}>{i}</label>
                <input type="text" name={i} id={i} autoCapitalize="off" autoCorrect="off" />
              </div>
            ))
        }
        <div onClick={() => { onSubmit(data); }}>submit</div>
        <a to="/signup">Sign Up</a>
      </form>
    );
  }
}

export default Form;
