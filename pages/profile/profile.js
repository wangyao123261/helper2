const store = require('../../utils/store');
const { toast } = require('../../utils/format');

Page({
  data: {
    profile: {},
    initial: '',
    stats: { records: 0, problems: 0 }
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 });
    }
    const profile = store.getProfile();
    const stats = store.stats();
    this.setData({
      profile,
      initial: (profile.name || '用').slice(0, 1),
      stats
    });
  },
  goMyRecords() {
    wx.navigateTo({ url: '/pages/my-records/my-records' });
  },
  goProblems() {
    wx.navigateTo({ url: '/pages/problems/problems' });
  },
  goEdit() {
    wx.navigateTo({ url: '/pages/profile-edit/profile-edit' });
  },
  goPassword() {
    wx.navigateTo({ url: '/pages/password/password' });
  },
  goPlatform() {
    wx.navigateTo({ url: '/pages/platform/platform' });
  },
  logout() {
    toast('已模拟退出登录');
  }
});
