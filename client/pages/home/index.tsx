import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Panel from '../../components/Panel';
import style from './index.scss';
import Resizer from '../../components/Resizer';

export default function Home() {
  return (
    <div className="container">
      <style jsx>{style}</style>
      <Header />
      <div className="main">
        <Resizer>
          <Sidebar />
          <Panel />
        </Resizer>
      </div>
    </div>
  );
}
