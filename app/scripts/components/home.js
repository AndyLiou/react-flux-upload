import React from 'react'
import Upload from './upload'

export default React.createClass({
	render() {

		var img = [
			{id:1,name:"test.png",size:432509, preview:"http://qnimate.com/wp-content/uploads/2014/03/images2.jpg"},
			{id:2,name:"test.png",size:432509, preview:"http://qnimate.com/wp-content/uploads/2014/03/images2.jpg"}
		];

		return (
			<div>
				<Upload
					files={img}
				/>
			</div>
		);
	}
});
