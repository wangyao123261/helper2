function fmtDate(s) {
  const d = new Date(s + 'T00:00:00');
  const week = '日一二三四五六'[d.getDay()];
  return `${+s.slice(0, 4)}年${+s.slice(5, 7)}月${+s.slice(8, 10)}日 星期${week}`;
}

function fmtShort(s) {
  return `${+s.slice(0, 4)}年${+s.slice(5, 7)}月${+s.slice(8, 10)}日`;
}

function weekdayChip(s) {
  const d = new Date(s + 'T00:00:00');
  return `${s} 周${'日一二三四五六'[d.getDay()]}`;
}

function cnNum(i) {
  const list = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  return list[i] || String(i + 1);
}

function shortCat(c) {
  return String(c || '').replace(/（[^）]*）$/, '');
}

function etypeTag(etype) {
  const text = etype || '';
  if (text.indexOf('A级') >= 0) return 'tag-blue';
  if (text.indexOf('B级') >= 0) return 'tag-orange';
  if (text.indexOf('超低排放') >= 0) return 'tag-green';
  return 'tag-gray';
}

function etypeTags(etype) {
  return String(etype || '').split(/[、，,]/).map((text) => text.trim()).filter(Boolean).map((text) => ({
    text,
    tagClass: etypeTag(text)
  }));
}

function addDays(s, n) {
  const d = new Date(s + 'T00:00:00');
  d.setDate(d.getDate() + n);
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const m = month < 10 ? '0' + month : '' + month;
  const day = date < 10 ? '0' + date : '' + date;
  return `${d.getFullYear()}-${m}-${day}`;
}

function toast(title) {
  wx.showToast({ title, icon: 'none', duration: 2200 });
}

module.exports = {
  fmtDate,
  fmtShort,
  weekdayChip,
  cnNum,
  shortCat,
  etypeTag,
  etypeTags,
  addDays,
  toast
};
