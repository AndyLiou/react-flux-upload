import React from 'react'
import Upload from './upload'
import AppAction from '../actions/AppAction'
import AppStore from '../stores/AppStore'

export default React.createClass({
	getInitialState() {
    return {
      item: {}
    };
  },

	componentDidMount() {
		AppAction.getItem();
		AppStore.addChangeListener(this._onChange);
	},

	componentWillUnmount() {
		AppStore.removeChangeListener(this._onChange);
	},

	_onChange() {
		this.setState({
			item: AppStore.getItem()
		});
		this.forceUpdate();
	},

	render() {

		var that = this;

		var getImages = function() {
			var array = [];
			if(that.state.item.images){
				that.state.item.images.map(function(value, index) {
					array.push({id: value.img_id,name: "123.png", size:440050, preview:value.img_url});
				})
			}
			return array;
		}

		return (
			<div>
				<Upload
					files={getImages()}
				/>
			</div>
		);
	}
});
