import api from './axios';

// Products
export const getAdminProducts = async () => {
    const res = await api.get('/products/');
    return res.data;
};

export const createProduct = async (formData) => {
    const res = await api.post('/products/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
};

export const updateProduct = async (id, formData) => {
    const res = await api.patch(`/products/${id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
};

export const deleteProduct = async (id) => {
    const res = await api.delete(`/products/${id}/`);
    return res.data;
};

// Categories
export const getAdminCategories = async () => {
    const res = await api.get('/categories/');
    return res.data;
};

export const createCategory = async (formData) => {
    const res = await api.post('/categories/', formData);
    return res.data;
};
// Orders
export const getAdminOrders = async () => {
    const res = await api.get('/orders/');
    return res.data;
};

export const updateOrderStatus = async (orderId, status) => {
    const res = await api.patch(`/orders/${orderId}/`, { status });
    return res.data;
};

// Customers
export const getCustomers = async () => {
    const res = await api.get('/auth/customers/');
    return res.data;
};

export const deleteOrder = async (id) => { 
    const res = await api.delete(`/orders/${id}/`); 
    return res.data;
};
export const deleteCategory = async (id) => {
    const res = await api.delete(`/categories/${id}/`);
    return res.data;
};

export const updateOrder = async (orderId, data) => {
    const res = await api.patch(`/orders/${orderId}/`, data);
    return res.data;
};