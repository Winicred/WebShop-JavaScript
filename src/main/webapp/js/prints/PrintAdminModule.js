import {userModule} from "../UserModule.js";
import {adminModule} from "../AdminModule.js";

class PrintAdminModule {
    async printListUsers() {
        // <span>Подтверждён</span>
        //                     <div class="d-flex flex-column">
        //                         <span>Не подтверждён</span>
        //                         <small style="margin-top: -3px">
        //                             <a href="#" onclick=""
        //                                 class="badge bg-primary mx-auto">Подтвердить</a>
        //                         </small>
        //                     </div>

        // <a style="text-decoration: none; font-weight: bold" class="btn btn-primary"
        //                        href="checkUserProfile?buyerId=" id="userProfile">Профиль</a>

        //                     <a style="text-decoration: none; font-weight: bold" class="btn btn-primary"
        //                        href="checkProfile?buyerId=" id="userProfile">Профиль</a>

        // <strong>${usersCount}</strong>

        let result = await userModule.loadListUsers();
        const count = result.listUsers.length;
        let content = document.getElementById('content');
        content.innerHTML = '';
        content.insertAdjacentHTML('afterBegin',
            `<h3 class="w-100 my-5 text-center">Список читателей</h3>
        <p class="">Всего пользователей: ${count}<p>
        <table id="tableListBuyers" class="table table-striped">
            <thead>
            <th>№</th>
            <th>Имя и фамилия</th>
            <th>E-mail</th>
            <th>Баланс</th>
            <th>Логин</th>
            <th>Роль</th>
            <th>Активность</th>
            <th>Статус</th>
            <th></th>
            </thead>
            <tbody>
            </tbody>
        </table>`);

        let tbody = document.getElementById("tableListBuyers").getElementsByTagName("tbody")[0];

        let i = 1;
        for (let users of result.listUsers) {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            let userId = null;
            for (let userField in users.user) {
                let td = document.createElement("td");
                if (userField === "id") userId = users.user[userField];
                if (typeof users.user[userField] === 'object') {
                    for (let buyerField in users.user[userField]) {
                        if (buyerField === "id") continue;
                        td = document.createElement("td");
                        if (buyerField === "money") {
                            td.appendChild(document.createTextNode(users.user[userField][buyerField] / 100));
                            tr.appendChild(td);
                        } else {
                            td.appendChild(document.createTextNode(users.user[userField][buyerField]));
                            tr.appendChild(td);
                        }
                    }
                } else {
                    td.appendChild(document.createTextNode(users.user[userField]));
                    tr.appendChild(td);
                }
            }

            // Роль пользователя
            td = document.createElement("td");
            td.appendChild(document.createTextNode(users.role));
            tr.appendChild(td);
            td = document.createElement("td");

            // Активность пользователя
            td.appendChild(document.createTextNode("Yes"));
            tr.appendChild(td);
            td = document.createElement("td");

            // Изменение пользователя
            let span = document.createElement("span");
            span.classList.add("btn");
            span.classList.add("text-white");
            span.classList.add("bg-primary");
            span.classList.add("p-2");
            span.appendChild(document.createTextNode("Изменить"));

            span.onclick = function () {
                userModule.changeUser(userId)
            };

            td.appendChild(span);
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
    }

    async printAdminPanel() {

        document.getElementById("content").innerHTML =
            `<h3 class="w-100 m-2 text-center mt-5">Панель администратора</h3>

            <form id="setRole" method="POST" class="mt-5">
                <div class="row mx-auto w-50 mt-5">
                    <div class="col w-25 mx-auto">
                        <select id="userId" class="mt-2 mx-auto w-50 form-select">
                        
                        </select>
                    </div>
                </div>
                <div class="row mx-auto w-50">
                    <div class="col w-25 mx-auto">
                        <select id="roleId" class="mt-2 mx-auto w-50 form-select">
                            <option value="">Выберите роль</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col m-2 mt-5 text-center">
                        <input type="submit" class="btn btn-primary" id="setRoleButton" value="Изменить роль пользователю">
                    </div>
                </div>
            </form>`;

        document.getElementById("setRole").addEventListener("submit", adminModule.setRoleToUser);

        const listUsersWithRoles = await adminModule.getListUsersWithRole();
        const selectUserIdOptions = document.getElementById("userId");

        for (let user of listUsersWithRoles) {
            selectUserIdOptions.add(new Option("Логин: " + user.user.login + ", роль: " + user.role + ", ID: " + user.id));
        }

        const listRoles = await adminModule.getListRoles();
        const selectRoleIdOptions = document.getElementById("roleId");

        for (let role of listRoles) {
            selectRoleIdOptions.add(new Option("Роль: " + role.roleName + ", ID: " + role.id))
        }
    }
}

let printAdminModule = new PrintAdminModule();
export {printAdminModule};