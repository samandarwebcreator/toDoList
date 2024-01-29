import { get, getLocalStorage } from "./veriables.js";

let themeBtn = get("#theme__button");
const body = document.body;
const darkThemeClass = "dark";
const darkTheme = get(".dark__theme-moon");
const lightTheme = get(".light__theme-sun");
const header = get(".header__todo");
const headerTitle = get(".todo__title");
const card = get(".taskForm");

function toggleDark() {
  if (body.classList.contains(darkThemeClass)) {
    body.classList.remove(darkThemeClass);
    localStorage.setItem("theme", "light");
    setLightStyles();
  } else {
    body.classList.add(darkThemeClass);
    localStorage.setItem("theme", "dark");
    setDarkStyles();
  }
}

//! biz bu kodda asosan toggleDark degan funksiya yaratib oldik va body degan o'zgaruvchi orqali bodyni ham aniqlab oldik
//! va bu funksiyamizni ichiga if  else orqali shart yozayapmiz agar bodyni classListida "dark" so'zi bor bo'lsa o'sha so'zni o'chirib tashlada
//! light degan so'zni qo'shib qoy degan va light so'zini qo'shib qoygandan keyin albatta setLignt theme funksiyasidagi stillarni bu yerga chaqirib qoyadi
//! Aks holatda yani agar bodyni classlisti da hech qanday nom bo'lmasa yoki light so'zi bo'lsa uni o'chirib tashla va dark so'zini qo'shib qoy degan buyruqni berayapmiz
//! va oxrida setDarkStyles funksiyasini chaqirib biz shu funksiyada dark mode uchun yozgan funksiyalarimizni ishlatayapmiz
if (localStorage.getItem("theme") === "dark") {
  body.classList.add(darkThemeClass);
  setDarkStyles();
}

//! bu if else shartida esa biz o'zgartirgan themeni localstorage ga joylayapmiz maqsadimiz esa page refresh bo'lganda theme defaultga o'zgarmasligi
//! va shart beyapmizki agar local soragedagi theme keyini value si darkga teng bo'lsa bodyni classListiga dark qo'sh degan shatni  yozyapmiz
//! va classListiga dark so'zini qo'shganidan keyin biz funksiyadagi dark themedagi stilllarimizni setdarkStyles funksiyasi orqali qo'shib olyapmiz

themeBtn.addEventListener("click", toggleDark);
//! asosiy ish yani button bosilayotganda toggledark funksiyasini chaqirib qoyayapmiz

document.body.addEventListener("transitionend", () => {
  document.body.classList.remove("theme-transition");
});

//! biz bu yerda bodyga addeventlistener qo'shyapmiz va uning sababi esa bizga theme o'zgargan vaqtda page chiroyliroq yani transition bilan o'zgarsin degan ma'noda
//! button bosilib theme o'zgarayotganda bizning body claslistimiz dan theme transitions so'zini olib tashlaydi

function setLightStyles() {
  body.style.backgroundColor = "white";
  header.style.backgroundColor = "#2196f3";
  darkTheme.style.display = "block";
  lightTheme.style.display = "none";
  headerTitle.style.color = "white";
  darkTheme.style.color = "white";
  card.style.border = "2px solid transparent";
  header.style.boxShadow = "0px 16px 26px 11px rgba(34, 60, 80, 0.2)";
  card.style.boxShadow = " box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);";
  themeBtn.style.border = "2px solid white";
}
function setDarkStyles() {
  body.style.backgroundColor = "#1A1B1F";
  darkTheme.style.display = "none";
  lightTheme.style.display = "block";
  header.style.backgroundColor = "#262931";
  headerTitle.style.color = "#2196f3";
  lightTheme.style.color = "#2196f3";
  themeBtn.style.border = "2px solid #2196f3";
  card.style.color = "#E4E2E6";
  card.style.border = "2px solid #262931";
  header.style.boxShadow = "none";
}

if (localStorage.getItem("theme") === "dark") {
  setDarkStyles();
} else {
  setLightStyles();
}

//! bizda asosiy ish esa shu if else shatida bo'lyapti bu nima desak bu agar localstoragedagi theme dark bo'sa dark themedagi stylelarni
//! agar light bo'lsa light dagi stillarni chaqirib berayapti
//! tepadagi ikita funksiya esa bu faqatgina dark va light theme larni stylelari
