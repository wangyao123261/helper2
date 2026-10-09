const { INDUSTRIES } = require('../../utils/constants');

Page({
  data: {
    keyword: '',
    total: INDUSTRIES.length,
    list: INDUSTRIES
  },
  onSearch(e) {
    const keyword = (e.detail.value || '').trim();
    const list = INDUSTRIES.filter((name) => !keyword || name.indexOf(keyword) >= 0);
    this.setData({ keyword, list });
  },
  pick(e) {
    const name = e.currentTarget.dataset.name;
    const pages = getCurrentPages();
    const prev = pages[pages.length - 2];
    if (prev && typeof prev.setIndustry === 'function') prev.setIndustry(name);
    wx.navigateBack();
  }
});
