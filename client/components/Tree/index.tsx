import React from 'react';
import style from './index.scss';

const Tree = ({ data = [] }) => {
  const renderBranch = (array) => array.map((e) => {
    const { children = [], name = '', key = '' } = e || {};
    if (children.length > 0) {
      return (
        <ul key={key}>
          {name}
          {renderBranch(children)}
        </ul>
      );
    }
    return <li key={key}>{name}</li>;
  });

  return (
    <ul className="tree">
      <style jsx>{style}</style>
      {renderBranch(data)}
    </ul>
  );
};

export default Tree;
