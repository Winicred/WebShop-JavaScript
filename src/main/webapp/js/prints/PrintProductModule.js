import {productModule} from "../ProductModule.js";
import {adminModule} from "../AdminModule.js";

class PrintProductModule {
    async printAddProduct(position, insertedElement) {
        document.getElementById("content").innerHTML =
            `<form id="addProductForm" method="POST" enctype="multipart/form-data">
                <p class="fw-bold text-muted text-center">Общие характеристики</p>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Категория</span>
                    <select class="form-select disabled" name="categoryId" id="categoryId" required>
                    </select>
                    <a class="btn btn-outline-primary" href="#addCategory" id="addCategory">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-plus" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5V4.5z"></path>
                        </svg>
                        <span class="visually-hidden">Button</span>
                    </a>
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Бренд</span>
                    <select class="form-select" name="brand" id="brand" required>
                        <option value="HP" selected>HP</option>
                        <option value="Gateway">Gateway</option>
                        <option value="Acer">Acer</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="Dell">Dell</option>
                        <option value="Apple">Apple</option>
                        <option value="Sony">Sony</option>
                        <option value="Toshiba">Toshiba</option>
                        <option value="ASUS">ASUS</option>
                    </select>
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Серия</span>
                    <input type="text" class="form-control" placeholder="MacBook Air" id="series"
                           name="series" required>
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Модель</span>
                    <input type="text" class="form-control" placeholder="MQD32ZE/A" id="model"
                           name="model" required>
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Цвет</span>
                    <input type="text" class="form-control" placeholder="Серый" id="color"
                           name="color">
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Вес (кг)</span>
                    <input type="text" step="0.01" class="form-control kgInInput" placeholder="1.35 кг" id="weight" name="weight">
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Длина (мм)</span>
                    <input type="text" class="form-control mmInInput" placeholder="325 мм" id="length" name="length">
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Ширина (мм)</span>
                    <input type="text" class="form-control mmInInput" placeholder="227 мм" id="width"
                           name="width">
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Высота (мм)</span>
                    <input type="text" class="form-control mmInInput" placeholder="17 мм" id="height"
                           name="height">
                </div>

                <p class="fw-bold text-muted text-center mt-5">Экран</p>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Диагональ экрана</span>
                    <input type="text" class="form-control diagonalInInput" placeholder='13.3 "' id="screenDiagonal"
                           name="screenDiagonal">
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Разрешение экрана</span>
                    <label for="resolution"></label>
                    <input type="text" minlength="9" maxlength="11" class="form-control resolutionText"
                           placeholder="1440 x 900 " id="resolution" name="resolution">
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Сенсорный экран</span>
                    <select class="form-select" name="touchScreen" id="touchScreen">
                        <option value="Да">Да</option>
                        <option value="Нет">Нет</option>
                    </select>
                </div>

                <p class="fw-bold text-muted text-center mt-5">Операционная система</p>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Операционная система</span>
                    <select class="form-select" name="operationSystem" id="operationSystem">
                        <option disabled class="bg-secondary" style="color: white">Microsoft:</option>
                        <option value="Windows 10" selected>Windows 10</option>
                        <option value="Windows 8.1">Windows 8.1</option>
                        <option value="Windows 8">Windows 8</option>
                        <option disabled class="bg-secondary" style="color: white">macOS:</option>
                        <option value="macOS Big Sur 11.2.3">macOS Big Sur 11.2.3</option>
                        <option value="macOS Catalina 10.15.7">macOS Catalina 10.15.7</option>
                        <option value="Mac OS X 10.15 Catalina">macOS Mojave 10.14.6</option>
                        <option value="macOS Mojave 10.14.6">macOS High Sierra 10.13.6</option>
                        <option value="macOS Sierra 10.12.6">macOS Sierra 10.12.6</option>
                        <option value="OS X El Capitan 10.11.6">OS X El Capitan 10.11.6</option>
                        <option value="OS X Yosemite 10.10.5">OS X Yosemite 10.10.5</option>
                        <option value="OS X Mavericks 10.9.5">OS X Mavericks 10.9.5</option>
                        <option value="OS X Mountain Lion 10.8.5">OS X Mountain Lion 10.8.5</option>
                        <option value="OS X Lion 10.7.5">OS X Lion 10.7.5</option>
                        <option value="OS X Snow Leopard 10.6.8">OS X Snow Leopard 10.6.8</option>
                        <option value="ac OS X Leopard 10.5.8">Mac OS X Leopard 10.5.8</option>
                        <option value="Mac OS X Tiger 10.4.11">Mac OS X Tiger 10.4.11</option>
                        <option value="Mac OS X Panther 10.3.9">Mac OS X Panther 10.3.9</option>
                        <option value="Mac OS X Jaguar 10.2.8">Mac OS X Jaguar 10.2.8</option>
                        <option value="Mac OS X Puma 10.1.5">Mac OS X Puma 10.1.5</option>
                        <option value="Mac OS X Cheetah 10.0.4">Mac OS X Cheetah 10.0.4</option>
                    </select>
                </div>

                <p class="fw-bold text-muted text-center mt-5">Процессор</p>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Тип процессора</span>
                    <select class="form-select" name="cpuType" id="cpuType">
                        <option value="Intel" selected>Intel</option>
                        <option value="AMD">AMD</option>
                    </select>
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Класс процессора</span>
                    <select class="form-select" name="cpuClass" id="cpuClass">
                        <option disabled class="bg-secondary" style="color: white">Intel:</option>
                        <option value="Intel® Celeron®" selected>Intel® Celeron®</option>
                        <option value="Intel® Core™ i">Intel® Core™ i3</option>
                        <option value="Intel® Core™ i5">Intel® Core™ i5</option>
                        <option value="Intel® Core™ i7">Intel® Core™ i7</option>
                        <option value="Intel® Core™ i9">Intel® Core™ i9</option>
                        <option value="Intel® Core™ серии X">Intel® Core™ серии X</option>
                        <option disabled class="bg-secondary" style="color: white">AMD:</option>
                        <option value="AMD Athlon™">AMD Athlon™</option>
                        <option value="AMD Ryzen™">AMD Ryzen™</option>
                        <option value="AMD Ryzen™ Threadripper™">AMD Ryzen™ Threadripper™</option>
                    </select>
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Модель процессора</span>
                    <input type="text" class="form-control" placeholder="Intel® Core™ i5-5350U" id="cpuModel"
                           name="cpuModel">
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Частота процессора (ГГц)</span>
                    <input type="text" class="form-control hhzInInput" placeholder="1.8 ГГц" id="cpuFrequency"
                           name="cpuFrequency">
                </div>

                <p class="fw-bold text-muted text-center mt-5">Оперативная память</p>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Тип оперативной памяти</span>
                    <select class="form-select" name="ramType" id="ramType">
                        <option value="DDR4" selected>DDR4</option>
                        <option value="DDR3">DDR3</option>
                        <option value="DDR2">DDR2</option>
                    </select>
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Оперативная память (RAM)</span>
                    <input type="text" class="form-control gbInInput" placeholder="8 GB" id="ramSize"
                           name="ramSize">
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Частота оперативной памяти</span>
                    <select class="form-select" name="ramClockSpeed" id="ramClockSpeed">
                        <option disabled class="bg-secondary" style="color: white">DDR4</option>
                        <option value="3333 МГц" selected>3333 МГц</option>
                        <option value="3200 МГц">3200 МГц</option>
                        <option value="3000 МГц">3000 МГц</option>
                        <option value="2800 МГц">2800 МГц</option>
                        <option value="2666 МГц">2666 МГц</option>
                        <option value="2400 МГц">2400 МГц</option>
                        <option value="2133 МГц">2133 МГц</option>
                        <option disabled class="bg-secondary" style="color: white">DDR3</option>
                        <option value="2400 МГц">2400 МГц</option>
                        <option value="2200 МГц">2200 МГц</option>
                        <option value="2133 МГц">2133 МГц</option>
                        <option value="2000 МГц">2000 МГц</option>
                        <option value="1800 МГц">1800 МГц</option>
                        <option value="1600 МГц">1600 МГц</option>
                        <option value="1333 МГц">1333 МГц</option>
                        <option value="1066 МГц">1066 МГц</option>
                        <option value="800 МГц">800 МГц</option>
                        <option disabled class="bg-secondary" style="color: white">DDR2</option>
                        <option value="1066 МГц">1066 МГц</option>
                        <option value="800 МГц">800 МГц</option>
                        <option value="667 МГц">667 МГц</option>
                        <option value="533 МГц">533 МГц</option>
                        <option value="400 МГц">400 МГц</option>
                    </select>
                </div>

                <p class="fw-bold text-muted text-center mt-5">Жесткий диск</p>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">SSD диск</span>
                    <select class="form-select" name="ssd" id="ssd">
                        <option value="Да">Да</option>
                        <option value="Нет">Нет</option>
                    </select>
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Объем диска SSD (GB)</span>
                    <select class="form-select" name="ssdCapacity" id="ssdCapacity">
                        <option value="100 GB" selected>100 GB</option>
                        <option value="120 GB">120 GB</option>
                        <option value="128 GB">128 GB</option>
                        <option value="240 GB">240 GB</option>
                        <option value="250 GB">250 GB</option>
                        <option value="256 GB">256 GB</option>
                        <option value="275 GB">275 GB</option>
                        <option value="400 GB">400 GB</option>
                        <option value="480 GB">480 GB</option>
                        <option value="500 GB">500 GB</option>
                        <option value="512 GB">512 GB</option>
                        <option value="600 GB">600 GB</option>
                        <option value="800 GB">800 GB</option>
                        <option value="960 GB">960 GB</option>
                        <option value="1000 GB">1000 GB</option>
                        <option value="1920 GB">1920 GB</option>
                        <option value="2000 GB">2000 GB</option>
                        <option value="3000 GB">3000 GB</option>
                        <option value="3084 GB">3084 GB</option>
                        <option value="4000 GB">4000 GB</option>
                        <option value="5000 GB">5000 GB</option>
                        <option value="6000 GB">6000 GB</option>
                        <option value="8000 GB">8000 GB</option>
                        <option value="10000 GB">10000 GB</option>
                        <option value="12000 GB">12000 GB</option>
                        <option value="14000 GB">14000 GB</option>
                        <option value="16000 GB">16000 GB</option>
                        <option value="Не указано">Не указано</option>
                    </select>
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">HDD диск</span>
                    <select class="form-select" name="hdd" id="hdd">
                        <option value="Да">Да</option>
                        <option value="Нет">Нет</option>
                    </select>
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Объем диска HDD (GB)</span>
                    <select class="form-select" name="hddCapacity" id="hddCapacity">
                        <option value="100" selected>100 GB</option>
                        <option value="120 GB">120 GB</option>
                        <option value="128 GB">128 GB</option>
                        <option value="240 GB">240 GB</option>
                        <option value="250 GB">250 GB</option>
                        <option value="256 GB">256 GB</option>
                        <option value="275 GB">275 GB</option>
                        <option value="400 GB">400 GB</option>
                        <option value="480 GB">480 GB</option>
                        <option value="500 GB">500 GB</option>
                        <option value="600 GB">600 GB</option>
                        <option value="800 GB">800 GB</option>
                        <option value="960 GB">960 GB</option>
                        <option value="1000 GB">1000 GB</option>
                        <option value="1920 GB">1920 GB</option>
                        <option value="2000 GB">2000 GB</option>
                        <option value="3000 GB">3000 GB</option>
                        <option value="3084 GB">3084 GB</option>
                        <option value="4000 GB">4000 GB</option>
                        <option value="5000 GB">5000 GB</option>
                        <option value="6000 GB">6000 GB</option>
                        <option value="8000 GB">8000 GB</option>
                        <option value="10000 GB">10000 GB</option>
                        <option value="12000 GB">12000 GB</option>
                        <option value="14000 GB">14000 GB</option>
                        <option value="16000 GB">16000 GB</option>
                        <option value="Не указано">Не указано</option>
                    </select>
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Общий объём памяти (GB)</span>
                    <input type="text" class="form-control gbInInput" placeholder="128 GB" id="totalPcMemory"
                           name="totalPcMemory">
                </div>

                <p class="fw-bold text-muted text-center mt-5">Видеокарта</p>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Тип видеокарты</span>
                    <select class="form-select" name="gpuType" id="gpuType">
                        <option value="Intel" selected>Intel</option>
                        <option value="Nvidia">Nvidia</option>
                        <option value="AMD">AMD</option>
                    </select>
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Модель видеокарты</span>
                    <input type="text" class="form-control" placeholder="Intel HD Graphics 6000" id="gpuModel"
                           name="gpuModel">
                </div>

                <p class="fw-bold text-muted text-center mt-5">Встроенные дополнительные устройства</p>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Дисковод</span>
                    <select class="form-select" name="diskDrive" id="diskDrive">
                        <option value="Да">Да</option>
                        <option value="Нет">Нет</option>
                    </select>
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Видеокамера</span>
                    <select class="form-select" aria-label="Наличие видеокамеры:" name="camera" id="camera">
                        <option value="Да">Да</option>
                        <option value="Нет">Нет</option>
                    </select>
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Микрофон</span>
                    <select class="form-select" aria-label="Наличие микрофона:" name="microphone" id="microphone">
                        <option value="Да">Да</option>
                        <option value="Нет">Нет</option>
                    </select>
                </div>

                <p class="fw-bold text-muted text-center mt-5">Клавиатура и корпус</p>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Материал корпуса</span>
                    <input type="text" class="form-control" placeholder="Сплав металлов" id="bodyMaterial"
                           name="bodyMaterial">
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Русская раскладка</span>
                    <select class="form-select" name="russianKeyboardLayout" id="russianKeyboardLayout">
                        <option value="Да">Да</option>
                        <option value="Нет">Нет</option>
                    </select>
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Эстонская раскладка</span>
                    <select class="form-select" name="estonianKeyboardLayout" id="estonianKeyboardLayout">
                        <option value="Да">Да</option>
                        <option value="Нет">Нет</option>
                    </select>
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Подсветка клавиатуры</span>
                    <select class="form-select" name="backlitKeyboard" id="backlitKeyboard">
                        <option value="Да" selected>Да</option>
                        <option value="Нет">Нет</option>
                    </select>
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Влагостойкая клавиатура</span>
                    <select class="form-select" name="waterproofKeyboard" id="waterproofKeyboard">
                        <option value="Да" selected>Да</option>
                        <option value="Нет">Нет</option>
                    </select>
                </div>

                <p class="fw-bold text-muted text-center mt-5">Батарея и безопасность</p>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Технология батареи</span>
                    <select class="form-select" name="batteryTechnology" id="batteryTechnology">
                        <option value="Li-Pol" selected>Li-Pol</option>
                        <option value="Li-Ion">Li-Ion</option>
                        <option value="NiMH">NiMH</option>
                        <option value="NiCD">NiCD</option>
                        <option value="SLA">SLA</option>
                    </select>
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Время работы батареи (час)</span>
                    <input type="number" class="form-control" placeholder="12" id="batteryLife"
                           name="batteryLife">
                </div>

                <p class="fw-bold text-muted text-center mt-5">Дополнительно</p>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Гарантия (месяцы)</span>
                    <input type="number" class="form-control" placeholder="24" id="guarantee"
                           name="guarantee">
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Цена (€)</span>
                    <input type="number" class="form-control" step="any" placeholder="500" id="price"
                           name="price">
                </div>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <span class="input-group-text">Количество (шт.)</span>
                    <input type="number" class="form-control" placeholder="20" id="count"
                           name="count">
                </div>

                <p class="fw-bold text-muted text-center mt-5">Обложка товара</p>

                <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                    <input class="form-control" type="file" name="file" id="file-text">
                </div>

                <div class="w-50 mx-auto mt-5" style="margin-bottom: 10rem">
                    <div class="mx-auto w-25">
                        <input class="btn btn-primary mx-auto w-100" type="submit" name="submit" value="Добавить товар">
                    </div>
                </div>
            </form>`;

        productModule.addProductInputEnding();

        const listCategories = await productModule.loadListCategories();
        const categorySelect = document.getElementById("categoryId");

        for (let i = 0; i < listCategories.length; i++) {
            let category = listCategories[i];
            let element = document.createElement("option");
            element.textContent = category.categoryName;
            element.value = category.id;
            categorySelect.appendChild(element);
        }

        document.getElementById("addCategory").addEventListener("click", printProductModule.printAddCategory);
        document.getElementById("addProductForm").onsubmit = function (e) {
            e.preventDefault();
            productModule.addProduct();
        }
    }

