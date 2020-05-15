import React, { PureComponent } from 'react';
import clsn from 'classnames';
import style from './index.scss';
import { genHashID } from '../../utils/common';
import {
  NEW_MSG_EVENT,
  REMOVE_MSG_EVENT,
  emitEvent,
} from '../../utils/event';
import Loading from '../Loading';

export class Message extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    document.addEventListener(NEW_MSG_EVENT, (e) => {
      const { detail = {} } = e || {};
      const { type = '', content = '', mid = '' } = detail || {};
      const { list = [] } = this.state || {};
      const item = {
        type,
        mid,
        content,
      };
      this.setState({
        list: [...list, item],
      });
    });
    document.addEventListener(REMOVE_MSG_EVENT, (e) => {
      const { detail = {} } = e || {};
      const { mid = '' } = detail || {};
      const { list = [] } = this.state || {};
      const _list = list.filter((i) => i.mid !== mid);
      this.setState({
        list: _list,
      });
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
    content: (
      <div className="msg-loading">
        <div className="icon-wrapper"><Loading zoom=".7" /></div>
        <div>Loading ...</div>
      </div>
    ),
  };
  emitEvent(NEW_MSG_EVENT, item);
  return {
    lid,
  };
};

export const endLoading = ({ lid = '' }) => {
  emitEvent(REMOVE_MSG_EVENT, { mid: lid });
};
