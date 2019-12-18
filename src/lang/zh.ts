export default {
  route: {
    dashboard: '首页',
    documentation: '文档',
    QIPManagement: '质检管理',
    BasicManagement: '基础数据维护',
    PartManagement: '部位设置',
    ReportManagement: '报表管理',
    guide: '引导页'
  },
  navbar: {
    dashboard: '首页',
    logOut: '退出登录',
    profile: '个人中心'
  },
  login: {
    title: 'JHV QIP SYSTEM',
    logIn: '登录',
    username: '账号',
    password: '密码'
  },
  guide: {
    description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定'
  },
  Qipmanage: {
    FactoryName: '工厂名称',
    ProductionLine: '生产小组',
    ColorName: '配色号',
    Pass: '通 过',
    Failed: '失 败',
    TotalOrders: '订单总数',
    Select: '选 择',
    OrderNum: '订单数',
    Qualifiednum: '合格数',
    Disqualified: '不合格数',
    BarCode: '请扫描或输入条码',
    Selectdate: '选择日期',
    BeginDate: '开始日期',
    EndDate: '结束日期',
    error: '不合格',
    success: '合格',
    SizeTitle: '请选择SIZE',
    DetailTitle: '选择不合格原因',
    Size: 'SIZE',
    selecterror: '不合格原因',
    Result: '结果',
    Image: '图样',
    Report: '缺陷报表',
    Save: '保存',
    SaveContinue: '保存并继续'
  },
  part: {
    partCode: '部位编码',
    PartName: '部位名称',
    createTime: '创建时间',
    // eslint-disable-next-line no-dupe-keys
    TemplaterName: '模板名称',
    createuser: '创建人',
    status: '状态'
  },
  example: {
    warning: '创建和编辑页面是不能被 keep-alive 缓存的，因为keep-alive 的 include 目前不支持根据路由来缓存，所以目前都是基于 component name 来进行缓存的。如果你想类似的实现缓存效果，可以使用 localStorage 等浏览器缓存方案。或者不要使用 keep-alive 的 include，直接缓存所有页面。详情见'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo'
  }
}
