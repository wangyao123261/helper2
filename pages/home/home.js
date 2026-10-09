const store = require('../../utils/store');
const { TODAY } = require('../../utils/constants');
const { weekdayChip } = require('../../utils/format');
const { decorateRecord, sortByDate, etypeBars, problemBars } = require('../../utils/present');

Page({
  data: {
    name: '',
    dateChip: '',
    stats: { records: 0, companies: 0, logs: 0, problems: 0 },
    etypeBars: [],
    problemBars: [],
    recent: []
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 });
    }
    const profile = store.getProfile();
    const records = store.getRecords();
    const recent = sortByDate(records).slice(0, 3).map(decorateRecord);
    this.setData({
      name: profile.name,
      dateChip: weekdayChip(TODAY),
      stats: store.stats(),
      etypeBars: etypeBars(records),
      problemBars: problemBars(records),
      recent
    });
  },
  goAdd() {
    wx.navigateTo({ url: '/pages/add-record/add-record' });
  },
  goToday() {
    wx.navigateTo({ url: '/pages/today-log/today-log' });
  },
  goRecords() {
    wx.switchTab({ url: '/pages/records/records' });
  },
  goLogs() {
    wx.switchTab({ url: '/pages/logs/logs' });
  },
  goCompanies() {
    wx.navigateTo({ url: '/pages/companies/companies' });
  },
  goProblems() {
    wx.navigateTo({ url: '/pages/problems/problems' });
  },
  openRecord(e) {
    wx.navigateTo({ url: '/pages/record-detail/record-detail?id=' + e.currentTarget.dataset.id });
  }
});
