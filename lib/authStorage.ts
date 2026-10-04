import { StateStorage } from "zustand/middleware";

/**
 * Zustand storage that follows the "remember me" choice saved in the state:
 * remembered sessions go to localStorage so they survive closing the browser,
 * everything else stays in sessionStorage. Each write also removes the entry
 * from the other storage, so switching modes never leaves a stale copy.
 */
export function createRememberAwareStorage(
  local: Storage,
  session: Storage,
): StateStorage {
  return {
    getItem: (name) => local.getItem(name) ?? session.getItem(name),
    setItem: (name, value) => {
      const { state } = JSON.parse(value) as { state: { rememberMe?: boolean } };
      const [target, other] = state.rememberMe
        ? [local, session]
        : [session, local];
      target.setItem(name, value);
      other.removeItem(name);
    },
    removeItem: (name) => {
      local.removeItem(name);
      session.removeItem(name);
    },
  };
}
