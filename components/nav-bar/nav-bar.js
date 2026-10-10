const app = getApp();

Component({
  options: { multipleSlots: true },
  properties: {
    mode: { type: String, value: 'sub' },
    title: { type: String, value: '' },
    extra: { type: String, value: '' }
  },
  data: {
    statusBarHeight: 20,
    sideWidth: 84,
    capsuleGap: 6
  },
  lifetimes: {
    attached() {
      this.applyBar();
    }
  },
  pageLifetimes: {
    show() {
      this.applyBar();
    }
  },
  observers: {
    mode() {
      this.applyBar();
    }
  },
  methods: {
    applyBar() {
      const light = this.data.mode === 'brand';
      const data = { statusBarHeight: (app.globalData && app.globalData.statusBarHeight) || 20 };
      try {
        const menu = wx.getMenuButtonBoundingClientRect();
        const windowInfo = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
        const capsuleGap = Math.max(6, windowInfo.windowWidth - menu.left + 8);
        data.capsuleGap = capsuleGap;
        data.sideWidth = Math.max(84, capsuleGap + 36);
      } catch (e) {
        // Keep the default layout if the menu-button metrics are unavailable.
      }
      this.setData(data);
      wx.setNavigationBarColor({
        frontColor: light ? '#ffffff' : '#000000',
        backgroundColor: light ? '#165DFF' : '#ffffff',
        animation: { duration: 0, timingFunc: 'linear' }
      });
    },
    onBack() {
      if (getCurrentPages().length > 1) wx.navigateBack();
      else wx.switchTab({ url: '/pages/home/home' });
    },
    onExtra() {
      this.triggerEvent('extra');
    },
    onBell() {
      wx.showToast({ title: '暂无新消息', icon: 'none' });
    }
  }
});
