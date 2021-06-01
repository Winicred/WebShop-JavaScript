import {printProductModule} from "./prints/PrintProductModule.js";

class AuthModule {
    async login() {
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
            document.getElementById("info").innerHTML = result.info;
            console.log("Request status: " + result.requestStatus);
            document.getElementById("content").innerHTML = "";
            if (result.requestStatus) {
                sessionStorage.setItem("token", JSON.stringify(result.token));
                sessionStorage.setItem("role", JSON.stringify(result.role));
            } else {
                if (sessionStorage.getItem(token) !== null) {
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("role");
                }
            }
        } else {
            console.log("Ошибка получения данных");
        }
        this.toggleMenu();

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
            document.getElementById("info").innerHTML = result.info;
            console.log(result.info);
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("role");
            document.getElementById("info").innerHTML = "";
            printProductModule.printListProducts();
        }
        authModule.toggleMenu();
    }

    toggleMenu() {
        let role = null;
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
    }
}

let authModule = new AuthModule();
export {authModule};
