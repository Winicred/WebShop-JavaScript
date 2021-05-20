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

        let response = await fetch("createCategoryJSON", {
            method: "POST",
            body: new FormData(document.getElementById("addCategoryForm"))
        })

        if (response.ok) {
            const result = await response.json();
            document.getElementById("info").innerHTML = result.info;
            console.log("Request status: " + result.requestStatus);
            console.log("Info: " + result.info);
            await printProductModule.printAddProduct();
        } else {
            console.log("Ошибка получения данных.");
        }
    }

    async removeCategory() {
        let response = await fetch("removeCategoryJSON", {
            method: "POST",
            body: new FormData(document.getElementById("removeCategoryForm"))
        })

        if (response.ok) {
            const result = await response.json();
            document.getElementById("info").innerHTML = result.info;
            console.log("Request status: " + result.requestStatus);
            await printProductModule.printAddProduct();
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

    addProductInputEnding() {
        $('.resolutionText').on('keyup', function () {
            let foo = $(this).val().split(" x ").join("");
            if (foo.length > 0) {
                foo = foo.match(new RegExp('.{1,4}', 'g')).join(" x ");
            }
            $(this).val(foo);
        });

        function addKg(val) {
            return val + " кг";
        }

        function removeKg(val) {
            val = val.replace(" кг", "");
            val = val.replace("кг", "");
            val = val.replace(" ", "");
            return val;
        }

        $(".kgInInput").on("input", function () {
            var $this = $(this);
            var val = $this.prop("value");
            var newVal = removeKg(val);
            newVal = addKg(newVal);
            $this.prop("value", newVal);
        });


        function addMm(val) {
            return val + " мм";
        }

        function removeMm(val) {
            val = val.replace(" мм", "");
            val = val.replace("мм", "");
            val = val.replace(" ", "");
            return val;
        }

        $(".mmInInput").on("input", function () {
            var $this = $(this);
            var val = $this.prop("value");
            var newVal = removeMm(val);
            newVal = addMm(newVal);
            $this.prop("value", newVal);
        });

        function addDiagonal(val) {
            return val + ' "';
        }

        function removeDiagonal(val) {
            val = val.replace(' "', "");
            val = val.replace('"', "");
            val = val.replace(" ", "");
            return val;
        }

        $(".diagonalInInput").on("input", function () {
            var $this = $(this);
            var val = $this.prop("value");
            var newVal = removeDiagonal(val);
            newVal = addDiagonal(newVal);
            $this.prop("value", newVal);
        });

        function addHhz(val) {
            return val + ' ГГц';
        }

        function removeHhz(val) {
            val = val.replace(' ГГц', "");
            val = val.replace('ГГц', "");
            val = val.replace(" ", "");
            return val;
        }

        $(".hhzInInput").on("input", function () {
            var $this = $(this);
            var val = $this.prop("value");
            var newVal = removeHhz(val);
            newVal = addHhz(newVal);
            $this.prop("value", newVal);
        });


        function addGb(val) {
            return val + ' GB';
        }

        function removeGb(val) {
            val = val.replace(' GB', "");
            val = val.replace('GB', "");
            val = val.replace(" ", "");
            return val;
        }

        $(".gbInInput").on("input", function () {
            var $this = $(this);
            var val = $this.prop("value");
            var newVal = removeGb(val);
            newVal = addGb(newVal);
            $this.prop("value", newVal);
        });
    }
}

let productModule = new ProductModule();
export {productModule};
