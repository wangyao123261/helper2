const store = require('../../utils/store');
const { decorateLog } = require('../../utils/present');
const { fmtShort, toast, cnNum } = require('../../utils/format');

Page({
  data: { log: null },
  onLoad(query) {
    this.logId = query.id;
  },
  onShow() {
    const raw = store.getLog(this.logId);
    if (!raw) {
      this.setData({ log: null });
      return;
    }
    const log = decorateLog(raw, store.recordMap());
    log.records = log.records.map((item, index) => Object.assign({}, item, { orderLabel: cnNum(index) }));
    this.setData({ log });
  },
  openRecord(e) {
    wx.navigateTo({ url: '/pages/record-detail/record-detail?id=' + e.currentTarget.dataset.id });
  },
  exportFile(e) {
    if (!this.data.log) return;
    const kind = e.currentTarget.dataset.kind;
    const name = fmtShort(this.data.log.date) + ' 工作日志';
    toast(kind === 'word' ? '已模拟导出《' + name + '》Word' : '已模拟导出《' + name + '》PPT');
  }
});
