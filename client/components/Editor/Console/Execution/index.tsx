import React from 'react';
import style from './index.scss';
import { getAction } from '../../../../store';

const Execution = ({ info = {}, refreshStatus = () => {} }) => {
  // TODO: action here
  // then setState
  // then call refreshStatus
  // 只通过父节点来更新自己的数据不需要自己的state
  const { status = '', result = [], timeCount = 0, rows = 0 } = info || {};
  return (
    <div className="execution">
      <style jsx>{style}</style>
      <Loading />
      <Table />
      <Error />
    </div>
  );
};

export default Execution;
