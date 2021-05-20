import {printProductModule} from "./prints/PrintProductModule.js";

class ProductModule {
    async addProduct() {
        let response = await fetch("createProductJSON", {
            method: "POST",
            body: new FormData(document.getElementById("addProductForm"))
        })

        if (response.ok) {
            const result = await response.json();
            document.getElementById("info").innerHTML = result.info;
            console.log("Request status: " + result.requestStatus);
            console.log("Info: " + result.info);
            await printProductModule.printListProducts();
        } else {
            console.log("Ошибка получения данных.");
        }
    }

    async addCategory() {
        document.getElementById("info").innerHTML = "";

        const categoryName = document.getElementById("categoryName").value;
        const category = {
            "categoryName": categoryName
        }

        let response = await fetch("createCategoryJSON", {
            method: "POST",
            body: JSON.stringify(category)
        })

        if (response.ok) {
            const result = await response.json();
            document.getElementById("info").innerHTML = result.info;
            console.log("Request status: " + result.requestStatus);
            console.log("Info: " + result.info);
            printProductModule.printAddProduct();
        } else {
            console.log("Ошибка получения данных.");
        }
    }

    async removeCategory() {
        let response = await fetch("removeCategoryJSON", {
            method: "POST",
            body: JSON.stringify(category)
        })

        if (response.ok) {
            const result = await response.json();
            document.getElementById("info").innerHTML = result.info;
            console.log("Request status: " + result.requestStatus);
        } else {
            console.log("Ошибка получения данных.");
        }
    }

    async loadListCategories() {
        let response = await fetch("listCategoriesJSON", {
            method: 'GET',
        })

        if (response.ok) {
            let result = await response.json();
            console.log("listCategories: " + result.listCategories.length);
            return result;
        } else {
            document.getElementById("info").innerHTML = "Ошибка сервера";
            return null;
        }
    }

    async loadListProducts() {
        let response = await fetch("listProductsJSON", {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf8"
            }
        })

        if (response.ok) {
            let result = await response.json()
            return result;
        } else {
            console.log("INFO: Ошибка сервера.")
            return null;
        }
    }
}

let productModule = new ProductModule();
export {productModule};
