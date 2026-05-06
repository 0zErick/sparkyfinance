/**
 * "Sessão lembrada por 24h" — após login bem-sucedido, o app pula a tela de
 * login durante 24h. Após esse período, força signOut → exige novo login.
 */
const KEY = "sparky-session-expires-at";
const LAST_LOGIN_DAY_KEY = "sparky-last-login-day";
const TWENTY_FOUR_H = 24 * 60 * 60 * 1000;

const todayKey = () => new Date().toISOString().slice(0, 10);

export const markSessionRemembered = () => {
  try {
    localStorage.setItem(KEY, String(Date.now() + TWENTY_FOUR_H));
    localStorage.setItem(LAST_LOGIN_DAY_KEY, todayKey());
  } catch {}
};

export const clearRememberedSession = () => {
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem(LAST_LOGIN_DAY_KEY);
  } catch {}
};

/** true se ainda existe sessão lembrada válida no mesmo dia */
export const isSessionRemembered = (): boolean => {
  try {
    const expiresAt = Number(localStorage.getItem(KEY) || 0);
    const loginDay = localStorage.getItem(LAST_LOGIN_DAY_KEY);
    return expiresAt > Date.now() && loginDay === todayKey();
  } catch {
    return false;
  }
};

/** true se a sessão lembrada já expirou, ou se virou o dia */
export const isSessionExpired = (): boolean => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return false;
    const loginDay = localStorage.getItem(LAST_LOGIN_DAY_KEY);
    return Number(raw) <= Date.now() || loginDay !== todayKey();
  } catch {
    return false;
  }
};

export const hasRememberedSessionMarker = (): boolean => {
  try { return localStorage.getItem(KEY) !== null; } catch { return false; }
};
