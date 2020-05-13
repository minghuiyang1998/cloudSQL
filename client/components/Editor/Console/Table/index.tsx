/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useRowSelect,
} from 'react-table';
import Modal from '../../../Modal';
import style from './index.scss';

const getStyles = (props, align = 'left') => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'flex-start',
      display: 'flex',
    },
  },
];

const headerProps = (props, { column }) => getStyles(props, column.align);

const cellProps = (props, { cell }) => getStyles(props, cell.column.align);

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  },
);


function Table({ columns, data, getSelectedColumns = () => {} }) {
  const defaultColumn = React.useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 30, // minWidth is only used as a limit for resizing
      width: 150, // width is used for both the flex-basis and flex-grow
      maxWidth: 200, // maxWidth is only used as a limit for resizing
    }),
    [],
  );

  const [isModalVisible, setModalStatus] = useState(false);
  const [current, setCurrent] = useState({});

  const { getTableProps, headerGroups, rows, prepareRow, selectedFlatRows } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useResizeColumns,
    useFlexLayout,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: 'selection',
          disableResizing: true,
          minWidth: 35,
          width: 35,
          maxWidth: 35,
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
      hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
        // fix the parent group of the selection button to not be resizable
        const selectionGroupHeader = headerGroups[0].headers[0];
        selectionGroupHeader.canResize = false;
      });
    },
  );

  useEffect(() => {
    const all = selectedFlatRows.map((i) => i.original);
    getSelectedColumns(all);
  }, [selectedFlatRows]);

  return (
    <>
      <Modal width="600" visible={isModalVisible} onClose={() => { setModalStatus(false); }}>
        <div className="col-details">
          {
            Object.keys(current).map((k) => (
              <div key={k}>
                <span className="key">
                  {k}
                  :
                </span>
                <span>{current[k]}</span>
              </div>
            ))
          }
        </div>
      </Modal>
      <div {...getTableProps()} className="table">
        <style jsx>{style}</style>
        <div>
          {headerGroups.map((headerGroup) => (
            <div
              {...headerGroup.getHeaderGroupProps({
                // style: { paddingRight: '15px' },
              })}
              className="tr"
            >
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps(headerProps)} className="th">
                  {column.render('Header')}
                  {/* Use column.getResizerProps to hook up the events correctly */}
                  {column.canResize && (
                    <div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? 'isResizing' : ''
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="tbody">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="tr">
                {row.cells.map((cell) => {
                  const { column = {} } = cell || {};
                  const { id = '' } = column || {};
                  return (
                    <div {...cell.getCellProps(cellProps)} className="td" onClick={id === 'selection' ? null : () => { setModalStatus(true); setCurrent(row.original); }}>
                      {cell.render('Cell')}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Table;
