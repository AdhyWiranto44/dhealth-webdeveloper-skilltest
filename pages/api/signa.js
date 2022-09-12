import axios from "axios";

const domain = "http://localhost:8000/api/signa";

export const getAllSigna = () => axios.get(domain);