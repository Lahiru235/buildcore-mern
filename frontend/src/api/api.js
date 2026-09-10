import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const getServices = () => api.get("/services").then((r) => r.data);
export const getProjects = () => api.get("/projects").then((r) => r.data);
export const getTeam = () => api.get("/team").then((r) => r.data);
export const getTestimonials = () => api.get("/testimonials").then((r) => r.data);
export const getBlogPosts = () => api.get("/blog").then((r) => r.data);
export const getContactMessages = () => api.get("/contact").then((r) => r.data);
export const updateContactMessage = (id, payload) =>
  api.put(`/contact/${id}`, payload).then((r) => r.data);
export const submitContact = (payload) =>
  api.post("/contact", payload).then((r) => r.data);

export default api;
