import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import withAppStore from '../HOC/withAppStore';
import style from './index.scss';
import Form from './Form';


function genHashID() {
  return Math.round(Math.random() * 10e16);
}

@withAppStore
@observer
class Authorization extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSignUp: false,
    };
  }

  renderSignIn = () => {
    const inputList = [
      {
        name: 'username',
        required: true,
      },
      {
        name: 'password',
        required: true,
      }];
    const { action } = this.props || {};
    const onSubmit = (data) => action.user.signIn(data);
    return (
      <Form inputList={inputList} submitBtn="Login" onSubmit={onSubmit} formId={genHashID()}>
        <div className="link-wrapper">
          Don&apos;t have an account?
          <span
            className="link"
            onClick={() => {
              this.setState({
                isSignUp: true,
              });
            }}
          >
            Sign up
          </span>
        </div>
      </Form>
    );
  };

  renderSignUp = () => {
    const inputList = [
      {
        name: 'username',
        required: true,
      },
      {
        name: 'password',
        required: true,
      }];
    const { action } = this.props || {};
    const onSubmit = (data) => action.user.signUp(data);
    return (
      <Form inputList={inputList} submitBtn="Sign up" onSubmit={onSubmit} formId={genHashID()}>
        <div className="link-wrapper">
          Go back to
          <span
            className="link"
            onClick={() => {
              this.setState({
                isSignUp: false,
              });
            }}
          >
            login
          </span>
        </div>
      </Form>
    );
  }

  render() {
    const { isSignUp = false } = this.state || {};
    return (
      <div className="auth-container">
        <style jsx>{style}</style>
        {isSignUp ? this.renderSignUp() : this.renderSignIn() }
      </div>
    );
  }
}

export default Authorization;
