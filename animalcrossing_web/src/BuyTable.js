import React from 'react';
import MaterialTable from 'material-table';

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export default function BuyTable() {
  const [state, setState] = React.useState({
    columns: [
      { title: '物品', field: 'itemName' },
      { title: '数量', field: 'numberOfItem' },
      { title: '鈴錢', field: 'unitPrice' },
      { title: '密碼', field: 'islandPassCode' },
      { title: '發佈時間', field: 'createTime' },
    ],
    mockData: [
      {itemName: '大頭菜', numberOfItem: '20', unitPrice: '100', islandPassCode: 'password1234', createTime: ''},
      {itemName: '蘋果', numberOfItem: '10', unitPrice: '100', islandPassCode: 'password1234', createTime: ''},
    ],
  });

  const BUY_QUERY = gql`
    query ($search: String) { 
      buys(search: $search) {
        id
        itemName
        unitPrice
        numberOfItem
        islandPassCode
        createTime
        close
      }
    }`

  return (
    <Query query={BUY_QUERY} variables= {{search: ""}}>
      {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>${error.message}</div>
    
          const buysToRender = data.buys.map(buy => { 
            return(
              {"itemName": buy.itemName, "unitPrice": buy.unitPrice, "numberOfItem": buy.numberOfItem, "islandPassCode": buy.islandPassCode, "createTime": buy.createTime}
            ) 
          })
    
          return (
            <MaterialTable
              title="徵求物品"
              columns={state.columns}
              data={buysToRender}
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
          )
      }}
    </Query>
  );
}
