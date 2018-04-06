export default (str) => {
  if (str.slice(-1) !== " ") {
    return str.replace(/[!'<>`()*]/g," ").trim();
  } else {
    return str;
  }
}
