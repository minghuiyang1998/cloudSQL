import React from 'react';
import Dropdown from '../Dropdown';
import style from './index.scss';

export default function Header() {
  const avatar = <img alt="" src="https://avatars2.githubusercontent.com/u/38376387?s=40&amp;v=4" />;
  const menu = <div className="dropdown-item">Sign out</div>;

  return (
    <header className="header">
      <style jsx>{style}</style>
      <a to="/" className="title">Cloud SQL</a>
      <div className="right-items">
        <Dropdown icon={avatar} menu={menu} />
      </div>
    </header>
  );
}
