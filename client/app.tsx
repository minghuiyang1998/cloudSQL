import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import withAppStore from './components/HOC/withAppStore';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Panel from './components/Panel';
import Resizer from './components/Resizer';
import Authorization from './components/Authorization';
import style from './app.scss';
import globalStyle from './stylesheets/global.scss';

const renderMain = () => (
  <div className="container">
    <style jsx>{globalStyle}</style>
    <style jsx>{style}</style>
    <Header />
    <div className="main">
      <Resizer>
        <Sidebar />
        <Panel />
      </Resizer>
    </div>
  </div>
);

@withAppStore
@observer
class App extends PureComponent {
  componentDidMount() {
    const { action } = this.props || {};
    console.log('App -> componentDidMount -> this.props', this.props);
    action.user.checkUser();
  }

  render() {
    const { store } = this.props || {};
    const { isLogin = false } = store.user || {};
    return (
      <>
        {!isLogin ? <Authorization /> : null}
        {renderMain()}
      </>
    );
  }
}

export default App;