    async printAddCategory() {
        document.getElementById("info").innerHTML = "";
        document.getElementById(
            "content"
        ).innerHTML = `
        <form id="addCategoryForm" method="POST" enctype="multipart/form-data">
            <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                <select disabled multiple class="mt-2 mx-auto w-50 form-select" id="categoryList">
                    <option style="font-weight: bold">Список категорий: </option>
                </select>
            </div>

            <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                <span class="input-group-text">Категория</span>
                <input class="form-control" type="text" name="categoryName" id="categoryName" placeholder="Игровые ноутбуки" required>
            </div>
            <div class="row w-25 mx-auto mt-5">
                <div class="w-50 mx-auto">
                    <input type="submit" class="btn btn-primary w-100" id="submit" value="Добавить категорию">
                    <a id="removeCategory" href="#removeCategory" class="btn btn-outline-danger w-100 mt-3">Удалить категорию</a>
                </div>
            </div>
        </form>`;

        const listCategories = await productModule.loadListCategories();
        const categorySelect = document.getElementById("categoryList")

        for (let i = 0; i < listCategories.length; i++) {
            let category = listCategories[i];
            let element = document.createElement("option");
            element.textContent = category.id + ". " + category.categoryName;
            element.value = category.id;
            categorySelect.appendChild(element)
        }

        document.getElementById("addCategoryForm").onsubmit = function (e) {
            e.preventDefault();
            productModule.addCategory();
        }
        document
            .getElementById("removeCategory")
            .addEventListener("click", printProductModule.printRemoveCategory);
    }

