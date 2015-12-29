import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { loadCompleted } from '../actions/data';
import { selectYear, setInclude } from '../actions/filters';
import * as func from '../utils/functional';

const YearStore = createStore({
  initialData: {},
  mixins: [SaneStore],
  init() {
    this.listenTo(loadCompleted, 'loadData');
    this.listenTo(selectYear, 'changeYear');
  },

  changeYear(year) {
    const updated = this.unselectAll();
    updated[year] = !this.data[year];
    this.setData(updated);
    setInclude('YEAR', [year]);
  },

  unselectAll() {
    const updated = {};
    Object.keys(this.data).forEach(year => {
      updated[year] = false;
    });
    return updated;
  },

  getValuesForProperty(data, property) {
    return Object.keys(func.Result.groupBy(data, property)).reduce( (ret, value) => {
      return {
        ...ret,
        [value]: false,
      };
    }, {});
  },

  loadData(data) {
    const allYears = this.getValuesForProperty(data, 'YEAR');
    const firstYear = Object.keys(allYears)[0];
    allYears[firstYear] = true;
    this.setData(allYears);
    setInclude('YEAR', [firstYear]);
  },
});

export default YearStore;
