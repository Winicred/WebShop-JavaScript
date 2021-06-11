import {printBuyerModule} from "./prints/printBuyerModule.js";

class BuyerModule {
    async editBuyerProfile() {
        let name = document.getElementById("name").value;
        let lastname = document.getElementById("lastname").value;
        let employeeCompany = document.getElementById("employeeCompany").value;
        let employee = document.getElementById("employee").value;
        let password = document.getElementById("password").value;
        let newPassword = document.getElementById("newPassword").value;
        let newPasswordRepeat = document.getElementById("newPasswordRepeat").value;
        let buyerDescription = document.getElementById("buyerDescription").value;
        let birthDate = document.getElementById("birthDate").value;
        let town = document.getElementById("town").value;
        let address = document.getElementById("address").value;
        let userWebsite = document.getElementById("userWebsite").value;
        let userGithub = document.getElementById("userGithub").value;
        let userTwitter = document.getElementById("userTwitter").value;
        let userInstagram = document.getElementById("userInstagram").value;
        let userFacebook = document.getElementById("userFacebook").value;
        let userVk = document.getElementById("userVk").value;
        let userTelegram = document.getElementById("userTelegram").value;

        let data = {
            "name": name,
            "lastname": lastname,
            "employeeCompany": employeeCompany,
            "employee": employee,
            "password": password,
            "newPassword": newPassword,
            "newPasswordRepeat": newPasswordRepeat,
            "buyerDescription": buyerDescription,
            "birthDate": birthDate,
            "town": town,
            "address": address,
            "userWebsite": userWebsite,
            "userGithub": userGithub,
            "userTwitter": userTwitter,
            "userInstagram": userInstagram,
            "userFacebook": userFacebook,
            "userVk": userVk,
            "userTelegram": userTelegram
        };

        let response = await fetch("editBuyerProfileJSON", {
            method: "POST",
            body: JSON.stringify(data)
        });

        if (response.ok) {
            let result = await response.json();
            document.getElementById("info").innerHTML = result.info;
            await printBuyerModule.printBuyerProfile();
        } else {
            console.log("INFO: Ошибка сервера.");
            return null;
        }
    }
}

let buyerModule = new BuyerModule();
export {buyerModule};