    async printRemoveCategory() {
        document.getElementById("info").innerHTML = "";
        document.getElementById(
            "content"
        ).innerHTML =
            `
        <form id="removeCategoryForm" method="POST" enctype="multipart/form-data">
            <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                <span class="input-group-text">Выберите категорию</span>
                <select class="form-select" name="categoryId" id="deleteCategorySelect" required>
                </select>
            </div>

            <div class="row w-25 mx-auto mt-5">
                <div class="w-50 mx-auto">
                    <input type="submit" id="sumbit" class="btn btn-primary w-100" value="Удалить категорию">
                </div>
            </div>
        </form>`;

        const listCategories = await productModule.loadListCategories();
        const categorySelect = document.getElementById("deleteCategorySelect")

        for (let i = 0; i < listCategories.length; i++) {
            let category = listCategories[i];
            let element = document.createElement("option");
            element.textContent = category.categoryName;
            element.value = category.id;
            element.id = "categoryId";
            categorySelect.appendChild(element);
        }

        document.getElementById("removeCategoryForm").onsubmit = function (e) {
            e.preventDefault();
            productModule.removeCategory();
        }
    }

    async printListProducts() {
        let listProducts = await productModule.loadListProducts();
        let promoCode = JSON.parse(JSON.stringify(sessionStorage.getItem("promoCode")));

        let content = document.getElementById("content");
        content.innerHTML = '<h2 class="text-center my-4">Список товаров</h2>';

        let inStock;
        let productRate;

        if (listProducts.length !== 0) {
            let divsForList = document.createElement("div");
            divsForList.classList.add("w-50", "d-flex", "flex-column", "mx-auto");

            for (let product of listProducts) {
                if (product.count !== 0) {
                    inStock =
                        `
                        <span>Есть в наличии</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             style="fill: #32CD32; margin-top: 6px"
                             class="bi bi-check-circle-fill" viewBox="0 0 24 24">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                        </svg>
                        `;
                } else {
                    inStock =
                        `
                        <span>Нет в наличии</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             class="bi bi-clock-fill" viewBox="0 0 24 24" style="fill: red; margin-top: 6px">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"></path>
                        </svg>
                        `;
                }

                productRate = Math.round((Math.random() * 1000) + 1);

                let cart = document.createElement("div");
                cart.classList.add("row", "flex-nowrap", "p-2", "bg-white", "border", "rounded", "mt-2");

                let img = document.createElement('img');
                img.classList.add('card-img-top');
                img.style.cssText = `max-width: 12rem; max-height: 12rem; margin: auto 10px auto 10px;`;
                img.setAttribute('src', `insertCover/${product.cover.path}`);

                cart.insertAdjacentElement('beforeEnd', img);
                cart.insertAdjacentHTML('beforeEnd',
                    `
                <div class="p-2 bg-white mt-2 flex-shrink-1">
                    <div class="col-md-6 mt-1 w-100 d-flex flex-row justify-content-between">
                        <div>
                            <div class="d-flex flex-column">
                            <h5>${product.brand} ${product.series} ${product.model}</h5>
                                <div class="ratings mr-2 d-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor"
                                         class="bi bi-star-fill" viewBox="0 0 16 16" style="fill: #ffa500">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor"
                                         class="bi bi-star-fill" viewBox="0 0 16 16" style="fill: #ffa500">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor"
                                         class="bi bi-star-fill" viewBox="0 0 16 16" style="fill: #ffa500">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor"
                                         class="bi bi-star-fill" viewBox="0 0 16 16" style="fill: #ffa500">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor"
                                         class="bi bi-star-fill" viewBox="0 0 16 16" style="fill: #ffa500">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                    </svg>
                                    <span style="margin-top: -3px; margin-left: 4px">${productRate}</span>
                                </div> 
                            </div>
                            
                            <div class="mt-1 mb-1 spec-1 d-flex flex-column">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         class="bi bi-dot" viewBox="0 0 16 16" style="fill: #007bff">
                                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
                                    </svg>
                                    Процессор: ${product.cpuType} ${product.cpuModel} ${product.cpuFrequency}</span>
                                    <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         class="bi bi-dot" viewBox="0 0 16 16" style="fill: #007bff">
                                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
                                    </svg>
                                    Видеокарта: ${product.gpuType} ${product.gpuModel}
                                </span>
                                    <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         class="bi bi-dot" viewBox="0 0 16 16" style="fill: #007bff">
                                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
                                    </svg>
                                    ОЗУ: ${product.ramSize}, ${product.ramType}, ${product.ramClockSpeed}
                                </span>
                                    <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         class="bi bi-dot" viewBox="0 0 16 16" style="fill: #007bff">
                                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
                                    </svg>
                                    Аккумулятор: ${product.batteryTechnology}, время работы: ${product.batteryLife} часов
                                </span>
                            </div>

                            <a data-bs-target="#exampleModal" data-bs-toggle="modal"
                                    id="viewDetailButton" style="color: blue; cursor: pointer;">
                                Смотреть подробней
                            </a>
                        </div>
                            
                         <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                             aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Описание товара "<i>${product.brand} ${product.series} ${product.model}</i>"
                                        </h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p>Категория: <span style="font-weight: bold">${product.category.categoryName}</span></p>
                                        <hr>
                                        <p>Бренд: <span style="font-weight: bold">${product.brand}</span></p>
                                        <p>Серия: <span style="font-weight: bold">${product.series}</span></p>
                                        <p>Модель: <span style="font-weight: bold">${product.model}</span></p>
                                        <p>Цвет: <span style="font-weight: bold">${product.color}</span></p>
                                        <p>Вес: <span style="font-weight: bold">${product.weight}</span></p>
                                        <p>Длина: <span style="font-weight: bold">${product.length}</span></p>
                                        <p>Ширина: <span style="font-weight: bold">${product.width}</span></p>
                                        <p>Высота: <span style="font-weight: bold">${product.height}</span></p>

                                        <hr>

                                        <p>Диагональ экрана: <span style="font-weight: bold">${product.screenDiagonal}</span></p>
                                        <p>Разрешение экрана: <span style="font-weight: bold">${product.resolution}</span></p>
                                        <p>Сенсорный экран: <span style="font-weight: bold">${product.touchScreen}</span></p>

                                        <hr>

                                        <p>Операционная система: <span style="font-weight: bold">${product.touchScreen}</span></p>

                                        <hr>

                                        <p>Тип процессора: <span style="font-weight: bold">${product.cpuType}</span></p>
                                        <p>Класс процессора: <span style="font-weight: bold">${product.cpuClass}</span></p>
                                        <p>Модель процессора: <span style="font-weight: bold">${product.cpuModel}</span></p>
                                        <p>Частота процессора: <span style="font-weight: bold">${product.cpuFrequency}</span></p>

                                        <hr>

                                        <p>Тип оперативной памяти: <span style="font-weight: bold">${product.cpuFrequency}</span>
                                        </p>
                                        <p>Оперативная память (RAM): <span
                                                style="font-weight: bold">${product.cpuFrequency}</span>
                                        </p>
                                        <p>Частота оперативной памяти: <span
                                                style="font-weight: bold">${product.cpuFrequency}</span>
                                        </p>

                                        <hr>

                                        <p>SSD диск: <span style="font-weight: bold">${product.ssd}</span></p>
                                        <p>Объем диска SSD: <span style="font-weight: bold">${product.ssdCapacity}</span></p>
                                        <p>HDD диск: <span style="font-weight: bold">${product.hdd}</span></p>
                                        <p>Объем диска HDD: <span style="font-weight: bold">${product.hddCapacity}</span></p>
                                        <p>Общий объём памяти: <span style="font-weight: bold">${product.totalPcMemory}</span></p>

                                        <hr>

                                        <p>Тип видеокарты: <span style="font-weight: bold">${product.gpuType}</span></p>
                                        <p>Модель видеокарты: <span style="font-weight: bold">${product.gpuModel}</span></p>

                                        <hr>

                                        <p>Дисковод: <span style="font-weight: bold">${product.diskDrive}</span></p>
                                        <p>Видеокамера: <span style="font-weight: bold">${product.camera}</span></p>
                                        <p>Микрофон: <span style="font-weight: bold">${product.microphone}</span></p>

                                        <hr>

                                        <p>Материал корпуса: <span style="font-weight: bold">${product.bodyMaterial}</span></p>
                                        <p>Русская раскладка: <span
                                                style="font-weight: bold">${product.russianKeyboardLayout}</span>
                                        </p>
                                        <p>Эстонская раскладка: <span
                                                style="font-weight: bold">${product.estonianKeyboardLayout}</span>
                                        </p>
                                        <p>Подсветка клавиатуры: <span style="font-weight: bold">${product.backlitKeyboard}</span>
                                        </p>
                                        <p>Влагостойкая клавиатура: <span
                                                style="font-weight: bold">${product.waterproofKeyboard}</span>
                                        </p>

                                        <hr>

                                        <p>Технология батареи: <span style="font-weight: bold">${product.batteryTechnology}</span>
                                        </p>
                                        <p>Время работы батареи: <span style="font-weight: bold">${product.batteryLife} часов</span>
                                        </p>

                                        <hr>

                                        <p>Гарантия: <span style="font-weight: bold"> ${product.guarantee} месяц(ев)</span></p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Закрыть
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                `);

                let divButtons = document.createElement("div");
                divButtons.classList.add("w-25", "flex-wrap", "justify-content-between");
                divButtons.style = "margin-top: -6px; font-size: 17px";

                let productPrice = document.createElement("h4");
                productPrice.classList.add("card-text", "mt-2");
                productPrice.style = "white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 12rem; margin-bottom: 0";
                productPrice.appendChild(document.createTextNode(product.price + "€"));

                let deliveryPrice = document.createElement("h6");
                deliveryPrice.classList.add("text-success");
                deliveryPrice.classList.add("card-text", "mt-2");
                deliveryPrice.appendChild(document.createTextNode("Доставка - 5€"))

                let productInStock = document.createElement("p");
                productInStock.classList.add("card-text", "mb-0", "mt-2");
                let productInStockStrong = document.createElement("strong");
                productInStockStrong.innerHTML = inStock;
                productInStock.appendChild(productInStockStrong);

                let addToBagSpan = document.createElement("span");
                addToBagSpan.classList.add("btn", "btn-outline-primary", "w-100", "mt-2");
                addToBagSpan.appendChild(document.createTextNode("Добавить в корзину"));
                addToBagSpan.onclick = function () {
                    productModule.addProductToBag(product.id);
                };

                let buyProductSpan = document.createElement("span");
                buyProductSpan.classList.add("btn", "btn-primary", "w-100", "mt-2");
                buyProductSpan.appendChild(document.createTextNode("Купить сразу"));
                buyProductSpan.onclick = function () {
                    productModule.buyProduct(product.id);
                };

                if (product.count === 0) {
                    addToBagSpan.disabled = true;
                    buyProductSpan.disabled = true;
                }

                divButtons.appendChild(productPrice);
                divButtons.appendChild(deliveryPrice);
                divButtons.appendChild(productInStock);
                divButtons.appendChild(buyProductSpan);
                divButtons.appendChild(addToBagSpan);

                cart.appendChild(divButtons)

                divsForList.insertAdjacentElement("beforeEnd", cart);
            }

            content.insertAdjacentElement("beforeEnd", divsForList)
        } else {
            content.innerHTML =
                `
            <h1 class="text-center">Список проданных товаров</h1>

            <div class="d-flex h-100 w-50 mx-auto my-auto main_cart shadow" style="background-color: #FFFFFF">
                <div class="d-flex flex-column mx-auto my-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="currentColor"
                         class="bi bi-bookmark-x-fill" viewBox="0 0 16 16"
                         style="margin: 0 auto; margin-bottom: 1rem; margin-top: 5rem">
                        <path fill-rule="evenodd"
                              d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM6.854 5.146a.5.5 0 1 0-.708.708L7.293 7 6.146 8.146a.5.5 0 1 0 .708.708L8 7.707l1.146 1.147a.5.5 0 1 0 .708-.708L8.707 7l1.147-1.146a.5.5 0 0 0-.708-.708L8 6.293 6.854 5.146z"></path>
                    </svg>
                    <h2 class="text-center mb-3">Товаров нет :(</h2>
                    <span class="text-muted mb-5"
                          style="font-size: 18px">Возможно, они скоро появятся :)</span>
                </div>
            </div>  
            `;
        }

    }

