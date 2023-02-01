const login = async ({ username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "minhdh" && password === "123") {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
};

export { login };
