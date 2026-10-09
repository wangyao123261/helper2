const store = require('../../utils/store');
const { toast } = require('../../utils/format');

function validPassword(pwd) {
  if (!pwd || pwd.length < 8 || pwd.length > 20) return false;
  return /[A-Za-z]/.test(pwd) && /\d/.test(pwd);
}

Page({
  data: { oldPwd: '', newPwd: '', confirmPwd: '' },
  onOld(e) { this.setData({ oldPwd: e.detail.value }); },
  onNew(e) { this.setData({ newPwd: e.detail.value }); },
  onConfirm(e) { this.setData({ confirmPwd: e.detail.value }); },
  save() {
    const oldPwd = this.data.oldPwd;
    const next = this.data.newPwd;
    if (!store.checkPassword(oldPwd)) {
      toast('原密码不正确');
      return;
    }
    if (!validPassword(next)) {
      toast('新密码需为 8-20 位且含字母和数字');
      return;
    }
    if (next !== this.data.confirmPwd) {
      toast('两次输入的新密码不一致');
      return;
    }
    store.setPassword(next);
    toast('密码修改成功');
    setTimeout(() => wx.navigateBack(), 400);
  }
});
