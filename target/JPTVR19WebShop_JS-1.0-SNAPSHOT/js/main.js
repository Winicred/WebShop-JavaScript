import {printProductModule} from "./prints/PrintProductModule.js";
import {printAdminModule} from "./prints/PrintAdminModule.js";
import {authModule} from "./AuthModule.js";
import {printUserModule} from "./prints/PrintUserModule.js";
import {printAuthModule} from "./prints/PrintAuthModule.js";
import {printBuyerModule} from "./prints/printBuyerModule.js";

document.getElementById("addProduct").onclick = function () {
    document.getElementById("info").innerHTML = "";
    toggleMenuActive("addProduct");
    printProductModule.printAddProduct();
};

document.getElementById("listProducts").onclick = function () {
    document.getElementById("info").innerHTML = "";
    toggleMenuActive("listProducts");
    printProductModule.printListProducts();
};

document.getElementById("showBoughtProducts").onclick = function () {
    document.getElementById("info").innerHTML = "";
    toggleMenuActive("showBoughtProducts");
    printAdminModule.printShowBoughtProducts();
};

document.getElementById("discountForm").onclick = function () {
    document.getElementById("info").innerHTML = "";
    toggleMenuActive("discountForm");
    printProductModule.printDiscountForm();
};

document.getElementById("listBuyers").onclick = function () {
    document.getElementById("info").innerHTML = "";
    toggleMenuActive("listBuyers");
    printAdminModule.printListUsers();
};

document.getElementById("buyProduct").onclick = function () {
    document.getElementById("info").innerHTML = "";
    toggleMenuActive("listProducts");
    printProductModule.printListProducts();
};

document.getElementById("login").onclick = function () {
    document.getElementById("info").innerHTML = "";
    toggleMenuActive("login");
    printAuthModule.printLogin();
};

document.getElementById("registrationLink").onclick = function () {
    document.getElementById("info").innerHTML = "";
    toggleMenuActive("registration");
    printUserModule.printRegistration();
};

document.getElementById("logout").onclick = function () {
    document.getElementById("info").innerHTML = "";
    toggleMenuActive("logout");
    authModule.logout();
};

document.getElementById("adminPanel").onclick = function () {
    document.getElementById("info").innerHTML = "";
    toggleMenuActive("adminPanel");
    printAdminModule.printAdminPanel();
};

//
document.getElementById("buyerProfile").onclick = function () {
    document.getElementById("info").innerHTML = "";
    printBuyerModule.printBuyerProfile();
};

document.getElementById("buyerProfileSetting").onclick = function () {
    document.getElementById("info").innerHTML = "";
    printBuyerModule.printBuyerProfileSetting();
};

document.getElementById("myCartList").onclick = function () {
    printBuyerModule.printCartList();
};

authModule.toggleMenu();

function toggleMenuActive(elementId) {
    let activeElement = document.getElementById(elementId);
    let passiveElement = document.getElementsByClassName("nav-item");
    for (let i = 0; i < passiveElement.length; i++) {
        if (activeElement === passiveElement[i]) {
            passiveElement[i].classList.add("active-menu");
        } else {
            if (passiveElement[i].classList.contains("active-menu")) {
                passiveElement[i].classList.remove("active-menu");
            }
        }
    }
}
