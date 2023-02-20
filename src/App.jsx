import React from 'react'
import Sheet from './components/Sheet'
import History from './components/History';
import ViewRecord from './components/ViewRecord';
import { Container, Stack } from 'react-bootstrap'
import { useGlobalStore } from './context/store';
import NavBar from './components/NavBar';


export default function App() {

  const darkMode = useGlobalStore((state)=>state.darkMode)
  const page = useGlobalStore((state)=>state.page)

  if(page === "view"){
    return <ViewRecord />
  }

  return (
    <>
    <NavBar />
     <Container fluid className={darkMode?"bg-dark vh-100 py-3":"bg-light vh-100 py-3"}>

     
     <Stack direction='column' gap={5}>
       <Sheet />
       <History />
     </Stack>
   </Container>
    </>
  )
}
