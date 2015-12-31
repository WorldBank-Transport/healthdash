import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import ViewStore from './view';
import { changeMetric } from '../actions/metrics';
import DataTypes from '../constants/data-types';

const familyMetrics = {
  'TOTAL FAMILY PLANNING CLIENTS': true,
  'NEW CLIENTS': false,
  'FAMILY PLANNING CONTINUIOUS': false,
  'PROJECTED FAMILY PLANNING CLIENTS (WOMEN AGE 15-49)': false,
};

const deliveriesMetrics = {
  'TOTAL': true,
  'HEALTH FACILITY DELIVERIES': false,
  'TRADITIONAL BIRTH ATTENDANTS (TBA)': false,
  'ANTENATAL CARE PROJECTION': false,
  'BORN BEFORE ARRIVAL (BBA)': false,
  'HOME DELIVERY': false,
};

const tetanusMetrics = {
  'PROJECTED CLIENTS': true,
  'TOTAL ATTENDANCE': false,
  'TT2 VACCINATION COVERAGE': false,
  '% TT2 VACCINATION COVERAGE': false,
};

const totalMetric = {
  TOTAL: true,
};

const lengthMetric = {
  length: true,
};

const MetricsStore = createStore({
  initialData: {},
  mixins: [SaneStore],
  init() {
    this.listenTo(ViewStore, 'recompute');
    this.listenTo(changeMetric, 'changeMetric');
  },
  recompute() {
    const { dataType } = ViewStore.get();
    const data = DataTypes.match(dataType, {
      Death: () => totalMetric, // TODO check if we need to change the dataset or include the data store
      FamilyPlanning: () => familyMetrics,
      Deliveries: () => deliveriesMetrics,
      HealthWorkers: () => totalMetric, // TODO check if we need to change the dataset or include the data store,
      IPD: () => totalMetric, // TODO check if we need to change the dataset or include the data store,
      OPD: () => totalMetric, // TODO check if we need to change the dataset or include the data store
      Tetanus: () => tetanusMetrics,
      HivCenter: () => lengthMetric,
      Facilities: () => lengthMetric,
    });
    this.setData(data);
  },

  changeMetric(newMetric) {
    const all = this.get();
    const newState = Object.keys(all).reduce((ret, m) => {
      if (m === newMetric) {
        ret[m] = true;
      } else {
        ret[m] = false;
      }
      return ret;
    }, {});
    this.setData(newState);
  },
});

export default MetricsStore;
