import isUndefined from 'lodash/lang/isUndefined';
import isFunction from 'lodash/lang/isFunction';
import isArray from 'lodash/lang/isArray';
import React from 'react';
import warn from '../../utils/warn';
import { connect } from 'reflux';
import langStore from '../../stores/lang';


const allTranslations = {
  'en': {
    'site-name': 'Health Dashboard',
    'site.flag': 'Flag of Tanzania',

    'home.health': 'Health Centers',
    'home.boreholes': 'Boreholes',
    'home.dams': 'Dams',

    'nav.home': 'Home',
    'nav.data': 'Data',
    'nav.speak-out': 'Speak Out',

    'static.data-title': 'Explore the data behind the dashboard.',
    'static.data-content': 'This Water Dashboard was built on open data release by the government of Tanzania. The raw data is published on the Government\'s open data portal in machine-readable format with a license that encourages re-use. The data behind this education dashboard comes from Ministry of Water and the National Bureau of Statistics of Tanzania.',
    'static.speakout-title': 'Your voice matters!',
    'static.speakout-content': 'Complete this form to share feedback about the data.',

    'lang.en': 'English',
    'lang.sw-tz': 'Kiswahili',

    'filters.title': 'Dashboard Filters',

    'filters.population-served.unit': 'Number of people',
    'filters.filter-two': 'Filter Two',
    'filters.filter-three': 'Filter Three',
    'filter.year.2012': '2012',
    'filter.year.2013': '2013',
    'filter.year.2014': '2014',

    'legend.title': 'legend',
    'legend.lessthan50': '< 50',
    'legend.greaterhan50': '> 50',
    'legend.greaterhan75': '> 75',
    'legend.nodata': 'No Data',

    'dash.region': 'Regions',
    'dash.district': 'Districts',
    'dash.ward': 'Wards',
    'dash.national': 'National',

    'charts.toggle.closed': 'View Charts',
    'charts.toggle.opened': 'Hide Charts',

    'filters.toggle.closed': 'Dashboard Filters',
    'filters.toggle.opened': 'Hide Filters',

    'popup.close': 'Close popup',

    'view-mode.points.waterpoints': 'All Waterpoints',
    'view-mode.points.dams': 'All Dams',
    'view-mode.points.boreholes': 'All Boreholes',
    'view-mode.points': i => `All ${i[0]}`,
    'view-mode.region': 'Region',
    'view-mode.district': 'District',
    'view-mode.ward': 'Ward',
    'view-mode.disabled': 'Data not available',

    'data-type.death': 'Death',
    'data-type.family-planning': 'Family Planning',
    'data-type.deliveries': 'Deliveries',
    'data-type.health-workers': 'Health Workers',
    'data-type.ipd': 'IPD',
    'data-type.opd': 'OPD',
    'data-type.tetanous': 'Tetanous',
    'data-type.hiv-center': 'HIV Centers',
    'data-type.facilities': 'Health Falilities',

    'chart.health-facilities.title': 'Health Facilities',
    'chart.health-facilities.helptext': ' by Region',
    'chart.health-facilities.x-axis': 'Regions',
    'chart.health-facilities.y-axis': 'Facilities',
    'chart.facilities.title': 'All Facilities',
    'chart.hiv-facilities.title': 'HIV Facilities',
    'chart.hiv-facilities.helptext': ' by Region',
    'chart.hiv-facilities.x-axis': 'Regions',
    'chart.hiv-facilities.y-axis': 'Facilities',
    'chart.hiv.title': 'HIV/AIDS Care & Treatment Center',
    'chart.death.title': 'Deaths',
    'chart.death.helptext': ' by child age',
    'chart.death.x-axis': 'Year',
    'chart.death.y-axis': 'Death',
    'chart.deaths.title': 'Total Number of Death',
    'chart.deliveries.title': 'Total Number of Deliveries',
    'chart.deliveries-barchart.title': 'All Deliveries',
    'chart.deliveries-barchart.helptext': ' by type',
    'chart.deliveries-barchart.x-axis': 'Year',
    'chart.deliveries-barchart.y-axis': 'Deliveries',
    'chart.family-planning.title': 'Total Family Planning Clients',
    'chart.family-barchart.title': 'Family Planning',
    'chart.family-barchart.helptext': ' by type',
    'chart.family-barchart.x-axis': 'Year',
    'chart.family-barchart.y-axis': '# of client',
    'chart.workers.title': 'Total Number of Health Workers',
    'chart.health-worker.title': 'Health Workers',
    'chart.health-worker.helptext': ' by year',
    'chart.health-worker.x-axis': 'Year',
    'chart.health-worker.y-axis': '# workers',
    'chart.ipd.title': 'Total Number of In Patient Department',
    'chart.ipd-by-age-chart.title': 'IPD',
    'chart.ipd-by-age-chart.helptext': ' by child age',
    'chart.ipd-by-age-chart.x-axis': 'Year',
    'chart.ipd-by-age-chart.y-axis': 'IPD',
    'chart.opd.title': 'Total Number of Out Patient Department',
    'chart.opd-by-age-chart.title': 'OPD',
    'chart.opd-by-age-chart.helptext': ' by child age',
    'chart.opd-by-age-chart.x-axis': 'Year',
    'chart.opd-by-age-chart.y-axis': 'OPD',

    'overview-bar': 'Overview stuff',

    'footer.copy': 'The content of this website is published under a CC BY NC SA 3.0 license, and the source code is published under a GPL 3.0 license. Visitors are encouraged to examine and re-use the code as long as they publish it under a similar license.',

    'loading': 'Loading',
    'loading.data.death': 'Loading Death Stats',
    'loading.data.family-planning': 'Loading Family Planning Stats',
    'loading.data.deliveries': 'Loading Deliveries Stats',
    'loading.data.health-workers': 'Loading Health Workers Stats',
    'loading.data.ipd': 'Loading IPD',
    'loading.data.opd': 'Loading OPD',
    'loading.data.tetanous': 'Loading Tetanous Stats',
    'loading.data.hiv-center': 'Loading HIV Centers',
    'loading.data.facilities': 'Loading Health Falilities',

    'loading.regions': 'Loading regions...',
    'loading.districts': 'Loading districts...',
    'loading.wards': 'Loading wards...',
    'loading.points': 'If you see this message, there is likely an error in the application.',

    'drilldown.regions': 'Region',
    'drilldown.districts': 'District',
    'drilldown.wards': 'Ward',
    'drilldown.points': 'Point',
    'drilldown.back': 'Back To National',

    'error': 'We\'re sorry',
    'error.retry': 'Retry',
    'error.api.pre-request': 'An error occurred when the application was preparing to fetch data',
    'error.api.http': 'A network error occurred while trying to fetch data',
    'error.api.http.not-ok': 'A server error occurred while trying to fetch data',
    'error.api.ckan': 'The CKAN data server encountered an error while trying to fetch data',
    'error.api.ckan.unknown-field-type': i => `The CKAN data server returned data of an unknown type '${i[0]}' for field '${i[1]}'`,
    'error.api.ckan.record-missing-field': i => `A record from the CKAN data server was missing the field '${i[0]}'`,
    'error.api.postprocess': 'An error occurred while the application was processing data',
    'error.api.static.postprocess': 'An error occurred while the application was procesing boundary data',
  },
  'sw-tz': {
    'site-name': 'Water Dashboard',
    'site.flag': 'Flag of Tanzania',
    'home.waterpoints': 'Vituo vya maji safi na salama',
    'home.boreholes': 'Visima',
    'home.dams': 'Mabwawa',

    'nav.home': 'Mwanzo',
    'nav.data': 'Data',
    'nav.speak-out': 'Maoni',

    'static.data-title': 'Chunguza data ya dashibodi.',
    'static.data-content': 'Dashibodi ya elimu imejengwa juu ya Takwimu Huria zilizoainishwa na Serikali ya Tanzania. Takwimu ghafi zimetangazwa kwa tovuti kuu ya Serikali kwa njia inayosomeka na kompyuta ikitumia leseni inayohamasisha matumizi kwa jumla. Takwimu zimetangazwa na Wizara ya Maji, na Ofisi ya Taifa ya Takwimu.',
    'static.speakout-title': 'Sauti yako ni ya maana!',
    'static.speakout-content': 'Jaza fomu hii utupe maoni yako kuhusu takwimu zilizopo.',

    'lang.en': 'English',
    'lang.sw-tz': 'Kiswahili',

    'filters.title': 'Kichujio cha Dashibodi',
    'filters.population-served': 'Idadi ya watu wanaotumikiwa',
    'filters.population-served.unit': 'Idadi ya watu',
    'filters.filter-two': 'Kichujio 2',
    'filters.filter-three': 'Kichujio 3',

    'dash.waterpoints': 'Vituo vya maji safi na salama',
    'dash.waterpoint': 'Kituo cha maji safi na salama',
    'dash.region': 'Mikoa',
    'dash.district': 'Wilaya',
    'dash.ward': 'Kata',

    'charts.toggle.closed': 'Tazama Chati',
    'charts.toggle.opened': 'Ficha Chati',
    'chart.title.functional': 'Kituo kinachofanya kazi',
    'chart.title.non-functional': 'Kituo hakifanyi kazi',
    'chart.title.repair': 'Kituo kinachohitaji kurekebishwa',
    'chart.title.elevation': 'Mwinuko wastani wa mabwawa',
    'chart.title.height': 'Urefu wastani wa mabwawa',
    'chart.title.reservoir': 'Kiasi cha maji yaliyohifadhiwa kwa mabwawa',
    'chart.title.NON FUNCTIONAL < 3M': 'Kituo hakifanyi kazi < 3M',
    'chart.title.NON FUNCTIONAL < 6M': 'Kituo hakifanyi kazi < 6M',
    'chart.title.NON FUNCTIONAL > 3M': 'Kituo hakifanyi kazi > 3M',
    'chart.title.NON FUNCTIONAL > 6M': 'Kituo hakifanyi kazi > 6M',
    'chart.title.NON FUNCTIONAL': 'Kituo hakifanyi kazi',
    'chart.functional-waterpoints.title': 'Vituo vya maji safi na salama vinavyofanya kazi',
    'chart.functional-waterpoints.x-axis-REGION': 'Mikoa',
    'chart.functional-waterpoints.x-axis-DISTRICT': 'Wilaya',
    'chart.functional-waterpoints.x-axis-WARD': 'Kata',
    'chart.functional-waterpoints.y-axis': '%',
    'chart.status-waterpoints.title': 'Hali ya Kituo cha maji',
    'chart.status-waterpoints.x-axis-REGION': 'Mikoa',
    'chart.status-waterpoints.x-axis-DISTRICT': 'Wilaya',
    'chart.status-waterpoints.x-axis-WARD': 'Kata',
    'chart.status-waterpoints.y-axis': 'Hali',
    'chart.title-waterpoints-status': 'Hali ya Vituo vya maji',
    'chart.title-waterpoints-status-helptext': 'Iliyopangwa kwa % ya vituo vinavyofanya kazi',
    'chart.title-waterpoints-functional': 'Orodha ya hali ya vituo',
    'chart.title-waterpoints-functional-helptext': '%  ya vituo vinavyofanya kazi',
    'chart.title-boreholes-stats': 'Mabadiliko ya vialamishi',
    'chart.title-boreholes-stats-helptext': 'Wastani kwa miaka',
    'chart.title-population-served': 'Idadi ya watu',
    'chart.title-title-population-served-helptext': 'Uwiano wa idadi ya watu kwa vituo vya maji safi na salama',
    'chart.title.number-boreholes': 'Jumla ya idadi ya visima',
    'chart.waterpoints-people-ratio.x-axis-REGION': 'Mikoa',
    'chart.waterpoints-people-ratio.x-axis-DISTRICT': 'Wilaya',
    'chart.waterpoints-people-ratio.x-axis-WARD': 'Kata',
    'chart.waterpoints-people-ratio.y-axis': 'Uwiano',

    'chart.boreholes.title': 'Visima',
    'chart.boreholes.x-axis': 'Mikoa',
    'chart.boreholes.y-axis': '#',
    'chart.option.DIAMETER': 'Mduara',
    'chart.option.DEPTH_METER': 'Kina kwa mita',
    'chart.option.STATIC_WATER_LEVEL': 'Kiasi cha maji matulivu',
    'chart.option.DYNAMIC_WATER_LEVEL_METER': 'Kiasi cha maji yenye nguvu',
    'chart.option.DRAW _DOWN_METER': 'Kupungua kwa kiwango cha maji',
    'chart.option.YIELD_METER_CUBED_PER_HOUR': 'Mita za ujazo wa maji kwa saa',
    'chart.boreholes-stats.x-axis': 'Miaka',
    'chart.boreholes-stats.y-axis': '#',
    'chart.boreholes.summary': 'Jumuisho la vialamishi',
    'chart.title-boreholes-metric.DIAMETER': 'Mduara',
    'chart.title-boreholes-metric-helptext.DIAMETER': 'Mduara wastani wa visima',
    'chart.title-boreholes-metric.DEPTH_METER': 'Kina',
    'chart.title-boreholes-metric-helptext.DEPTH_METER': 'Kina wastani cha kisima',
    'chart.title-boreholes-metric.STATIC_WATER_LEVEL': 'Kiasi cha maji matulivu',
    'chart.title-boreholes-metric-helptext.STATIC_WATER_LEVEL': 'Kiasi wastani cha maji matulivu',
    'chart.title-boreholes-metric.DYNAMIC_WATER_LEVEL_METER': 'Kiasi wastani cha maji ya nguvu',
    'chart.title-boreholes-metric-helptext.DYNAMIC_WATER_LEVEL_METER': 'Kiasi wastani cha maji',
    'chart.title-boreholes-metric.DRAW _DOWN_METER': 'Kupungua kwa kiasi cha maji kwa mita',
    'chart.title-boreholes-metric-helptext.DRAW _DOWN_METER': 'Mita wastani za kupungua kwa kiasi cha maji',
    'chart.title-boreholes-metric.YIELD_METER_CUBED_PER_HOUR': 'Mita za ujazo wa maji kwa saa',
    'chart.title-boreholes-metric-helptext.YIELD_METER_CUBED_PER_HOUR': 'Mita wastani za ujazo wa maji kwa saa',

    'chart.title-dams': 'Hali ya mabwawa',
    'chart.title-dams-status-helptext': '',
    'chart.dams.x-axis': 'Mikoa',
    'chart.dams.y-axis': '#',

    'chart.option.DAM_HEIGHT': 'Urefu',
    'chart.option.ELEVATION_': 'Mwinuko',
    'chart.option.RESERVOIR_': 'Hifadhi',
    'chart.option.FUNCTIONAL': 'Kituo kinachofanya kazi',
    'chart.option.FUNCTIONAL NEEDS REPAIR': 'Kituo kinachohitaji kurekebishwa',
    'chart.option.NON FUNCTIONAL': 'Kituo hakifanyi kazi',

    'charts.category.filter.title': 'Chagua kama ilivyo ainishwa',
    'charts.sub-category.HARDWARE_PROBLEM': 'Tatizo la kifaa',
    'charts.sub-category.WATER_QUALITY': 'Kiwango cha maji',
    'charts.sub-category.WATER_QUANTITY': 'Kiasi cha maji',
    'charts.sub-category.SOURCE_TYPE': 'Chanzo cha maji',
    'charts.sub-category.value.PUMP STOLEN': 'Bomba iliyoibiwa',
    'charts.sub-category.value.UNDER CONSTRUCTION': 'Katika ujenzi',
    'charts.sub-category.value.PUMP BROKEN': 'Bomba iliyovunjika',
    'charts.sub-category.value.TAP BROKEN': 'Mfereji uliovunjika',
    'charts.sub-category.value.SOURCE DAMAGED': 'Chanzo cha maji kilichoharibika',
    'charts.sub-category.value.PIPE BROKEN': 'Buruma iliyovunjika',
    'charts.sub-category.value.TAP POORLY SITED': 'Mfereji kuwekwa sehemu mbaya',
    'charts.sub-category.value.ENGINE STOLEN': 'Mashine iliyoibiwa',
    'charts.sub-category.value.ENGINE BROKEN': 'Mashine iliyovunjika',
    'charts.sub-category.value.TANK OUT OF USE': 'Hodhi isiyotumika',
    'charts.sub-category.value.MACHINE-DRILLED BOREHOLE': 'Kisima kilichochimbwa kwa mashine',
    'charts.sub-category.value.OTHER': 'Nyingine',
    'charts.sub-category.value.SOFT': 'Maji laini',
    'charts.sub-category.value.SALTY': 'Maji yenye chumvi',
    'charts.sub-category.value.UNKNOWN': 'Haijulikani',
    'charts.sub-category.value.SALTY ABANDONED': 'Maji yenye chumvi yaliyowachwa',
    'charts.sub-category.value.COLOURED': 'Maji yenye rangi',
    'charts.sub-category.value.MILKY': 'Maji maziwa-maziwa',
    'charts.sub-category.value.FLUORIDE': 'Maji yenye flourine',
    'charts.sub-category.value.FLUORIDE ABANDONED': 'Maji yenye flourine yaliyowachwa',
    'charts.sub-category.value.GOOD': 'Nzuri',
    'charts.sub-category.value.ENOUGH': 'Inayotosha',
    'charts.sub-category.value.INSUFFICIENT': 'Haitoshi',
    'charts.sub-category.value.DRY': 'Iliyokauka',
    'charts.sub-category.value.SEASONAL': 'Inayotegemea Misimu',
    'charts.sub-category.value.SHALLOW WELL': 'Kisima juujuu',
    'charts.sub-category.value.MACHINE DBH': 'Mashine DBH',
    'charts.sub-category.value.RIVER': 'Mto',
    'charts.sub-category.value.RAINWATER HARVESTING': 'Kuvuna maji ya mvua',
    'charts.sub-category.value.SPRING': 'Chemchem ya maji',
    'charts.sub-category.value.DAM': 'Bwawa',
    'charts.sub-category.value.LAKE': 'Ziwa',
    'charts.sub-category.value.HAND DTW': 'Hand DTW',
    'charts.sub-category.value.NONE': 'None',
    'charts.sub-category.all': 'Chagua/Usichague yote',
    'charts.years.filter.title': 'Chagua mwaka',
    'charts.years.all': 'Chagua/Usichague yote',
    'charts.years.2009': '2009',
    'charts.years.2010': '2010',
    'charts.years.2011': '2011',
    'charts.years.2012': '2012',
    'charts.years.2013': '2013',
    'charts.years.2014': '2014',
    'chart.waterpoint.summary.top-problem': 'Shida kuu za vituo vya maji',
    'chart.waterpoint.summary.water-quality': 'Kiwango cha maji',
    'chart.waterpoint.summary.water-quantity': 'Kiasi cha maji',
    'chart.waterpoint.summary.source-type': 'Chanzo cha maji',
    'chart.waterpoint.summary.HARDWARE_PROBLEM': 'Tatizo la kifaa',
    'chart.waterpoint.summary.PUMP BROKEN': 'Bomba iliyovunjika',
    'chart.waterpoint.summary.UNDER CONSTRUCTION': 'Katika ujenzi',
    'chart.waterpoint.summary.TAP POORLY SITED': 'Mfereji kuwekwa sehemu mbaya',
    'chart.waterpoint.summary.TAP BROKEN': 'Mfereji Ulioharibika',
    'chart.waterpoint.summary.SOURCE DAMAGED': 'Chanzo cha maji kilichoharibika',
    'chart.waterpoint.summary.PIPE BROKEN': 'Buruma iliyovunjika',
    'chart.waterpoint.summary.TANK OUT OF USE': 'Hodhi isiyotumika',
    'chart.waterpoint.summary.ENGINE BROKEN': 'Mashine iliyovunjika',
    'chart.waterpoint.summary.PUMP STOLEN': 'Bomba iliyoibiwa',
    'chart.waterpoint.summary.ENGINE STOLEN': 'Mashine iliyoibiwa',
    'chart.waterpoint.summary.OTHER': 'Nyingine',
    'chart.waterpoint.summary.DIAMETER': 'Mduara Wastani',
    'chart.waterpoint.summary.DEPTH_METER': 'Kina wastani',
    'chart.waterpoint.summary.STATIC_WATER_LEVEL': 'Kiasi wastani cha maji matulivu',
    'chart.waterpoint.summary.DYNAMIC_WATER_LEVEL_METER': 'Kiasi wastani cha maji yenye nguvu',
    'chart.waterpoint.summary.DRAW_DOWN_METER': 'Mita wastani za kupungua kwa kiasi cha majir',
    'chart.waterpoint.summary.YIELD_METER_CUBED_PER_HOUR': 'Mita wastani za ujazo wa maji kwa saa',
    'chart.waterpoint.summary.SOFT': 'Maji laini',
    'chart.waterpoint.summary.SALTY': 'Maji yenye chumvi',
    'chart.waterpoint.summary.UNKNOWN': 'Haijulikani',
    'chart.waterpoint.summary.SALTY ABANDONED': 'Maji yenye chumvi yaliyowachwa',
    'chart.waterpoint.summary.COLOURED': 'Maji yenye rangi',
    'chart.waterpoint.summary.MILKY': 'Maji maziwa-maziwa',
    'chart.waterpoint.summary.FLUORIDE': 'Maji yenye flourine',
    'chart.waterpoint.summary.FLUORIDE ABANDONED': 'Maji yenye flourine yaliyowachwa',
    'chart.waterpoint.summary.GOOD': 'Nzuri',
    'chart.waterpoint.summary.ENOUGH': 'Inayotosha',
    'chart.waterpoint.summary.INSUFFICIENT': 'Haitoshi',
    'chart.waterpoint.summary.DRY': 'Iliyokauka',
    'chart.waterpoint.summary.SEASONAL': 'Inayotegemea Misimu',
    'chart.waterpoint.summary.SHALLOW WELL': 'Kisima juujuu',
    'chart.waterpoint.summary.MACHINE DBH': 'Mashine DBH',
    'chart.waterpoint.summary.RIVER': 'Mto',
    'chart.waterpoint.summary.RAINWATER HARVESTING': 'Kuvuna maji ya mvua',
    'chart.waterpoint.summary.SPRING': 'Chemchem ya maji',
    'chart.waterpoint.summary.DAM': 'Bwawa',
    'chart.waterpoint.summary.LAKE': 'Ziwa',
    'chart.waterpoint.summary.HAND DTW': 'Hand DTW',
    'chart.waterpoint.summary.NONE': 'None',
    'chart.waterpoint.summary.MACHINE-DRILLED BOREHOLE': 'Kisima kilichochimbwa kwa mashine',
    'chart.pie.WATER_QUALITY': 'Kiwango cha maji',
    'chart.pie.WATER_QUANTITY': 'Kiasi cha maji',
    'chart.pie.SOURCE_TYPE': 'Chanzo cha maji',


    'filters.toggle.closed': 'Kichujio cha Dashibodi',
    'filters.toggle.opened': 'Ficha Kichujio cha Dashibodi',

    'popup.close': 'Ondoka',

    'view-mode.points.waterpoints': 'Vituo vyote vya maji',
    'view-mode.points.dams': 'Mabwawa yote',
    'view-mode.points.boreholes': 'Visima vyote',
    'view-mode.points': i => `All ${i[0]}`,
    'view-mode.region': 'Mkoa',
    'view-mode.district': 'Wilaya',
    'view-mode.ward': 'Kata',
    'view-mode.disabled': 'Data haipo',

    'data-type.waterpoints': 'Vituo vya maji',
    'data-type.boreholes': 'Visima',
    'data-type.dams': 'Mabwawa',

    'overview-bar': 'Maelezo ya joomla',

    'footer.copy': 'Tovuti hii imechapishwa kwa leseni ya CC BY NC SA 3.0. Programu imeandikwa na kuchapishwa kwa leseni ya GPL 3.0. Wageni wa tovuti wanahamasishwa kuangalia programu kwa makini na kuitumia kama watachapisha programu zao kwa leseni inayolingana.',

    'loading': 'Loading',
    'loading.waterpoints': i => `${i[0]} waterpoints loaded...`,
    'loading.boreholes': i => `${i[0]} boreholes loaded...`,
    'loading.dams': i => `${i[0]} dams loaded...`,
    'loading.regions': 'Loading regions...',
    'loading.districts': 'Loading districts...',
    'loading.wards': 'Loading wards...',
    'loading.points': 'Ukiona ujumbe huu, kuna kosa limetokea katika tovuti.',

    'popup.waterpoint.code': 'Number #',
    'popup.waterpoint.source-type': 'Aina ya chanzo cha kituo cha maji',
    'popup.waterpoint.population-served': 'Idadi ya watu wanaotumikiwa',
    'popup.waterpoint.hardware-problem': 'Kituo cha maji kilicho shida',
    'popup.waterpoint.quantity': 'Kiasi cha maji',
    'popup.waterpoint.quality': 'Kiwango cha maji',
    'popup.waterpoint.location': 'Water Point Location',
    'popup.waterpoint.position': 'Latitude Longitude',
    'popup.waterpoint.region': 'Mkoa',
    'popup.waterpoint.district': 'Wilaya',
    'popup.waterpoint.ward': 'Kata',

    'error': 'We\'re sorry',
    'error.retry': 'Retry',
    'error.api.pre-request': 'An error occurred when the application was preparing to fetch data',
    'error.api.http': 'A network error occurred while trying to fetch data',
    'error.api.http.not-ok': 'A server error occurred while trying to fetch data',
    'error.api.ckan': 'The CKAN data server encountered an error while trying to fetch data',
    'error.api.ckan.unknown-field-type': i => `The CKAN data server returned data of an unknown type '${i[0]}' for field '${i[1]}'`,
    'error.api.ckan.record-missing-field': i => `A record from the CKAN data server was missing the field '${i[0]}'`,
    'error.api.postprocess': 'An error occurred while the application was processing data',
    'error.api.static.postprocess': 'An error occurred while the application was processing boundary data',
  },
};


/**
 * @param {string} lang The language to translate to like 'en'
 * @param {string} k The key for the translation, like 'site.name'
 * @param {array<any>} i Any values to interpolate into the string
 * @returns {string} the translated string, or the key if it's missing
 */
function translate(lang, k, i) {
  const langTranslations = allTranslations[lang];
  if (isUndefined(langTranslations)) {
    // if the language key is bad, quit early
    warn(`missing language ${lang} to translate ${k}`);
    return k;
  }
  let translated = langTranslations[k];
  if (isUndefined(translated)) {
    warn(`missing translation for key: ${k}`);
    translated = k;
  } else if (isFunction(translated)) {
    if (!isArray(i)) {
      warn(`missing expected array for interpolating ${k}, got: ${i}`);
      translated = translated([]);
    } else {
      translated = translated(i);
    }
  }
  return translated;
}


const T = React.createClass({
  propTypes: {
    i: React.PropTypes.array,
    k: React.PropTypes.string.isRequired,
  },
  mixins: [
    connect(langStore, 'lang'),
  ],
  render() {
    const translated = translate(this.state.lang, this.props.k, this.props.i);
    return (
      <span className="t">{translated}</span>
    );
  },
});

export { translate };
export default T;
