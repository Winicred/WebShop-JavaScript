class AdminModule {
    async loadListUsers() {
        let response = await fetch("listUsersJSON", {
            method: 'GET',
        })

        if (response.ok) {
            let result = await response.json();
            console.log("ListUsers: " + result.listUsers.length);
            return result;
        } else {
            document.getElementById("info").innerHTML = "Ошибка сервера";
            return null;
        }
    }

    changeUser(userId) {
        console.log('userId=' + userId);
    }

    changeUserRole(userId) {
        console.log("userId = " + userId);
    }

    confirmUser(userId) {
        console.log("userId = " + userId);
    }
}

let adminModule = new AdminModule();
export {adminModule};
