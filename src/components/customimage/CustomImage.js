import React from "react";

const CustomImage = (props) => {
  const src = props.imageSrc;
  const alt = props.imageAlt;
  const width = props.imageWidth;
  const height = props.imageHeight;

  return (
    <div data-test="CustomImageComponent">
      <img
        data-test="image"
        style={{ width: width, height: height }}
        src={src}
        alt={alt}
      />
    </div>
  );
};

export default CustomImage;
