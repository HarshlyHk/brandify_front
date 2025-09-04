import React from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

const ImageComparison = ({ leftImage, rightImage }) => {
  return (
    <div className="image-compare-container">
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={leftImage} alt="Before" />}
        itemTwo={<ReactCompareSliderImage src={rightImage} alt="After" />}
        position={70}
      />
    </div>
  );
};

export default ImageComparison;