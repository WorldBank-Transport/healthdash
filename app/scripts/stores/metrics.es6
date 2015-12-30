import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import ViewStore from './view';
import { changeMetric } from '../actions/metrics';

const items = obj => Object.keys(obj).map(k => [k, obj[k]]);

const MetricsStore = createStore({
  initialData: [],
  mixins: [SaneStore],
  init() {
    this.listenTo(ViewStore, 'recompute');
  },
  recompute() {
    const { dataType } = ViewStore.get();
    const data = DataTypes.match(dataType, {
      Death: () => {TOTAL: true}, // TODO check if we need to change the dataset or include the data store
      FamilyPlanning: () => {'TOTAL FAMILY PLANNING CLIENTS': true, 'NEW CLIENTS': false, 'FAMILY PLANNING CONTINUIOUS': false, 'PROJECTED FAMILY PLANNING CLIENTS (WOMEN AGE 15-49)': false},
      Deliveries: () => {'TOTAL': true, 'HEALTH FACILITY DELIVERIES': false, 'TRADITIONAL BIRTH ATTENDANTS (TBA)': false, 'ANTENATAL CARE PROJECTION': false, 'BORN BEFORE ARRIVAL (BBA)': false, 'HOME DELIVERY': false},
      HealthWorkers: () => {TOTAL: true}, // TODO check if we need to change the dataset or include the data store,
      IPD: () => {TOTAL: true}, // TODO check if we need to change the dataset or include the data store,
      OPD: () => {TOTAL: true}, // TODO check if we need to change the dataset or include the data store
      Tetanus: () => {'PROJECTED CLIENTS': true, 'TOTAL ATTENDANCE': false, 'TT2 VACCINATION COVERAGE': false, '% TT2 VACCINATION COVERAGE': false},
      HivCenter: () => {length: true},
      Facilities: () => {length: true},
    });
    this.setData(data);
  },
});

export default MetricsStore;