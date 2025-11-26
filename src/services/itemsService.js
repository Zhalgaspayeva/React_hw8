import axios from "axios";

const API_BASE = "https://rickandmortyapi.com/api/character";

const endpoints = {
  search: (name, page) => `${API_BASE}/?name=${name}&page=${page}`,
  searchById: (id) => `${API_BASE}/${id}`,
};

export const searchCharacter = async (name, page = 1) => {
  try {
    const response = await axios.get(endpoints.search(name, page));
    return response.data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};

export const searchDetails = async (id) => {
  try {
    const response = await axios.get(endpoints.searchById(id));
    return response.data;
  } catch (error) {
    console.error("Error fetching character details:", error);
    throw error;
  }
};