const store = require('../../utils/store');
const { getToday } = require('../../utils/constants');
const { decorateRecord, sortByDate } = require('../../utils/present');
const { fmtShort, cnNum, toast } = require('../../utils/format');

Page({
  data: {
    dateText: '',
    count: 0,
    problemCount: 0,
    list: []
  },
  onShow() {
    const today = getToday();
    const list = sortByDate(store.getRecords().filter((item) => item.date === today)).map((item, index) => {
      return Object.assign(decorateRecord(item), { orderLabel: cnNum(index) });
    });
    const problemCount = list.reduce((sum, item) => sum + item.problems.length, 0);
    this.setData({
      dateText: fmtShort(today),
      count: list.length,
      problemCount,
      list
    });
  },
  goBack() {
    if (getCurrentPages().length > 1) wx.navigateBack();
    else wx.switchTab({ url: '/pages/home/home' });
  },
  openRecord(e) {
    wx.navigateTo({ url: '/pages/record-detail/record-detail?id=' + e.currentTarget.dataset.id });
  },
  goAdd() {
    wx.navigateTo({ url: '/pages/add-record/add-record' });
  },
  exportFile(e) {
    const kind = e.currentTarget.dataset.kind;
    const name = fmtShort(getToday()) + ' 工作日志';
    toast(kind === 'word' ? '已模拟导出《' + name + '》Word' : '已模拟导出《' + name + '》PPT');
  }
});
