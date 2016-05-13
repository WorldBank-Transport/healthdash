import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'reflux';
import T from '../misc/t';
import OpenClosed from '../../constants/open-closed';
import { Icon } from 'react-font-awesome';
import { share, pdf } from '../../actions/share';
import ShareStore from '../../stores/share';
import CopyToClipboard from 'react-copy-to-clipboard';
import PdfLoadingStore from '../../stores/loading-pdf';
import TSetChildProps from '../misc/t-set-child-props';
import SpinnerModal from '../misc/spinner-modal';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';

require('stylesheets/dashboard/share');

const Share = React.createClass({

  propTypes: {
    dataType: PropTypes.instanceOf(DataTypes.OptionClass).isRequired,
    viewMode: PropTypes.instanceOf(DataTypes.ViewModes).isRequired,
  },

  mixins: [
    connect(ShareStore, 'share'),
    connect(PdfLoadingStore, 'pdfLoading'),
  ],

  getInitialState() {
    return {openClosed: OpenClosed.Closed()};
  },

  toggle(e) {
    e.preventDefault();
    this.replaceState({
      ...this.state,
      openClosed: this.state.openClosed.toggle(),
    });
  },

  print() {
    const originalMap = document.getElementById('map1').cloneNode(true);
    const marks = originalMap.getElementsByClassName('leaflet-zoom-animated');
    const originalMarks = document.getElementsByClassName('leaflet-zoom-animated');
    for (let i = 0; i < marks.length; i++) {
      if (marks[i].localName === 'svg' && originalMarks[i]._leaflet_pos) {
        marks[i].style = `position: absolute;left: ${originalMarks[i]._leaflet_pos.x}px;top:${originalMarks[i]._leaflet_pos.y};z-index:1000;`;
      }
    }
    const selected = originalMap.getElementsByClassName('leaflet-marker-icon leaflet-zoom-animated leaflet-clickable');
    const originalSelected = document.getElementsByClassName('leaflet-marker-icon leaflet-zoom-animated leaflet-clickable');
    for (let i = 0; i < selected.length; i++) {
      if (selected[i].localName === 'img' && originalSelected[i]._leaflet_pos) {
        selected[i].style = `margin-left: ${originalSelected[i].style['margin-left']}; margin-top: ${originalSelected[i].style['margin-top']}; width: 25px; height: 41px; left: ${originalSelected[i]._leaflet_pos.x}px; top: ${originalSelected[i]._leaflet_pos.y}px; z-index: 440; position: absolute;`;
      }
    }
    const finalMap = originalMap.outerHTML.replace(/\/\//g, 'http://');
    const header = document.getElementsByClassName('logo');
    const viewName = document.getElementById('current-view').cloneNode(true);
    viewName.style = 'display: block';
    const headerHtml = header[0].outerHTML.replace(/src="images\//g, 'src="http://afya.takwimu.org/images/') + viewName.outerHTML;
    const leftPanel = document.getElementById('leftPanel');
    const leftPanelClean = leftPanel.outerHTML.replace(/src="images\//g, 'src="http://afya.takwimu.org/images/');
    const links = '<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.5/leaflet.css"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">';
    const styles = '<link rel="stylesheet" href="http://afya.takwimu.org/style.css"><style>#map1 {bottom: 0px;left: -150px;position: absolute;right: 0px;top: 0px;width: 100%;height:100%;} .logo {z-index:10;left: 50px;position: absolute;top: 10px;} .legend {z-index:10;left: 160px;position: absolute;bottom: 100px;} .right-panel {top: 0px;bottom: 0px;right: 0px} #current-view {color: #1595d3;font-size: 14px; font-weight: 700; line-height: 18px;z-index:10;left: 50px;position: absolute;top: 9%;}</style>';
    const htmlContent = `<html><head>${styles}</head><body id="pdf-body">${headerHtml}${finalMap}${leftPanelClean}${links}</body></html>`;
    //console.log(htmlContent);
    pdf(htmlContent);
  },

  render() {
    const direction = OpenClosed.match(this.state.openClosed, {
      Open: () => 'up',
      Closed: () => 'down',
    });
    return (
      <div className="share-selector">
        <div className="menu-item">
          <a onClick={this.toggle}>
            <T k="share.share"/> <Icon type={`sort-${direction}`}/>
          </a>
        </div>
        {
          OpenClosed.match(this.state.openClosed, {
            Open: () => (
              <div className="floating-div">
                <div className="share-wrapper">
                  <TSetChildProps>
                    <SpinnerModal
                        message={{k: 'loading.pdf'}}
                        retry={() => null}
                        state={this.state.pdfLoading} />
                  </TSetChildProps>
                  <ul>
                    <li className="share" onClick={share}><Icon type={`link`}/><T k="share.share" /></li>
                    <li className="feedback"><Link to="/speak-out/"><Icon type={`comments-o`}/><T k="share.feedback" /></Link></li>
                    <li className="print" onClick={this.print}><Icon type={`file-pdf-o`}/><T k="share.print" /></li>
                  </ul>
                  <input style={{'display': this.state.share ? 'block' : 'none'}} value={this.state.share} />
                  <CopyToClipboard style={{'display': this.state.share ? 'block' : 'none'}} text={this.state.share}>
                    <span className="copy-url">Copy</span>
                  </CopyToClipboard>
                  <div id="current-view" style={{display: 'none'}}>
                    <T k={`share.view.${this.props.dataType.toParam()}.${this.props.viewMode.toParam()}`}/>
                  </div>
                </div>
              </div>),
            Closed: () => <div style={{display: 'none'}}></div>,
          })
        }
      </div>
    );
  },
});
export default Share;
