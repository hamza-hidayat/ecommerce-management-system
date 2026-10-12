import api from "./axios";

export const getCart = async () => {
  const res = await api.get("/cart/");
  return res.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const res = await api.post("/cart/add_item/", {
    product_id: productId,
    quantity,
  });
  return res.data;
};

export const removeFromCart = async (itemId) => {
  const res = await api.post("/cart/remove_item/", { item_id: itemId });
  return res.data;
};
