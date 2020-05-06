import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import withAppStore from '../../HOC/withAppStore';

@withAppStore
@observer
export default class Tree extends PureComponent<any> {
  render() {
    const { store } = this.props || {};
    console.log("Tree -> render -> this.props", this.props);
    return (
      <>
        <button onClick={() => { store.changeURL(`${store.baseURL}2`); }}>change url</button>
        <div>tree</div>
      </>
    );
  }
}

// const Row = ({ index, style }) => {
//   const row = visibleItems[index];
//   const Icon = expanded[row.id] ? OpenIcon : ClosedIcon;
//   if (!row) {
//     return null;
//   }
//   if (row.type === 'schema') {
//     return (
//       <li
//         key={row.name}
//         className={styles.schema}
//         style={style}
//         onClick={() => toggleSchemaItem(connectionId, row)}
//       >
//         <Icon size={ICON_SIZE} style={ICON_STYLE} />
//         {' '}
//         {row.name}
//       </li>
//     );
//   }
//   if (row.type === 'table') {
//     return (
//       <li
//         key={`${row.schemaName}.${row.name}`}
//         className={styles.table}
//         style={style}
//         onClick={() => toggleSchemaItem(connectionId, row)}
//       >
//         <Icon size={ICON_SIZE} style={ICON_STYLE} />
//         {' '}
//         {row.name}
//       </li>
//     );
//   }
//   if (row.type === 'column') {
//     let secondary = ` ${row.dataType}`;
//     if (row.description) {
//       secondary += ` - ${row.description}`;
//     }
//     return (
//       <li
//         key={`${row.schemaName}.${row.tableName}.${row.name}`}
//         className={styles.column}
//         style={style}
//       >
//         {row.name}
//         <Text type="secondary">{secondary}</Text>
//       </li>
//     );
//   }
// };

// let content = null;
// if (error) {
//   content = <ErrorBlock>{error}</ErrorBlock>;
// } else if (loading) {
//   content = (
//     <div className={styles.schemaSpinner}>
//       <SpinKitCube />
//     </div>
//   );
// } else if (true) {
//   content = (
//     <ul style={{ paddingLeft: 0 }}>
//       <List
//         // position absolute takes list out of flow,
//         // preventing some weird react-measure behavior in Firefox
//         style={{ position: 'absolute' }}
//         height={dimensions.height}
//         itemCount={visibleItems.length}
//         itemSize={22}
//         width={dimensions.width}
//         overscanCount={10}
//       >
//         {Row}
//       </List>
//     </ul>
//   );
// }
