import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { toggleType } from '../actions/type';
import { setExclude } from '../actions/filters';

const TypeStore = createStore({
  initialData: {
    DISPENSARY: true,
    'HEALTH CENTRE': true,
    CLINIC: true,
    HOSPITAL: true,
  },
  mixins: [SaneStore],
  init() {
    this.listenTo(toggleType, 'toggleType');
  },
  toggleType(type) {
    const newState = {
      ...this.get(),
      [type]: !this.get()[type],
    };
    const excluded = Object.keys(newState).filter(key => !newState[key]);
    setExclude('FACILITY TYPE', excluded);
    this.setData(newState);
  },
});

export default TypeStore;
