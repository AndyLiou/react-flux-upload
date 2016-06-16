var Dispatcher = require('../dispatcher/AppDispatcher'),
		Constants = require('../constants/UploadConstants'),
		WebAPIUtils = require('../utils/WebAPIUtils');

var TestActions = {

	getItem:function(){
		WebAPIUtils.getItem(callbackFunc);

		function callbackFunc(response) {
			Dispatcher.dispatch({
				actionType: Constants.GET_ITEM,
				data: response
			})
		}
	}
};

module.exports = TestActions;
