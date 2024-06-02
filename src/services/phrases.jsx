import axios from "axios";

const BACKEND_URL = "http://localhost:3100";

export async function getAllPhrases() {
  const response = await axios.get(`${BACKEND_URL}/phrases`);
  return response.data;
}

export async function deletePhrase(phrase) {
  const response = await axios.delete(`${BACKEND_URL}/phrases`, {data: {text: phrase}});
  return response.data;
}

export async function addPhrase(phrase) {
  const response = await axios.post(`${BACKEND_URL}/phrases`, {text: phrase});
  return response.data;
}
