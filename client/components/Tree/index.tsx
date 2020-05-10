import React from 'react';
import style from './index.scss';

const Tree = ({ data = [] }) => {
  const renderBranch = (array) => {
    return array.map((e) => {
      const { children = [], name = '' } = e || {};
      if (children.length > 0) {
        return (
          <ul key={name}>
            {name}
            {renderBranch(children)}
          </ul>
        );
      }
      return <li key={name}>{name}</li>;
    });
  };

  return (
    <ul className="tree">
      <style jsx>{style}</style>
      {renderBranch(data)}
    </ul>
  );
};

export default Tree;
