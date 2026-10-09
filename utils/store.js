const mock = require('./mock');
const { TODAY } = require('./constants');

const KEY = {
  ready: 'cc_ready_v1',
  records: 'cc_records_v1',
  logs: 'cc_logs_v1',
  profile: 'cc_profile_v1',
  password: 'cc_password_v1'
};

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

function ensure() {
  if (!wx.getStorageSync(KEY.ready)) {
    wx.setStorageSync(KEY.records, clone(mock.RECORDS));
    wx.setStorageSync(KEY.logs, clone(mock.LOGS));
    wx.setStorageSync(KEY.profile, clone(mock.PROFILE));
    wx.setStorageSync(KEY.password, '123456');
    wx.setStorageSync(KEY.ready, 1);
  }
}

function getRecords() {
  ensure();
  return clone(wx.getStorageSync(KEY.records) || []);
}

function saveRecords(list) {
  wx.setStorageSync(KEY.records, list);
}

function getLogs() {
  ensure();
  return clone(wx.getStorageSync(KEY.logs) || []);
}

function saveLogs(list) {
  wx.setStorageSync(KEY.logs, list);
}

function getProfile() {
  ensure();
  return clone(wx.getStorageSync(KEY.profile) || mock.PROFILE);
}

function saveProfile(profile) {
  wx.setStorageSync(KEY.profile, profile);
}

function getRecord(id) {
  return getRecords().find((item) => item.id === id) || null;
}

function getLog(id) {
  return getLogs().find((item) => item.id === id) || null;
}

function recordMap() {
  const map = {};
  getRecords().forEach((item) => {
    map[item.id] = item;
  });
  return map;
}

function addRecord(rec) {
  const records = getRecords();
  records.unshift(rec);
  saveRecords(records);
  const logs = getLogs();
  let log = logs.find((item) => item.date === rec.date);
  if (!log) {
    log = { id: 'L' + Date.now(), date: rec.date, recordIds: [] };
    logs.unshift(log);
  }
  if (log.recordIds.indexOf(rec.id) < 0) log.recordIds.push(rec.id);
  saveLogs(logs);
}

function updateRecord(rec) {
  const records = getRecords();
  const index = records.findIndex((item) => item.id === rec.id);
  if (index >= 0) records[index] = rec;
  else records.unshift(rec);
  saveRecords(records);
}

function checkPassword(oldPwd) {
  ensure();
  return wx.getStorageSync(KEY.password) === oldPwd;
}

function setPassword(pwd) {
  wx.setStorageSync(KEY.password, pwd);
}

function stats() {
  const records = getRecords();
  const logs = getLogs();
  const problems = records.reduce((sum, item) => sum + (item.problems ? item.problems.length : 0), 0);
  const companies = {};
  records.forEach((item) => {
    companies[item.company] = true;
  });
  return {
    records: records.length,
    companies: Object.keys(companies).length,
    logs: logs.length,
    problems
  };
}

module.exports = {
  TODAY,
  ensure,
  getRecords,
  saveRecords,
  getLogs,
  saveLogs,
  getProfile,
  saveProfile,
  getRecord,
  getLog,
  recordMap,
  addRecord,
  updateRecord,
  checkPassword,
  setPassword,
  stats
};
