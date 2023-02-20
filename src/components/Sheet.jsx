import { Button } from 'react-bootstrap';
import React, { useState, useMemo, useEffect, useRef } from 'react'
import Table from 'react-bootstrap/Table';
import uuid from 'react-uuid';
import GenerateNewItem from './GenerateNewItem';
import { useGlobalStore } from '../context/store';





const headings = ["Sr no", "Name", "Rate", "Qty", "Basic Cost", "Discount", "Discount Amount", "Final Cost", "Taxes", "Tax Amt", "Total Cost", "Tools"]





export default function Sheet() {

    const darkMode = useGlobalStore((state)=>state.darkMode)
    const setInvoices = useGlobalStore((state)=>state.setInvoices)
    const invoices = useGlobalStore((state)=>state.invoices)
    const [rows, setRows] = useState([])
    const [totalDiscount, setTotalDiscount] = useState(0)
    const [totalTaxable, setTotalTaxable] = useState(0)
    const [totalCost, setTotalCost] = useState(0)
    const [invoiceID,setInvoiceID] = useState(uuid())
  



    function addItem() {


        setRows(rows => {

            return [...rows, {
                invoiceId:invoiceID,
                id: uuid(),
                srno: rows?.length + 1,
                name: "",
                rate: 0,
                qty: 0,
                basicCost: 0,
                discount: 0,
                discountAmount: 0,
                finalCost: 0,
                taxes: 0,
                taxAmount: 0,
                totalCost: 0,
            }
            ]
        })


    }

    function setItem(key, id, value) {
        setRows(rows => {
            return rows?.map(row => {
                if (row?.id === id) {
                    row[key] = value
                    console.log(value)
                    if(row?.discount ===0 || !value){
                        row["discountAmount"] = 0
                    }
                    if(row?.taxes === 0 || !value){
                        row["taxAmount"] = 0
                    }
                    if (row?.qty > 0 && row?.rate > 0) {
                        row["basicCost"] = row?.qty * row?.rate
                    }
                    if (row?.basicCost > 0 && row?.discount > 0) {
                        row["discountAmount"] = (row?.basicCost * row?.discount) / 100
                    }
                    if (row?.basicCost > 0) {
                        row["finalCost"] = row?.basicCost - row?.discountAmount
                    }

                    if (row?.finalCost > 0 && row?.taxes > 0) {
                        row["taxAmount"] = (row?.finalCost * row?.taxes) / 100

                    }
                    if (row?.finalCost > 0) {
                        row["totalCost"] = row?.finalCost + row?.taxAmount

                    }

                    


                    return {
                        ...row
                    }

                }

                return row
            })
        })

       

    }

    function deleteItem(id) {
        console.log(id)
        setRows(rows => {
            return rows?.filter(row => {
                if (row?.id !== id) return row
            })
        })
    }


    function saveInvoice(e) {
        e.preventDefault()
        const date = new Date().toDateString()
        
       
        setInvoices([...invoices,...rows,{date:date,invoiceId:invoiceID,totalCost:totalCost,totalDiscount:totalDiscount,totalTaxable:totalTaxable}])

        const data = [...invoices,...rows,{date:date,invoiceId:invoiceID,totalCost,totalDiscount,totalTaxable}]

        localStorage.setItem("invoices",JSON.stringify(data))

        setRows([])
        setInvoiceID(uuid())

        
    }

    useMemo(() => {

        setTotalDiscount(() => {
            return rows?.reduce((total, obj) => total + obj?.discountAmount, 0).toFixed(2)
        })

        setTotalTaxable(() => {
            return rows?.reduce((total, obj) => total + obj?.taxAmount, 0).toFixed(2)
        })

        setTotalCost(() => {
            return rows?.reduce((total, obj) => total + obj?.totalCost, 0).toFixed(2)
        })



    }, [rows])

   


    return (
        <form onSubmit={e => saveInvoice(e)}>
            {
                rows?.length > 0 && (
                    <p><span className=' fw-bold'>INVOICE ID :</span> {invoiceID?.substring(0,10)}</p>
                )
            }
            <Table responsive="xxl" striped bordered variant={darkMode ? "dark" : "light"} >



                <thead>
                    <tr>
                        {headings?.map(heading => {
                            return <td key={heading?.toLocaleLowerCase()}>{heading}</td>
                        })}
                    </tr>
                </thead>
                <tbody>

                    {
                        rows?.map(row => {

                            return <GenerateNewItem key={row?.id} item={row} setItem={setItem} deleteItem={deleteItem} />
                        }
                        )
                    }


                    <tr>
                        <td colSpan={12} align='center'>
                            <Button onClick={addItem} type='button'>Add</Button>
                        </td>
                    </tr>




                </tbody>
                <tfoot>
                    {
                        totalCost > 0 ?
                            (
                                <>
                                    <tr>
                                        <td colSpan={10} align='right'>Total Discount</td>
                                        <td colSpan={2}>{totalDiscount}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={10} align='right'>Taxable Amount</td>
                                        <td colSpan={2}>{totalTaxable}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={10} align='right'>Total Cost</td>
                                        <td colSpan={2}>{totalCost}</td>
                                    </tr>

                                    {
                                        !!(totalCost % 1) ? (
                                            <tr>
                                                <td colSpan={10} align='right'>Total Cost Round Figure</td>
                                                <td colSpan={2}>{Math.round(totalCost)}</td>
                                            </tr>
                                        )
                                            :
                                            null
                                    }

                                    <tr>

                                        <td colSpan={12} align='right'>
                                        <Button variant='success' type='submit'>Save</Button>
                                        </td>
                                    </tr>
                                </>

                            )
                            :
                            null
                    }
                </tfoot>

            </Table>
        </form>
    )
}
