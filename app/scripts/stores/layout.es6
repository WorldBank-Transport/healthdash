import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { toggleCharts, toggleFilters, toggleFacilities, toggleDataset, toggleYear } from '../actions/layout';
import OpenClosed from '../constants/open-closed';


const LayoutStore = createStore({
  initialData: {
    charts: OpenClosed.Closed(),
    dataset: OpenClosed.Closed(),
    facilities: OpenClosed.Closed(),
    filters: OpenClosed.Closed(),
    year: OpenClosed.Closed(),
  },
  mixins: [SaneStore],
  init() {
    this.listenTo(toggleCharts, 'toggleCharts');
    this.listenTo(toggleFacilities, 'toggleFacilities');
    this.listenTo(toggleDataset, 'toggleDataset');
    this.listenTo(toggleFilters, 'toggleFilters');
    this.listenTo(toggleYear, 'toggleYear');
  },
  update(what, to) {
    this.setData({
      ...this.get(),
      [what]: to,
    });
  },
  toggleCharts() {
    this.update('charts', this.get().charts.toggle());
  },
  toggleFilters() {
    this.update('filters', this.get().filters.toggle());
  },
  toggleDataset() {
    this.update('dataset', this.get().dataset.toggle());
  },
  toggleFacilities() {
    this.update('facilities', this.get().facilities.toggle());
  },
  toggleYear() {
    this.update('year', this.get().year.toggle());
  },
});


export default LayoutStore;
