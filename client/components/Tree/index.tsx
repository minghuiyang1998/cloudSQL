import React from 'react';
import style from './index.scss';
import Branch from './Branch';

const Tree = ({ data = [] }) => {
  const renderBranch = (array) => array.map((e) => {
    const { children = [], name = '', key = '', clickHandle = () => {} } = e || {};
    if (children.length > 0) {
      return (
        <Branch key={key} name={name} clickHandle={clickHandle}>
          {renderBranch(children)}
        </Branch>
      );
    }
    return <Branch key={key} name={name} clickHandle={clickHandle} />;
  });

  return (
    <div className="tree">
      <style jsx>{style}</style>
      {renderBranch(data)}
    </div>
  );
};

export default Tree;
