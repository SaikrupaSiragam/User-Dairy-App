import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getImages } from './api';
import DataTable from 'react-data-table-component';
import "../assets/css/images.css"

const ImageDisplay = () => {
  const location = useLocation();
  const images = [1, 2, 3];
  const navigate = useNavigate();
  const description = location.state.description
  console.log(`description ${description}`)
  const userid = location.state.userid;
  console.log(`useridoflocation:${userid}`);
  const id = location.state.id;
  console.log(`idoflocation:${id}`);
  const regtoken = localStorage.getItem('regtoken')
  const token = regtoken.replaceAll('"', '');
  const [ImagesUploaded, setImagesUploaded] = useState();
  const [error, setError] = useState();

  const [slideIndex, setSlideIndex] = useState(1);
  const [millis, setMillis] = useState(5000);
  const [interval, setIntervalValue] = useState();


  useEffect(() => {
    async function getData() {
      const imagesUploaded = await getImages(token, id)
      setImagesUploaded(imagesUploaded.data)
      console.log(imagesUploaded.data)
       startSlides();
      return pauseSlides;
    }
    getData();
  }, []);

  useEffect(() => {
    showSlide();
  }, [slideIndex]);

function nextSlide() {
    setSlideIndex((idx) => idx + 1); 
  }

  function currentSlide(idx) {
    setSlideIndex(idx);
  }

  function pauseSlides() {
    clearInterval(interval);
  }

  function startSlides() {
    nextSlide();
    const interval = setInterval(nextSlide, millis);
    setIntervalValue(interval);
  }

  function showSlide() {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";

    if (slideIndex > slides.length) {
      setSlideIndex(1);
    } else if (slideIndex < 1) {
      setSlideIndex(slides.length);
    } else {
      for (let i = 0; i < dots.length; i++)
        dots[i].className = dots[i].className.replace(" active", "");
      console.log(slideIndex);
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }
  }

  const columns = [
    {
      name: "Note",
      selector: (row) => <p>{description}</p>
    },
    {
      name: "Images",
      selector: (row) =>
        <>
          <div
        className="slideshow-container"
        onMouseEnter={() => pauseSlides()}
        onMouseLeave={() => startSlides()}
      >
        <div className="mySlides">
          <img  src={row.image[0]} alt="image not available" width="50%" height="50%"></img>
        </div>

        <div className="mySlides">
          <img  src={row.image[1]} alt="image not available" width="50%" height="50%"></img>
        </div>

        <div className="mySlides">
          <img src={row.image[2]} alt="image not available" width="50%" height="50%"></img>
        </div>
      </div>

      <div>
        <span className="dot" onClick={() => currentSlide(0)}></span>
        <span className="dot" onClick={() => currentSlide(1)}></span>
        <span className="dot" onClick={() => currentSlide(2)}></span>
      </div>
        </>
    }
  ]
  const customStyles = {
    rows: {
      style: {
        minHeight: '102px',
        minWidth: "50%",
        textAlign: 'center',
      }
    },
    headCells: {
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        backgroundColor: '#95A5A6',
        letterspacing: '0.03em',
      },
    },
    cells: {
      style: {
        fontSize: '17px',
        backgroundColor: "",
        boxShadow: "0px 0px 9px 0px rgba(0,0,0,0.1)",
        padding: " 40px ",
      },
    },
  };
  return (
    <>
    <button className='cancelbutton'
            onClick={()=>navigate(`/userdairy`, {
            state: { userid: userid }
          })}
            >Cancel</button>
            <button className='imagelogout'
          onClick={() => {
            localStorage.clear()
            navigate("/");
          }}>
          Logout
        </button>
      <DataTable columns={columns}
      customStyles={customStyles}
        data={ImagesUploaded} />
      <p>{error}</p>
      
    </>
  )
}

export default ImageDisplay;