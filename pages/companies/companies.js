const store = require('../../utils/store');
const { companyList } = require('../../utils/present');

Page({
  data: { list: [], countText: '' },
  onShow() {
    const list = companyList(store.getRecords());
    this.setData({ list, countText: '共 ' + list.length + ' 家' });
  },
  openRecord(e) {
    wx.navigateTo({ url: '/pages/record-detail/record-detail?id=' + e.currentTarget.dataset.id });
  }
});
