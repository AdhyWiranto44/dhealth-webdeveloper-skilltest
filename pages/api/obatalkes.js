import axios from "axios";

const domain = "http://localhost:8000/api/obatalkes";

export const getAllObatalkes = () => axios.get(domain);