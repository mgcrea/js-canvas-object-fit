//   1        2       3      4         5            6           7          8
//  888888  888888      88  88      8888888888  88                  88  8888888888
//  88          88      88  88      88  88      88  88          88  88      88  88
//  8888      8888    8888  8888    88          8888888888  8888888888          88
//  88          88      88  88
//  88          88  888888  888888
export const EXIF_ORIENTATIONS = [
  {op: 'none', radians: 0},
  {op: 'none', radians: 0},
  {op: 'flip-x', radians: 0},
  {op: 'none', radians: Math.PI},
  {op: 'flip-y', radians: 0},
  {op: 'flip-x', radians: Math.PI / 2},
  {op: 'none', radians: Math.PI / 2},
  {op: 'flip-x', radians: -Math.PI / 2},
  {op: 'none', radians: -Math.PI / 2}
];

export const isExifRotated = orientation => [5, 6, 7, 8].includes(orientation);

// Without rotation handling
export const drawBasicImage = (
  ctx,
  image,
  x,
  y,
  width,
  height,
  {objectFit = 'none', orientation = 0, offsetX = 1 / 2, offsetY = 1 / 2} = {}
) => {
  const imageWidth = image.width;
  const imageHeight = image.height;
  // Resize values
  const resizeRatio = Math[objectFit === 'cover' ? 'max' : 'min'](width / imageWidth, height / imageHeight);
  const resizeWidth = imageWidth * resizeRatio;
  const resizeHeight = imageHeight * resizeRatio;
  // Cropping values
  const sWidth = imageWidth / (resizeWidth / width);
  const sHeight = imageHeight / (resizeHeight / height);
  const sX = (imageWidth - sWidth) * offsetX;
  const sY = (imageHeight - sHeight) * offsetY;
  // Draw image
  ctx.drawImage(image, sX, sY, sWidth, sHeight, x, y, width, height);
};

export const drawImage = (
  ctx,
  image,
  x,
  y,
  width,
  height,
  {objectFit = 'cover', orientation = 0, offsetX = 1 / 2, offsetY = 1 / 2} = {}
) => {
  // Orientation value
  const rotation = EXIF_ORIENTATIONS[orientation].radians;
  const isHalfRotated = rotation !== 0 && rotation % Math.PI === 0;
  const isQuarterRotated = rotation !== 0 && !isHalfRotated && rotation % (Math.PI / 2) === 0;
  const isRotatedClockwise = rotation / (Math.PI / 2) < 0; // @NOTE handle 2*PI rotation?
  // Size values
  const imageWidth = !isQuarterRotated ? image.width : image.height;
  const imageHeight = !isQuarterRotated ? image.height : image.width;
  // Resize values
  const resizeRatio = Math[objectFit === 'cover' ? 'max' : 'min'](width / imageWidth, height / imageHeight);
  const resizeWidth = !isQuarterRotated ? imageWidth * resizeRatio : imageHeight * resizeRatio;
  const resizeHeight = !isQuarterRotated ? imageHeight * resizeRatio : imageWidth * resizeRatio;
  // Cropping values
  const sWidth = !isQuarterRotated ? imageWidth / (resizeWidth / width) : imageHeight / (resizeWidth / height);
  const sHeight = !isQuarterRotated ? imageHeight / (resizeHeight / height) : imageWidth / (resizeHeight / width);
  const sX = (image.width - sWidth) * offsetX;
  const sY = (image.height - sHeight) * offsetY;
  // Positionning values
  let tX = 0;
  let tY = 0;
  if (isHalfRotated) {
    tX = -width - x;
    tY = -height - y;
  } else if (isQuarterRotated) {
    tX = !isRotatedClockwise ? x : -height - x;
    tY = isRotatedClockwise ? y : -width - y;
  }
  const tWidth = !isQuarterRotated ? width : height;
  const tHeight = !isQuarterRotated ? height : width;
  // Draw image
  if (rotation) {
    ctx.rotate(rotation);
  }
  if (objectFit !== 'none') {
    ctx.drawImage(image, sX, sY, sWidth, sHeight, tX, tY, tWidth, tHeight);
  } else {
    ctx.drawImage(image, tX, tY, tWidth, tHeight);
  }
  if (rotation) {
    ctx.rotate(-rotation);
  }
};
