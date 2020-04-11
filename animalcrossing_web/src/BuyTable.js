import React from 'react';
import MaterialTable from 'material-table';

export default function BuyTable() {
  const [state, setState] = React.useState({
    columns: [
      { title: '物品', field: 'itemName' },
      { title: '数量', field: 'numberOfItem' },
      { title: '鈴錢', field: 'unitPrice' },
      { title: '密碼', field: 'islandPassCode' },
    ],
    data: [
      {itemName: '大頭菜', numberOfItem: '20', unitPrice: '100', islandPassCode: 'password1234'},
      {itemName: '蘋果', numberOfItem: '10', unitPrice: '100', islandPassCode: 'password1234'},
    ],
  });

  return (
    <MaterialTable
      title="徵求物品"
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
