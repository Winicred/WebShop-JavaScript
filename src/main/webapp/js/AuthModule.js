import {printProductModule} from "./prints/PrintProductModule.js";

class AuthModule {
    async loginIn() {
        let cartList = [];
        document.getElementById("info").innerHTML = "";

        const login = document.getElementById("userLogin").value;
        const password = document.getElementById("password").value;
        const credential = {
            "login": login,
            "password": password,
        };

        const response = await fetch("loginJSON", {
            method: "POST",
            body: JSON.stringify(credential),
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById("content").innerHTML = "";

            if (result.requestStatus) {
                sessionStorage.setItem("token", JSON.stringify(result.token));
                sessionStorage.setItem("role", JSON.stringify(result.role));
                sessionStorage.setItem("cartList", JSON.stringify(result.cartList));
                sessionStorage.setItem("buyer", JSON.stringify(result.buyer));
                sessionStorage.setItem("user", JSON.stringify(result.user));
                sessionStorage.setItem("userId", JSON.stringify(result.userId));
                sessionStorage.setItem("buyerBalance", JSON.stringify(result.buyerBalance));
                sessionStorage.setItem("cartList", JSON.stringify(cartList));
                sessionStorage.setItem("promoCodeName", JSON.stringify(result.promoCodeName));
                sessionStorage.setItem("promoCode", JSON.stringify(result.promoCode));
                sessionStorage.setItem("promoCodeUsed", JSON.stringify(result.promoCodeUsed));
            } else {
                if (sessionStorage.getItem(token) !== null) {
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("role");
                    sessionStorage.removeItem("cartList");
                    sessionStorage.removeItem("buyer");
                    sessionStorage.removeItem("user");
                    sessionStorage.removeItem("userId");
                    sessionStorage.removeItem("cartList");
                    sessionStorage.removeItem("promoCodeName");
                    sessionStorage.removeItem("promoCodeUsed");
                    sessionStorage.removeItem("promoCode");
                }
            }
            this.popUpMessage(result.info);
            this.toggleMenu();
        } else {
            console.log("Ошибка получения данных");
        }
    }

    async logout() {
        document.getElementById("info").innerHTML = "";
        document.getElementById("content").innerHTML = "";

        const response = await fetch("logoutJSON", {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset:utf8",
            },
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result.info);
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("role");
            sessionStorage.removeItem("cartList");
            sessionStorage.removeItem("buyer");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("promoCodeName");
            sessionStorage.removeItem("promoCodeUsed");
            sessionStorage.removeItem("promoCode");
            document.getElementById("info").innerHTML = "";
            await printProductModule.printListProducts();
            this.popUpMessage(result.info);
        }
        this.toggleMenu();
    }

