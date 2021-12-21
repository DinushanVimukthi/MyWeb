import { objectToString } from '@vue/shared';
import Vue from 'vue'
const userstore = (state, payload) => {
    state.users= payload;
  };
  const getcourse=(state,payload) =>{
    state.courses[payload.ID]=payload.Type;
  
  }
  const updatecourse =(state,payload)=>{
    Object.assign(state.courses[payload.ID],payload.Type)
  }
  const clearuser=(state)=>{
    state.users={};
    // console.log("Cleared");
  }
  export { userstore,getcourse,clearuser,updatecourse};