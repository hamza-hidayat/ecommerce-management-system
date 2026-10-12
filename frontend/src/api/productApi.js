import api from "./axios";

export const getProducts = async (searchQuery = "") => {
  const res = await api.get(
    `/products/${searchQuery ? `?search=${searchQuery}` : ""}`,
  );
  return res.data;
};

export const getProductDetails = async (productId) => {
  const res = await api.get(`/products/${productId}/`);
  return res.data;
};

export const getCategories = async () => {
  const res = await api.get("/categories/");
  return res.data;
};
