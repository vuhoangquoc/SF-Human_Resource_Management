import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
    msg: '',
    user: '',
    token: '',
    loading: false,
    error:''
}

export const signUpser = createAsyncThunk("signUpser", async (body) => {
    const res = await fetch("https://testtourapp.herokuapp.com/signup.", {
        method: "post",
        headers:{
            'Content-Type': "application/json",
        },
        body: JSON.stringify(body)
    })
    return await res.json();
})
export const signInUser = createAsyncThunk("signInUser", async (body) => {
    const res = await fetch("https://testtourapp.herokuapp.com/signin", {
        method: "post",
        headers:{
            'Content-Type': "application/json",
        },
        body: JSON.stringify(body)
    })
    console.log(body);
    return await res.json();
})

const registerSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        addToken: (state,action) =>{
            state.token = localStorage.setItem('token')
        },
        addUser: (state,action) =>{
            state.user = localStorage.SetItem('user')
        },
        logout: (state,action) =>{
            state.token = null;
            localStorage.clear();
        }
        
    },
    extraReducers:{
        //****************************login */
        [signInUser.pending]: (state,action) =>{
            state.loading = true
        },
        [signInUser.fulfilled]: (state,{payload:{error,msg,token,user}}) => {
            state.loading = false
            if(error){
                state.error = error;
            }else{
                state.msg =msg;
                state.token = token;
                state.user = user;

                localStorage.setItem('msg',msg)
                localStorage.setItem('user',JSON.stringify(user))
                localStorage.setItem('token',token)
            }
        },
        [signInUser.rejected]: (state,action) => {
            state.loading = true
        },
/////*********************signin*********************gg */
        [signUpser.pending]: (state,action) =>{
            state.loading = true
        },
        [signUpser.fulfilled]: (state,{payload:{error,msg}}) => {
            state.loading = false
            if(error){
                state.error = error
            } else{
                state.msg = msg
            }
        },
        [signUpser.rejected]: (state,action) => {
            state.loading = true
        },
    }
})
export const {addToken, addUser,logout} = registerSlice.actions;
export default registerSlice.reducer;
