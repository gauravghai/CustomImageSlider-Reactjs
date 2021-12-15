import React from 'react'

function Slider(props) {
    return (
        <div className="slider">
            <div className="slides">
                <img src={props.imageArr[props.currentImage]} alt={`Slider-${props.currentImage}`} />
            </div>
            <button className="slidePrev" onClick={() => props.controllers(0)}> {'<'} </button>
            <button className="slideNext" onClick={() => props.controllers(1)}> {'>'} </button>
      </div>
    )
}

export default Slider;