import { IDType } from 'mobx-restful';

export default {
  welcome_to: '歡迎使用',
  get_started_by_editing: '開始你的專案吧，編輯',
  upstream_projects: '上游專案',
  home_page: '主頁',
  source_code: '源代碼',
  component: '元件',
  pagination: '分頁',
  powered_by: '強力驅動自',
  documentation: '文檔',
  documentation_summary: '查找有關 Next.js 功能和 API 的深入資訊。',
  learn: '學習',
  learn_summary: '在帶有測驗的交互式課程中了解 Next.js！',
  examples: '示例',
  examples_summary: '發現和部署示例 Next.js 專案。',
  deploy: '部署',
  deploy_summary: '使用 Vercel 立即將您的 Next.js 站點部署到公共 URL。',

  // Main Navigator
  open_source_treasure_box: '開源百寶箱',
  Web_polyfill_CDN: 'Web 標準補丁 CDN',
  open_source_mirror: '開源鏡像站',
  license_tool: '開源許可證選擇器',

  // GitHub project list page
  kaiyuanshe_projects: '開源社專案',

  // Pagination Table
  create: '新增',
  submit: '提交',
  cancel: '取消',
  edit: '編輯',
  delete: '刪除',
  total_x_rows: ({ totalCount }: { totalCount: number }) =>
    `共 ${totalCount} 行`,
  sure_to_delete_x: ({ keys }: { keys: IDType[] }) =>
    `您確定刪除 ${keys.join('、')} 嗎？`,
  repository_name: '倉庫名',
  programming_language: '編程語言',
  topic: '話題',
  star_count: '星標數',

  // Scroll List
  scroll_list: '滾動列表',
  load_more: '加載更多……',
  no_more: '沒有更多',

  // MDX Article
  article: '文章',

  //License-tool Page
  feature_attitude_undefined: '我不在乎',
  feature_attitude_positive: '我需要',
  feature_attitude_negative: '我不需要',
  infection_range_library: '傳染範圍到庫',
  infection_range_file: '傳染範圍到檔案',
  infection_range_module: '傳染範圍到模組',
  infection_range_undefined: '不要求',

  tip_popularity_0:
    '您是否希望將結果限制在開放原始碼促進會（Open Source Initiative, 縮寫: OSI）所描述的 "流行、廣泛使用或擁有強大社群」 的授權上？',
  tip_popularity_1:
    '這將以犧牲一些更冷僻但或許有用的特徵為代價來確保該許可協議成為“主流”協議。',
  tip_reuse_condition:
    '您想對程式碼的重複使用設定許可條件嗎? 如果沒有，您的許可證將屬於所謂的 "寬鬆 (Permissive) " 許可證。 所有自由與開源許可證都允許他人對您的程式碼進行修改，並將這些修改後的版本提供給他人。 您的許可證可以對如何實現這一點提出條件，特別是在這些修改版本上可以使用哪些許可證。 這些條件有助於保持程式碼的自由性，但也會使一些人不再重複使用您的程式碼。',
  tip_infection_intensity:
    '您是否想選擇強互惠（強傳染）的協議？ 當您選擇強互惠（強傳染）許可證時，任何使用、修改或分發您的程式碼的人都必須遵循相同的授權要求。 這意味著他們必須提供原始程式碼，並將其程式碼以相同的許可證發布。 這樣，您的程式碼的開放性將被保護，並且任何人都可以獲得您的程式碼的原始程式碼，以便進行學習、改進和共享。 強互惠（強傳染）許可證確保了對整個專案的開放性和共享性，促進了開源社群的合作和創新。 但是，選擇強互惠（強傳染）許可證可能會對某些開發者或組織造成限制。',
  tip_jurisdiction: '您是否想將自己所在區域作為司法管轄區',
  tip_patent_statement: '您是否想使用明確授予專利權的許可協議（如果有）',
  tip_patent_retaliation:
    '您是否想使用包含專利報復條款的授權協議。 如果有人提起訴訟，聲稱開源軟體侵犯了他們的軟體專利，該條款將觸發一種反制措施。 根據這種條款，原告將失去使用、複製、改編和分發開源軟體的許可。 這意味著如果某人發起專利訴訟，他們將無法繼續使用和分發被授權的開源程式碼。 它旨在保護開源專案和貢獻者免受專利訴訟的侵害，以維護專案的自由和開放性。',
  tip_enhanced_attribution:
    '您是否想使用指定「軟體歸屬增強」的授權協議，必須以特定形式在特定情況下註明出處，例如每次執行軟體時都必須在軟體的使用者介面上註明出處。 所有自由或開源軟體授權都規定，分發或改編軟體的任何人都必須在其分發的某處註明軟體原作者。',
  tip_privacy_loophole:
    '您是否想使用解決「隱私漏洞」的許可協議，要求在透過網路提供服務或在內部部署程式碼時也必須發佈原始程式碼。 這樣做的目的是確保所有從開源專案中受益的人都有責任回饋社區，分享他們的改進和改編版本。',
  tip_marketing_endorsement:
    '您是否想使用禁止推廣的授權協議，避免使用作者的姓名來推廣基於作者代碼的產品或服務。 這樣的限制，是為了保護作者的聲譽或防止誤導性宣傳。',
  tip_infection_range:
    '您想對修改版的哪些部分可以適用其它許可協議,有 模組級，文件級，庫接口級，不進行要求四個選擇',

  license_tool_headline: '開源許可證選擇器',
  license_tool_description:
    '該工具旨在幫助用戶理解他們自己對於自由和開源軟件許可協議的偏好。用戶必須自己閱讀這些許可協議。在將許可協議適用於您的項目之前，閱讀並完全理解您選擇的許可協議是非常重要的。支撐該工具運行的許可類型分類，會不可避免地有些縮減。因此，不能也切不可將該工具的輸出信息視爲法律意見。',
  warn_info: '切記：必須閱讀並理解您選擇的許可協議',
  filter_option: '篩選條件',
  option_undefined: '不要求',
  step_x: ({ step }: { step: number }) => `第 ${step} 步`,
  license_score: '評分',
  popularity: '流行程度',
  reuseCondition: '復用條件',
  infectionIntensity: '互惠（傳染）需求',
  infectionRange: '傳染範圍',
  jurisdiction: '法律管轄',
  patentStatement: '專利聲明',
  patentRetaliation: '專利報復',
  enhancedAttribution: '歸屬增強',
  privacyLoophole: '隱私漏洞',
  marketingEndorsement: '營銷背書',
  license_detail: '協議詳情',
  attitude_positive: '是',
  attitude_negative: '否',
  range_library: '庫',
  range_file: '檔案',
  range_module: '模組',
  last_step: '上一步',

  //polyfill page
  selectCompatibleBrowsers: '選擇相容瀏覽器',
  features: '選擇功能模組',
  searchFeature: '搜尋功能模組',
} as const;
