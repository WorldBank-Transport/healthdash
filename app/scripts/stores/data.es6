import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { load, loadProgress, loadCompleted, loadFailed } from '../actions/data';
import { getHealthFacilities } from '../api';

const DUMMY = [];

let CURRENT_REQUEST;

const getNextProxier = (type) => {
  CURRENT_REQUEST = {};  // reset to some unique ref
  const thisReq = CURRENT_REQUEST;  // re-bind in this scope
  return fn => (...rest) => {
    if (thisReq === CURRENT_REQUEST) {
      return fn(...rest, type);
    }  // else the request we had was no longer current, so do nothing.
  };
};

const DataStore = createStore({
  initialData: {
    facilities: DUMMY,
  },
  mixins: [SaneStore],
  init() {
    this.listenTo(load, 'loadIfNeeded');
    this.listenTo(loadProgress, 'loadData');
    this.listenTo(loadCompleted, 'loadData');
  },
  loadIfNeeded(type) {
    if (this.get()[type] === DUMMY) {
      this.getDataFromApi(type);
    } else {
      loadCompleted(this.get()[type], type);
    }
  },
  loadData(data, type) {
    const tmp = {
      ...this.get(),
      [type]: data,
    };
    this.setData(tmp);
  },
  getData(type) {
    return this.get()[type];
  },

  getDataFromApi(type) {
    const proxier = getNextProxier(type);
    const apiFn = getHealthFacilities;
    apiFn(proxier(loadProgress))
      .then(proxier(loadCompleted))
      .catch(proxier(loadFailed));
  },
});


export default DataStore;
