import { EventEmitter } from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher';

var CHANGE_EVENT = 'CHANGE';

export default class BaseStore extends EventEmitter {

    constructor() {
        super();
    }

    subscribe(actionSubscribe) {
        this._dispatchToken = AppDispatcher.register(actionSubscribe());
    }

    get dispatchToken() {
        return this._dispatchToken;
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(cb) {
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    }
}