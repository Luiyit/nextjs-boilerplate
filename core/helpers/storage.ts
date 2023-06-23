const fakeStorage = {
  setItem: () => {},
  getItem: () => null,
  removeItem: () => {},
};

/**
 * Test if the local storage is available
 *
 * @returns true if any erorr is raised, otherwise false
 */
export const isAvailableLocalStorage = () => {
  const test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Test if the session storage is available
 *
 * @returns true if any erorr is raised, otherwise false
 */
export const isAvailableSessionStorage = () => {
  const test = 'test';
  try {
    sessionStorage.setItem(test, test);
    sessionStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Retrieve localStorage
 *
 * @returns storage or fake object
 */
export const getLocalStorage = () =>
  isAvailableLocalStorage() ? localStorage : fakeStorage;

/**
 * Retrieve sessionStorage
 *
 * @returns storage or fake object
 */
export const getSessionStorage = () =>
  isAvailableSessionStorage() ? sessionStorage : fakeStorage;

/**
 * Retrieve some storage
 *
 * @returns storage or fake object
 */
export const getStorage = () => {
  if (isAvailableLocalStorage()) return localStorage;
  if (isAvailableSessionStorage()) return sessionStorage;

  return fakeStorage;
};
