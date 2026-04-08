/**
 * Storage helpers - Safe localStorage operations with error handling
 */

import type { StorageKey, StorageValue, StorageResult, Theme, ChatStyle } from './types';

/**
 * Check if localStorage is available
 */
export const isStorageAvailable = (): boolean => {
  try {
    const testKey = '__sparky_storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

/**
 * Safely get item from storage with type safety
 */
export const getStorageItem = <T = any>(key: StorageKey): StorageResult<T> => {
  try {
    if (!isStorageAvailable()) {
      return { success: false, data: null, error: 'localStorage not available' };
    }

    const item = localStorage.getItem(key);
    if (item === null) {
      return { success: true, data: null };
    }

    try {
      const parsed = JSON.parse(item);
      return { success: true, data: parsed as T };
    } catch {
      return { success: true, data: item as T };
    }
  } catch (error) {
    console.error(`Error getting storage item ${key}:`, error);
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Safely set item in storage
 */
export const setStorageItem = <T extends StorageValue>(
  key: StorageKey,
  value: T
): StorageResult<T> => {
  try {
    if (!isStorageAvailable()) {
      return { success: false, data: null, error: 'localStorage not available' };
    }

    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return { success: true, data: value };
  } catch (error) {
    console.error(`Error setting storage item ${key}:`, error);
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Safely remove item from storage
 */
export const removeStorageItem = (key: StorageKey): StorageResult<boolean> => {
  try {
    if (!isStorageAvailable()) {
      return { success: false, data: false, error: 'localStorage not available' };
    }

    localStorage.removeItem(key);
    return { success: true, data: true };
  } catch (error) {
    console.error(`Error removing storage item ${key}:`, error);
    return {
      success: false,
      data: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Clear all user data (excluding system settings)
 */
export const clearUserData = (excludeKeys?: string[]): StorageResult<number> => {
  try {
    if (!isStorageAvailable()) {
      return { success: false, data: 0, error: 'localStorage not available' };
    }

    const { USER_LOCAL_DATA_KEYS } = require('./constants');
    let clearedCount = 0;

    USER_LOCAL_DATA_KEYS.forEach((key: string) => {
      if (!excludeKeys?.includes(key)) {
        localStorage.removeItem(key);
        clearedCount++;
      }
    });

    // Dispatch custom event for other parts of the app
    window.dispatchEvent(new CustomEvent('sparky-data-cleared', {
      detail: { clearedCount }
    }));

    return { success: true, data: clearedCount };
  } catch (error) {
    console.error('Error clearing user data:', error);
    return {
      success: false,
      data: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Check if key exists in storage
 */
export const hasStorageKey = (key: StorageKey): boolean => {
  try {
    if (!isStorageAvailable()) return false;
    return localStorage.getItem(key) !== null;
  } catch {
    return false;
  }
};

/**
 * Subscribe to storage changes
 */
export const subscribeToStorageChanges = (
  callback: (event: StorageEvent) => void
): (() => void) => {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};

/**
 * Subscribe to custom storage events
 */
export const subscribeToCustomEvent = (
  eventName: string,
  callback: (event: CustomEvent) => void
): (() => void) => {
  window.addEventListener(eventName, callback as EventListener);
  return () => window.removeEventListener(eventName, callback as EventListener);
};

/**
 * Theme helpers
 */
export const getTheme = (): Theme => {
  const result = getStorageItem<Theme>('sparky-theme');
  return result.data || 'dark';
};

export const setTheme = (theme: Theme): StorageResult<Theme> => {
  return setStorageItem('sparky-theme', theme);
};

/**
 * Chat style helpers
 */
export const getChatStyle = (): ChatStyle => {
  const result = getStorageItem<ChatStyle>('sparky-chat-style');
  return result.data || 'casual';
};

export const setChatStyle = (style: ChatStyle): StorageResult<ChatStyle> => {
  return setStorageItem('sparky-chat-style', style);
};

/**
 * Data owner helpers
 */
export const getDataOwner = (): string | null => {
  const result = getStorageItem<string>('sparky-data-owner');
  return result.data;
};

export const setDataOwner = (userId: string): StorageResult<string> => {
  return setStorageItem('sparky-data-owner', userId);
};

export const isDemoMode = (): boolean => {
  const result = getStorageItem<boolean>('sparky-demo-mode');
  return result.data === true;
};

export const setDemoMode = (enabled: boolean): StorageResult<boolean> => {
  return setStorageItem('sparky-demo-mode', enabled);
};

/**
 * Batch get multiple items
 */
export const getStorageItems = <T = any>(
  keys: StorageKey[]
): Record<string, StorageResult<T>> => {
  const results: Record<string, StorageResult<T>> = {};
  keys.forEach((key) => {
    results[key] = getStorageItem<T>(key);
  });
  return results;
};

/**
 * Batch set multiple items
 */
export const setStorageItems = <T extends StorageValue>(
  items: Record<StorageKey, T>
): Record<string, StorageResult<T>> => {
  const results: Record<string, StorageResult<T>> = {};
  Object.entries(items).forEach(([key, value]) => {
    results[key] = setStorageItem<T>(key as StorageKey, value);
  });
  return results;
};
