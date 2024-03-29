import './App.css'
import Navbar from './components/Navbar';
import Grid from './components/Grid';

import { useParams } from './context/context';

function App() {

  console.log(useParams());

  return (
    <>
      <Navbar />
      <Grid numRows={25} numCols={42}/>
    </>
  )
}

export default App
