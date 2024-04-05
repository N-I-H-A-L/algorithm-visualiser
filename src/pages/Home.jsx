import React from 'react'
import "../css/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  
  const redirectGraph = () => {
    navigate("/graphs");
  }

  const redirectSorting = () => {
    navigate("/sorting");
  }

  return (
    <>
      <div className="main">
        <button className="home-btn" onClick={()=> redirectGraph()}>Graphs</button>
        <button className="home-btn" onClick={()=> redirectSorting()}>Sorting</button>
      </div>
    </>
  )
}

export default Home
