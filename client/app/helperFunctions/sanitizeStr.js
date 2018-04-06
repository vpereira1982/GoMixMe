export default (str) => (
  str.slice(-1) !== " " ? str.replace(/[!'<>`()*]/g," ").trim() : str;
);
