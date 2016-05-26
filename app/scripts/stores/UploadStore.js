var Dispatcher = require('../dispatcher/AppDispatcher'),
	Constants = require('../constants/UploadConstants'),
	EventEmitter = require('events').EventEmitter,
	assign = require('object-assign');

var fileList = [];

function addFileToList(file) {
	fileList.push.apply(fileList, file);
}

function cancelFileFromList(fileIndex) {
	fileList.splice(fileIndex, 1);
}

function uploadResult(data) {
	if(data.id) {
		fileList[data.index].id = data.id;
	}
	if(data.progress) {
		fileList[data.index].progress = data.progress;
	}
	if(data.status) {
		fileList[data.index].status = data.status;
	}
	if(data.message) {
		fileList[data.index].message = data.message;
	}
}

function deleteResult(data) {
	if(data.status) {
		fileList[data.index].status = data.status;

		if(data.status === 'success') {
			fileList.splice(data.index, 1);
		}
	}
	if(data.message) {
		fileList[data.index].message = data.message;
	}
}

var UploadStore = assign({}, EventEmitter.prototype, {
	getFiles() {
		return fileList;
	},
	emitChange: function() {
		this.emit('change');
	},
	addChangeListener: function(callback) {
		this.on('change', callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	}
});

UploadStore.dispatchToken = Dispatcher.register(function(action) {

	switch(action.actionType) {
		case Constants.ADD_FILE:
			addFileToList(action.data);
		break;
		case Constants.CANCEL_FILE:
			cancelFileFromList(action.data);
		break;
		case Constants.UPLOAD_FILE:
			uploadResult(action.data);
		break;
		case Constants.DELETE_FILE:
			deleteResult(action.data);
		break;
		default:
			return true;
	}

	UploadStore.emitChange();
});

module.exports = UploadStore;
