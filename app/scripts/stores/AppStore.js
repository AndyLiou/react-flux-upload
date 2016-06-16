var Dispatcher = require('../dispatcher/AppDispatcher'),
	Constants = require('../constants/UploadConstants'),
	EventEmitter = require('events').EventEmitter,
	assign = require('object-assign');

var item = [];

var AppStore = assign({}, EventEmitter.prototype, {
	getItem() {
		return item.item;
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

AppStore.dispatchToken = Dispatcher.register(function(action) {

	switch(action.actionType) {
		case Constants.GET_ITEM:
			item = action.data;
		break;
		default:
			return true;
	}

	AppStore.emitChange();
});

module.exports = AppStore;
