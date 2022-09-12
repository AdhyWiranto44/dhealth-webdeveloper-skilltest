import axios from "axios";

const domain = "http://localhost:8000/api/transaction";

export const getAllTransaction = async () => await axios.get(domain);
export const insertNewTransaction = async (data = {}) => await axios.post(domain, data);