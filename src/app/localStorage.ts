export const loadUserState = () => {
  try {
    const serializedUserState = localStorage.getItem("user");
    if (serializedUserState === null) return null;
    return JSON.parse(serializedUserState);
  } catch (err) {
    return null;
  }
};
