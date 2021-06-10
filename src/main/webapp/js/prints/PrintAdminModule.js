import {userModule} from "../UserModule.js";
import {adminModule} from "../AdminModule.js";
import {productModule} from "../ProductModule.js";

class PrintAdminModule {
    async printListUsers() {
        let result = await userModule.loadListUsers();

        const count = result.listUsers.length;

        let content = document.getElementById('content');
        content.innerHTML = "";
        content.insertAdjacentHTML('afterBegin',
            `
        <div class="p-5 w-75 mx-auto" style="background: #FFF; border-radius: 15px">
            <h1 class="text-center">Список покупателей</h1>
            <p class="text-center my-3" style="font-size: 18px">Всего зарегистрировано пользователей: <strong>${count}</strong><p>
            <table id="tableListBuyers" class="table table-striped table-hover mx-auto mt-5 flex-shrink-1 w-100">
                <thead class="table table-striped text-center">
                <th>ID</th>
                <th>Имя и фамилия</th>
                <th>E-mail</th>
                <th>Баланс</th>
                <th>Логин</th>
                <th>Роль</th>
                <th>Активность</th>
                <th>Статус</th>
                <th></th>
                </thead>
                <tbody class="text-center table-striped">
                </tbody>
            </table>
        </div>`);

        let tbody = document.getElementById("tableListBuyers").getElementsByTagName("tbody")[0];

        for (let users of result.listUsers) {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            let tdStrong = document.createElement("strong");
            let changeRoleSpan = document.createElement("span");
            let confirmUserSpan = document.createElement("span");
            let a = document.createElement("a");
            let roleDiv = document.createElement("div");
            let roleP = document.createElement("p");
            let userStatusDiv = document.createElement("div");
            let userStatusP = document.createElement("p");

            const userId = sessionStorage.getItem("userId");

            td.appendChild(document.createTextNode(users.user.id.toString()));
            tr.appendChild(td);

            // Имя и фамилия
            td = document.createElement("td");
            a.appendChild(document.createTextNode(users.buyer.name + " " + users.buyer.lastname));
            a.style.color = "blue";
            a.style.fontWeight = "500";
            a.style.cursor = "pointer";
            a.onclick = function () {
                console.log("userId: " + users.user.id);
            };
            td.appendChild(a);
            tr.appendChild(td);

            // Э-майл
            td = document.createElement("td");
            td.appendChild(document.createTextNode(users.buyer.email));
            tr.appendChild(td);

            // Баланс
            td = document.createElement("td");
            td.appendChild(document.createTextNode(users.buyer.money + "€"));
            tr.appendChild(td);

            // Логин
            td = document.createElement("td");
            td.appendChild(document.createTextNode(users.user.login));
            tr.appendChild(td);

            // Роль
            td = document.createElement("td");
            if (users.user.id.toString() !== userId) {
                roleP.appendChild(document.createTextNode(users.role));
                roleP.classList.add("m-0");
                changeRoleSpan.classList.add("badge", "bg-primary", "mx-auto", "py-1");
                changeRoleSpan.style.cursor = "pointer";
                changeRoleSpan.appendChild(document.createTextNode("Изменить"));
                changeRoleSpan.onclick = function () {
                    adminModule.changeUserRole(users.user.id);
                };
                roleDiv.classList.add("d-flex", "flex-column");
                roleDiv.appendChild(roleP);
                roleDiv.appendChild(changeRoleSpan);
                td.classList.add("font-weight-bold");
                td.appendChild(roleDiv);
            } else {
                roleP.appendChild(document.createTextNode(users.role))
                roleDiv.appendChild(roleP);
                td.classList.add("font-weight-bold");
                td.appendChild(roleDiv);
            }
            tr.appendChild(td);

            // Активность
            td = document.createElement("td");
            tdStrong.appendChild(document.createTextNode("Да"))
            td.classList.add("font-weight-bold");
            td.appendChild(tdStrong);
            tr.appendChild(td);

            // Статус
            td = document.createElement("td");
            tdStrong = document.createElement("strong");
            if (users.user.userStatus !== "confirmed") {
                userStatusP.appendChild(document.createTextNode("Не подтвержден"));
                userStatusP.classList.add("m-0");
                confirmUserSpan.classList.add("badge", "bg-primary", "mx-auto", "py-1");
                confirmUserSpan.style.cursor = "pointer";
                confirmUserSpan.appendChild(document.createTextNode("Подтвердить"));
                confirmUserSpan.onclick = function () {
                    adminModule.confirmUser(users.user.id);
                };
            } else {
                userStatusP.appendChild(document.createTextNode("Подтвержден"))
            }
            userStatusDiv.classList.add("d-flex", "flex-column");
            userStatusDiv.appendChild(userStatusP);
            userStatusDiv.appendChild(confirmUserSpan);
            td.classList.add("font-weight-bold");
            td.appendChild(userStatusDiv);
            tr.appendChild(td);

            // Профиль
            td = document.createElement("td");
            let spanButton = document.createElement("span");
            spanButton.classList.add("btn", "text-white", "bg-primary", "p-2");
            spanButton.appendChild(document.createTextNode("Профиль"));

            spanButton.onclick = function () {
                console.log("ChangeUser()");
            };

            td.appendChild(spanButton);
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
    }

    async printAdminPanel() {
        document.getElementById("content").innerHTML =
            `<h3 class="w-100 m-2 text-center mt-5">Панель администратора</h3>

            <div class="mt-5">
                <div class="row mx-auto w-50 mt-5">
                    <div class="col w-25 mx-auto">
                        <select id="userId" class="mt-2 mx-auto w-50 form-select">
                        </select>
                    </div>
                </div>
                <div class="row mx-auto w-50">
                    <div class="col w-25 mx-auto">
                        <select id="roleId" class="mt-2 mx-auto w-50 form-select">
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col m-2 mt-5 text-center">
                        <input type="submit" class="btn btn-primary" id="setRoleButton" value="Изменить роль пользователю">
                    </div>
                </div>
            </div>`;

        let listUsersWithRoles = await adminModule.getListUsersWithRole();
        let selectUserIdOptions = document.getElementById("userId");
        let listRoles = await adminModule.getListRoles();
        let selectRoleIdOptions = document.getElementById("roleId");

        for (let i = 0; i < listUsersWithRoles.length; i++) {
            let user = listUsersWithRoles[i];
            let element = document.createElement("option");
            element.textContent = "Логин: " + user.user.login + ", " + "Роль: " + user.role;
            element.value = user.user.id.toString();
            selectUserIdOptions.appendChild(element);
        }

        for (let i = 0; i < listRoles.length; i++) {
            let role = listRoles[i];
            let element = document.createElement("option");
            element.textContent = "Роль: " + role.roleName;
            element.value = role.id;
            selectRoleIdOptions.appendChild(element);
        }

        document.getElementById("setRoleButton").onclick = function () {
            adminModule.setRoleToUser();
        };
    }

    async printShowBoughtProducts() {
        let result = await productModule.loadBoughtProducts();

        const count = result.listBoughtProducts.length;

        if (result.listBoughtProducts.length !== 0) {
            let content = document.getElementById("content");
            content.innerHTML = "";
            content.insertAdjacentHTML("afterBegin",
                `
        <div class="p-5 w-75 mx-auto" style="background: #FFF; border-radius: 15px">
            <h1 class="text-center">Список проданных товаров</h1>
            <p class="text-center my-3" style="font-size: 18px">Всего проданных товаров: <strong>${count}</strong><p>
            <table id="tableBoughtProducts" class="table table-striped table-hover mx-auto mt-5 flex-shrink-1 w-100">
                <thead class="table table-striped text-center">
                <th>ID</th>
                <th>Товар</th>
                <th>Статус</th>
                <th>Имя и фамилия</th>
                <th>Номер телефона</th>
                <th>Дата покупки</th>
                <th>Цена</th>
                </thead>
                <tbody class="text-center table-striped">
                </tbody>
            </table>
        </div>`);

            let tbody = document.getElementById("tableBoughtProducts").getElementsByTagName("tbody")[0];

            for (let histories of result.listBoughtProducts) {
                let tr = document.createElement("tr");
                let td = document.createElement("td");
                let span = document.createElement("span");
                let a = document.createElement("a");

                // ID
                td.appendChild(document.createTextNode(histories.id));
                td.style.fontWeight = "bold";
                tr.appendChild(td);

                // Товар
                td = document.createElement("td");
                td.appendChild(document.createTextNode(histories.product))
                tr.appendChild(td);

                // Статус
                td = document.createElement("td");
                span.appendChild(document.createTextNode(histories.status));

                if (histories.status === "Оплачен") {
                    span.classList.add("badge", "bg-success", "badge-success");
                } else if (histories.status === "Забронирован") {
                    span.classList.add("badge", "bg-warning", "badge-warning");
                }

                td.appendChild(span);
                tr.appendChild(td);

                // Имя и фамилия
                td = document.createElement("td");
                a.appendChild(document.createTextNode(histories.buyer));
                a.style.color = "blue";
                a.style.fontWeight = "500";
                a.style.cursor = "pointer";
                a.onclick = function () {
                    console.log("userId: " + histories.buyerId);
                };
                td.appendChild(a);
                tr.appendChild(td);

                // Номер телефона
                td = document.createElement("td");
                td.appendChild(document.createTextNode(histories.phoneNumber))
                tr.appendChild(td);

                // Дата покупки
                td = document.createElement("td");
                td.appendChild(document.createTextNode(histories.takeOn))
                tr.appendChild(td);

                // Цена
                td = document.createElement("td");
                td.appendChild(document.createTextNode(histories.price + "€"))
                td.style.fontWeight = "bold";
                tr.appendChild(td);

                tbody.appendChild(tr);
            }
        } else {
            content.innerHTML =
                `
            <div class="d-flex h-100 w-50 mx-auto my-auto main_cart shadow" style="background-color: #FFFFFF">
                <div class="d-flex flex-column mx-auto my-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="currentColor"
                         class="bi bi-bookmark-x-fill" viewBox="0 0 16 16"
                         style="margin: 0 auto; margin-bottom: 1rem; margin-top: 5rem">
                        <path fill-rule="evenodd"
                              d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM6.854 5.146a.5.5 0 1 0-.708.708L7.293 7 6.146 8.146a.5.5 0 1 0 .708.708L8 7.707l1.146 1.147a.5.5 0 1 0 .708-.708L8.707 7l1.147-1.146a.5.5 0 0 0-.708-.708L8 6.293 6.854 5.146z"></path>
                    </svg>
                    <h2 class="text-center mb-3">Купленных товаров нет :(</h2>
                    <span class="text-muted mb-5 text-center"
                          style="font-size: 18px">Возможно, они скоро появятся :)</span>
                </div>
            </div>  
            `;
        }
    }
}

let printAdminModule = new PrintAdminModule();
export {printAdminModule};