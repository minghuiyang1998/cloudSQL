import React, { PureComponent } from 'react';
import clsn from 'classnames';
import style from './index.scss';
import { genHashID } from '../../utils/common';
import {
  NEW_MSG_EVENT,
  REMOVE_MSG_EVENT,
  emitEvent,
} from '../../utils/event';

export class Message extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      willRemove: [],
    };
  }

  componentDidMount() {
    document.addEventListener(NEW_MSG_EVENT, (e) => {
      const { detail = {} } = e || {};
      const { type = '', content = '', mid = '' } = detail || {};
      this.pushList({ type, content, mid });
    });
    document.addEventListener(REMOVE_MSG_EVENT, (e) => {
      const { detail = {} } = e || {};
      const { mid = '' } = detail || {};
      this.removeList(mid);
    });
  }

  pushList({ type, content, mid }) {
    console.log('Message -> pushList -> type, content, mid', type, content, mid);
    const { list = [] } = this.state || {};
    const item = {
      type,
      mid,
      content,
    };
    this.setState({
      list: [...list, item],
    });
  }

  removeList(mid) {
    const { list = [] } = this.state || {};
    const _list = list.filter((i) => i.mid !== mid);
    this.setState({
      list: _list,
    });
  }

  render() {
    const { list = [] } = this.state || {};
    return (
      <div className="message-wrapper">
        <style jsx>{style}</style>
        {
          list.map((i) => {
            const { type = 'error', mid = '', content = '' } = i || {};
            return <div key={mid} className={clsn('message', type)}>{content}</div>;
          })
        }
      </div>
    );
  }
}

export const error = ({ content = '', duration = 5000 }) => {
  const mid = genHashID();
  const item = {
    type: 'error',
    mid,
    content,
  };
  emitEvent(NEW_MSG_EVENT, item);
  setTimeout(() => {
    emitEvent(REMOVE_MSG_EVENT, { mid });
  }, duration);
};

export const startLoading = () => {
  const lid = genHashID();
  const item = {
    type: 'loading',
    mid: lid,
    content: 'loading',
  };
  emitEvent(NEW_MSG_EVENT, item);
  return {
    lid,
  };
};

export const endLoading = ({ lid = '' }) => {
  emitEvent(REMOVE_MSG_EVENT, { mid: lid });
};
