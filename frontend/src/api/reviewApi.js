import api from "./axios";

export const getProductReviews = async (productId) => {
  const res = await api.get(`/reviews/?product=${productId}`);
  return res.data;
};

export const createReview = async (reviewData) => {
  const res = await api.post("/reviews/", reviewData);
  return res.data;
};