    toggleMenu() {
        let role = null;
        let buyer = JSON.parse(sessionStorage.getItem("buyer"));
        let user = JSON.parse(sessionStorage.getItem("user"));

        if (sessionStorage.getItem("role") !== null) {
            role = JSON.parse(sessionStorage.getItem("role"));
        }
        console.log("AuthModule: Token - " + sessionStorage.getItem("token"));
        console.log("AuthModule: Role - " + sessionStorage.getItem("role"));

        switch (role) {
            case null:
                document.getElementById("listProducts").style.display = "block";
                document.getElementById("login").style.display = "block";
                document.getElementById("registrationLink").style.display = "block";
                document.getElementById("emptyUserContainer").style.display = "block";
                document.getElementById("logout").style.display = "none";
                document.getElementById("addProduct").style.display = "none";
                document.getElementById("showBoughtProducts").style.display = "none";
                document.getElementById("discountForm").style.display = "none";
                document.getElementById("listBuyers").style.display = "none";
                document.getElementById("adminPanelDiv").style.display = "none";
                document.getElementById("userContainer").style.display = "none";
                break;

            case "BUYER":
                document.getElementById("listProducts").style.display = "block";
                document.getElementById("logout").style.display = "block";
                document.getElementById("userContainer").style.display = "block";
                document.getElementById("login").style.display = "none";
                document.getElementById("addProduct").style.display = "none";
                document.getElementById("showBoughtProducts").style.display = "none";
                document.getElementById("discountForm").style.display = "none";
                document.getElementById("listBuyers").style.display = "none";
                document.getElementById("registrationLink").style.display = "none";
                document.getElementById("adminPanelDiv").style.display = "none";
                document.getElementById("emptyUserContainer").style.display = "none";
                break;

            case "MANAGER":
                document.getElementById("listProducts").style.display = "block";
                document.getElementById("logout").style.display = "block";
                document.getElementById("addProduct").style.display = "block";
                document.getElementById("showBoughtProducts").style.display = "block";
                document.getElementById("discountForm").style.display = "block";
                document.getElementById("userContainer").style.display = "block";
                document.getElementById("login").style.display = "none";
                document.getElementById("listBuyers").style.display = "none";
                document.getElementById("registrationLink").style.display = "none";
                document.getElementById("adminPanelDiv").style.display = "none";
                document.getElementById("emptyUserContainer").style.display = "none";
                break;

            case "ADMIN":
                document.getElementById("listProducts").style.display = "block";
                document.getElementById("logout").style.display = "block";
                document.getElementById("addProduct").style.display = "block";
                document.getElementById("showBoughtProducts").style.display = "block";
                document.getElementById("discountForm").style.display = "block";
                document.getElementById("listBuyers").style.display = "block";
                document.getElementById("adminPanelDiv").style.display = "block";
                document.getElementById("userContainer").style.display = "block";
                document.getElementById("login").style.display = "none";
                document.getElementById("registrationLink").style.display = "none";
                document.getElementById("emptyUserContainer").style.display = "none";
                break;
        }

        if (user !== null) {
            document.getElementById("userAvatar").src = `insertAvatar/${buyer.avatar.path}`;

            document.getElementById("loginedUserAs").innerHTML = user.login;
            document.getElementById("loginedBuyerId").innerHTML = "ID: " + buyer.id;

            let cartList = JSON.parse(sessionStorage.getItem("cartList"));

            let buyerBalance = JSON.parse(sessionStorage.getItem("buyerBalance"))

            let userBalance = document.getElementById("userBalance");
            if (buyer.money === "null") {
                userBalance.innerHTML = 0 + "€";
            } else {
                userBalance.innerHTML = (Math.trunc(buyerBalance * 100) / 100) + "€";
            }

            if (cartList.length !== 0) {
                document.getElementById("myCartList").innerHTML =
                    `
                Моя корзина
                <span class="badge rounded-pill bg-secondary my-auto" style="padding: 4px 8px">${cartList.length}</span>
                `;
            } else {
                document.getElementById("myCartList").innerHTML =
                    `
                Моя корзина
                 <svg
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    fill="currentColor" class="bi bi-cart-fill my-auto"
                    viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                </svg>
                `;
            }
        }
    }

    popUpMessage(message) {
        let activated = true;
        let sec = 0;
        setInterval(tick, 1000)

        document.getElementById("info").innerHTML =
            `
            <div class="toast" style="opacity: 1; position: fixed; top: 89vh; width: auto; padding: 10px 10px" id="toast" role="alert" aria-live="assertive" aria-atomic="true">
              <div class="toast-header">
                <strong class="me-auto">Информация</strong>
                <small id="timer" style="margin-left: 12px"></small>
                <button type="button" id="popUpCloseButton" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
              </div>
              <div class="toast-body">
                ${message}
              </div>
            </div>
            `;

        document.getElementById("toast").style.opacity = 1;
        document.getElementById("popUpCloseButton").onclick = function () {
            sec = 5;
            document.getElementById("toast").style.opacity = 0;
            activated = false;
        };
        setTimeout(function () {
            document.getElementById("toast").style.opacity = 0;
            activated = false;
        }, 5000);

        function tick() {
            while (sec !== 5) {
                sec++
                document.getElementById("timer").innerHTML = sec + " секунд назад";
                if (sec !== 5) {
                    break;
                }
            }
        }
    }
}

let authModule = new AuthModule();
export {authModule};
