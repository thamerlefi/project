import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../baseURL";
import { toast } from "react-toastify";

const initialState = {
    products: {
        list:[],
        pages:1,
        activePage: 1
    },
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    product: {}
}

// ------- get all products
export const getAllProducts = createAsyncThunk("product/getAll",async({limit,page},{rejectWithValue})=>{
    try {
        const res = await axios.get(baseURL + `api/products/?limit=${limit}&page=${page}`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

// ------- get one product
export const getOneProduct = createAsyncThunk("product/getOne", async(id,{rejectWithValue})=>{
    try {
        const res = await axios.get(`${baseURL}api/products/${id}`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

//---------- update product
export const updateOneProduct = createAsyncThunk("product/updateOne", async(updated,{rejectWithValue})=>{
    try {
        const res = await axios.put(`${baseURL}api/products/${updated.id}`,updated.updatedProduct,{headers: {
            "x-auth" : localStorage.getItem('token')
        }}) 
        toast(res.data.message,  {type: "success"})
        return res.data
    } catch (error) {
        toast(error.response.data.message,{type: "error"})
        return rejectWithValue(error.response.data.message)
    }
})

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        pending: (state) => {
            return {...state, isLoading: true,isSuccess: false,isError: false,message: ""}
        },
        rejected: (state) => {
            return {...state, isLoading: false,isSuccess: false,isError: true}
        },
        fulfilled: (state) => {
            return {...state, isLoading: false,isSuccess: true,isError: false }
        }
    },
    extraReducers: (builder) => {
        builder //-----------------get all products cases
        .addCase(getAllProducts.pending,(state)=>{
            return {...state, isLoading: true,isSuccess: false,isError: false,message: ""}
        })
        .addCase(getAllProducts.fulfilled,(state,action)=>{
            return {...state, isLoading: false,isSuccess: true,isError: false,products: action.payload}
        })
        .addCase(getAllProducts.rejected,(state,action)=>{
            return {...state, isLoading: false,isSuccess: false,isError: true,message: action.payload}
        })
        //------------------------ get one product cases
        .addCase(getOneProduct.pending,(state)=>{
            return {...state, isLoading: true,isSuccess: false,isError: false,message: ""}
        })
        .addCase(getOneProduct.fulfilled,(state,action)=>{
            return {...state, isLoading: false,isSuccess: true,isError: false,product: action.payload}
        })
        .addCase(getOneProduct.rejected,(state,action)=>{
            return {...state, isLoading: false,isSuccess: false,isError: true,message: action.payload}
        })
        //--------------------------- update one product cases
        .addCase(updateOneProduct.pending,(state)=>{
            return {...state, isLoading: true,isSuccess: false,isError: false,message: ""}
        })
        .addCase(updateOneProduct.fulfilled,(state,action)=>{
            return {...state, 
                isLoading: false,
                isSuccess: true,
                isError: false,
                message: action.payload.message,
            }
        })
        .addCase(updateOneProduct.rejected,(state,action)=>{
            return {...state, isLoading: false,isSuccess: false,isError: true,message: action.payload}
        })
    }
})

export const {pending,fulfilled,rejected} = productSlice.actions
export default productSlice.reducer