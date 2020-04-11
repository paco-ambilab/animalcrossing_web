// import React, { Component } from 'react';

// import Island from './Island';

// import { Query } from 'react-apollo'
// import gql from 'graphql-tag'

// class IslandList extends Component {

//   render() {

//   	const ISLAND_QUERY = gql`
// 	  { 
// 	  	islands {
// 		  accountInfo {
// 	      	user {
// 	          username
// 	        }
// 	      switchID
// 	      }
// 		  id
// 		  location
// 		  islandPassCode
// 		  hashTagDescription
// 		  createTime
//   		}
// 	  }`

//   	const islandsToRender = [
//       {
//         accountInfo: {
//           user: {
//             username: "paco"
//           },
//           switchID: "xxxx-xxxx-xxxx"
//         },
//         id: "3",
//         location: "xxxx",
//         islandPassCode: "xxxx-xxxx-xxxx",
//         hashTagDescription: "#xxx#xxx#xxx",
//         createTime: "2020-04-10T16:31:26.518345+00:00"
//       },
//       {
//         accountInfo: {
//           user: {
//             username: "paco"
//           },
//           switchID: "xxxx-xxxx-xxxx"
//         },
//         id: "4",
//         location: "xxxx",
//         islandPassCode: "xxxx-xxxx-xxxx",
//         hashTagDescription: "#xxx#xxx#xxx",
//         createTime: "2020-04-10T17:31:38.527168+00:00"
//       },
//     ]

//     return (
//     	<Query query={ISLAND_QUERY}>
// 	    	{({ loading, error, data }) => {
// 	          if (loading) return <div>Fetching</div>
// 	          if (error) return <div>Error</div>
	    
// 	          const islandsToRender = data.islands
	    
// 	          return (
// 	            <div>
// 	               {islandsToRender.map(island => <Island key={island.id} island={island} />)}
// 	            </div>
// 	          )
// 	        }}
      		
//      	</Query>
//     )
//   }
// }

// export default IslandList