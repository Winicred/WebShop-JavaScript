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

    editUser() {

    }

    setRoleToUser() {
        const userId = document.getElementById("userId").value;
        const roleId = document.getElementById("roleId").value;

        const data = {
            "userId": userId,
            "roleId": roleId
        }

        let response = fetch("setRoleToUserJSON", {
            method: "POST",
            body: JSON.stringify(data)
        })
    }

    async getListUsersWithRole() {
        let response = await fetch("listUsersWithRoleJSON", {
            method: "GET"
        });

        if (response.ok) {
            return await response.json()
        } else {
            console.log("Ошибка сервера.");
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
            console.log("Ошибка сервера.");
            return null;
        }
    }
}

let adminModule = new AdminModule();
export {adminModule};
