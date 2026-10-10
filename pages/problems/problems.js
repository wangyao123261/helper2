const store = require('../../utils/store');
const { getToday } = require('../../utils/constants');
const { cnNum, shortCat, addDays } = require('../../utils/format');

Page({
  data: {
    filter: 'all',
    from: '',
    to: '',
    countText: '',
    list: []
  },
  onShow() {
    this.refresh();
  },
  refresh() {
    const items = [];
    store.getRecords().forEach((record) => {
      (record.problems || []).forEach((problem, index) => {
        items.push({
          id: record.id + '-' + index,
          recordId: record.id,
          company: record.company,
          date: record.date,
          indexLabel: cnNum(index),
          no: index + 1,
          catShort: shortCat(problem.cat),
          sub: problem.sub,
          desc: problem.desc
        });
      });
    });
    items.sort((a, b) => (a.date < b.date ? 1 : -1));
    const today = getToday();
    const from = this.data.from;
    const to = this.data.to;
    const filter = this.data.filter;
    const shown = items.filter((item) => {
      if (from && item.date < from) return false;
      if (to && item.date > to) return false;
      if (filter === '7d' && (item.date < addDays(today, -6) || item.date > today)) return false;
      if (filter === '30d' && (item.date < addDays(today, -29) || item.date > today)) return false;
      return true;
    });
    this.setData({ list: shown, countText: '共 ' + shown.length + ' 项' });
  },
  setFilter(e) {
    this.setData({ filter: e.currentTarget.dataset.f, from: '', to: '' }, () => this.refresh());
  },
  onFrom(e) {
    this.setData({ from: e.detail.value, filter: '' }, () => this.refresh());
  },
  onTo(e) {
    this.setData({ to: e.detail.value, filter: '' }, () => this.refresh());
  },
  openRecord(e) {
    wx.navigateTo({ url: '/pages/record-detail/record-detail?id=' + e.currentTarget.dataset.id });
  }
});
