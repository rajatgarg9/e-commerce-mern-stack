import React from "react";

import { IImagePropTypes } from "./image.interface";

function Image({ className = "", src, alt }: IImagePropTypes) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={src} alt={alt} />;
}

export default Image;
