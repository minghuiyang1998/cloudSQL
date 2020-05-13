/* eslint-disable react/jsx-no-duplicate-props */
import React, { PureComponent } from 'react';
import AceEditor from 'react-ace';
import Measure from 'react-measure';
import sqlFormatter from 'sql-formatter';
import clsn from 'classnames';
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
    const { add = '' } = this.props || {};
    this.state = {
      dimensions: { width: -1, height: -1 },
      value: '',
      editor: {},
      theme: THEMES[0],
      fontSize: FONTSIZE[0],
      isGutterShow: true,
      isActiveLineHighlighted: false,
      prevAdd: add,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { add = '' } = nextProps || {};
    const { value = '', prevAdd = '' } = prevState || {};
    let line = value;
    const valid = add && (add !== prevAdd || !prevAdd);
    if (valid) {
      line = value ? `${value}\n${add}` : add;
    }
    return {
      ...prevState,
      value: line,
      prevAdd: add,
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

  // handleSelection = (selection) => {
  //   // console.log(selection.getRange());
  // }

  loadEditor = (editor) => {
    this.setState({ editor });
  }

  formatSQL = () => {
    const { value = '' } = this.state || {};
    if (!value) return;
    const _formated = sqlFormatter.format(value);
    this.setState({
      value: _formated,
    });
  }

  executeSQL = () => {
    const { value = '' } = this.state || {};
    const { setRunning = () => {} } = this.props || {};
    if (!value) return;
    const sqlList = value.trim().replace(/\r\n/g, '').split(';').filter((sql) => sql);
    const _formatedSqlList = sqlList.map((sql) => `${sql};`);
    setRunning({
      isRunning: true,
      runningList: _formatedSqlList,
    });
  }

  render() {
    const { dimensions = {}, value = '', editor = {} } = this.state || {};
    const { isRunning = false } = this.props || {};
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
          <div className={clsn('btn-primary', { disable: isRunning })} onClick={isRunning ? null : this.executeSQL}>Execute</div>
          <div className="btn-outline" onClick={this.formatSQL}>Format</div>
          {/* <div className="btn-outline">SQL Diagnostics</div> */}
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
                onChange={(newValue) => { this.setState({ value: newValue }); }}
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
                onLoad={(e) => { this.loadEditor(e); }}
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
