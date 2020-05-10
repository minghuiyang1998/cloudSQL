import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import withAppStore from '../../HOC/withAppStore';
import Loading from '../../Loading';
import Error from '../../Error';

@withAppStore
@observer
export default class Tree extends PureComponent<any> {
  render() {
    const { store } = this.props || {};
    const { schema = [] } = store.app || {};
    let content = null;
    // if (error) {
    //   content = <Error msg={error} />;
    // }
    // if (loading) {
    //   content = <Loading />;
    // }

    // 递归把tree render出来
    const render = (array) => {
      array.forEach((e) => {
        const { children, name } = e || {};
        if (children.length > 0) {
          return (
            <ul>
              {name}
              {render(children)}
            </ul>
          );
        }
        return <li>{name}</li>;
      });
    };

    content = <ul style={{ paddingLeft: 0 }}>{render(schema)}</ul>;
    return (
      <>
        <button onClick={() => { store.changeURL(`${store.baseURL}2`); }}>change url</button>
        {content}
      </>
    );
  }
}
