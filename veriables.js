function getLocalStorage() {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return [];
  }
}

function get(select) {
  return document.querySelector(select);
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export { get, getLocalStorage, setLocalStorage };
