import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import withAppStore from '../HOC/withAppStore';
import Resizer from '../Resizer';
import Tree from '../Tree';
import Console from './Console';
import SQLEditor from './SQLEditor';
import style from './index.scss';
import {
  TYPE_COL,
  TYPE_TABLE,
} from '../Tree/config';
import { selectAll, selectColumn } from '../../utils/sqls';

@withAppStore
@observer
class Editor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editorValue: '',
      isRunning: false,
      runningList: [],
    };
  }

  onChange = (e) => {
    // console.log('Editor -> onChange -> e)', e);
  }

  setRunning = ({ isRunning = true, runningList = [] }) => {
    this.setState({
      isRunning,
      runningList,
    });
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
          type: TYPE_COL,
          name: (
            <div className="column">
              {columnName}
              <span>{dataType}</span>
            </div>
          ),
          doubleClickEvent: () => {
            this.setState({
              editorValue: selectColumn(t, columnName),
            });
          },
        };
      });
      return {
        key: t,
        name: <div className="sheet">{t}</div>,
        type: TYPE_TABLE,
        children: formatedChildren,
        doubleClickEvent: () => {
          this.setState({
            editorValue: selectAll(t),
          });
        },
      };
    });
    const { editorValue = '', isRunning = false, runningList = [] } = this.state || {};
    return (
      <div className="editor">
        <style jsx>{style}</style>
        <Resizer
          minSize={10}
          maxSize={250}
          defaultSize={150}
          pane1Style={{ backgroundColor: '#fafafa', overflow: 'auto' }}
          resizerStyle={{ width: '6px', backgroundColor: 'transparent', cursor: 'col-resize' }}
        >
          <Tree data={list} unique={current} />
          <div className="main">
            <Resizer
              direction="horizontal"
              minSize={10}
              maxSize={700}
              defaultSize={600}
              pane2Style={{ backgroundColor: '#f2f2f2' }}
              resizerStyle={{ padding: '3px 0', backgroundColor: 'transparent', cursor: 'row-resize' }}
            >
              <SQLEditor add={editorValue} isRunning={isRunning} setRunning={this.setRunning} />
              <Console database={current} setRunning={this.setRunning} runningList={runningList} />
            </Resizer>
          </div>
        </Resizer>
      </div>
    );
  }
}

export default Editor;