    async printDiscountForm() {
        document.getElementById("content").innerHTML =
            `
            <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                <select disabled multiple class="mt-2 mx-auto w-50 form-select" id="promoCodeSelect">
                  <option style="font-weight: bold">Список промо-кодов: </option>
                </select>
              </div>
            
              <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                <span class="input-group-text">Промо-код</span>
                <input class="form-control" type="text" name="promoCodeName" id="promoCodeName" placeholder="JPTVR19" required>
              </div>
            
              <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                <span class="input-group-text">Процент промо-кода</span>
                <input class="form-control" type="number" name="percent" max="100" min="2" id="percent" placeholder="20" required>
              </div>
            
              <div class="row w-25 mx-auto mt-5">
                <div class="w-50 mx-auto">
                  <a href="#addPromoCode" class="btn btn-primary w-100" id="addPromoCode">Добавить промо-код</a>
                  <a href="#deletePromoCode" id="deletePromoCodeButton" type="submit" class="btn btn-outline-danger w-100 mt-3">Удалить промо-код</a>
                </div>
              </div>
            `;

        const promoCodeList = await productModule.loadListPromoCodes();
        const promoCodeSelect = document.getElementById("promoCodeSelect")

        for (let i = 0; i < promoCodeList.length; i++) {
            let promoCode = promoCodeList[i];
            let element = document.createElement("option");
            element.textContent = "Название: " + promoCode.promoCodeName + ", процент: " + promoCode.percent + "%";
            element.value = promoCode.id;
            element.id = promoCode.id;
            promoCodeSelect.appendChild(element);
        }

        document.getElementById("addPromoCode").onclick = function () {
            adminModule.addPromoCode();
        };

        document.getElementById("deletePromoCodeButton").addEventListener("click", printProductModule.printDeletePromoCode);
    }

    async printDeletePromoCode() {
        document.getElementById("content").innerHTML =
            `
              <div class="input-group flex-nowrap w-25 my-3 mx-auto">
                  <span class="input-group-text">Выберите промо-код</span>
                  <select class="form-select" id="promoCodeId" required>
                  </select>
            </div>
            
              <div class="row w-25 mx-auto mt-5">
                    <div class="w-50 mx-auto">
                    <a href="#deletePromoCode" id="deletePromoCodeButton" class="btn btn-primary w-100">Удалить промо-код</a>
              </div>
            </div>
            `;

        const promoCodeList = await productModule.loadListPromoCodes();
        const promoCodeSelect = document.getElementById("promoCodeId")

        for (let i = 0; i < promoCodeList.length; i++) {
            let promoCode = promoCodeList[i];
            let element = document.createElement("option");
            element.textContent = promoCode.promoCodeName + ", процент: " + promoCode.percent + "%";
            element.value = promoCode.id;
            element.id = promoCode.id;
            promoCodeSelect.appendChild(element);

            document.getElementById("deletePromoCodeButton").onclick = function () {
                adminModule.deletePromoCode(promoCode.id);
            };
        }
    }
}

let printProductModule = new PrintProductModule();
export {printProductModule};