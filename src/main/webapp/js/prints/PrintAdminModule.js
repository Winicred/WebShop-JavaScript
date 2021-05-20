import {userModule} from "../UserModule.js";

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
        let index = document.getElementById("index");
        let name = document.getElementById("name");
        let email = document.getElementById("email");
        let balance = document.getElementById("balance");
        let login = document.getElementById("login");
        let role = document.getElementById("role");
        let activity = document.getElementById("activity");
        let status = document.getElementById("status");
        let button = document.getElementById("button");

        let i = 1;
        for (let users of result.listUsers) {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            // ID пользователя
            td.appendChild(document.createTextNode(i++));
            tr.appendChild(td);

            td = document.createElement("td");
            td.appendChild(document.createTextNode(users.));
            tr.appendChild(td)
            td = document.createElement("td")

            // let userId = null;
            // for (let userField in users.user) {
            //     let td = document.createElement("td");
            //
            //     if (typeof users.user[userField] === "object") {
            //         for (let buyerField in users.user[userField]) {
            //             td = document.createElement("td");
            //             if (buyerField === "money") {
            //                 td.appendChild(document.createTextNode(users.user[userField][buyerField]));
            //                 tr.appendChild(td);
            //             } else {
            //                 td.appendChild(document.createTextNode(users.user[userField][buyerField]));
            //                 tr.appendChild(td);
            //             }
            //         }
            //     }
            // }

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

    printAdminPanel() {

    }
}

let printAdminModule = new PrintAdminModule();
export {printAdminModule};