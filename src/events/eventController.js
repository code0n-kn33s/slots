import {EventEmitter} from 'events';
import * as types from './eventTypes';

class EventController extends EventEmitter {
	dispatch(data, action) {
		this.emit(null, ...arguments);
	}

	subscribe(callback) {
		this.on(null, callback);
	}

	getTypes() {
		return types;
	}
}

window.EventController = new EventController();
