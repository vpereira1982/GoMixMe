export const createImgSrc = (image, cb) => {
  // 'get' and 'read' file from input field upload
  const file = image;
  const reader = new FileReader();

  reader.onload = () => {
    cb(reader.result);
  };

  reader.readAsDataURL(file);
}
