const store = require('../../utils/store');
const { getToday, PROVINCES, CITIES, ETYPES, PROBLEM_MAP, CAT_ORDER } = require('../../utils/constants');
const { cnNum, toast } = require('../../utils/format');

function withSubOptions(subs) {
  return ['请选择问题小类'].concat(subs || []);
}

function blankProblem() {
  return { label: '一', catIndex: -1, subs: [], subOptions: ['请选择问题小类'], subIndex: -1, desc: '', photos: [] };
}

function isPerformanceType(type) {
  return type.indexOf('绩效分级') === 0;
}

function buildEtypeOptions(selected) {
  return ETYPES.map((value) => ({ value, selected: selected.indexOf(value) >= 0 }));
}

function parseEtypes(value) {
  const selected = [];
  let etypeNote = '';
  String(value || '').split('、').forEach((type) => {
    if (type.indexOf('其他') === 0) {
      selected.push('其他');
      const match = type.match(/^其他（(.*)）$/);
      if (match) etypeNote = match[1];
    } else if (ETYPES.indexOf(type) >= 0) {
      selected.push(type);
    }
  });
  const performanceType = selected.find(isPerformanceType);
  const unique = Array.from(new Set(selected.filter((type) => !isPerformanceType(type))));
  if (performanceType) unique.push(performanceType);
  return {
    selected: ETYPES.filter((type) => unique.indexOf(type) >= 0),
    etypeNote
  };
}

function persistPhotos(photos) {
  const fs = wx.getFileSystemManager();
  return Promise.all((photos || []).map((photo) => {
    if (!photo.url) return Promise.resolve(photo);
    return new Promise((resolve) => {
      fs.saveFile({
        tempFilePath: photo.url,
        success: (res) => resolve(Object.assign({}, photo, { url: res.savedFilePath })),
        fail: () => resolve(photo)
      });
    });
  }));
}

