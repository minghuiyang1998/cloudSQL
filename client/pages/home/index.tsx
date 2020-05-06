import React from 'react';
import SplitPane from 'react-split-pane';
import Header from '../../components/Header';
// import Sidebar from '../../components/Sidebar';
// import Panel from '../../components/Panel';

export default function Home() {
  return (
    <>
      <Header />
      <SplitPane split="vertical" minSize={150} defaultSize={280} maxSize={-100}>
        {/* <Sidebar />
        <Panel /> */}
      </SplitPane>
    </>
  );
}
