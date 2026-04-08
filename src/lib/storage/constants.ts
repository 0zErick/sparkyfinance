/**
 * Centralized storage constants for Sparky Finance
 * All localStorage keys should be defined here to avoid magic strings
 */

// Theme and UI
export const STORAGE_THEME = 'sparky-theme';
export const STORAGE_CHAT_STYLE = 'sparky-chat-style';

// User data ownership
export const STORAGE_DATA_OWNER = 'sparky-data-owner';
export const STORAGE_CURRENT_USER_ID = 'sparky-current-user-id';
export const DEMO_DATA_OWNER = 'demo';
export const STORAGE_DEMO_PROFILE = 'sparky-demo-profile';

// Financial data
export const STORAGE_FINANCIAL_DATA = 'sparky-financial-data';
export const STORAGE_BALANCE = 'sparky-balance';
export const STORAGE_TRANSACTIONS = 'sparky-transactions';
export const STORAGE_CARDS = 'sparky-cards';
export const STORAGE_CREDIT_CARDS = 'sparky-credit-cards';
export const STORAGE_BUDGET = 'sparky-budget';
export const STORAGE_BUDGETS = 'sparky-budgets';
export const STORAGE_GOALS = 'sparky-goals';
export const STORAGE_INVESTMENTS = 'sparky-investments';
export const STORAGE_INVESTMENT_GOALS = 'sparky-investment-goals';
export const STORAGE_PLANNING = 'sparky-planning';
export const STORAGE_INCOME = 'sparky-income';
export const STORAGE_EXPENSES = 'sparky-expenses';

// Aux features
export const STORAGE_CHAT_HISTORY = 'sparky-chat-history';
export const STORAGE_SYNC_DATA = 'sparky-sync-data';
export const STORAGE_SYNC_STATUS = 'sparky-sync-status';
export const STORAGE_DAILY_SNAPSHOT = 'sparky-daily-snapshot';
export const STORAGE_OPEN_FINANCE_CACHE = 'sparky-open-finance-cache';
export const STORAGE_POINTS_LOG = 'sparky-points-log';
export const STORAGE_PAID_BILLS = 'sparky-paid-bills';
export const STORAGE_DOCS = 'sparky-docs';
export const STORAGE_SUBSCRIPTIONS = 'sparky-subscriptions';

// Settings and preferences
export const STORAGE_RESERVE_PCT = 'sparky-reserve-pct';

// Admin features
export const STORAGE_MAINTENANCE_MODE = 'sparky-maintenance-mode';
export const STORAGE_MAINTENANCE_TIMER = 'sparky-maintenance-timer';
export const STORAGE_POINTS_RATE = 'sparky-points-rate';
export const STORAGE_WITHDRAW_LIMIT = 'sparky-withdraw-limit';
export const STORAGE_CMS_COLORS = 'sparky-cms-colors';
export const STORAGE_ADMIN_PRIZES = 'sparky-admin-prizes';
export const STORAGE_FEATURE_FLAGS = 'sparky-feature-flags';

// Mode flags
export const STORAGE_IMPERSONATE = 'sparky-impersonate';
export const STORAGE_DEMO_MODE = 'sparky-demo-mode';

// Notification cache
export const STORAGE_NOTIFICATIONS_LAST_READ = 'sparky-notifications-last-read';

/**
 * All storage keys array for clearing user data
 */
export const USER_LOCAL_DATA_KEYS = [
  STORAGE_FINANCIAL_DATA,
  STORAGE_BALANCE,
  STORAGE_TRANSACTIONS,
  STORAGE_CARDS,
  STORAGE_CREDIT_CARDS,
  STORAGE_BUDGET,
  STORAGE_BUDGETS,
  STORAGE_GOALS,
  STORAGE_INVESTMENTS,
  STORAGE_INVESTMENT_GOALS,
  STORAGE_PLANNING,
  STORAGE_INCOME,
  STORAGE_EXPENSES,
  STORAGE_CHAT_HISTORY,
  STORAGE_CHAT_STYLE,
  STORAGE_SYNC_DATA,
  STORAGE_SYNC_STATUS,
  STORAGE_DAILY_SNAPSHOT,
  STORAGE_OPEN_FINANCE_CACHE,
  STORAGE_POINTS_LOG,
  STORAGE_PAID_BILLS,
  STORAGE_DOCS,
  STORAGE_SUBSCRIPTIONS,
  STORAGE_CURRENT_USER_ID,
  STORAGE_DEMO_PROFILE,
  STORAGE_RESERVE_PCT,
] as const;

/**
 * System/cache keys that can be cleared without affecting user data
 */
export const SYSTEM_KEYS = [
  STORAGE_MAINTENANCE_MODE,
  STORAGE_MAINTENANCE_TIMER,
  STORAGE_POINTS_RATE,
  STORAGE_WITHDRAW_LIMIT,
  STORAGE_CMS_COLORS,
  STORAGE_ADMIN_PRIZES,
  STORAGE_FEATURE_FLAGS,
  STORAGE_IMPERSONATE,
  STORAGE_DEMO_MODE,
  STORAGE_NOTIFICATIONS_LAST_READ,
] as const;
