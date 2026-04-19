import { writable } from 'svelte/store';

type Theme = 'dark' | 'light';

const init: Theme = (typeof document !== 'undefined'
  ? (document.documentElement.dataset.theme as Theme)
  : 'dark') || 'dark';

export const theme = writable<Theme>(init);

export function toggleTheme() {
  theme.update((t) => {
    const next = t === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('bento-theme', next); } catch (e) {}
    if (document.startViewTransition) {
      document.startViewTransition(() => {});
    }
    return next;
  });
}
