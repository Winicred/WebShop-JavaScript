import {authModule} from "../AuthModule.js";
import {printUserModule} from "./PrintUserModule.js";

class PrintAuthModule {
    printLogin() {
        document.getElementById("info").innerHTML = "";
        document.getElementById("content").innerHTML =
            `<div class="w-25 mx-auto" style="margin-top: 3rem">
                <h2 class="text-center mb-4">Введите логин и пароль</h2>
                <div>
                    <form id="loginForm" method="POST" enctype="multipart/form-data">
                        <div class="row mb-3 w-75 mx-auto">
                            <input type="text" class="form-control" id="userLogin" placeholder="Логин" required>
                        </div>
            
                        <div class="row mb-4 w-75 mx-auto">
                            <input type="password" class="form-control" id="password" placeholder="Пароль" required>
                        </div>
            
                        <div class="mt-1 mb-1">
                            <div class="d-flex justify-content-center flex-row">
                                <p>Нет акканута?</p>
                                <a href="#registration" id="registration" style="text-decoration: none; margin-left: 6px">Зарегистрироваться</a>
                            </div>
                        </div>
            
                        <div class="mx-auto w-25">
                            <button type="submit" id="submit" class="btn w-100 btn-primary">Войти</button>
                        </div>
                    </form>
                </div>
            </div>`;

        document.getElementById("loginForm").onsubmit = function (e) {
            e.preventDefault();
            authModule.login();
        }
        document
            .getElementById("registration")
            .addEventListener("click", printUserModule.printRegistration);
    }
}

let printAuthModule = new PrintAuthModule();
export {printAuthModule};