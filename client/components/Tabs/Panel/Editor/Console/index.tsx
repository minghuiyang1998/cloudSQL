import React, { PureComponent } from 'react';
import Loading from '../../../../Loading';
import Table from './Table';
// error

const columns = [
  {
    Header: 'Name',
    columns: [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
    ],
  },
  {
    Header: 'Info',
    columns: [
      {
        Header: 'Age',
        accessor: 'age',
        width: 50,
        align: 'right',
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        width: 50,
        align: 'right',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Profile Progress',
        accessor: 'progress',
      },
    ],
  },
];

const data = [];

class Console extends PureComponent {
  render() {
    return (
      <div>
        <div>header</div>
        <div className="main" />
        <Table columns={columns} data={data} />
      </div>
    );
  }
}

export default Console;
