/**
 * "Sessão lembrada por 24h" — após login bem-sucedido, o app pula a tela de
 * login durante 24h. Após esse período, força signOut → exige novo login.
 */
const KEY = "sparky-session-expires-at";
const TWENTY_FOUR_H = 24 * 60 * 60 * 1000;

export const markSessionRemembered = () => {
  try {
    localStorage.setItem(KEY, String(Date.now() + TWENTY_FOUR_H));
  } catch {}
};

export const clearRememberedSession = () => {
  try { localStorage.removeItem(KEY); } catch {}
};

/** true se ainda existe sessão lembrada válida (< 24h desde o login) */
export const isSessionRemembered = (): boolean => {
  try {
    const v = Number(localStorage.getItem(KEY) || 0);
    return v > Date.now();
  } catch {
    return false;
  }
};

/** true se a sessão lembrada já expirou (e não foi limpa) */
export const isSessionExpired = (): boolean => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return false;
    return Number(raw) <= Date.now();
  } catch {
    return false;
  }
};
