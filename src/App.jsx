import './App.css'
import Navbar from './components/Navbar';
import Grid from './components/Grid';
import { useParams } from './context/context';
import { useEffect } from 'react';

function App() {
  const { windowWidth, setWindowWidth, rows, setRows, cols, setCols} = useParams();
  setWindowWidth(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if(windowWidth<800){
      setRows(20);
      setCols(15);
    }
    else{
      setRows(25);
      setCols(42);
    }
  }, [windowWidth]);
  
  // console.log(useParams());

  return (
    <>
      <Navbar />
      <Grid numRows={rows} numCols={cols}/>
    </>
  )
}

export default App
