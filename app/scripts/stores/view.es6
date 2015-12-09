import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import viewActions from '../actions/view';
import tzBounds from '../constants/tz-bounds';


const ViewStore = createStore({
  initialData: {
    mapBounds: tzBounds,
  },
  mixins: [SaneStore],
  init() {
    this.listenTo(viewActions.setMapBounds, 'setMapBounds');
  },
  setMapBounds(newBounds) {
    this.setData({...this.get(), mapBounds: newBounds});
  },
});


export default ViewStore;
