import React from 'react';
import MaterialTable from 'material-table';

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export default function IslandTable() {
  const [state, setState] = React.useState({
    columns: [
      { title: '島主', field: 'islandOwner' },
      { title: '位置', field: 'location' },
      { title: '特產', field: 'hashTagDescription' },
      { title: '開放時間', field: 'createTime' },
    ],
    mockData: [
      {islandOwner: 'SW-1234-5678-9000', location: '南半球', hashTagDescription: '#蘋果', createTime: '16:00-18:00'},
      {islandOwner: 'SW-1234-5678-9000', location: '南半球', hashTagDescription: '#蘋果 #特殊衣服 #時令海鮮', createTime: '16:00-18:00'},
    ],
  });

  const ISLAND_QUERY = gql`
    query ($search: String) {
      islands(search: $search) {
      accountInfo {
          user {
            username
          }
        switchID
        }
      id
      location
      islandPassCode
      hashTagDescription
      createTime
      }
    }`

  return (
    <Query query={ISLAND_QUERY} variables={{search: ""}}>
      {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>${error.message}</div>
    
          const islandsToRender = data.islands.map(island => { 
            return(
              {"islandOwner": island.accountInfo.switchID, "location": island.location, "hashTagDescription": island.hashTagDescription, "createTime": island.createTime}
            ) 
          })
    
          return (
            <MaterialTable
              title="開放島嶼"
              columns={state.columns}
              data={islandsToRender}
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
