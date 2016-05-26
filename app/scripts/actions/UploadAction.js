var Dispatcher = require('../dispatcher/AppDispatcher'),
		Constants = require('../constants/UploadConstants'),
		WebAPIUtils = require('../utils/WebAPIUtils');

var TestActions = {

	addFile: function(file) {
		Dispatcher.dispatch({
			actionType: Constants.ADD_FILE,
			data: file
		})
	},

	cancelFile: function(fileIndex) {
		Dispatcher.dispatch({
			actionType: Constants.CANCEL_FILE,
			data: fileIndex
		})
	},

	uploadFile:function(file, fileIndex) {
		WebAPIUtils.uploadFile(file, callbackFunc);

		function callbackFunc(response) {
			response.index = fileIndex;
			Dispatcher.dispatch({
				actionType: Constants.UPLOAD_FILE,
				data: response
			})
		}
	},

	uploadAllFile:function(files) {
		for (var i = 0; i < files.length; i++) {
			if(!files[i].id) {
				this.uploadFile(files[i], i);
			}
		}
	},

	deleteFile: function(fileId, fileIndex) {
		WebAPIUtils.deleteFile(fileId, callbackFunc);

		function callbackFunc(response) {
			response.index = fileIndex;
			Dispatcher.dispatch({
				actionType: Constants.DELETE_FILE,
				data: response
			})
		}
	}
};

module.exports = TestActions;
