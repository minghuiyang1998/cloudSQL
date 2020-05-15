import React, { PureComponent } from 'react';
import style from './index.scss';
import Branch from './Branch';
import Loading from '../Loading';

const calcArray = (array = []) => {
  let all = 0;
  array.forEach((element) => {
    all += 1;
    const { children = [] } = element;
    if (children.length > 0) {
      const num = calcArray(children);
      all += num;
    }
  });
  return all;
};

class Tree extends PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isLoading: false,
  //     unique: '',
  //   };
  // }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { unique = '' } = nextProps || {};
  //   const { unique: prev = '' } = prevState || {};
  //   if (prev !== unique) {
  //     return {
  //       ...prevState,
  //       unique,
  //       isLoading: false,
  //     };
  //   }
  //   return {
  //     ...prevState,
  //   };
  // }

  render() {
    const { data = [], backgroundColor = '#fff' } = this.props || {};

    const renderBranch = (array) => array.map((e) => {
      const { children = [], name = '', key = '', type = '', clickHandle = () => {}, doubleClickEvent = null } = e || {};
      if (children.length > 0) {
        return (
          <Branch key={key} name={name} iconType={type} clickHandle={clickHandle} doubleClickEvent={doubleClickEvent}>
            {renderBranch(children)}
          </Branch>
        );
      }
      return <Branch key={key} name={name} iconType={type} clickHandle={clickHandle} doubleClickEvent={doubleClickEvent} />;
    });

    const { isLoading = false } = this.state || {};

    return (
      <div className="tree">
        <style jsx>{style}</style>
        {isLoading ? (
          <div className="tree-loading" style={{ backgroundColor }}>
            <div style={{ height: '200px', position: 'relative' }}>
              <Loading backgroundColor={backgroundColor} />
            </div>
          </div>
        ) : null }
        {renderBranch(data)}
      </div>
    );
  }
}

export default Tree;
