const store = require('../../utils/store');
const { decorateRecord } = require('../../utils/present');

Page({
  data: { record: null },
  onLoad(query) {
    this.recordId = query.id;
  },
  onShow() {
    const raw = store.getRecord(this.recordId);
    this.setData({ record: raw ? decorateRecord(raw) : null });
  },
  onEdit() {
    if (!this.data.record) return;
    wx.navigateTo({ url: '/pages/add-record/add-record?id=' + this.data.record.id });
  }
});
