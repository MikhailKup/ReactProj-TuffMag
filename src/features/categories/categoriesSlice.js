import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL } from '../../utils/constants'

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, thunkAPI) => {
		try {
			const response = await axios(`${BASE_URL}/products/categories`)
    	return response.data
		} catch (error) {
			console.log(error);
			thunkAPI.rejectWithValue(error)
		}
  },
)

const initialState = {
	list: [],
  isLoading: false
};

const categoriesSlice = createSlice({
	name: 'categories',
  initialState,
	extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
		builder.addCase(getCategories.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    });
		builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default categoriesSlice.reducer