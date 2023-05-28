import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../baseURL";
import { toast } from "react-toastify";

const initialState = {
    products: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    product: {}
}

// ------- get all products
export const getAllProducts = createAsyncThunk("product/getAll",async(_,{rejectWithValue})=>{
    try {
        const res = await axios.get(baseURL + 'api/products')
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

//-----------create new product
export const createNewProduct = createAsyncThunk("product/new", async(product,{rejectWithValue})=>{
    try {
        const res = await axios.post(baseURL + 'api/products/new',product, {headers: {
            "x-auth" : localStorage.getItem('token')
        }})
        toast(res.data.message,  {type: "success"})
        return res.data
    } catch (error) {
        toast(error.response.data.message,{type: "error"})
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

//----------- delete product
export const deleteOneProduct = createAsyncThunk("product/deleteOne",async(id,{rejectWithValue})=>{
    try {
        const res = await axios.delete(baseURL + `api/products/${id}`, {headers: {
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
    reducers: {},
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
        //--------------------------- create new product cases 
        .addCase(createNewProduct.pending,(state)=>{
            return {...state, isLoading: true,isSuccess: false,isError: false,message: ""}
        })
        .addCase(createNewProduct.fulfilled,(state,action)=>{
            return {...state, 
                isLoading: false,
                isSuccess: true,
                isError: false,
                message: action.payload.message,
                products: [...state.products, action.payload.product]
            }
        })
        .addCase(createNewProduct.rejected,(state,action)=>{
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
                products: state.products.map(product => {
                    return product._id === action.payload.product._id ? product = action.payload.product :
                    product 
                })
            }
        })
        .addCase(updateOneProduct.rejected,(state,action)=>{
            return {...state, isLoading: false,isSuccess: false,isError: true,message: action.payload}
        })
        //--------------------------- delete one product cases
        .addCase(deleteOneProduct.pending,(state)=>{
            return {...state, isLoading: true,isSuccess: false,isError: false,message: ""}
        })
        .addCase(deleteOneProduct.fulfilled,(state,action)=>{
            return {...state, 
                isLoading: false,
                isSuccess: true,
                isError: false,
                message: action.payload.message,
                products: state.products.filter(product=> product._id !== action.payload.product._id)
            }
        })
        .addCase(deleteOneProduct.rejected,(state,action)=>{
            return {...state, isLoading: false,isSuccess: false,isError: true,message: action.payload}
        })
    }
})

export default productSlice.reducer