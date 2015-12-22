import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import viewActions from '../actions/view';
import tzBounds from '../constants/tz-bounds';
import DataTypes from '../constants/data-types';


const ViewStore = createStore({
  initialData: {
    mapBounds: tzBounds,
    dataType: DataTypes.Facilities(),
  },
  mixins: [SaneStore],
  init() {
    this.listenTo(viewActions.setView, 'setView');
    this.listenTo(viewActions.setMapBounds, 'setMapBounds');
  },
  setView(newView) {
    this.setData({...this.get(), ...newView});
  },
  setMapBounds(newBounds) {
    this.setData({...this.get(), mapBounds: newBounds});
  },
});


export default ViewStore;
