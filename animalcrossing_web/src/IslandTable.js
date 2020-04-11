import React from 'react';
import MaterialTable from 'material-table';

export default function IslandTable() {
  const [state, setState] = React.useState({
    columns: [
      { title: '島主', field: 'islandOwner' },
      { title: '位置', field: 'location' },
      { title: '特產', field: 'hashTagDescription' },
      { title: '開放時間', field: 'openTime' },
    ],
    data: [
      {islandOwner: 'SW-1234-5678-9000', location: '南半球', hashTagDescription: '#蘋果', openTime: '16:00-18:00'},
      {islandOwner: 'SW-1234-5678-9000', location: '南半球', hashTagDescription: '#蘋果 #特殊衣服 #時令海鮮', openTime: '16:00-18:00'},
    ],
  });

  return (
    <MaterialTable
      title="開放島嶼"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        
      }}
    />
  );
}
