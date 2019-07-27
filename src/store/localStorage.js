export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('AppSocialTool');
    if (serializedState === null || serializedState === undefined) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  if (state.auth) {
    state.auth.error = null;
  }

  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('AppSocialTool', serializedState);
  } catch (err) {
    // ignore write error
  }
};
