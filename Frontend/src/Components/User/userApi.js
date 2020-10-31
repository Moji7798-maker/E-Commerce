export const signup = (formData) => {
  return fetch(`${process.env.REACT_APP_API}/api/user/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const activate = (formData) => {
  return fetch(`${process.env.REACT_APP_API}/api/user/activate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const resend = (formData) => {
  return fetch(`${process.env.REACT_APP_API}/api/user/resend`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const signin = (formData) => {
  return fetch(`${process.env.REACT_APP_API}/api/user/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const forget = (formData) => {
  return fetch(`${process.env.REACT_APP_API}/api/user/password/forget`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const reset = (formData) => {
  return fetch(`${process.env.REACT_APP_API}/api/user/password/reset`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const readProfile = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API}/api/user/${userId}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const updateProfile = (userId, token, formData) => {
  return fetch(`${process.env.REACT_APP_API}/api/user/update/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
