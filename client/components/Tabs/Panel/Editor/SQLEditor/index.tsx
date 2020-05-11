/* eslint-disable react/jsx-no-duplicate-props */
import React, { PureComponent } from 'react';
import AceEditor from 'react-ace';
import Measure from 'react-measure';
import style from './index.scss';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/ext-language_tools'; // avoid warning in develop tool
import 'ace-builds/src-noconflict/mode-sql';
// import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-twilight';

class SQLEditor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: { width: -1, height: -1 },
      value: '',
      editor: {},
    };
  }

  handleSelection = (selection) => {
    // console.log(selection.getRange());
  }

  loadEditor = (editor) => {
    this.setState({ editor });
    editor.commands.on('afterExec', (e) => {
      if (e.command.name === 'insertstring' && /^[\w.]$/.test(e.args)) {
        if (e.args === '.') {
          editor.execCommand('startAutocomplete');
        }
      }
    });
  }

  render() {
    const { dimensions = {}, value = '' } = this.state || {};
    const { width = -1, height = -1 } = dimensions;
    return (
      <div className="sql-editor">
        <style jsx>{style}</style>
        <div className="toolbar">
          toolbar
        </div>
        <Measure
          bounds
          onResize={(contentRect) => {
            this.setState({ dimensions: contentRect.bounds });
          }}
        >
          {({ measureRef }) => (
            <div className="fill" ref={measureRef}>
              <AceEditor
                editorProps={{ $blockScrolling: Infinity }}
                highlightActiveLine={false}
                mode="sql"
                theme="twilight"
                onChange={this.onChange}
                name="query-ace-editor"
                editorProps={{ $blockScrolling: true }}
                height={`${height}px`}
                width={`${width}px`}
                setOptions={{
                  useWorker: true,
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2,
                }}
                onLoad={(editor) => { this.loadEditor(editor); }}
                showPrintMargin={false}
                value={value}
                onSelectionChange={this.handleSelection}
              />
            </div>
          )}
        </Measure>
      </div>
    );
  }
}

export default SQLEditor;
