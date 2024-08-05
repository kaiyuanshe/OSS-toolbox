export interface Person {
  name?: string;
  pic: string;
  link?: string;
}

export interface CityCommunityMeta
  extends Partial<
    Record<'banner' | 'website' | 'wechat' | 'weibo' | 'github', string> &
      Record<'organizers' | 'speakers' | 'partners', Person[]>
  > {
  name: string;
  brief?: string[];
}

export const chengdu: CityCommunityMeta = {
  name: '成都',
  banner: 'chengdu.png',
  website: 'https://fcc-cd.dev/',
  wechat: 'gh_b8b06d05cfa6',
  weibo: 'https://weibo.com/u/6165665516?is_all=1',
  github: 'https://github.com/FreeCodeCamp-Chengdu',
  brief: [
    'freeCodeCamp 成都社区到目前为止已有社区组织成员：姜玉珍、袁民成、石垚、王波、刘博、余琦、陈小山、曾昌强、尹婷、王杰、刘南宾、蔡婷、陈灿彬、李宁川、谢佳琦、魏朝欣、张小白、刘博、何青松共计19人。',
    '成都社区主要活动有前端大会、黑客松、编程静修日、小的分享沙龙、技术专场活动、编程道场等，社区在每一个月都会输出相应的技术活动，社区秉承“为开发者服务”的理念，努力搭建一个友好的交流、学习、互助的平台，帮助开发者、技术爱好者提升个人技术能力，同时帮助当地企业解决人才问题。',
  ],
  speakers: [
    { name: 'Adieu', pic: 'Adieu.png' },
    { name: 'Ak', pic: 'Ak.png' },
    { name: 'Helen', pic: 'Helen.png' },
    { name: 'Steven Ou', pic: 'steven_Ou.png' },
    { name: '陈斌', pic: 'chenbin.png' },
    { name: '陈嘉', pic: 'chenjia.png' },
    { name: '陈津', pic: 'chenjin.png' },
    { name: '陈洋彬', pic: 'chenyangbin.png' },
    { name: '代波', pic: 'daibo.png' },
    { name: '董涛', pic: 'dongtao.png' },
    { name: '杜屹东', pic: 'duyidong.png' },
    { name: '范卿麟', pic: 'fanqinlin.png' },
    { name: '樊晓兵', pic: 'fanxiaobin.png' },
    { name: '郭洪伟', pic: 'guohongwei.png' },
    { name: '郭庆', pic: 'guoqing.png' },
    { name: '胡桓铭', pic: 'huhengming.png' },
    { name: '胡敏', pic: 'huming.png' },
    { name: '胡胜全', pic: 'hushengquan.png' },
    { name: '姜姜姜', pic: 'jiangjiang.png' },
    { name: '简念', pic: 'jiannian.png' },
    { name: '梁桐铭', pic: 'liangtongmin.png' },
    { name: '廖伟', pic: 'liaowei.png' },
    { name: '林水强', pic: 'linshuiqiang.png' },
    { name: '刘博', pic: 'liubo.png' },
    { name: '刘杰', pic: 'liujie.png' },
    { name: '刘洋河', pic: 'liuyanghe.png' },
    { name: '李万鹏', pic: 'liwanpeng.png' },
    { name: '龙佳文', pic: 'longjiawen.png' },
    { name: '卢林', pic: 'lulin.png' },
    { name: '吕靖', pic: 'lvjing.png' },
    { name: '吕彦', pic: 'lvyan.png' },
    { name: '毛玉峰', pic: 'maoyufeng.png' },
    { name: '潘越', pic: 'panyue.png' },
    { name: '钱晟龙', pic: 'qianshenglong.png' },
    { name: '卿粼波', pic: 'qinlinbo.png' },
    { name: '任远', pic: 'renyuan.png' },
    { name: '沈长锟', pic: 'shenchangkun.png' },
    { name: '水歌', pic: 'shuige.png' },
    { name: '苏龙', pic: 'sulong.png' },
    { name: '唐超', pic: 'tangchao.png' },
    { name: '田泱', pic: 'tianyang.png' },
    { name: '王蒙', pic: 'wangmeng.png' },
    { name: '闻其详', pic: 'wenqixiang.png' },
    { name: '吴浩麟', pic: 'wuhaolin.png' },
    { name: '徐孝增', pic: 'xuxiaozen.png' },
    { name: '杨鸿翼', pic: 'yanghongyi.png' },
    { name: '杨义天', pic: 'yangyitian.png' },
    { name: '叶小钗', pic: 'yexiaochai.png' },
    { name: '余泽江', pic: 'yuzejiang.png' },
    { name: '曾磊', pic: 'zenlei.png' },
    { name: '张瑞', pic: 'zhangrui.png' },
    { name: '张伟', pic: 'zhangwei.png' },
    { name: '赵芝明', pic: 'zhaozhiming.png' },
  ],
  partners: [
    { pic: 'BBD.png', link: '' },
    { pic: 'baozun.png', link: 'http://www.baozun.com/' },
    { pic: 'coding.png', link: 'https://coding.net' },
    { pic: 'getui.png', link: 'https://www.getui.com' },
    { pic: 'jingrongguoji.png', link: '' },
    { pic: 'juejin.png', link: 'https://juejin.im' },
    { pic: 'shangxianle.png', link: 'https://www.sxl.cn/' },
    { pic: 'xiaoyang.png', link: '' },
  ],
  organizers: [
    { name: '袁民成', pic: 'yuanmincheng.png', link: 'yuanmincheng' },
    { name: '姜玉珍', pic: 'jiangyuzhen.png', link: 'jiangyuzhen' },
    { name: '石垚', pic: 'shiyao.png', link: '' },
    { name: '何青松', pic: 'heqingsong.png', link: 'heqingsong' },
    { name: '张小白', pic: 'zhangxiaobai.png', link: '' },
    { name: '陈小山', pic: 'chenxiaoshan.png', link: '' },
    { name: '王波', pic: 'wangbo.png', link: '' },
    { name: '谢佳琦', pic: 'xiejiaqi.png', link: '' },
    { name: '余琦', pic: 'yuqi.png', link: '' },
    { name: '魏朝欣', pic: 'weichaoxin.png', link: '' },
    { name: '刘博', pic: 'liubo.png', link: '' },
    { name: '蓝浩', pic: 'lanhao.png', link: '' },
    { name: '尹婷', pic: 'yinting.png', link: '' },
    { name: '王杰', pic: 'wangjie.png', link: '' },
    { name: '蔡婷', pic: 'caiting.png', link: '' },
    { name: '陈灿彬', pic: 'chencanbin.png', link: '' },
    { name: '李宁川', pic: 'liningchuan.png', link: '' },
    { name: '刘南宾', pic: 'liunanbin.png', link: '' },
    { name: '冯博', pic: 'fengbo.png', link: '' },
    { name: '林东闻', pic: 'lindongwen.png', link: '' },
    { name: '刘倩玉', pic: 'qianyu.png', link: '' },
    { name: '王东', pic: 'wangdong.png', link: '' },
    { name: '曾昌强', pic: 'zengchangqiang.png', link: '' },
    { name: '郑梦雨', pic: 'zhengmengyu.png', link: '' },
  ],
};

