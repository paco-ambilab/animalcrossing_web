import React from 'react';


class IslandDetailView extends React.Component {
	render() {
    return (
    	<div>
     		IslandOwnerID: {this.props.island.accountInfo.switchID} Location: {this.props.island.location} Description: {this.props.island.hashTagDescription} createTime: {this.props.island.createTime}
    	</div>
    )
  }
}