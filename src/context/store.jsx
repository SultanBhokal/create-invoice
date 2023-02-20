import { create } from "zustand";



export const useGlobalStore = create((set)=>({
    darkMode:false,
    setDarkMode:(darkMode)=>set({darkMode}),
    invoices:[],
    setInvoices:(invoices)=>set({invoices}),
  
    invoiceId:"",
    setInvoiceId:(invoiceId)=>set({invoiceId}),
    page:"dashboard",
    setPage:(page)=>set({page}),
}))


async function getInvoices(){
    const data =await JSON.parse(localStorage.getItem("invoices"))
    const result = data === null?[]:data
    useGlobalStore.getState().setInvoices(result)
}

getInvoices()

