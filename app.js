const store = require('./utils/store');

App({
  globalData: {
    statusBarHeight: 20,
    safeBottom: 0
  },
  onLaunch() {
    try {
      const win = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
      this.globalData.statusBarHeight = win.statusBarHeight || 20;
      if (win.safeArea && win.screenHeight) {
        this.globalData.safeBottom = Math.max(0, win.screenHeight - win.safeArea.bottom);
      }
    } catch (e) {
      this.globalData.statusBarHeight = 20;
    }
    store.ensure();
  }
});
