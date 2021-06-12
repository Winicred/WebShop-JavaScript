import {printAdminModule} from "./prints/PrintAdminModule.js";
import {printProductModule} from "./prints/PrintProductModule.js";
import {authModule} from "./AuthModule.js";

class AdminModule {
    async loadListUsers() {
        let response = await fetch("listUsersJSON", {
            method: 'GET',
        })

        if (response.ok) {
            return await response.json();
        } else {
            console.log("INFO: Ошибка сервера.");
            return null;
        }
    }

    async confirmUser(userId) {
        let data = {
            "userId": userId
        }

        let response = await fetch("confirmUserJSON", {
            method: "POST",
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById("content").innerHTML = "";
            sessionStorage.setItem("user", result.user);
            authModule.popUpMessage(result.info);
        } else {
            console.log("INFO: Ошибка сервера.");
        }
    }

    async setRoleToUser() {
        let userId = document.getElementById("userId").value;
        let roleId = document.getElementById("roleId").value;

        let data = {
            "userId": userId,
            "roleId": roleId
        }

        let response = await fetch("setRoleToUserJSON", {
            method: "POST",
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById("content").innerHTML = "";
            authModule.popUpMessage(result.info);
        } else {
            console.log("INFO: Ошибка сервера.");
        }
    }

    async getListUsersWithRole() {
        let response = await fetch("listUsersWithRoleJSON", {
            method: "GET"
        });

        if (response.ok) {
            return await response.json()
        } else {
            console.log("INFO: Ошибка сервера.");
            return null;
        }
    }

    async getListRoles() {
        let response = await fetch("listRolesJSON", {
            method: "GET"
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.log("INFO: Ошибка сервера.");
            return null;
        }
    }

    async changeUserRole(userId) {
        let data = {
            "userId": userId,
        }

        let response = await fetch("changeUserRoleJSON", {
            method: "POST",
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById("content").innerHTML = "";
            await printAdminModule.printListUsers();
            authModule.popUpMessage(result.info);
        } else {
            console.log("INFO: Ошибка сервера.");
        }
    }

    async addPromoCode() {
        let promoCodeName = document.getElementById("promoCodeName").value;
        let promoCodePercent = document.getElementById("percent").value;

        let data = {
            "promoCodeName": promoCodeName,
            "percent": promoCodePercent
        };

        let response = await fetch("addPromoCodeJSON", {
            method: "POST",
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById("content").innerHTML = "";
            await printProductModule.printDiscountForm();
            authModule.popUpMessage(result.info);
        } else {
            console.log("INFO: Ошибка сервера.");
        }
    }

    async deletePromoCode(promoCodeId) {
        let data = {
            "promoCodeId": promoCodeId
        };

        let response = await fetch("deletePromoCodeJSON", {
            method: "POST",
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById("content").innerHTML = "";
            await printProductModule.printDiscountForm();
            authModule.popUpMessage(result.info);
        } else {
            console.log("INFO: Ошибка сервера.");
        }
    }
}

let adminModule = new AdminModule();
export {adminModule};
