import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchCharacter, searchDetails } from "../../services/itemsService";

// 🔍 Загрузка списка персонажей
export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async ({ name, page }, { rejectWithValue }) => {
    try {
      const data = await searchCharacter(name, page);
      return data; // { info, results }
    } catch (err) {
      return rejectWithValue("Failed to load characters");
    }
  }
);

// 🔎 Загрузка деталей по ID
export const fetchItemDetails = createAsyncThunk(
  "items/fetchItemDetails",
  async (id, { rejectWithValue }) => {
    try {
      const data = await searchDetails(id);
      return data; // объект персонажа
    } catch (err) {
      return rejectWithValue("Character not found");
    }
  }
);

const itemsSlice = createSlice({
  name: "items",

  initialState: {
    list: [],           // список персонажей
    info: null,         // пагинация из Rick&Morty API
    details: null,      // выбранный персонаж
    loadingList: false, // загрузка списка
    loadingDetails: false, // загрузка деталей
    errorList: null,
    errorDetails: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // ===========================
      // 📌 FETCH LIST
      // ===========================
      .addCase(fetchItems.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload.results;
        state.info = action.payload.info;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })

      // ===========================
      // 📌 FETCH DETAILS
      // ===========================
      .addCase(fetchItemDetails.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(fetchItemDetails.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.details = action.payload;
      })
      .addCase(fetchItemDetails.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.payload;
      });
  },
});

export default itemsSlice.reducer;