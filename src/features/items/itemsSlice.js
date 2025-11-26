import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchCharacter, searchDetails } from "../../services/itemsService";

// 🔍 Получить список персонажей
export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async ({ query = "rick", page = 1 }, { rejectWithValue }) => {
    try {
      const data = await searchCharacter(query, page);
      return data;
    } catch (err) {
      return rejectWithValue("Failed to load characters");
    }
  }
);

// 🔎 Получить детали персонажа
export const fetchItemById = createAsyncThunk(
  "items/fetchItemById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await searchDetails(id);
      return data;
    } catch (err) {
      return rejectWithValue("Character not found");
    }
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    list: [],
    selectedItem: null,
    loadingList: false,
    loadingItem: false,
    errorList: null,
    errorItem: null,
    query: "",
    page: 1,
    totalPages: 1,
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===================== LIST =====================
      .addCase(fetchItems.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload.results || [];
        state.totalPages = action.payload.info?.pages || 1;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
        state.list = [];
      })

      // ===================== DETAILS =====================
      .addCase(fetchItemById.pending, (state) => {
        state.loadingItem = true;
        state.errorItem = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loadingItem = false;
        state.errorItem = action.payload;
        state.selectedItem = null;
      });
  },
});

export const { setQuery, setPage } = itemsSlice.actions;
export default itemsSlice.reducer;