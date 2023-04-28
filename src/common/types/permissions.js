/**
 * Lists the permissions for accessing either a page or api route
 *
 * formatting convention for permissions is:
 *
 * <PAGE | API>_<path>
 */
export const permissionName = {
  // PAGE permissions
  PAGE_admin: 'PAGE_admin',
  PAGE_admin_users: 'PAGE_admin_users',
  PAGE_admin_roles: 'PAGE_admin_roles',
  PAGE_admin_stats: 'PAGE_admin_stats',
  PAGE_surveys: 'PAGE_surveys',
  PAGE_surveys_id: 'PAGE_surveys_id',
  PAGE_surveys_id_overview: 'PAGE_surveys_id_overview',
  PAGE_admin_users_access: 'PAGE_admin_users_access',
  PAGE_certification: 'PAGE_certification',
  PAGE_settings: 'PAGE_settings',
  PAGE_contact_us: 'PAGE_contact_us',
  PAGE_academy: 'PAGE_academy',
  PAGE_tasks: 'PAGE_tasks',
  PAGE_dashboard: 'PAGE_dashboard',
  PAGE_surveys_id_export: 'PAGE_surveys_id_export',
  PAGE_surveys_mindset: 'PAGE_surveys_mindset',
  PAGE_surveys_mindset_mid: 'PAGE_surveys_mindset_mid',
  PAGE_admin_deliverables_reviewers: 'PAGE_admin_deliverables_reviewers',

  // API permissions
  API_roles: 'API_roles',
  API_users: 'API_users',
  API_role_permissions: 'API_role_permissions',
  API_users_id: 'API_users_id',
  API_user_messagingToken: 'API_user_messagingToken',
  API_user_roles_rid: 'API_user_roles',
  API_user_session_device: 'API_user_session_device',
  API_user_tasks_tid: 'API_user_tasks',
  API_followed_tasks: 'API_followed_tasks',
  API_users_followedTasks_ftid: 'API_followed_task',
  API_user_tasks: 'API_user_tasks',
  API_users_id_tasks_tid_comments: 'API_users_id_tasks_tid_comments',
  API_support_suggestion: 'API_support_suggestion',
  API_support_bug: 'API_support_bug',
  API_users_id_suggestions: 'API_users_id_suggestions',
  API_users_id_bugs: 'API_users_id_bugs',
  API_admin_statistics: 'API_admin_statistics',
  API_user_access: 'API_user_access',
  API_user_access_uaid: 'API_user_access_uaid',
  API_user_access_requests: 'API_user_access_requests',
  API_user_access_requests_aurid: 'API_user_access_requests_aurid',
  API_surveys: 'API_surveys',
  API_users_id_surveys: 'API_users_id_surveys',
  API_surveys_id_answers: 'API_surveys_id_answers',
  API_user_id_roles: 'API_user_id_roles',
  API_role_children: 'API_role_children',
  API_certification: 'API_certification',
  API_certification_create: 'API_certification_create',
  API_surveys_id: 'API_surveys_id',
  API_academy_messages: 'API_academy_messages',
  API_access_uid: 'API_access_uid',
  API_users_reviewers: 'API_users_reviewers',
  API_users_reviewers_uid: 'API_users_reviewers_uid',
  API_mindsets_mid: 'API_mindsets_mid',
  API_users_id_mindsets: 'API_users_id_mindsets',
};
