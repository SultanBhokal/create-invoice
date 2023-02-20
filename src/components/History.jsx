import React from 'react'
import { Button, Container, Stack } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import { useGlobalStore } from '../context/store'


export default function History() {
    const invoices = useGlobalStore((state)=>state.invoices)
    const darkMode = useGlobalStore((state)=>state.darkMode)
    const setPage = useGlobalStore((state)=>state.setPage)
    const setInvoiceId = useGlobalStore((state)=>state.setInvoiceId)
    
    const onlyInvoiceDetails = invoices?.filter(invoice => {
        if ("invoiceId" in invoice && "date" in invoice) return invoice
    })


    function setView(id){
        setInvoiceId(id)
        setPage("view")
    }


    return (
        <Container fluid className='mt-5' variant={darkMode?"dark":"light"}>
            <Stack direction='column' gap={5}>
                <h3 className={darkMode ? "text-light":"text-dark"}>History</h3>
                {
                    onlyInvoiceDetails?.length > 0 && (
                        <Table variant={darkMode ? "dark" : "light"}>
                            <thead>
                                <tr>
                                <th>Sr.No</th>
                                <th>INVOICE ID</th>
                                <th>DATE</th>
                                <th>TOOLS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    
                                    onlyInvoiceDetails?.map((invoice,index)=>{
                                        
                                        return <tr key={invoice?.invoiceId}>
                                            <td>{index+1}</td>
                                            <td>{invoice?.invoiceId?.substring(0,10)}</td>
                                            <td>{invoice?.date}</td>
                                            <td><Button variant='info' onClick={()=>setView(invoice?.invoiceId)}>View</Button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                          
                        </Table>
                    )
                }

                {
                    onlyInvoiceDetails?.length === 0 && (
                        <p>No records till now</p>
                    )
                }
            </Stack>

        </Container>
    )
}
