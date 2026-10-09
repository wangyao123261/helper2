const app = getApp();

Component({
  options: { multipleSlots: true },
  properties: {
    mode: { type: String, value: 'sub' },
    title: { type: String, value: '' },
    extra: { type: String, value: '' }
  },
  data: {
    statusBarHeight: 20
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
      this.setData({ statusBarHeight: (app.globalData && app.globalData.statusBarHeight) || 20 });
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
