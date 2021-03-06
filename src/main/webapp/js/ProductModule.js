import {printProductModule} from "./prints/PrintProductModule.js";
import {printBuyerModule} from "./prints/PrintBuyerModule.js";
import {authModule} from "./AuthModule.js";

class ProductModule {
    async addProduct() {
        let response = await fetch("createProductJSON", {
            method: "POST",
            body: new FormData(document.getElementById("addProductForm"))
        })

        if (response.ok) {
            const result = await response.json();
            await printProductModule.printListProducts();
            authModule.popUpMessage(result.info);
        } else {
            console.log("INFO: Ошибка сервера.");
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
            await printProductModule.printAddProduct();
            authModule.popUpMessage(result.info);
        } else {
            console.log("INFO: Ошибка сервера.");
        }
    }

    async removeCategory() {
        let response = await fetch("removeCategoryJSON", {
            method: "POST",
            body: new FormData(document.getElementById("removeCategoryForm"))
        })

        if (response.ok) {
            const result = await response.json();
            await printProductModule.printAddProduct();
            authModule.popUpMessage(result.info);
        } else {
            console.log("INFO: Ошибка сервера.");
        }
    }

    async loadListCategories() {
        let response = await fetch("listCategoriesJSON", {
            method: 'GET'
        })

        if (response.ok) {
            return await response.json();
        } else {
            console.log("INFO: Ошибка сервера.");
            return null;
        }
    }

    async loadListProducts() {
        let response = await fetch("listProductsJSON", {
            method: "GET"
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.log("INFO: Ошибка сервера.");
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

    async buyProduct(productId) {
        let data = {
            "productId": productId
        };

        let response = await fetch("buyProductJSON", {
            method: "POST",
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            sessionStorage.setItem("buyer", JSON.stringify(result.buyer));
            sessionStorage.setItem("buyerBalance", JSON.stringify(result.buyerBalance));

            authModule.popUpMessage(result.info);
            authModule.toggleMenu();
        } else {
            console.log("INFO: Ошибка сервера.");
        }
    }

    async addProductToBag(productId) {
        let cartList = JSON.parse(sessionStorage.getItem("cartList"));

        let data = {
            "productId": productId
        };

        let response = await fetch("addProductToBag", {
            method: "POST",
            body: JSON.stringify(data)
        });

        if (response.ok) {
            let result = await response.json();

            cartList.push(result.product);

            sessionStorage.setItem("cartList", JSON.stringify(cartList));

            authModule.popUpMessage(result.info);
            authModule.toggleMenu();
        } else {
            console.log("INFO: Ошибка сервера.");
        }
    }

    async deleteProductFromCart(index) {
        let cartList = JSON.parse(sessionStorage.getItem("cartList"));

        let data = {
            "index": index
        };

        let response = await fetch("deleteProductFromCartJSON", {
            method: "POST",
            body: JSON.stringify(data)
        });

        if (response.ok) {
            let result = await response.json();

            cartList.splice(index - 1, 1);

            sessionStorage.setItem("cartList", JSON.stringify(cartList));
            await printBuyerModule.printCartList();
            authModule.popUpMessage(result.info);
        } else {
            console.log("INFO: Ошибка сервера.");
            return null;
        }
    }

    async loadBoughtProducts() {
        let response = await fetch("listBoughtProductsJSON", {
            method: "GET"
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.log("INFO: Ошибка сервера.");
            return null;
        }
    }

    async loadListPromoCodes() {
        let response = await fetch("listPromoCodesJSON", {
            method: "GET"
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.log("INFO: Ошибка сервера.");
            return null;
        }
    }

    async loadApproxDate() {
        let response = await fetch("loadApproxDateJSON", {
            method: "GET"
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.log("INFO: Ошибка сервера.");
            return null;
        }
    }

    async usePromoCode() {
        let promoCodeName = document.getElementById("promoCodeNameInput").value;

        let data = {
            "promoCodeName": promoCodeName
        };

        let response = await fetch("usePromoCodeJSON", {
            method: "POST",
            body: JSON.stringify(data)
        });

        if (response.ok) {
            let result = await response.json();

            sessionStorage.setItem("promoCodeName", JSON.stringify(result.promoCodeName));
            sessionStorage.setItem("promoCodeUsed", JSON.stringify(result.promoCodeUsed));
            sessionStorage.setItem("promoCode", JSON.stringify(result.promoCode));

            await printBuyerModule.printCartList();
            authModule.popUpMessage(result.info);
        } else {
            console.log("INFO: Ошибка сервера.");
            return null;
        }
    }

    async payment(totalPrice) {
        let data = {
            "totalPrice": totalPrice
        };

        console.log(totalPrice)

        let response = await fetch("paymentJSON", {
            method: "POST",
            body: JSON.stringify(data)
        });

        if (response.ok) {
            let result = await response.json();

            await printProductModule.printListProducts();
            authModule.popUpMessage(result.info);
        } else {
            console.log("INFO: Ошибка сервера.");
            return null;
        }
    }
}

let productModule = new ProductModule();
export {productModule};