Page({
  data: {
    editing: false,
    navTitle: '新增督查记录',
    provinces: PROVINCES,
    provinceOptions: ['请选择'].concat(PROVINCES),
    catOptions: ['请选择问题大类'].concat(CAT_ORDER),
    provinceIndex: -1,
    cities: [],
    cityIndex: 0,
    company: '',
    etypeOptions: buildEtypeOptions([]),
    selectedEtypes: [],
    showEtypeNote: false,
    etypeNote: '',
    industry: '',
    contact: '',
    phone: '',
    gates: '',
    channels: '',
    monitors: ['请选择', '已安装', '未安装'],
    monitorIndex: 0,
    capacity: '',
    output: '',
    materials: '',
    matFrom: '',
    matTo: '',
    transport: '',
    cleanRatio: '',
    calcMethod: '',
    vehicles: '',
    machinery: '',
    cats: CAT_ORDER,
    problems: [],
    err: {}
  },

  onLoad(query) {
    if (!query.id) {
      const problems = [blankProblem()];
      problems[0].label = cnNum(0);
      this.setData({ problems });
      return;
    }
    const rec = store.getRecord(query.id);
    if (!rec) return;
    const provinceIndex = PROVINCES.indexOf(rec.province);
    const cities = CITIES[rec.province] || [];
    const cityIndex = Math.max(0, cities.indexOf(rec.city));
    const etypeInfo = parseEtypes(rec.etype);
    const problems = (rec.problems || []).map((item, index) => {
      const catIndex = CAT_ORDER.indexOf(item.cat);
      const subs = catIndex >= 0 ? PROBLEM_MAP[item.cat] : [];
      const subIndex = subs.indexOf(item.sub);
      return {
        label: cnNum(index),
        catIndex,
        subs,
        subOptions: withSubOptions(subs),
        subIndex,
        desc: item.desc || '',
        photos: (item.photos || []).filter((photo) => !(photo.ph === 'ledger' && photo.cap === '佐证照片' && !photo.url))
      };
    });
    this.setData({
      editing: true,
      navTitle: '编辑督查记录',
      id: rec.id,
      date: rec.date,
      provinceIndex,
      cities,
      cityIndex,
      company: rec.company,
      selectedEtypes: etypeInfo.selected,
      etypeOptions: buildEtypeOptions(etypeInfo.selected),
      showEtypeNote: etypeInfo.selected.indexOf('其他') >= 0,
      etypeNote: etypeInfo.etypeNote,
      industry: rec.industry,
      contact: rec.contact || '',
      phone: rec.phone || '',
      gates: rec.gates === 0 || rec.gates ? String(rec.gates) : '',
      channels: rec.channels === 0 || rec.channels ? String(rec.channels) : '',
      monitorIndex: rec.monitor === '已安装' ? 1 : (rec.monitor === '未安装' ? 2 : 0),
      capacity: rec.capacity || '',
      output: rec.output || '',
      materials: rec.materials || '',
      matFrom: rec.matFrom || '',
      matTo: rec.matTo || '',
      transport: rec.transport || '',
      cleanRatio: rec.cleanRatio || '',
      calcMethod: rec.calcMethod || '',
      vehicles: rec.vehicles === 0 || rec.vehicles ? String(rec.vehicles) : '',
      machinery: rec.machinery || '',
      problems
    });
  },

  setIndustry(name) {
    this.setData({ industry: name, 'err.industry': false });
  },

  onBack() {
    if (getCurrentPages().length > 1) wx.navigateBack();
    else wx.switchTab({ url: '/pages/home/home' });
  },

  onProvince(e) {
    const raw = Number(e.detail.value);
    if (raw <= 0) {
      this.setData({ provinceIndex: -1, cities: [], cityIndex: 0 });
      return;
    }
    const provinceIndex = raw - 1;
    const province = PROVINCES[provinceIndex];
    this.setData({
      provinceIndex,
      cities: CITIES[province] || ['其他'],
      cityIndex: 0,
      'err.province': false
    });
  },

  onCity(e) {
    this.setData({ cityIndex: Number(e.detail.value), 'err.city': false });
  },

  pickEtype(e) {
    const type = e.currentTarget.dataset.v;
    let selected = this.data.selectedEtypes.slice();
    if (selected.indexOf(type) >= 0) {
      selected = selected.filter((item) => item !== type);
    } else {
      if (isPerformanceType(type)) selected = selected.filter((item) => !isPerformanceType(item));
      selected.push(type);
    }
    selected = ETYPES.filter((item) => selected.indexOf(item) >= 0);
    this.setData({
      selectedEtypes: selected,
      etypeOptions: buildEtypeOptions(selected),
      showEtypeNote: selected.indexOf('其他') >= 0,
      'err.etype': false
    });
  },

  onNote(e) { this.setData({ etypeNote: e.detail.value }); },
  onCompany(e) { this.setData({ company: e.detail.value, 'err.company': false }); },
  onContact(e) { this.setData({ contact: e.detail.value }); },
  onPhone(e) { this.setData({ phone: e.detail.value }); },
  onGates(e) { this.setData({ gates: e.detail.value }); },
  onChannels(e) { this.setData({ channels: e.detail.value }); },
  onMonitor(e) { this.setData({ monitorIndex: Number(e.detail.value) }); },
  onCapacity(e) { this.setData({ capacity: e.detail.value }); },
  onOutput(e) { this.setData({ output: e.detail.value }); },
  onMaterials(e) { this.setData({ materials: e.detail.value }); },
  onMatFrom(e) { this.setData({ matFrom: e.detail.value }); },
  onMatTo(e) { this.setData({ matTo: e.detail.value }); },
  onTransport(e) { this.setData({ transport: e.detail.value }); },
  onClean(e) { this.setData({ cleanRatio: e.detail.value }); },
  onCalc(e) { this.setData({ calcMethod: e.detail.value }); },
  onVehicles(e) { this.setData({ vehicles: e.detail.value }); },
  onMachinery(e) { this.setData({ machinery: e.detail.value }); },

  goIndustry() {
    wx.navigateTo({ url: '/pages/industry/industry' });
  },

  renumber(problems) {
    return problems.map((item, index) => Object.assign({}, item, { label: cnNum(index) }));
  },

  addProblem() {
    const problems = this.data.problems.concat([blankProblem()]);
    this.setData({ problems: this.renumber(problems) });
  },

  removeProblem(e) {
    const index = e.currentTarget.dataset.index;
    const problems = this.data.problems.filter((_, i) => i !== index);
    this.setData({ problems: this.renumber(problems) });
  },

  onCat(e) {
    const index = e.currentTarget.dataset.index;
    const raw = Number(e.detail.value);
    if (raw <= 0) {
      this.setData({
        [`problems[${index}].catIndex`]: -1,
        [`problems[${index}].subs`]: [],
        [`problems[${index}].subOptions`]: ['请选择问题小类'],
        [`problems[${index}].subIndex`]: -1
      });
      return;
    }
    const catIndex = raw - 1;
    const cat = CAT_ORDER[catIndex];
    this.setData({
      [`problems[${index}].catIndex`]: catIndex,
      [`problems[${index}].subs`]: PROBLEM_MAP[cat] || [],
      [`problems[${index}].subOptions`]: withSubOptions(PROBLEM_MAP[cat]),
      [`problems[${index}].subIndex`]: -1
    });
  },

  onSub(e) {
    const index = e.currentTarget.dataset.index;
    const raw = Number(e.detail.value);
    this.setData({ [`problems[${index}].subIndex`]: raw <= 0 ? -1 : raw - 1 });
  },

  onDesc(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ [`problems[${index}].desc`]: e.detail.value });
  },

  choosePhoto(e) {
    const index = e.currentTarget.dataset.index;
    wx.chooseMedia({
      count: 6,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const extra = res.tempFiles.map((file) => ({ url: file.tempFilePath, cap: '现场照片' }));
        const photos = (this.data.problems[index].photos || []).concat(extra);
        this.setData({ [`problems[${index}].photos`]: photos });
      }
    });
  },

  removePhoto(e) {
    const index = e.currentTarget.dataset.index;
    const photoIndex = e.currentTarget.dataset.photo;
    const photos = this.data.problems[index].photos.filter((_, i) => i !== photoIndex);
    this.setData({ [`problems[${index}].photos`]: photos });
  },

  previewPhoto(e) {
    const index = Number(e.currentTarget.dataset.index);
    const photoIndex = Number(e.currentTarget.dataset.photo);
    const photos = this.data.problems[index].photos || [];
    const photo = photos[photoIndex];
    if (!photo || !photo.url) {
      toast('该图片为示意图，无法预览');
      return;
    }
    const urls = photos.filter((item) => item.url).map((item) => item.url);
    wx.previewImage({ current: photo.url, urls });
  },

  save() {
    const d = this.data;
    const err = {};
    let message = '';
    if (d.provinceIndex < 0) { err.province = true; message = message || '请选择省（市、区）'; }
    if (d.provinceIndex >= 0 && !d.cities.length) { err.city = true; message = message || '请选择地市'; }
    if (!(d.company || '').trim()) { err.company = true; message = message || '请输入企业名称'; }
    if (!d.selectedEtypes.length) { err.etype = true; message = message || '请选择企业类型'; }
    if (!d.industry) { err.industry = true; message = message || '请选择行业类别'; }
    const ratio = d.cleanRatio === '' ? '' : Number(d.cleanRatio);
    if (ratio !== '' && (ratio < 0 || ratio > 100 || isNaN(ratio))) {
      err.clean = true;
      message = message || '清洁运输比例需在 0-100';
    }
    if (message) {
      this.setData({ err });
      toast('请完善必填项：' + message);
      return;
    }

    const picked = d.problems.filter((item) => item.catIndex >= 0);
    Promise.all(picked.map((item) => persistPhotos(item.photos).then((photos) => {
      const cat = CAT_ORDER[item.catIndex];
      const subs = PROBLEM_MAP[cat] || [];
      const sub = item.subIndex >= 0 ? subs[item.subIndex] : (subs[0] || '');
      return {
        cat,
        sub,
        desc: (item.desc || '').trim(),
        photos
      };
    }))).then((problems) => {
      const etype = d.selectedEtypes.map((type) => {
        if (type === '其他' && (d.etypeNote || '').trim()) return '其他（' + d.etypeNote.trim() + '）';
        return type;
      }).join('、');
      const rec = {
        id: d.editing ? d.id : 'R' + Date.now(),
        date: d.editing ? d.date : getToday(),
        province: PROVINCES[d.provinceIndex],
        city: d.cities[d.cityIndex],
        company: d.company.trim(),
        etype,
        industry: d.industry,
        contact: (d.contact || '').trim(),
        phone: (d.phone || '').trim(),
        gates: d.gates,
        channels: d.channels,
        monitor: d.monitorIndex > 0 ? d.monitors[d.monitorIndex] : '',
        capacity: (d.capacity || '').trim(),
        output: (d.output || '').trim(),
        materials: (d.materials || '').trim(),
        matFrom: (d.matFrom || '').trim(),
        matTo: (d.matTo || '').trim(),
        transport: (d.transport || '').trim(),
        cleanRatio: d.cleanRatio === '' ? '' : String(d.cleanRatio),
        calcMethod: (d.calcMethod || '').trim(),
        vehicles: d.vehicles,
        machinery: (d.machinery || '').trim(),
        problems
      };
      if (d.editing) {
        store.updateRecord(rec);
        toast('督查记录已更新');
        setTimeout(() => wx.navigateBack(), 400);
      } else {
        store.addRecord(rec);
        toast('记录已保存，并写入今日日志');
        setTimeout(() => wx.switchTab({ url: '/pages/records/records' }), 500);
      }
    });
  }
});