export const chongqing: CityCommunityMeta = {
  name: '重庆',
  banner: 'chongqing.png',
  website: 'https://freecodecamp-chongqing.github.io/',
  wechat: '',
  weibo: '',
  github: 'https://github.com/FreeCodeCamp-Chongqing',
  brief: [
    'freeCodeCamp 重庆社区成立在第三届重庆前端交流大会上正式宣告成立，社区核心组织者有程江东，冯中梅，吴建军，满远荣，唐天强，张元英等，目前社区成员有120余人。',
    'freeCodeCamp 重庆社区成立第二天即举办了首次线下碰面会，快速确定了志愿者的分工形成自己独特的团队文化，并在中国国际智能产业博览会现场崭露头角，让更多人认识了freeCodeCamp，freeCodeCamp重庆社区链接人与技术，共创共赢，共建一个有爱有温度的技术社区。',
  ],
  speakers: [],
  organizers: [
    { name: '冯中梅', pic: 'fengzhongmei.png', link: '' },
    { name: '刘东', pic: 'liudong.png', link: '' },
    { name: '满远荣', pic: 'manyuanrong.png', link: '' },
    { name: '唐友华', pic: 'tangyouhua.png', link: '' },
    { name: '朱晓鹏', pic: 'zhuxiaopeng.png', link: '' },
  ],
  partners: [],
};

