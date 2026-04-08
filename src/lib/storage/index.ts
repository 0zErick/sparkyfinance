/**
 * Storage module - Centralized localStorage management for Sparky Finance
 *
 * @description Provides type-safe, error-handled storage operations with constants
 */

// Constants
export * from './constants';

// Types
export type {
  StorageKey,
  StorageValue,
  StorageResult,
  Theme,
  ChatStyle,
  DataOwner,
  StorageListener,
  BatchStorageOptions,
} from './types';
export { isValidStorageKey } from './types';

// Helpers
export {
  // Core operations
  isStorageAvailable,
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  hasStorageKey,

  // Batch operations
  getStorageItems,
  setStorageItems,
  clearUserData,

  // Event subscriptions
  subscribeToStorageChanges,
  subscribeToCustomEvent,

  // Typed helpers
  getTheme,
  setTheme,
  getChatStyle,
  setChatStyle,
  getDataOwner,
  setDataOwner,
  isDemoMode,
  setDemoMode,
} from './helpers';

/**
 * Sync local data ownership - ensures data is isolated per user
 * Clears data when ownership changes
 */
export const syncLocalDataOwner = (userId: string): boolean => {
  try {
    if (!isStorageAvailable()) {
      console.warn('Storage not available for owner sync');
      return false;
    }

    const currentOwner = getDataOwner();

    // Check if we have any stored data
    const hasStoredData = () => {
      const { USER_LOCAL_DATA_KEYS } = require('./constants');
      return USER_LOCAL_DATA_KEYS.some((key: string) => localStorage.getItem(key) !== null);
    };

    // If owner changed and we have data, clear it
    if (currentOwner !== userId && (currentOwner !== null || hasStoredData())) {
      clearUserData();
    }

    // Set new owner
    setDataOwner(userId);
    return true;
  } catch (error) {
    console.error('Error syncing local data owner:', error);
    return false;
  }
};

/**
 * Mark demo mode and set owner
 */
export const markDemoLocalDataOwner = (): boolean => {
  try {
    setDemoMode(true);
    setDataOwner('demo');
    return true;
  } catch (error) {
    console.error('Error marking demo data owner:', error);
    return false;
  }
};

/**
 * Check if user has stored data
 */
export const hasStoredUserData = (): boolean => {
  try {
    if (!isStorageAvailable()) return false;

    const { USER_LOCAL_DATA_KEYS } = require('./constants');
    return USER_LOCAL_DATA_KEYS.some((key: string) => localStorage.getItem(key) !== null);
  } catch (error) {
    console.error('Error checking stored user data:', error);
    return false;
  }
};

// Deprecated: For backward compatibility
export { clearUserData } from './helpers';
