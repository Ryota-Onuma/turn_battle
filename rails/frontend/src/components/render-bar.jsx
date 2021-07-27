import React from "react";
import ProgressBar from 'react-bootstrap/ProgressBar'

export const renderBar = (percent) => {
  return <ProgressBar now={percent} />;
};