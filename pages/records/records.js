const store = require('../../utils/store');
const { decorateRecord, sortByDate } = require('../../utils/present');

Page({
  data: {
    keyword: '',
    filter: 'all',
    list: []
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 });
    }
    this.refresh();
  },
  refresh() {
    const keyword = (this.data.keyword || '').trim();
    const filter = this.data.filter;
    const list = sortByDate(store.getRecords()).filter((item) => {
      const hit = !keyword || item.company.indexOf(keyword) >= 0 || item.province.indexOf(keyword) >= 0 || item.city.indexOf(keyword) >= 0;
      const count = (item.problems || []).length;
      const ok = filter === 'all' || (filter === 'has' ? count > 0 : count === 0);
      return hit && ok;
    }).map(decorateRecord);
    this.setData({ list });
  },
  onSearch(e) {
    this.setData({ keyword: e.detail.value }, () => this.refresh());
  },
  setFilter(e) {
    this.setData({ filter: e.currentTarget.dataset.f }, () => this.refresh());
  },
  openRecord(e) {
    wx.navigateTo({ url: '/pages/record-detail/record-detail?id=' + e.currentTarget.dataset.id });
  },
  goAdd() {
    wx.navigateTo({ url: '/pages/add-record/add-record' });
  }
});
