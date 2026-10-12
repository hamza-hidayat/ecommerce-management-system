import api from "./axios";

export const getWishlist = async () => {
  const res = await api.get("/wishlist/");
  return res.data;
};

export const toggleWishlist = async (productId) => {
  const res = await api.post("/wishlist/toggle/", { product_id: productId });
  return res.data;
};
