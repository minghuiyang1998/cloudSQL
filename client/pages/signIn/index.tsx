import React from 'react';
import { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import message from '../../utils/message';
import { refreshAppContext } from '../../store';
import { goSignIn } from '../../dao/user';


function SignIn({ config, refreshAppContext }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    document.title = 'SQLPad - Sign In';
  }, []);

  const signIn = async e => {
    e.preventDefault();

    const json = await goSignIn({ email, password });
    if (json.error) {
      return message.error('Username or password incorrect');
    }
    await refreshAppContext();
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect push to="/" />;
  }

  if (!config) {
    return;
  }

  const localForm = (
    <form onSubmit={signIn}>
      <Input name="email" type="email" placeholder="Email address" onChange={e => setEmail(e.target.value)} required />
      <Input name="password" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
      <div onClick={signIn} htmlType="submit"> Sign in </div>
      <Link style={{ display: 'inline-block', width: '100%', textAlign: 'center' }} to="/signup"> Sign Up </Link>
      {config.smtpConfigured ? (
        <Link to="/forgot-password">Forgot Password</Link>
      ) : null}
    </form>
  );

  // TODO FIXME XXX Button inside anchor is bad
  const googleForm = (
    <div>
      <a href={`${config.baseUrl }/auth/google`}>
        Sign in with Google
      </a>
    </div>
  );

  const samlForm = (
    <div>
      <a href={`${config.baseUrl }/auth/saml`}>Sign in with ADFS</a>
    </div>
  );

  return (
    <div style={{ width: '300px', textAlign: 'center', margin: '100px auto' }}>
      <h1>SQLPad</h1>
      {config.localAuthConfigured && localForm}
      {config.googleAuthConfigured && googleForm}
      {config.samlConfigured && samlForm}
    </div>
  );
}

export default connect(['config'], { refreshAppContext })(SignIn);
