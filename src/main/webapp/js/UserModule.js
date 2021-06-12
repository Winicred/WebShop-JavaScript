import {printAuthModule} from "./prints/PrintAuthModule.js";
import {authModule} from "./AuthModule.js";

class UserModule {
    async registration() {
        document.getElementById("info").innerHTML = "";
        const name = document.getElementById("name").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        const login = document.getElementById("userLogin").value;
        const password = document.getElementById("password").value;
        const repeatPassword = document.getElementById("repeatPassword").value;
        const user = {
            "name": name,
            "lastName": lastName,
            "email": email,
            "phoneNumber": phoneNumber,
            "login": login,
            "password": password,
            "repeatPassword": repeatPassword,
        }

        let response = await fetch("createUserJSON", {
            method: 'POST',
            body: JSON.stringify(user)
        })

        if (response.ok) {
            const result = await response.json();
            printAuthModule.printLogin();
            authModule.popUpMessage(result.info);
        } else {
            console.log("Ошибка получения данных.");
        }
    }

    async loadListUsers() {
        let response = await fetch('listUsersJSON', {
            method: 'GET',
        })
        if (response.ok) {
            return await response.json();
        } else {
            console.log("INFO: Ошибка сервера.");
            return null;
        }
    }
}

let userModule = new UserModule();
export {userModule};
