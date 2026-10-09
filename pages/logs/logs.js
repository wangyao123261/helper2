const store = require('../../utils/store');
const { decorateLog, sortByDate } = require('../../utils/present');
const { fmtShort, toast } = require('../../utils/format');

Page({
  data: {
    keyword: '',
    list: []
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 });
    }
    this.refresh();
  },
  refresh() {
    const keyword = (this.data.keyword || '').trim();
    const map = store.recordMap();
    const list = sortByDate(store.getLogs()).map((item) => decorateLog(item, map)).filter((item) => {
      if (!keyword) return true;
      return item.date.indexOf(keyword) >= 0 || item.companies.some((name) => name.indexOf(keyword) >= 0);
    });
    this.setData({ list });
  },
  onSearch(e) {
    this.setData({ keyword: e.detail.value }, () => this.refresh());
  },
  openLog(e) {
    wx.navigateTo({ url: '/pages/log-detail/log-detail?id=' + e.currentTarget.dataset.id });
  },
  exportFile(e) {
    const kind = e.currentTarget.dataset.kind;
    const date = e.currentTarget.dataset.date;
    const name = fmtShort(date) + ' 工作日志';
    toast(kind === 'word' ? '已模拟导出《' + name + '》Word' : '已模拟导出《' + name + '》PPT');
  }
});
