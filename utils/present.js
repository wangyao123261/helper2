const { ETYPES, CAT_ORDER } = require('./constants');
const { fmtDate, fmtShort, cnNum, shortCat, etypeTag } = require('./format');

function problemText(record) {
  const list = record.problems || [];
  if (!list.length) return { problemText: '未发现问题', problemTag: 'tag-green' };
  const first = shortCat(list[0].cat);
  return {
    problemText: `问题 ${list.length} 项：${first}${list.length > 1 ? ' 等' : ''}`,
    problemTag: 'tag-red'
  };
}

function decorateRecord(record) {
  const problem = problemText(record);
  const ratio = Math.max(0, Math.min(100, Number(record.cleanRatio) || 0));
  return Object.assign({}, record, problem, {
    tagClass: etypeTag(record.etype),
    initial: (record.province || '').slice(0, 1),
    location: record.province === record.city ? record.province : `${record.province}·${record.city}`,
    monitorTag: record.monitor === '已安装' ? 'tag-green' : 'tag-red',
    monitorText: record.monitor === '已安装' ? '安装有' : '未安装',
    cleanWidth: ratio + '%',
    problemsView: (record.problems || []).map((item, index) => Object.assign({}, item, {
      indexLabel: cnNum(index),
      no: index + 1,
      catShort: shortCat(item.cat),
      photos: (item.photos || []).filter((photo) => !(photo.ph === 'ledger' && photo.cap === '佐证照片' && !photo.url))
    }))
  });
}

function sortByDate(list) {
  return list.slice().sort((a, b) => {
    if (a.date === b.date) return 0;
    return a.date < b.date ? 1 : -1;
  });
}

function decorateLog(log, map) {
  const records = (log.recordIds || []).map((id) => map[id]).filter(Boolean).map(decorateRecord);
  const problemCount = records.reduce((sum, item) => sum + item.problems.length, 0);
  const names = records.map((item) => item.company.replace(/有限公司|有限责任公司|集团/, '')).join('、');
  return {
    id: log.id,
    date: log.date,
    dateText: fmtDate(log.date),
    shortText: fmtShort(log.date),
    count: records.length,
    problemCount,
    summary: `调研${names}共 ${records.length} 家企业，发现问题 ${problemCount} 项。`,
    intro: `${fmtShort(log.date)}调研${records.map((item) => item.company).join('、')}共 ${records.length} 家企业，情况具体如下：`,
    companies: records.map((item) => item.company),
    records
  };
}

function etypeBars(records) {
  const counts = ETYPES.map((etype) => ({
    t: etype.replace('绩效分级', ''),
    n: records.filter((item) => {
      const types = String(item.etype || '').split('、');
      return etype === '其他'
        ? types.some((type) => type.indexOf('其他') === 0)
        : types.indexOf(etype) >= 0;
    }).length
  })).filter((item) => item.n > 0);
  const max = Math.max.apply(null, counts.map((item) => item.n).concat([1]));
  return counts.map((item) => Object.assign({}, item, { width: (item.n / max) * 100 + '%' }));
}

function problemBars(records) {
  const counts = CAT_ORDER.map((cat) => ({
    c: cat,
    t: shortCat(cat),
    n: records.reduce((sum, record) => sum + (record.problems || []).filter((item) => item.cat === cat).length, 0)
  })).filter((item) => item.n > 0);
  const max = Math.max.apply(null, counts.map((item) => item.n).concat([1]));
  return counts.map((item) => Object.assign({}, item, { width: (item.n / max) * 100 + '%' }));
}

function companyList(records) {
  const map = {};
  records.forEach((record) => {
    const current = map[record.company] || {
      company: record.company,
      province: record.province,
      city: record.city,
      industry: record.industry,
      etype: record.etype,
      tagClass: etypeTag(record.etype),
      count: 0,
      problems: 0,
      latest: '',
      id: record.id
    };
    current.count += 1;
    current.problems += (record.problems || []).length;
    if (record.date > current.latest) {
      current.latest = record.date;
      current.id = record.id;
      current.etype = record.etype;
      current.tagClass = etypeTag(record.etype);
    }
    map[record.company] = current;
  });
  return Object.keys(map).map((key) => map[key]).sort((a, b) => {
    if (a.latest === b.latest) return 0;
    return a.latest < b.latest ? 1 : -1;
  });
}

module.exports = {
  decorateRecord,
  decorateLog,
  sortByDate,
  etypeBars,
  problemBars,
  companyList
};
