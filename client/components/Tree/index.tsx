import React, { PureComponent } from "react";
import { observer } from "mobx-react";
import withAppStore from "../HOC/withAppStore";
@withAppStore
@observer
export default class Tree extends PureComponent<any> {
  render() {
    const { store } = this.props || {};
    console.log("Tree -> render -> store", store.baseURL);
    return (
      <>
        <button onClick={() => { store.changeURL(`${store.baseURL}2`); }}>change url</button>
        <div>tree</div>
      </>
    );
  }
}
