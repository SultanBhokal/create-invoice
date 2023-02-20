import React from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function GenerateNewItem({item,setItem,deleteItem}) {

   

    return (
        <tr key={item?.id}>
            <td>
                {item?.srno}
            </td>
            <td>
                <Form.Control size="sm" type="text" placeholder="Name" className='w-auto'  onChange={e => setItem("name", item?.id,e.target.value)} required />
            </td>
            <td>
                <Form.Control size="sm" type="number" placeholder="Rate" className='w-auto'  onChange={e => setItem("rate", item?.id,e.target.value)} required />
            </td>
            <td>
                <Form.Control size="sm" type="number" placeholder="Qty" className='w-auto'  onChange={e => setItem("qty", item?.id,e.target.value)} required />
            </td>
            <td align='center'>
                {item?.basicCost}
            </td>
            <td>
                <Form.Control size="sm" type="number" min={0} max={100} step={0.01} placeholder="discount%" className='w-auto' onChange={e =>{
                    if(e.target.value > 100 || e.target.value < 0){
                        e.target.value = 0
                        return
                    }
                    setItem("discount", item?.id,e.target.value)} 
                } 
                    required />
            </td>
            <td align='center'>
                {
                    item?.discountAmount
                }
            </td>
            <td align='center'>
                {item?.finalCost}
            </td>
            <td>
                <Form.Control size="sm" type="number" min={0} max={100} step={0.01} placeholder="tax%" className='w-auto'  onChange={e => setItem("taxes", item?.id,e.target.value)} required />
            </td>
            <td align='center'>
                {item?.taxAmount}
            </td>
            <td align='center'>
                {item?.totalCost}
            </td>
            <td>
                <Button variant='danger' onClick={() => deleteItem(item?.id)}>Delete</Button>
            </td>
        </tr>

    )
}
