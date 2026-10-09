const store = require('../../utils/store');
const { decorateRecord, sortByDate } = require('../../utils/present');

Page({
  data: { list: [], countText: '' },
  onShow() {
    const list = sortByDate(store.getRecords()).map(decorateRecord);
    this.setData({ list, countText: '共 ' + list.length + ' 条' });
  },
  openRecord(e) {
    wx.navigateTo({ url: '/pages/record-detail/record-detail?id=' + e.currentTarget.dataset.id });
  }
});
