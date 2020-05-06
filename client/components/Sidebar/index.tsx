import React, { PureComponent } from 'react';
import clsn from 'classnames';
import style from './index.scss';
import Tree from './Tree';

class Sidebar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  setSearch = (value) => {
    this.setState({
      search: value,
    });
  }

  handleRefreshClick = () => {
    // TODO: this.store.schema.refresh()
  }

  render() {
    const { darkTheme = true } = this.props || {};
    const { search = '' } = this.state || {};
    return (
      <div className={clsn('sidebar', darkTheme ? 'dark' : 'light')}>
        <style jsx>{style}</style>
        <div className="toolbar">
          <input value={search} placeholder="Search schema" onChange={(event) => this.setSearch(event.target.value)} />
          <div className="refresh-btn">icon here </div>
        </div>
        <Tree />
      </div>
    );
  }
}

export default Sidebar;
