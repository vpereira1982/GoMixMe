export const createImgSrc = (image, cb) => {
  // 'get' and 'read' file from input field upload
  let file = image;
  let reader = new FileReader();

  reader.onload = () => {
    cb(reader.result);
  };

  reader.readAsDataURL(file);
}
