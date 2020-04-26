import React from 'react';
import Authenticated from '../../components/HOC/Authenticated';
import Console from '../../components/Console';

export default function Home({ match }) {
  const { params } = match || {};

  return (
    <Authenticated>
      <Console queryId={params.queryId} />
    </Authenticated>
  );
}
