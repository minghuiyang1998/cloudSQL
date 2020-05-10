import React from 'react';

const Tree = ({ data = [] }) => {
  const renderBranch = (array) => {
    array.forEach((e) => {
      const { children, name } = e || {};
      if (children.length > 0) {
        return (
          <ul>
            {name}
            {renderBranch(children)}
          </ul>
        );
      }
      return <li>{name}</li>;
    });
  };
  return (<ul style={{ paddingLeft: 0 }}>{renderBranch(data)}</ul>);
};

export default Tree;
