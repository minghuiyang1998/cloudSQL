import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import withAppStore from '../../../HOC/withAppStore';
import Resizer from '../../../Resizer';
import Tree from '../../../Tree';
import Console from './Console';
import SQLEditor from './SQLEditor';
import style from './index.scss';

@withAppStore
@observer
class Editor extends PureComponent {
  onChange = (e) => {
    console.log('Editor -> onChange -> e)', e);
  }

  render() {
    const { store, current = '' } = this.props || {};
    const { schema } = store.app || {};
    const data = schema[current] || {};
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
          maxSize={250}
          defaultSize={150}
          resizerStyle={{ width: '3px', backgroundColor: '#ccc', cursor: 'col-resize' }}
        >
          <Tree data={list} />
          <div className="main">
            <Resizer
              direction="horizontal"
              minSize={10}
              maxSize={700}
              defaultSize={600}
              resizerStyle={{ height: '3px', backgroundColor: '#ccc', cursor: 'row-resize' }}
            >
              <SQLEditor />
              <Console />
            </Resizer>
          </div>
        </Resizer>
      </div>
    );
  }
}

export default Editor;