export const guangzhou: CityCommunityMeta = {
  name: '广州',
  banner: 'guangzhou.png',
  website: 'https://freecodecamp-guangzhou.github.io/',
  wechat: 'FCC_GuangZhou',
  weibo: '',
  github: 'https://github.com/FreeCodeCamp-Guangzhou',
  brief: [
    'freeCodeCamp 广州社区由梁彩仪发起，期间由程晓琳、吴亚楠接任，目前由伍裕平、梁莹接管负责全面对外接洽和组织活动，由伍裕平负责技术支持、梁莹负责对外合作和活动组织，线下社区成员共有480多人，并在不断增加中。',
    '社区成立以来曾经组织过30多次活动，活动类型包括：结对编程、研bug会、技术分享会、技术沙龙。freeCodeCamp广州社区历届志愿者均致力于：用技术重新点亮广州这座千年老城。',
  ],
  organizers: [
    { name: '程晓琳', pic: 'chengxiaolin.png', link: '' },
    { name: '梁彩仪', pic: 'liangcaiyi.png', link: '' },
    { name: '吴亚楠', pic: 'wuyanan.png', link: '' },
    { name: '伍裕平', pic: 'wuyuping.png', link: '' },
    { name: 'Christy Leung 梁莹', pic: 'christyleung.png', link: '' },
  ],
  speakers: [{ name: '魏朝欣', pic: 'weichaoxin.png', link: '' }],
  partners: [],
};

export const hangzhou: CityCommunityMeta = {
  name: '杭州',
  banner: 'hangzhou.png',
  website: 'https://fcchz.github.io/FCCHangZhou/',
  wechat: 'TianXing_Community',
  weibo: '',
  github: 'https://github.com/FCCHZ',
  brief: [],
  speakers: [],
  organizers: [
    { name: '陈杰', pic: 'chenjie.png', link: '' },
    { name: '黄金良', pic: 'huangjinliang.png', link: '' },
    { name: '李序锴', pic: 'lixukai.png', link: '' },
  ],
  partners: [],
};

export const jinan: CityCommunityMeta = {
  name: '济南',
  banner: '',
  website: '',
  wechat: '',
  weibo: '',
  github: 'https://github.com/jinanfreeCodeCamp',
  brief: [],
  speakers: [],
  organizers: [{ name: '王军', pic: 'wangjun.png', link: 'javascript;' }],
  partners: [],
};

export const shanghai: CityCommunityMeta = {
  name: '上海',
  banner: 'shanghai.png',
  website: 'https://freecodecamp-shanghai.github.io/',
  wechat: 'FCCShangHai',
  weibo: '',
  github: 'https://github.com/FreeCodeCamp-Shanghai',
  brief: [
    'freeCodeCamp 上海社区拥有众多组织者，他们是：王皓、范弘琰、吴杨、潘娜娜、梁健、于益、陈天宇、唐小芳、龚雪薇、陶永。线下社区成员共有385人，并在不断增加之中。',
    '社区成立以来共举办了3次30人左右的小型沙龙活动，以及2次100人左右的中型主题分享会，即freeCodeCamp上海四季分享会的夏季和秋季场。freeCodeCamp上海社区的目标是：为上海的互联网技术开发者提供一个可以进行交流的平台。',
  ],
  speakers: [],
  organizers: [
    { name: '唐小芳', pic: 'tangxiaofang.png', link: '' },
    { name: '于航', pic: 'yuhang.png', link: '' },
  ],
  partners: [],
};

export const shenzhen: CityCommunityMeta = {
  name: '深圳',
  banner: 'shenzhen.png',
  website: 'https://freecodecamp-shenzhen.github.io/',
  wechat: 'nixibuxisala',
  weibo: '',
  github: 'https://github.com/FreeCodeCamp-ShenZhen',
  brief: [
    'freeCodeCamp 深圳社区目前由陈志成和游首杰负责现阶段的整体运营工作。社区核心组织者有聂鹏程、钦潮、郑惠君、霍文艺、徐家俊等人。',
    '社区成立以来共举办了10次100人左右的线下活动，以及3次大型主题分享会。从0到1，线下社区成员已有467人。深圳社区的主要目标和责任是做有趣有料的线下活动，目前深圳社区将会致力于发展 Coffee and Code 的形式，丰富线下编程学习的场景。',
  ],
  speakers: [],
  organizers: [
    { name: '陈钦潮', pic: 'chenqinchao.png', link: '' },
    { name: '陈志成', pic: 'chenzhicheng.png', link: '' },
    { name: '游首杰', pic: 'youshoujie.png', link: '' },
  ],
  partners: [],
};

