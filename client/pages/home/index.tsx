import React from 'react';

export default function Home({ match }) {
  const { params } = match || {};

  return (
    <h1>home</h1>
  );
}
