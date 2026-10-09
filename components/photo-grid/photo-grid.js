const { PHOTO_NAMES } = require('../../utils/constants');

Component({
  properties: {
    photos: { type: Array, value: [] }
  },
  data: {
    names: PHOTO_NAMES
  },
  methods: {
    preview(e) {
      const index = e.currentTarget.dataset.index;
      const current = this.data.photos[index];
      if (!current || !current.url) {
        wx.showToast({ title: '示意图', icon: 'none' });
        return;
      }
      const urls = this.data.photos.filter((item) => item.url).map((item) => item.url);
      wx.previewImage({ current: current.url, urls });
    }
  }
});
