import {printAuthModule} from "./prints/PrintAuthModule.js";
import {authModule} from "./AuthModule.js";

class UserModule {
    async registration() {
        let response = await fetch("createUserJSON", {
            method: "POST",
            body: new FormData(document.getElementById("registrationForm"))
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
            method: "GET",
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
