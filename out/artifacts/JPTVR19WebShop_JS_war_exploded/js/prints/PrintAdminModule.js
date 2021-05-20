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

        const users = await adminModule.loadListUsers();

        document.getElementById("content").innerHTML = `
            <div class="p-5 w-75 mx-auto" style="background: #FFF; border-radius: 15px">
        <h1 class="text-center">Список покупателей</h1>
        <p class="text-center my-3" style="font-size: 18px">Всего зарегистрировано пользователей:<strong>3</strong><p>
        <table class="table table-striped table-hover mx-auto mt-5" id="tableListBuyers">
            <thead class="table table-striped text-center">
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
            <tbody class="text-center table-striped" id="tbody">
                <tr>
                    <td>${1}</td>
                    <td>
                        <strong>${users.listUsers.user.buyer.name} ${
                users.listUsers.user.buyer.lastName
            }</strong>
                        <strong id="userAttribute"><i class="text-muted">/i></strong> 
                    </td>
                    <td>${users.listUsers.user.buyer.email}</td>
                    <td>
                        <p id="buyerMoneyControl" class="text-muted"></p>
                    </td>
                    <td>${users.listUsers.user.login}</td>
                    <td>
                        <div class="d-flex flex-column">
                            <span>${users.listUsers.role}</span>
                                <small style="margin-top: -3px">
                                <a href="#" onclick="function() {adminModule.changeUserRole("users.listUsers.id")}" class="badge bg-primary mx-auto">Изменить</a>
                            </small>
                        </div>
                    </td>
                    <td><em><strong>Да</strong></em></td>
                    <th>
                        <div id="userStatus"></div>
                    </th>
                    <th>
                        <div id="UserProfileControl"></div>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>`
    }

    printAdminPanel() {

    }
}

let printAdminModule = new PrintAdminModule();
export {printAdminModule};