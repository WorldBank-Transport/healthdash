import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import viewActions from '../actions/view';
import tzBounds from '../constants/tz-bounds';
import DataTypes from '../constants/data-types';
import ViewModes from '../constants/view-modes';

const ViewStore = createStore({
  initialData: {
    dataType: DataTypes.Facilities(),
    mapBounds: tzBounds,
    viewMode: ViewModes.Points(),
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
