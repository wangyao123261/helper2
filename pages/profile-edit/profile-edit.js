const store = require('../../utils/store');
const { ROLES } = require('../../utils/constants');
const { toast } = require('../../utils/format');

Page({
  data: {
    name: '',
    phone: '',
    roles: ROLES,
    roleIndex: 0
  },
  onLoad() {
    const profile = store.getProfile();
    const roleIndex = Math.max(0, ROLES.indexOf(profile.role));
    this.setData({
      name: profile.name,
      phone: profile.phone,
      roleIndex
    });
  },
  onName(e) { this.setData({ name: e.detail.value }); },
  onPhone(e) { this.setData({ phone: e.detail.value }); },
  onRole(e) { this.setData({ roleIndex: Number(e.detail.value) }); },
  save() {
    const name = (this.data.name || '').trim() || '用户';
    const profile = store.getProfile();
    store.saveProfile({
      name,
      role: ROLES[this.data.roleIndex],
      phone: (this.data.phone || '').trim(),
      org: profile.org
    });
    toast('个人信息已更新');
    setTimeout(() => wx.navigateBack(), 400);
  }
});
