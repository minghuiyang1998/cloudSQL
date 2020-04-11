import globalStyle from '@/stylesheet/global.scss';
import App, { Container } from 'next/app';
import React from 'react';

export default class cloudSQL extends App {

  render() {

    return (
      <>
        <style jsx>{globalStyle}</style>
        <Header />
        <Container />
      </>
    );
  }
}