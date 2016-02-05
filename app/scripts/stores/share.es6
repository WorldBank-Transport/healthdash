import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
// Stores
import FilterStore from './filters';
import LangStore from './lang';
import LayoutStore from './layout';
import ViewStore from './view';
import ZoomStore from './zoom';
import YearStore from './year';
import TypeStore from './type';
// Actions
import { share, restoreShare } from '../actions/share';
import { loadCompleted } from '../actions/data';
import { setMapBounds } from '../actions/view';

import { postShare, getShare } from '../api';
import history from '../history';
import OpenClosed from '../constants/open-closed';

const ShareStore = createStore({
  initialData: false,
  mixins: [SaneStore],
  init() {
    this.listenTo(share, 'share');
    this.listenTo(restoreShare, 'restore');
  },
  share() {
    const lang = LangStore.get();
    const layout = LayoutStore.get();
    const layoutState = Object.keys(layout).reduce((ret, key) => {
      ret[key] = layout[key].getId();
      return ret;
    }, {});
    const fieldFilters = FilterStore.serialize();
    const view = ViewStore.get();
    const mapBound = ZoomStore.get();
    const shareData = {
      filters: fieldFilters,
      lang: lang,
      view: {
        dataType: view.dataType.toParam(),
        mapBounds: mapBound,
        viewMode: view.viewMode.toParam(),
      },
      layout: layoutState,
      components: {
        years: YearStore.get(),
        type: TypeStore.get(),
      },
    };
    postShare(shareData).then(res => {
      if (res.code === 200) {
        const url = `${window.location.origin}/#/share/${res.object.shareId}/`;
        // TODO post to google and then
        //urlShortener(url).then(res => {
        //  console.log(res);
        //});
        this.setData(url);
      }
    });
  },
  restore(shareId) {
    getShare(shareId).then(res => {
      if (res.code === 200) {
        const fieldFilters = res.object.filters;
        const view = res.object.view;
        history.pushState(null, `/dash/${view.viewMode}/${view.dataType}/`);
        const layout = Object.keys(res.object.layout).reduce((ret, key) => {
          ret[key] = OpenClosed.fromParam(res.object.layout[key]);
          return ret;
        }, {});
        loadCompleted.listen(() => {
          setMapBounds(view.mapBounds);
          FilterStore.deserialize(fieldFilters);
          TypeStore.setData(res.object.components.type);
          YearStore.setData(res.object.components.years);
          LayoutStore.setData(layout);
        });
      }
    });
  },
});

export default ShareStore;
