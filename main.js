import { get } from "./veriables.js";

let addBtn = get("#submitTask");
let addDay = get("#addDay");
let addTask = get("#addTask");
let addTime = get("#inpTime");
let mainBox = get("#main__content");

//! biz ishimiz avvalida kerakli bo'lgan barcha elementlarni html faylimizdan oldik
//! Biz ularni ham get degan funksiya yordamida chaqirdik va uni ham veriables js dan import qilib oldik

function getLocalStorage() {
  if (localStorage.getItem("task")) {
    return JSON.parse(localStorage.getItem("task"));
  } else {
    return [];
  }
}

//! har doimgidek local storagedan ma'lumotlarni chaqirdik
//! task degan keywordda turganlarini

function addLocalStorage(id, day, task, time) {
  let item = { id, day, task, time };
  let newArray = getLocalStorage("task");
  newArray.push(item);
  localStorage.setItem("task", JSON.stringify(newArray));
}

//! biz addLocalStorage funksiyasiga 4ta parametr berib yaratib oldik va ular listning idsi va titlei yani qaysi kunda bo'ishi
//! uning taski yani description(nima ish qilishi), oxrida esa time input bu qaysi vaqtda bajarilishi degan itemlarni qo'shmoqchimiz

function displayTasks() {
  let newArray = getLocalStorage("task");
  let display = newArray.map(
    (item) => `
      <li class="main__card">
        <h2 id="dayTitle">${item.day}</h2>
        <p id="taskDesc">${item.task}</p>
        <p id="taskTime">${item.time}</p>
        <div class="buttons__control">
          <button id="editButton"><i id="${item.id}" class="edit__btn fa-solid fa-pen-to-square"></i></button>
          <button id="deleteButton"><i class="trash__btn fa-solid fa-trash"></i></button>
        </div>
      </li>
    `
  );

  mainBox.innerHTML = display.join("");
}

//! bizda har doim card codelarini yozmasligimiz uchun bitta funksiya yaratib oldik va uni display tasks deb nomladik
//! uning ishida biz arrayni push qilib yani qaysi arrayni desak local storagedagi tasks arrayini map qilib kiritgan ma'lumotlarimizni ui ga chiqarishlik uchun
//! divlar ichiga joylashtirdik va css da stillar berdik
//! va oxrida join qildik va buni sababi bizda cardlar orasida vergul qolib ketmasligi uchun

document.addEventListener("DOMContentLoaded", () => {
  displayTasks();
  addBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if (addDay.value !== "" && addTime.value !== "" && addTask.value !== "") {
      const uidOfProducts = new Date().getTime().toString().slice(-3, -1);

      const newObj = {
        id: uidOfProducts,
        day: addDay.value,
        task: addTask.value,
        time: addTime.value,
      };

      addLocalStorage(newObj.id, newObj.day, newObj.task, newObj.time);
      displayTasks();
      addDay.value = "";
      addTask.value = "";
      addTime.value = "";
    } else {
      alert("Something is missing!");
    }
  });
});

//! biz endi local storagedan ma'lumotlarni olib uiga chiqaradigan vaqtdamiz, bunda biz shunday narsani o'ylashimiz kerakki u page refresh bo'lganda biz chiqargan
//! cardlar yoqolib ketmasin, uning uchun esa windowga add event listener beramiz va display tasksni chaqirib qoyamiz negaki refresh bo'lganda ham u local
//! storagedagi ma'lumotlaarni ui ga chiqarib qoysin
//! va undan keyin biz inputlar bo'shmi yoki yoqligini tekshiramiz\
//! agar birorta vaqt, kun, ish kirilgan bo'lsagina biz ui ga qo'shamiz aks holda alertda "Something is missing so'zini" gapini chiqaramiz!
//! ular tekshirilgandan keyin esa biz unique id yartib oldik va bunda date getTime, toString, slice metodlaridan foydalandik
//! va bitta object yaratdikki biz kiritgan iputdagi ma'lumotlar o'sha objectni ichida id, day, time, task keywoordlari bilan joylashsin
//! va ularning hammasini localStoagega qo'shib yana ui ga qo'shuvchi display Tasks funksiyasini chaqirib qoydik
//! va oxirgi ishimiz barcha inputlarning valuesini bo'sh joyga o'zgartirish bo'ldi chunki siz ma'lumotlarni kiritgandan keyin ham oldingi ma'lumotlar
//! inputlarda text tariqasida turishi yaxshi emas va foydalanuvchiga yoqmasligi mumkin

