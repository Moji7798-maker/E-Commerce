export const createCategory = (formData, token, userId) => {
  return fetch(`${process.env.REACT_APP_API}/api/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .catch((err) =>
      err.status(501).json({
        notif: "در اتصال شما مشکل به وجود آمده است.",
      })
    );
};

export const getCategories = () => {
  return fetch(`${process.env.REACT_APP_API}/api/category`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const deleteCategoryApi = (token, categoryId, userId) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/category/delete/${categoryId}/${userId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  )
    .then((res) => res.json())
    .catch((err) =>
      err.status(501).json({
        notif: "در اتصال شما مشکل به وجود آمده است.",
      })
    );
};

export const updateCategoryApi = (formData, token, categoryId, userId) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/category/update/${categoryId}/${userId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(formData),
    }
  )
    .then((res) => res.json())
    .catch((err) =>
      err.status(501).json({
        notif: "در اتصال شما مشکل به وجود آمده است.",
      })
    );
};

export const createProductApi = (formData, token, userId) => {
  return fetch(`${process.env.REACT_APP_API}/api/product/create/${userId}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const updateProductApi = (formData, token, productId, userId) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/product/update/${productId}/${userId}`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getProduct = (productId) => {
  return fetch(`${process.env.REACT_APP_API}/api/product/${productId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getProducts = () => {
  return fetch(`${process.env.REACT_APP_API}/api/product`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const deleteProductApi = (token, productId, userId) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/product/delete/${productId}/${userId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
