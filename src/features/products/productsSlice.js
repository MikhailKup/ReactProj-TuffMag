import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL } from '../../utils/constants'
import { shuffle } from '../../utils/common';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, thunkAPI) => {
		try {
			const response = await axios(`${BASE_URL}/products`)
    	return response.data
		} catch (error) {
			console.log(error);
			thunkAPI.rejectWithValue(error)
		}
  },
)

const initialState = {
	list: [],
	filtered: [],
	related: [],
	isLoading: false,
};

const productsSlice = createSlice({
	name: 'products',
  initialState,
	reducers: {
		filteredByPrice: (state, action) => {
			state.filtered = state.list.filter(({ price }) => price < action.payload);
		},
		getRelatedProducts: (state, action) => {
			const list = state.list.filter(({ category }) => category === action.payload.category);
			state.related = shuffle(list);
		}
	},
	extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
		builder.addCase(getProducts.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    });
		builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { filteredByPrice, getRelatedProducts } = productsSlice.actions

export default productsSlice.reducer