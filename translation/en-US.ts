import { IDType } from 'mobx-restful';

export default {
  welcome_to: 'Welcome to',
  get_started_by_editing: 'Get started by editing',
  upstream_projects: 'Upstream projects',
  home_page: 'Home Page',
  source_code: 'Source Code',
  component: 'Component',
  pagination: 'Pagination',
  powered_by: 'Powered by',
  documentation: 'Documentation',
  documentation_summary:
    'Find in-depth information about Next.js features and API.',
  learn: 'Learn',
  learn_summary: 'Learn about Next.js in an interactive course with quizzes!',
  examples: 'Examples',
  examples_summary: 'Discover and deploy boilerplate example Next.js projects.',
  deploy: 'Deploy',
  deploy_summary:
    'Instantly deploy your Next.js site to a public URL with Vercel.',

  // Main Navigator
  open_source_treasure_box: 'OS Treasure-box',
  Web_polyfill_CDN: 'Web Polyfill CDN',
  open_source_mirror: 'Open-Source Mirror',
  license_tool: 'License Tool',

  // GitHub project list page
  kaiyuanshe_projects: 'KAIYUANSHE projects',

  // Pagination Table
  create: 'Create',
  submit: 'Submit',
  cancel: 'Cancel',
  edit: 'Edit',
  delete: 'Delete',
  total_x_rows: ({ totalCount }: { totalCount: number }) =>
    `Total ${totalCount} rows`,
  sure_to_delete_x: ({ keys }: { keys: IDType[] }) =>
    `Are you sure to delete ${keys.join(', ')}?`,
  repository_name: 'Repository Name',
  programming_language: 'Programming Language',
  topic: 'Topic',
  star_count: 'Star Count',

  // Scroll List
  scroll_list: 'Scroll List',
  load_more: 'Load more...',
  no_more: 'No more',

  // MDX Article
  article: 'Article',

  //License-tool Page
  feature_attitude_undefined: "I don't care",
  feature_attitude_positive: 'I need',
  feature_attitude_negative: "I don't need",
  infection_range_library: 'Infection range to library',
  infection_range_file: 'Infection range to file',
  infection_range_module: 'Infection range to module',
  infection_range_undefined: 'No request',

  tip_popularity_0:
    'Do you want to limit the result to a license agreement that is "popular and widely used, or has a broad community" as described by the Open Source Initiative (OSI)?',
  tip_popularity_1:
    'This will sacrifice some less popular but perhaps useful features to ensure that the license becomes a mainstream license.',
  tip_reuse_condition:
    'Do you want to set license conditions for code reuse? If not, your license will be one of the so-called "permissive" licenses.',
  tip_infection_intensity:
    'Do you want to choose a strongly Copyleft licensing? When a software project contains some of your code, the project as a whole must be distributed under your license, if it is distributed at all. The effect of this will be that the source code for all additions made to the code will be available. If not,the parts of the project you originated from must be distributed under your license, if it is distributed at all. Other parts may be distributed under other licenses, even though they form part of a work with is - as a whole - a modified version of your code. The effect of this will be that the source code to some additions made to the code may not be available.',
  tip_jurisdiction: 'Do you want your region to be the jurisdiction?',
  tip_patent_statement:
    'Do you want to use a license agreement that explicitly grants patent rights (if any)?',
  tip_patent_retaliation:
    'Do you want to use a license agreement that includes a patent retaliation clause? who brings legal action alleging that the licensed software embodies one of their software patents will lose the license you have granted to copy, use, adapt, and distribute the code. It is intended to dissuade people from bringing this kind of legal action.',
  tip_enhanced_attribution:
    'Do you want to use a license agreement that specifies "enhanced attribution"? It must take a particular form and appear in specific instances, for example on the user interface of softwares  every time it is run. ',
  tip_privacy_loophole:
    'Do you want to use a license that addresses a "privacy loophole". Require that source code must also be released when services are provided over the Web or when code is deployed internally. The purpose of this is to ensure that all those who benefit from open source projects have a responsibility to give back to the community by sharing their improved and adapted versions.',
  tip_marketing_endorsement:
    "Do you want to allow promotional licenses? Avoid using the author's name to promote products or services based on the author's code. Such a restriction is intended to protect the authors reputation or prevent misleading publicity.",
  tip_infection_range:
    'Which parts of the modified version do you want to allow for other licenses, with four options: module-level, file-level, library interface-level, and no requirements ?',
  license_tool_headline: 'Open Source License Selector',
  license_tool_description:
    'This tool is designed to help users understand their own preferences for free and open source software licensing agreements. Users must read these license agreements themselves. It is important to read and fully understand the license agreement you choose before applying it to your project. The classification of license types that support the operation of the tool will inevitably be somewhat reduced. Therefore, the output of the tool cannot and must not be taken as legal advice.',
  warn_info:
    'Remember: You must read and understand the license agreement you choose',
  filter_option: 'filter option',
  option_undefined: 'Not required',
  step_x: ({ step }: { step: number }) => `step ${step}`,
  license_score: 'score',
  popularity: 'Popularity',
  reuseCondition: 'Reuse Condition',
  infectionIntensity: 'Infection Intensity',
  infectionRange: 'Infection Range',
  jurisdiction: 'Jurisdiction',
  patentStatement: 'Patent Statement',
  patentRetaliation: 'Patent Retaliation',
  enhancedAttribution: 'Enhanced Attribution',
  privacyLoophole: 'Privacy Loophole',
  marketingEndorsement: 'Marketing Endorsement',
  license_detail: 'license detail',
  attitude_positive: 'Yes',
  attitude_negative: 'Yes',
  range_library: 'library',
  range_file: 'file',
  range_module: 'module',
  last_step: 'back',

  // Git pager
  repository: 'repository',
  file_path: 'file path',
  commit_message: 'commit message',
  commit: 'commit',
  clear: 'clear',
  meta: 'meta',
  content: 'content',
  copy_MarkDown: 'copy Markdown',

  //Polyfill page
  select_compatible_browser: 'select Compatible Browser',
  select_features: 'select features',
  search_feature: 'search Feature',

  //volunteer page
  volunteer: 'volunteer',
  online_volunteer: 'online volunteer',
} as const;
