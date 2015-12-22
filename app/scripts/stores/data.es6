import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { load, loadProgress, loadCompleted, loadFailed } from '../actions/data';
import { getDeathStats, getFamilyPlanning, getDeliveries, getHealthWorkers, getIPD, getOPD, getTetanous, getHivFacilities, getHealthFacilities } from '../api';
import DataTypes from '../constants/data-types';

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
    death: DUMMY,
    'family-planning': DUMMY,
    deliveries: DUMMY,
    'health-workers': DUMMY,
    ipd: DUMMY,
    opd: DUMMY,
    tetanous: DUMMY,
    'hiv-center': DUMMY,
    facilities: DUMMY,
  },
  mixins: [SaneStore],
  init() {
    this.listenTo(load, 'loadIfNeeded');
    this.listenTo(loadProgress, 'loadData');
    this.listenTo(loadCompleted, 'loadData');
  },
  loadIfNeeded(type) {
    const _type = type.toParam();
    if (this.get()[_type] === DUMMY) {
      this.getDataFromApi(type);
    } else {
      loadCompleted(this.get()[_type], _type);
    }
  },
  loadData(data, type) {
    const tmp = {
      ...this.get(),
      [type.toParam()]: data,
    };
    this.setData(tmp);
  },
  getData(type) {
    return this.get()[type.toParam()];
  },

  getDataFromApi(type) {
    const proxier = getNextProxier(type);
    const apiFn = DataTypes.match(type, {
      Death: () => getDeathStats,
      FamilyPlanning: () => getFamilyPlanning,
      Deliveries: () => getDeliveries,
      HealthWorkers: () => getHealthWorkers,
      IPD: () => getIPD,
      OPD: () => getOPD,
      Tetanous: () => getTetanous,
      HivCenter: () => getHivFacilities,
      Facilities: () => getHealthFacilities,
    });
    apiFn(proxier(loadProgress))
      .then(proxier(loadCompleted))
      .catch(proxier(loadFailed));
  },
});


export default DataStore;
