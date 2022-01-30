const validateURL = (url) => {
    const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,})/;
    const regex = new RegExp(expression);
    if (url.match(regex)) {
        return true
      } 
        return false 
}
export default validateURL