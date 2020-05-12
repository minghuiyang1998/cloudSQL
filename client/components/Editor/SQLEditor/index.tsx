/* eslint-disable react/jsx-no-duplicate-props */
import React, { PureComponent } from 'react';
import AceEditor from 'react-ace';
import Measure from 'react-measure';
import { observer } from 'mobx-react';
import withAppStore from '../../HOC/withAppStore';
import style from './index.scss';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/ext-language_tools'; // avoid warning in develop tool
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-kuroir';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-twilight';
import { updateCompletions } from '../../../utils/updateCompletions';
import Dropdown from '../../Dropdown';
import Select from '../../Select';
import SettingIcon from '../../../assets/setting.svg';

const THEMES = [
  'xcode',
  'github',
  'kuroir',
  'textmate',
  'tomorrow',
  'monokai',
  'twilight',
];

const FONTSIZE = [14, 16, 18, 20, 22, 24, 28, 32, 40];

@withAppStore
@observer
class SQLEditor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: { width: -1, height: -1 },
      value: '',
      editor: {},
      theme: THEMES[0],
      fontSize: FONTSIZE[0],
      isGutterShow: true,
      isActiveLineHighlighted: false,
    };
  }

  renderSetting = () => {
    const {
      theme = THEMES[0],
      fontSize = FONTSIZE[0],
      isGutterShow = true,
      isActiveLineHighlighted = false,
    } = this.state || {};
    return (
      <div className="setting-box">
        <div className="row">
          <span className="label">Theme</span>
          <Select width={120} defaultValue={theme} options={THEMES} onChange={(value) => { this.setState({ theme: value }); }} />
        </div>
        <div className="row">
          <span className="label">Font Size</span>
          <Select width={80} defaultValue={fontSize} options={FONTSIZE} onChange={(value) => { this.setState({ fontSize: value }); }} />
        </div>
        <div className="row">
          <span className="label">Show Gutter</span>
          <input type="checkbox" checked={isGutterShow} onChange={({ target }) => { this.setState({ isGutterShow: target.checked }); }} />
        </div>
        <div className="row">
          <span className="label">Highlight Active Line</span>
          <input type="checkbox" checked={isActiveLineHighlighted} onChange={({ target }) => { this.setState({ isActiveLineHighlighted: target.checked }); }} />
        </div>
      </div>
    );
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
    const { dimensions = {}, value = '', editor = {} } = this.state || {};
    const { width = -1, height = -1 } = dimensions;
    const { theme = THEMES[0], fontSize = FONTSIZE[0], isActiveLineHighlighted = false, isGutterShow = true } = this.state || {};
    if (Object.keys(editor).length) {
      const { store } = this.props || {};
      const { schema } = store.app || {};
      const obj = updateCompletions(schema);
      editor.completers.push(obj);
    }
    return (
      <div className="sql-editor">
        <style jsx>{style}</style>
        <div className="toolbar">
          <div className="btn-primary">Execute</div>
          <div className="btn-outline">Format</div>
          <div className="btn-outline">SQL Diagnostics</div>
          <div className="mg-l-auto">
            <Dropdown icon={<SettingIcon />} components={this.renderSetting()} withArrow={false} />
          </div>
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
                highlightActiveLine={isActiveLineHighlighted}
                mode="sql"
                theme={theme}
                onChange={this.onChange}
                name="query-ace-editor"
                editorProps={{ $blockScrolling: true }}
                height={`${height}px`}
                width={`${width}px`}
                fontSize={fontSize}
                showGutter={isGutterShow}
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
