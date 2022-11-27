const storageKey = 'getdistilled-session-token';

const storage = {
  write: (token: string) => localStorage.setItem(storageKey, token),
  read: () => localStorage.getItem(storageKey),
  delete: () => localStorage.removeItem(storageKey),
};

export default storage;
