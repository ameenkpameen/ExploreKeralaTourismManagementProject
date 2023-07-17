import React, { useState } from 'react'
import {AiFillLeftCircle} from 'react-icons/ai'
import {AiFillRightCircle} from 'react-icons/ai'

function ImageSlider({slides}) {
    const [currentIndex, setCurrentIndex] =useState(0)
    const sliderStyles = {
        height: '100%',
        position: 'relative',

    }
    if(slides && slides.length > 0){

      var slideStyles = {
          width: '100%',
          height: '100%',
          borderRadius: '5px',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slides[currentIndex].url})`,
          // border: '3px solid white'
      }
    }
    const leftArrowStyles = {
      position: 'absolute',
      top: '50%',
      transform: 'translate(0, -50%)',
      left: '32px',
      fontSize: '45px',
      color: '#fff',
      zIndex: 1,
      cursor: 'pointer',
    }
    const rightArrowStyles = {
      position: 'absolute',
      top: '50%',
      transform: 'translate(0, -50%)',
      right: '32px',
      fontSize: '45px',
      color: '#fff',
      zIndex: 1,
      cursor: 'pointer',
    }
    
    
      const headingStyles = {
        position: 'absolute',
        top: '30%',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        fontSize: '35px',
        color: '#fff',
        cursor: 'pointer',
      }

      const mediaQueries = `
        @media (max-width: 768px) {
          .heading {
            font-size: 28px;
          }
        }

        @media (max-width: 480px) {
          .heading {
            font-size: 24px;
          }
        }
      `;

      const combinedStyles = {
        ...headingStyles,
        '@global': {
          '.heading': {
            ...headingStyles,
          },
          ...mediaQueries,
        },
      };
    
    
        const descriptionStyles = {
          position: 'absolute',
          bottom: '45%',
          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
          fontSize: '17px',
          color: '#fff',
          cursor: 'pointer',
        }

        const buttonStyles = {
          position: 'absolute',
          bottom: '22%',
          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
          fontSize: '17px',
          color: '#fff',
          cursor: 'pointer',
        }
   

    const goToPrevious = ()=>{
      const isFirstSlide = currentIndex === 0
      const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
      setCurrentIndex(newIndex)
    }

    const goToNext = ()=>{
      const isLastSlide = currentIndex === slides.length-1
      const newIndex = isLastSlide ? 0 : currentIndex + 1
      setCurrentIndex(newIndex)
    }
    const dotsContainerStyles = {
      display: 'flex',
      justifyContent: 'center',
    }

    const dotStyles = {
      margin: '0 3px',
      cursor: 'pointer',
      fontSize: '20px',
    }
    const goToSlide = slideIndex =>{
      setCurrentIndex(slideIndex)
    }
  return (
    <div style={sliderStyles}>
      <div style={leftArrowStyles} onClick={goToPrevious}><AiFillLeftCircle /></div>
      <div style={rightArrowStyles} onClick={goToNext}><AiFillRightCircle /></div>
      {slides && slides.length > 0 &&
      <>
        <div style={combinedStyles} >
          <h1 className="heading">{slides[currentIndex].heading}</h1>
        </div>
        <div style={descriptionStyles} >{slides[currentIndex].description}</div>
        <div style={buttonStyles}>
            <button class="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border-2 border-white hover:border-transparent rounded-full">
              Get it...
            </button>
        </div>
      </>
      }
      <div style={slideStyles}></div>
      <div style={dotsContainerStyles}>
        {slides.map((slide,slideIndex)=>(
          <div key={slideIndex} style={dotStyles} onClick={()=>goToSlide(slideIndex)}>●</div>
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
