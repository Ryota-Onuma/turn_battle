import React from "react";

export const renderImage = (sourse) =>{
  return <img src={sourse}  alt="画像" />
}

export const Modal = (props) => {
  return(
    <div id="modal-wrapper">
      <div id="modal">
        { props.children }
      </div>
    </div>
  )
}