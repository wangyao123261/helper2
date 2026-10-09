const RECORDS = [
  {
    id: 'R6',
    date: '2026-09-25',
    province: '山东省',
    city: '淄博市',
    company: '淄博齐铭陶瓷有限公司',
    etype: '绩效分级B级',
    industry: '建材工业（陶瓷）',
    gates: 2,
    channels: 3,
    monitor: '已安装',
    contact: '李国栋',
    phone: '139****4471',
    capacity: '80',
    output: '71',
    materials: '陶瓷原料、釉料、瓷砖成品',
    matFrom: '淄博市、潍坊市',
    matTo: '济南市、临沂市',
    transport: '原料采用公路运输，瓷砖采用铁路及公路运输',
    cleanRatio: '61',
    calcMethod: '2026年1—8月，铁路运量18万吨，新能源车运量9.5万吨',
    vehicles: '11',
    machinery: '1台电动叉车、3台国四叉车',
    problems: [
      {
        cat: '门禁及视频监控系统建设运行不规范',
        sub: '手动抬杆记录不规范',
        desc: '门岗对临时抬杆放行车辆未登记车牌与进出时间，9月累计手动抬杆23次仅登记9次。',
        photos: [
          { ph: 'gate', cap: '2026-09-25 09:41 门岗手动抬杆' },
          { ph: 'ledger', cap: '2026-09-25 09:45 抬杆登记台账' }
        ]
      }
    ]
  },
  {
    id: 'R7',
    date: '2026-09-25',
    province: '河南省',
    city: '洛阳市',
    company: '洛阳万基玻璃有限公司',
    etype: '超低排放',
    industry: '建材工业（玻璃）',
    gates: 2,
    channels: 4,
    monitor: '已安装',
    contact: '马建军',
    phone: '137****3328',
    capacity: '55',
    output: '48',
    materials: '硅砂、纯碱、玻璃成品',
    matFrom: '洛阳市、三门峡市',
    matTo: '郑州市、西安市',
    transport: '原料采用公路运输，成品采用公路及铁路运输',
    cleanRatio: '58',
    calcMethod: '2026年1—8月，铁路运量12万吨，零排放车运量6.2万吨',
    vehicles: '9',
    machinery: '2台电动叉车、1台国四装载机',
    problems: [
      {
        cat: '有不符合要求车辆进出企业',
        sub: '应急管控期间存在不符合管控要求车辆进出',
        desc: '9月20日应急管控期间门禁记录显示2辆国四柴油货车进出厂区装运成品，不符合管控要求。',
        photos: [{ ph: 'truck', cap: '2026-09-20 17:05 管控期间进出车辆抓拍' }]
      }
    ]
  },
  {
    id: 'R1',
    date: '2026-09-24',
    province: '河北省',
    city: '唐山市',
    company: '唐山宏晟钢铁有限公司',
    etype: '绩效分级A级',
    industry: '钢铁工业',
    gates: 3,
    channels: 5,
    monitor: '已安装',
    contact: '刘志强',
    phone: '139****2315',
    capacity: '500',
    output: '462',
    materials: '铁矿石、焦炭、烧结矿、钢材',
    matFrom: '唐山市、秦皇岛市',
    matTo: '天津市、北京市',
    transport: '铁矿石采用铁路运输，钢材采用公路运输',
    cleanRatio: '72',
    calcMethod: '2026年1—8月，所有原燃料及产品铁路运量286万吨，零排放车运量46万吨',
    vehicles: '28',
    machinery: '3台电动叉车、2台国四装载机',
    problems: [
      {
        cat: '门禁及视频监控系统建设运行不规范',
        sub: '门禁系统台账信息缺失或错误',
        desc: '抽查9月进出厂台账发现12条记录车牌号与门禁抓拍图片不一致，且3条记录缺失进出时间。',
        photos: [
          { ph: 'ledger', cap: '2026-09-24 10:23 门禁系统台账抽查' },
          { ph: 'gate', cap: '2026-09-24 10:25 1#货运大门门禁设备' }
        ]
      }
    ]
  },
  {
    id: 'R2',
    date: '2026-09-24',
    province: '山东省',
    city: '济南市',
    company: '济南金鲁水泥有限公司',
    etype: '绩效分级B级',
    industry: '建材工业（水泥）',
    gates: 2,
    channels: 4,
    monitor: '已安装',
    contact: '孙德胜',
    phone: '137****8842',
    capacity: '200',
    output: '168',
    materials: '石灰石、熟料、水泥',
    matFrom: '济南市、淄博市',
    matTo: '济南市、德州市',
    transport: '石灰石采用皮带廊及公路运输，水泥采用公路运输',
    cleanRatio: '55',
    calcMethod: '2026年7—8月，公路运量12.6万吨，新能源车运量6.9万吨',
    vehicles: '15',
    machinery: '2台电动叉车、4台国四叉车',
    problems: [
      {
        cat: '有不符合要求车辆进出企业',
        sub: '存在不符合绩效等级要求车辆进出',
        desc: '门禁记录显示9月18日—20日共有7辆国五及以下排放阶段柴油货车进出厂，不符合绩效分级B级管控要求。',
        photos: [
          { ph: 'truck', cap: '2026-09-20 15:42 进出厂国五货车抓拍' },
          { ph: 'gate', cap: '2026-09-20 15:43 2#货运大门' },
          { ph: 'ledger', cap: '2026-09-24 11:05 门禁进出记录核对' }
        ]
      }
    ]
  },
  {
    id: 'R3',
    date: '2026-09-23',
    province: '山西省',
    city: '吕梁市',
    company: '吕梁晋阳焦化集团有限公司',
    etype: '超低排放',
    industry: '炼焦化学工业',
    gates: 2,
    channels: 3,
    monitor: '已安装',
    contact: '陈立群',
    phone: '135****9077',
    capacity: '120',
    output: '112',
    materials: '精煤、焦炭、煤焦油',
    matFrom: '吕梁市、临汾市',
    matTo: '青岛市（港口）',
    transport: '精煤采用铁路运输，焦炭采用铁路及公路运输',
    cleanRatio: '81',
    calcMethod: '2026年1—8月，铁路运量98万吨，零排放车运量15万吨',
    vehicles: '12',
    machinery: '2台电动叉车、1台国四装载机',
    problems: [
      {
        cat: '清洁运输统计报表数据核算错误',
        sub: '清洁运输统计报表数据核算错误',
        desc: '企业报送的8月清洁运输比例为85%，经核对门禁台账与运量结算单，实际比例为78%，统计口径存在偏差。',
        photos: [{ ph: 'ledger', cap: '2026-09-23 14:10 清洁运输报表核算核对' }]
      },
      {
        cat: '非道路移动机械未完成编码登记',
        sub: '非道路移动机械未完成编码登记',
        desc: '厂内1台国四装载机未完成非道路移动机械编码登记，现场无法提供登记信息。',
        photos: [
          { ph: 'loader', cap: '2026-09-23 14:40 厂内国四装载机（未登记）' },
          { ph: 'camera', cap: '2026-09-23 14:42 厂区监控抓拍' }
        ]
      }
    ]
  },
  {
    id: 'R4',
    date: '2026-09-23',
    province: '河南省',
    city: '安阳市',
    company: '安阳中原铸造有限公司',
    etype: '绩效分级A级',
    industry: '铸造用生铁工业',
    gates: 2,
    channels: 2,
    monitor: '已安装',
    contact: '王海峰',
    phone: '136****5590',
    capacity: '60',
    output: '54',
    materials: '生铁、废钢、焦炭',
    matFrom: '安阳市、邯郸市',
    matTo: '郑州市、武汉市',
    transport: '均采用公路运输',
    cleanRatio: '48',
    calcMethod: '2026年8月，公路运量4.2万吨，新能源车运量2.0万吨',
    vehicles: '9',
    machinery: '1台电动叉车、2台国三装载机',
    problems: [
      {
        cat: '未按要求建设门禁及视频监控系统（绩效分级A/B级或超低排放企业）',
        sub: '门禁及视频监控系统未覆盖全部货运大门',
        desc: '企业2个货运大门中仅东大门安装门禁及视频监控系统，西大门无任何记录设备。',
        photos: [
          { ph: 'gate', cap: '2026-09-23 16:02 西大门（无监控设备）' },
          { ph: 'camera', cap: '2026-09-23 16:05 东大门监控摄像头' }
        ]
      }
    ]
  },
  {
    id: 'R5',
    date: '2026-09-10',
    province: '江苏省',
    city: '常州市',
    company: '常州天翼涂装有限公司',
    etype: '其他',
    industry: '涂装工业（汽车整车）',
    gates: 1,
    channels: 2,
    monitor: '未安装',
    contact: '周婷',
    phone: '138****6721',
    capacity: '15',
    output: '9.6',
    materials: '电泳漆、密封胶、整车',
    matFrom: '上海市、苏州市',
    matTo: '上海市、杭州市',
    transport: '均采用公路运输',
    cleanRatio: '40',
    calcMethod: '2026年8月，公路运量1.2万吨，零排放车运量0.48万吨',
    vehicles: '6',
    machinery: '2台电动叉车',
    problems: [
      {
        cat: '非道路移动机械未完成编码登记',
        sub: '非道路移动机械未完成编码登记',
        desc: '厂内2台电动叉车中1台未完成非道路移动机械编码登记，现场无法提供登记信息。',
        photos: [{ ph: 'loader', cap: '2026-09-10 11:20 厂内叉车（1台未登记）' }]
      }
    ]
  }
];

const LOGS = [
  { id: 'L4', date: '2026-09-25', recordIds: ['R6', 'R7'] },
  { id: 'L1', date: '2026-09-24', recordIds: ['R1', 'R2'] },
  { id: 'L2', date: '2026-09-23', recordIds: ['R3', 'R4'] },
  { id: 'L3', date: '2026-09-10', recordIds: ['R5'] }
];

const PROFILE = {
  name: '王志强',
  role: '督查组组长',
  phone: '138****0000',
  org: '中环汽研 · 机动车中心'
};

module.exports = { RECORDS, LOGS, PROFILE };
