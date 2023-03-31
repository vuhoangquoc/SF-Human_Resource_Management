export const getInf = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};

export const getChart = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getUser = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};

export const getThongKe = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};

export const getNotification = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};
