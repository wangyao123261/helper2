Component({
  data: {
    selected: 0,
    list: [
      { pagePath: '/pages/home/home', text: '首页', icon: 'home' },
      { pagePath: '/pages/records/records', text: '督查记录', icon: 'list' },
      { pagePath: '/pages/logs/logs', text: '工作日志', icon: 'book' },
      { pagePath: '/pages/profile/profile', text: '个人中心', icon: 'user' }
    ]
  },
  methods: {
    switchTab(e) {
      const index = e.currentTarget.dataset.index;
      const url = this.data.list[index].pagePath;
      wx.switchTab({ url });
    }
  }
});
