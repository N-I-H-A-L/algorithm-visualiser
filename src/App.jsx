import './App.css'
import Navbar from './components/Navbar';
import Grid from './components/Grid';

function App() {
  return (
    <>
      <Navbar />
      <Grid numRows={25} numCols={35}/>
    </>
  )
}

export default App
