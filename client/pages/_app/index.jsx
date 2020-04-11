import globalStyle from '@/stylesheet/global.scss';
import App from 'next/app';
import React from 'react';
import Header from 'components/Header';

export default class cloudSQL extends App {

  render() {
    const { Component } = this.props || {};
    return (
      <>
        <style jsx>{globalStyle}</style>
        <Header />
        <Component />
      </>
    );
  }
}