import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import withAppStore from '../../../HOC/withAppStore';
import Resizer from '../../../Resizer';
import Tree from '../../../Tree';
import Console from './Console';
import Toolbar from './Toolbar';
import style from './index.scss';

@withAppStore
@observer
class Editor extends PureComponent {
  render() {
    const { store, current = '' } = this.props || {};
    const { schema } = store.app || {};
    const data = schema[current];
    const tables = Object.keys(data);
    const list = tables.map((t) => {
      const children = data[t];
      const formatedChildren = children.map((c) => {
        const { column_name: columnName = '', data_type: dataType = '' } = c || {};
        return {
          key: columnName,
          name: `${columnName} ${dataType}`,
        };
      });
      return {
        key: t,
        name: t,
        children: formatedChildren,
      };
    });
    return (
      <div className="editor">
        <style jsx>{style}</style>
        <Resizer
          minSize={10}
          resizerStyle={{ width: '3px', backgroundColor: '#ddd', cursor: 'col-resize' }}
        >
          <Tree data={list} />
          <div className="main">
            <Toolbar />
            <Console />
          </div>
        </Resizer>
      </div>
    );
  }
}

export default Editor;
