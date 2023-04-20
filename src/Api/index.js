export const getInf = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};

export const getChart = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getUser = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};

// delete user
export const delUser = (id) => {
  return fetch(`https://dummyjson.com/users/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

// lấy thông tin single user
export async function getSingleUser(id) {
  const res = await fetch(`https://dummyjson.com/users/${id}`, {
    method: "GET",
  });
  return await res.json();
}

export const getThongKe = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};

export const getNotification = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};
