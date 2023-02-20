import React, { useRef } from 'react'
import { Button, Container, Stack } from 'react-bootstrap'
import { useGlobalStore } from '../context/store'
import Table from 'react-bootstrap/Table';
import ReactToPrint from 'react-to-print';

const headings = ["Sr no", "Name", "Rate", "Qty", "Basic Cost", "Discount", "Discount Amount", "Final Cost", "Taxes", "Tax Amt", "Total Cost"]


export default function ViewRecord() {
    const invoiceId = useGlobalStore((state) => state.invoiceId)
    const invoices = useGlobalStore((state) => state.invoices)
    const setPage = useGlobalStore((state)=>state.setPage)
    const darkMode = useGlobalStore((state)=>state.darkMode)

    const tableRef = useRef(null)

    const filteredInvoices = invoices?.filter(invoice => {
        if ("date" in invoice === false && invoiceId === invoice?.invoiceId) return invoice
    })

    const onlyInvoiceDetails = invoices?.filter(invoice => {
        if ("invoiceId" in invoice && "date" in invoice && invoiceId === invoice?.invoiceId) return invoice
    })

    

    const date = onlyInvoiceDetails[0]?.date;
    const totalCost = onlyInvoiceDetails[0]?.totalCost;
    const totalDiscount = onlyInvoiceDetails[0]?.totalDiscount;
    const totalTaxable = onlyInvoiceDetails[0]?.totalTaxable;
    

    return (
        <Container fluid className={darkMode?"bg-dark vh-100 py-3":"bg-light vh-100 py-3"}>
            <Button className=' my-2 rounded-pill' onClick={()=>setPage("dashboard")}>Back</Button>
            <Stack direction='column' gap={5} className='my-3'>
                <Table ref={tableRef} variant={darkMode ? "dark":"light"}>
                    <thead>
                        <tr>
                            <td className=''>INVOICE ID : {invoiceId.substring(0, 10)}</td>
                            <td colSpan={10} align='right'>Date : {date}</td>
                        </tr>
                        <tr>
                            {headings?.map(heading => {
                                return (
                                    <th key={heading}>
                                        {heading}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredInvoices?.map((invoice, index) => {
                                return (
                                    <tr key={invoice.id}>
                                        <td>{index + 1}</td>
                                        <td>{invoice?.name}</td>
                                        <td>{invoice?.rate}</td>
                                        <td>{invoice?.qty}</td>
                                        <td>{invoice?.basicCost}</td>
                                        <td>{invoice?.discount}</td>
                                        <td>{invoice?.discountAmount}</td>
                                        <td>{invoice?.finalCost}</td>
                                        <td>{invoice?.taxes}</td>
                                        <td>{invoice?.taxAmount}</td>
                                        <td>{invoice?.totalCost}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                    <tfoot>
                        <tr>
                            <td align='right' colSpan={11}>Total discount : {totalDiscount}</td>

                        </tr>
                        <tr>
                            <td align='right' colSpan={11}>Total Tax : {totalTaxable}</td>

                        </tr>
                        <tr>
                            <td align='right' colSpan={11}>Total Amount : {totalCost}</td>

                        </tr>
                        {
                            !!(totalCost % 1) ? (
                                <tr>
                                    <td colSpan={11}>Round Figure : {Math.round(totalCost)}</td>
                                </tr>
                            )
                                :
                                null
                        }

                    </tfoot>

                </Table>
                <div className='d-flex justify-content-center'>


                    <ReactToPrint
                        trigger={() => <Button variant='primary'>PRINT</Button>}
                        content={() => tableRef.current}
                    />



                </div>

            </Stack>
        </Container>
    )
}