export const tianjin: CityCommunityMeta = {
  name: '天津',
  banner: 'tianjin.png',
  website: '',
  wechat: '',
  weibo: '',
  github: '',
  brief: [
    'freeCodeCamp 天津社区现阶段拥有五名组织者：张烁、伊丽娜、刘柱、刘忆文、阚自强，和四名志愿者：宋佳欣、蔡文龙、付呈欣、王瑞。线下社区成员共323人。',
    '社区成立以来共举办14次 Coffee and Code 活动和一次技术主题分享会。天津社区的目标和责任是：让天津的互联网技术氛围因有我的存在而有一点点不同。',
  ],
  speakers: [],
  organizers: [
    { name: '阚自强', pic: 'kanziqiang.png', link: 'kanziqiang' },
    { name: '刘柱', pic: 'liuzhu.png', link: 'liuzhu' },
    { name: '伊丽娜', pic: 'yilina.png', link: 'yilina' },
  ],
  partners: [],
};

export const wuhan: CityCommunityMeta = {
  name: '武汉',
  banner: 'wuhan.png',
  website: '',
  wechat: '',
  weibo: '',
  github: '',
  brief: [
    'freeCodeCamp 武汉社区目前由王川全面负责对外接洽、活动组织。社区核心志愿者有许志豪、王圣松等。线下社区成员有200余人，并在不断增加之中。',
    '成立来，除了定期举办线下交流活动，给予大家的线下交流机会，线上也会带领大家参与诸如官网页面开发等实战项目。',
  ],
  speakers: [],
  organizers: [
    { name: '王川', pic: 'wangchuan.png', link: '' },
    { name: '王圣松', pic: 'wangshengsong.png', link: '' },
  ],
  partners: [],
};

export const xian: CityCommunityMeta = {
  name: '西安',
  banner: 'xian.png',
  website: 'https://freecodecamp-xian.github.io/activity-network/',
  wechat: 'gh_a964d2836db4',
  weibo: '',
  github: 'https://github.com/freeCodeCamp-XiAn',
  brief: [
    'freeCodeCamp 西安社区现阶段拥有多位组织者：张峰涛、薛开麒、罗铭、王晨宇、谷中仁、易海门，线下社区成员共计350余人。',
    '在发起人韩亦乐的主导下，社区两年来已举办近十次线下技术交流活动和一场前端大会。freeCodeCamp西安社区将以开源、活动和招聘三大板块为发展重心，逐步搭建更完整的技术社区，服务更多的西安本土开发者、企业，努力让每一个社区成员能够在这里得到成长。',
  ],
  speakers: [],
  organizers: [
    { name: '韩亦乐', pic: 'hanyile.png', link: '' },
    { name: '薛开麒', pic: 'xuekaiqi.png', link: '' },
    { name: '张峰涛', pic: 'zhangfengtao.png', link: '' },
  ],
  partners: [],
};

export const zhengzhou: CityCommunityMeta = {
  name: '郑州',
  banner: 'zhengzhou.png',
  website: 'https://freecodecamp-zhengzhou.github.io/',
  wechat: '',
  weibo: '',
  github: 'https://github.com/FreeCodeCamp-Zhengzhou',
  brief: [
    'freeCodeCamp 郑州社区由石中玉发起并开始组织相关交流活动，核心组织成员有石中玉、徐启、张银龙。于2017年3月22日组织第一次线下沙龙，我们先后尝试了线上和线下分享相结合的方式来探索社区运营方式和思路。',
    '我们致力于为热爱前端，热爱技术的小伙伴提供一个可以交流、学习的社群氛围，在让大家能力提升的同时，努力成为当地有温度的属于技术爱好者家门口的技术社区。',
  ],
  speakers: [],
  organizers: [],
  partners: [],
};

export const HongKong: CityCommunityMeta = {
  name: '香港',
  website: 'https://freecodecamphongkong.github.io/',
  github: 'https://github.com/FreeCodeCampHongKong',
};

export const TaiWan: CityCommunityMeta = {
  name: '台湾',
  github: 'https://github.com/freeCodeCampTaiwan',
};
