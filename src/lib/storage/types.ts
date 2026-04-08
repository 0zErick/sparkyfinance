/**
 * Type definitions for storage system
 */

/**
 * All valid storage keys
 */
export type StorageKey = typeof import('./constants').USER_LOCAL_DATA_KEYS[number] |
                          typeof import('./constants').SYSTEM_KEYS[number];

/**
 * Storage value types
 */
export type StorageValue = string | number | boolean | object | null;

/**
 * Theme preference
 */
export type Theme = 'light' | 'dark';

/**
 * Chat style preference
 */
export type ChatStyle = 'formal' | 'casual' | 'technical' | 'friendly';

/**
 * Data owner type
 */
export type DataOwner = string | 'demo';

/**
 * Storage event callback
 */
export type StorageListener = (event: StorageEvent) => void;

/**
 * Storage operation result
 */
export interface StorageResult<T = any> {
  success: boolean;
  data: T | null;
  error?: string;
}

/**
 * Batch operation options
 */
export interface BatchStorageOptions {
  prefix?: string;
  excludeKeys?: string[];
  includeSystem?: boolean;
}

/**
 * Type guard for storage keys
 */
export const isValidStorageKey = (key: string): key is StorageKey => {
  const { USER_LOCAL_DATA_KEYS, SYSTEM_KEYS } = require('./constants');
  return [...USER_LOCAL_DATA_KEYS, ...SYSTEM_KEYS].includes(key as any);
};