document.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("edit__btn")) {
    const buttonId = target.id;
    let newArray = getLocalStorage();
    let editedTask = newArray.find((item) => item.id === buttonId);

    if (editedTask) {
      newArray = newArray.filter((item) => item.id !== buttonId);

      localStorage.setItem("task", JSON.stringify(newArray));
      displayTasks();

      addDay.value = editedTask.day;
      addTask.value = editedTask.task;
      addTime.value = editedTask.time;
    }
  } else if (target.classList.contains("trash__btn")) {
    const buttonId = target
      .closest(".main__card")
      .querySelector(".edit__btn").id;

    let newArray = getLocalStorage();
    newArray = newArray.filter((item) => item.id !== buttonId);

    localStorage.setItem("task", JSON.stringify(newArray));

    let deleteButtonParentNode = target.closest(".main__card");
    if (deleteButtonParentNode) {
      deleteButtonParentNode.remove();
    }

    displayTasks();
  }
});

//! birinchi o'rinda biz htmlga click funksiya qo'shayapmiz sababiki qaconki ma'lum bir nuqta masalan button yoki image bosilinganda
//! turli xil animatsiyalar sodir bo'lishi uchun
//! biz const target = event.target; shu o'zgaruvchi orqali aynan targetga olinga ya'ni ko'zlangan narsa bosilinganda event bo'ishligi uchun yaratib olyapmiz
//! biz shartda nima deyapmiz agar biz bosgan narsaning classlistida edit__btn classi bo'lsa o'sha buttonni id sini ko'zlangan narsani idsi sifatida olgin deyapmiz va buni
//! const buttonId = target.id; shu o'zgaruvchi orqali aytayapmiz
//! va local storagedan ma'lumot olishlik uchun let newArray = getLocalStorage(); new arrayni locak storagega tenglayapmiz
//! let editedTask = newArray.find((item) => item.id === buttonId); va editedTask o'zgaruvchisiga aytyapmizki
//! newarrayni ichini bittalab qidirayotganingda itemni idsi buttonni idsiga teng bo'lganda o'sha qiymatni edittedTaskga ber diyapmiz
//! if (editedTask) {
// !newArray = newArray.filter((item) => item.id !== buttonId);
//! localStorage.setItem("task", JSON.stringify(newArray));
//! va bu shatni yozayapmiz
//! agar editedTask true bo'lsa ya'ni itemni idsi bilan buttonni idsi bir biriga mos bo'lsa
//! rrayni filtenlada itemni idsi buttonni idsiga teng bo'lmaganlarni hammasini olib qol va to'g'ri kelganini o'chirib yubor deyapmiz yani qolgani yana o'sha arrayda qolaversin degan ma'noda yozganmiz
//! va o'sha qolganlarini joyiga local storagega joylab qoy deyapmiz
//! va yana uiga chiqarish funksiyasini chaqirayapmiz
//* va  addDay.value = editedTask.day;
//* addTask.value = editedTask.task;
//* addTime.value = editedTask.time;
//! va bu kodda o'sha o'chirib yuborayotgan cardingni ma'lumotlarini tashlab ket deyapmiz
//! va kodning ask holda sharti shuki agar targetning classlistida trash__btn bo'lsa
//!   const buttonId = target.closest(".main__card").querySelector(".edit__btn").id;
//! ya'ni agar aks holda sharti bo'lsa button Id ni mo'ljalning eng yaqinidagi main__cardning ichida turgan edit__btn ning idsiga tenglashtir
//*  let newArray = getLocalStorage();
//*  newArray = newArray.filter((item) => item.id !== buttonId);
//*  localStorage.setItem("task", JSON.stringify(newArray));
//! va huddi oldingidek filter qilganingdan qolgani arrayda qolsin qolganini esa o'chirib yubor deyapmiz
//! edit bilan deleteda farq shundaki edit o'zidagi ma'lumotni inputlarga tashlab ketadi delete esa unday qilmaydi
//! va oxrida yana uiga local storagedagi narsaalarni displayTasks funksiyasi orqali chiqaradi
