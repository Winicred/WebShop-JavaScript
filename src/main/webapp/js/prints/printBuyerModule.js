import {buyerModule} from "../BuyerModule.js";
import {printProductModule} from "./PrintProductModule.js";
import {productModule} from "../ProductModule.js";

class PrintBuyerModule {
    async printBuyerProfile() {
        let buyer = JSON.parse(sessionStorage.getItem("buyer"));
        let user = JSON.parse(sessionStorage.getItem("user"));

        document.getElementById("content").innerHTML = `
            <div id="snippetContent" class="mt-5">
                <div class="container">
                    <div class="main-body">
                        <div class="row gutters-sm">
                            <div class="col-md-4 mb-3">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex flex-column align-items-center text-center">
                                                <img src="" alt="" class="rounded-circle"
                                                     width="150" height="150">
                                            <div class="mt-3">
                                                <h4>
                                                    <span id="profileUserLoginHeader" style="font-size: 24px;"></span>
        
                                                    <br>
        
                                                    <span id="userEmpAndEmpCompanyHeader" style="font-size: 16px; font-weight: normal" class="text-secondary"></span>   
                                                </h4>
                                                <span id="userEditProfileButtonHeader"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="card mt-3">
                                    <ul class="list-group list-group-flush" >
                                        <div style="border-bottom: 1px solid rgba(0,0,0,.125); padding: 0.75rem 1rem" id="divEmptyListSocialPages">
                                            <li class="d-flex justify-content-between align-items-center flex-wrap">
                                                <a href="editProfileForm" class="mx-auto text-decoration-none" id="emptyListSocialPages">Вы не добавили ни
                                                    одной соц. сети</a>
                                            </li>
                                        </div>
            
                                        <div class="list-group-item" id="emptyProfileUserWebsite" style="border-bottom: 1px solid rgba(0,0,0,.125); padding: 0.75rem 1rem">
                                            <li class="d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 class="mb-0 d-flex flex-row">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         viewBox="0 0 24 24"
                                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                         stroke-linejoin="round" class="feather feather-globe mr-2 icon-inline">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <line x1="2" y1="12" x2="22" y2="12"></line>
                                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                                    </svg>
                                                    <span style="margin-left: 0.5rem; margin-top: 3px">Веб сайт</span>
                                                </h6>
                                                <span class="text-secondary" id="profileUserWebsite"></span>
                                            </li>
                                        </div>
            
                                        <div class="list-group-item" id="emptyProfileUserGithub" style=" padding: 0.75rem 1rem">
                                            <li class="d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 class="mb-0 d-flex flex-row">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         viewBox="0 0 24 24"
                                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                         stroke-linejoin="round" class="feather feather-github mr-2 icon-inline">
                                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                                    </svg>
                                                    <span style="margin-left: 0.5rem; margin-top: 3px">Github</span>
                                                </h6>
                                                <span class="text-secondary" id="profileUserGithub"></span>
                                            </li>
                                        </div>
            
            
                                        <div class="list-group-item" id="emptyProfileUserTwitter" style=" padding: 0.75rem 1rem">
                                            <li class="d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 class="mb-0 d-flex flex-row">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         viewBox="0 0 24 24"
                                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                         stroke-linejoin="round"
                                                         class="feather feather-twitter mr-2 icon-inline text-info">
                                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                                    </svg>
                                                    <span style="margin-left: 0.5rem; margin-top: 3px">Twitter</span>
                                                </h6>
                                                <span class="text-secondary" id="profileUserTwitter"></span>
                                            </li>
                                        </div>
            
                                        <div class="list-group-item" id="emptyProfileUserInstagram" style=" padding: 0.75rem 1rem">
                                            <li class="d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 class="mb-0 d-flex flex-row">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         viewBox="0 0 24 24"
                                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                         stroke-linejoin="round"
                                                         class="feather feather-instagram mr-2 icon-inline text-danger">
                                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                                    </svg>
                                                    <span style="margin-left: 0.5rem; margin-top: 3px">Instagram</span>
                                                </h6>
                                                <span class="text-secondary" id="profileUserInstagram"></span>
                                            </li>
                                        </div>
            
                                        <div class="list-group-item" id="emptyProfileUserFacebook" style=" padding: 0.75rem 1rem">
                                            <li class="d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 class="mb-0 d-flex flex-row">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         viewBox="0 0 24 24"
                                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                         stroke-linejoin="round"
                                                         class="feather feather-facebook mr-2 icon-inline text-primary">
                                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                                    </svg>
                                                    <span style="margin-left: 0.5rem; margin-top: 3px">Facebook</span>
                                                </h6>
                                                <span class="text-secondary" id="profileUserFacebook"></span>
                                            </li>
                                        </div>
            
                                        <div class="list-group-item" style=" padding: 0.75rem 1rem" id="emptyProfileUserTelegram">
                                            <li class="d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 class="mb-0 d-flex flex-row">
                                                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px"
                                                         width="24" height="24"
                                                         y="0px"
                                                         viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;"
                                                         xml:space="preserve">
                                                        <circle style="fill:#41B4E6;" cx="255.997" cy="256" r="255.997"></circle>
                                                        <path style="fill:#0091C8;"
                                                              d="M512,256.003c0-6.238-0.235-12.419-0.673-18.546L405.228,131.36L106.772,248.759l114.191,114.192l1.498,5.392l1.939-1.955l0.008,0.008l-1.947,1.947L348.778,494.66C444.298,457.5,512,364.663,512,256.003z"></path>
                                                        <polygon style="fill:#FFFFFF;"
                                                                 points="231.138,293.3 346.829,380.647 405.228,131.36 106.771,248.759 197.588,278.84363.331,167.664 "></polygon>
                                                        <polygon style="fill:#D2D2D7;"
                                                                 points="197.588,278.84 222.461,368.344 231.138,293.3 363.331,167.664 "></polygon>
                                                        <polygon style="fill:#B9B9BE;"
                                                                 points="268.738,321.688 222.461,368.344 231.138,293.3 "></polygon>
                                                        <g>
                                                        </g>
                                                        <g>
                                                        </g>
                                                        <g>
                                                        </g>
                                                        <g>
                                                        </g>
                                                        <g>
                                                        </g>
                                                        <g>
                                                        </g>
                                                        <g>
                                                        </g>
                                                        <g>
                                                        </g>
                                                        <g>
                                                        </g>
                                                        <g>
                                                        </g>
                                                        <g>
                                                        </g>
                                                        <g>
                                                        </g>
                                                        <g>
                                                        </g>
                                                        <g>
                                                        </g>
                                                        <g>
                                                        </g>
                                                        </svg>
                                                    <span style="margin-left: 0.5rem; margin-top: 3px">Telegram</span>
                                                </h6>
                                                <span class="text-secondary" id="profileUserTelegram"></span>
                                            </li>
                                        </div>
            
                                        <div class="list-group-item" style=" padding: 0.75rem 1rem" id="emptyProfileUserVk">
                                            <li class="d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 class="mb-0 d-flex flex-row">
                                                    <svg id="Capa_1" style="enable-background:new 0 0 112.196 112.196;"
                                                         version="1.1" viewBox="0 0 112.196 112.196" xml:space="preserve" width="25"
                                                         height="25"
                                                         xmlns="http://www.w3.org/2000/svg"><g>
                                                        <g>
                                                            <circle cx="56.098" cy="56.098" id="XMLID_11_" r="56.098"
                                                                    style="fill:#4D76A1;"></circle>
                                                        </g>
                                                        <path d="M53.979,80.702h4.403c0,0,1.33-0.146,2.009-0.878   c0.625-0.672,0.605-1.934,0.605-1.934s-0.086-5.908,2.656-6.778c2.703-0.857,6.174,5.71,9.853,8.235   c2.782,1.911,4.896,1.492,4.896,1.492l9.837-0.137c0,0,5.146-0.317,2.706-4.363c-0.2-0.331-1.421-2.993-7.314-8.463   c-6.168-5.725-5.342-4.799,2.088-14.702c4.525-6.031,6.334-9.713,5.769-11.29c-0.539-1.502-3.867-1.105-3.867-1.105l-11.076,0.069   c0,0-0.821-0.112-1.43,0.252c-0.595,0.357-0.978,1.189-0.978,1.189s-1.753,4.667-4.091,8.636c-4.932,8.375-6.904,8.817-7.71,8.297   c-1.875-1.212-1.407-4.869-1.407-7.467c0-8.116,1.231-11.5-2.397-12.376c-1.204-0.291-2.09-0.483-5.169-0.514   c-3.952-0.041-7.297,0.012-9.191,0.94c-1.26,0.617-2.232,1.992-1.64,2.071c0.732,0.098,2.39,0.447,3.269,1.644   c1.135,1.544,1.095,5.012,1.095,5.012s0.652,9.554-1.523,10.741c-1.493,0.814-3.541-0.848-7.938-8.446   c-2.253-3.892-3.954-8.194-3.954-8.194s-0.328-0.804-0.913-1.234c-0.71-0.521-1.702-0.687-1.702-0.687l-10.525,0.069   c0,0-1.58,0.044-2.16,0.731c-0.516,0.611-0.041,1.875-0.041,1.875s8.24,19.278,17.57,28.993   C44.264,81.287,53.979,80.702,53.979,80.702L53.979,80.702z"
                                                              style="fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;"></path>
                                                    </g>
                                                        <g></g>
                                                        <g></g>
                                                        <g></g>
                                                        <g></g>
                                                        <g></g>
                                                        <g></g>
                                                        <g></g>
                                                        <g></g>
                                                        <g></g>
                                                        <g></g>
                                                        <g></g>
                                                        <g></g>
                                                        <g></g>
                                                        <g></g>
                                                        <g></g></svg>
                                                    <span style="margin-left: 0.5rem; margin-top: 3px">VK</span>
                                                </h6>
                                                <span class="text-secondary" id="profileUserVk"></span>
                                            </li>
                                        </div>
                                    </ul>
                                </div>
                            </div>
            
                            <div class="col-md-8">
                                <div class="card mb-3">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-3"><h6 class="mb-0">Полное имя</h6></div>
                                            <div class="col-sm-9 text-secondary  d-flex flex-row justify-content-between">
                                                <p id="profileUserName" class="my-0 mx-0">${buyer.name} ${buyer.lastname}</p>
                                                <a href="#editBuyerProfile" id="addNameButton" class="text-decoration-none" style="font-size: 14px">Добавить</a>
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="row">
                                            <div class="col-sm-3"><h6 class="mb-0">E-mail</h6></div>
                                            <div class="col-sm-9 text-secondary d-flex flex-row justify-content-between">
                                                ${buyer.email}
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="row">
                                            <div class="col-sm-3"><h6 class="mb-0">Номер телефона</h6></div>
                                            <div class="col-sm-9 text-secondary d-flex flex-row justify-content-between">
                                                +372 ${buyer.phoneNumber}
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="row flex-shrink-1">
                                            <div class="col-sm-3"><h6 class="mb-0">Адрес</h6></div>
                                            <div class="col-sm-9 text-secondary d-flex flex-row justify-content-between">
                                                <p id="profileUserAddress" class="my-0 mx-0">${buyer.address}</p>
                                                <a href="#editBuyerProfile" id="addAddressButton" class="text-decoration-none" style="font-size: 14px">Добавить</a>
                                            </div>
                                        </div>
                                        
                                        <hr>
                                        
                                        <div class="row">
                                            <div class="col-sm-3"><h6 class="mb-0">Статус</h6></div>
                                            <div class="col-sm-9 text-secondary">
                                                <span id="profileUserStatus"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

        // Header
        document.getElementById("profileUserLoginHeader").innerHTML = user.login;
        if (buyer.employeeCompany === "" && buyer.employee !== "") {
            document.getElementById("userEmpAndEmpCompanyHeader").innerHTML = buyer.employee;
        }

        if (buyer.employee === "" && buyer.employeeCompany !== "") {
            document.getElementById("userEmpAndEmpCompanyHeader").innerHTML = buyer.employeeCompany;
        }

        if (buyer.employeeCompany !== "" && buyer.employee !== "") {
            document.getElementById("userEmpAndEmpCompanyHeader").innerHTML = buyer.employee + ", " + buyer.employeeCompany;
        } else {
            document.getElementById("userEmpAndEmpCompanyHeader").innerHTML = `
                <a href="#editBuyerProfile" id="editBuyerProfile" class="text-decoration-none">Добавить
                    профессию</a>
                `;
        }

        document.getElementById("userEditProfileButtonHeader").innerHTML = `<a href="#editBuyerProfile" class="btn btn-outline-primary mt-2" id="editBuyerProfile">Изменить</a>`;

        document.getElementById("editBuyerProfile").onclick = function () {
            document.getElementById("info").innerHTML = "";
            printBuyerModule.printBuyerProfileSetting();
        };

        // Проверка на пустые поля соц. сетей
        document.getElementById("divEmptyListSocialPages").style.display = "none";

        if (buyer.userWebsite === "" && buyer.userGithub === "" && buyer.userTwitter === "" && buyer.userInstagram === "" && buyer.userFacebook === "" && buyer.userTelegram === "" && buyer.userVk === "") {
            document.getElementById("divEmptyListSocialPages").style.display = "block";
            document.getElementById("emptyProfileUserWebsite").style.display = "none";
            document.getElementById("emptyProfileUserGithub").style.display = "none";
            document.getElementById("emptyProfileUserInstagram").style.display = "none";
            document.getElementById("emptyProfileUserFacebook").style.display = "none";
            document.getElementById("emptyProfileUserTwitter").style.display = "none";
            document.getElementById("emptyProfileUserTelegram").style.display = "none";
            document.getElementById("emptyProfileUserVk").style.display = "none";
        } else {
            if (buyer.userWebsite === "") {
                document.getElementById("emptyProfileUserWebsite").style.display = "none";
            } else {
                document.getElementById("emptyProfileUserWebsite").style.display = "block";
                document.getElementById("profileUserWebsite").innerHTML = `<a href="https://${buyer.userWebsite}" target="_blank" style="text-decoration: none;">${buyer.userWebsite}</a>`;
            }

            if (buyer.userGithub === "") {
                document.getElementById("emptyProfileUserGithub").style.display = "none";
            } else {
                document.getElementById("emptyProfileUserGithub").style.display = "block";
                document.getElementById("profileUserGithub").innerHTML = `<a href="https://github.com/${buyer.userGithub}" target="_blank" style="text-decoration: none;">${buyer.userGithub}</a>`;
            }

            if (buyer.userInstagram === "") {
                document.getElementById("emptyProfileUserInstagram").style.display = "none";
            } else {
                document.getElementById("emptyProfileUserInstagram").style.display = "block";
                document.getElementById("profileUserInstagram").innerHTML = `<a href="https://www.instagram.com/${buyer.userInstagram}" target="_blank" style="text-decoration: none;">@${buyer.userInstagram}</a>`;
            }

            if (buyer.userFacebook === "") {
                document.getElementById("emptyProfileUserFacebook").style.display = "none";
            } else {
                document.getElementById("emptyProfileUserFacebook").style.display = "block";
                document.getElementById("profileUserFacebook").innerHTML = `<a href="https://www.facebook.com/profile.php" target="_blank" style="text-decoration: none;">${buyer.userFacebook}</a>`;
            }

            if (buyer.userTwitter === "") {
                document.getElementById("emptyProfileUserTwitter").style.display = "none";
            } else {
                document.getElementById("emptyProfileUserTwitter").style.display = "block";
                document.getElementById("profileUserTwitter").innerHTML = `<a href="https://twitter.com/${buyer.userTwitter}" target="_blank" style="text-decoration: none;">@${buyer.userTwitter}</a>`;
            }

            if (buyer.userTelegram === "") {
                document.getElementById("emptyProfileUserTelegram").style.display = "none";
            } else {
                document.getElementById("emptyProfileUserTelegram").style.display = "block";
                document.getElementById("profileUserTelegram").innerHTML = `<a href="https://t.me/${buyer.userTelegram}" target="_blank" style="text-decoration: none;">@${buyer.userTelegram}</a>`;
            }

            if (buyer.userVk === "") {
                document.getElementById("emptyProfileUserVk").style.display = "none";
            } else {
                document.getElementById("emptyProfileUserVk").style.display = "block";
                document.getElementById("profileUserVk").innerHTML = `<a href="https://vk.com/${buyer.userVk}" target="_blank" style="text-decoration: none;">#${buyer.userVk}</a>`;
            }
            document.getElementById("divEmptyListSocialPages").style.display = "none";
        }

        // Проверка пустого поля с полным именем
        if (buyer.name === "" && buyer.lastname === "") {
            document.getElementById("addNameButton").style.display = "block";
        } else {
            document.getElementById("addNameButton").style.display = "none";
        }

        document.getElementById("addNameButton").onclick = function () {
            document.getElementById("info").innerHTML = "";
            printBuyerModule.printBuyerProfileSetting();
        };

        // Проверка пустого адреса
        if (buyer.address === "") {
            document.getElementById("addAddressButton").style.display = "block";
        } else {
            document.getElementById("addAddressButton").style.display = "none";
        }

        document.getElementById("addAddressButton").onclick = function () {
            document.getElementById("info").innerHTML = "";
            printBuyerModule.printBuyerProfileSetting();
        };

        // Статус пользователя
        if (user.userStatus === "confirmed") {
            document.getElementById("profileUserStatus").innerHTML = `
            <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                     fill="currentColor"
                     class="bi bi-check-all" viewBox="0 0 16 16"
                     style="fill: #007bff; margin-top: -3px">
                    <path d="M8.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14l.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"></path>
                </svg>
            </i>
            <strong>Подтверждён</strong>
            `;
        } else {
            document.getElementById("profileUserStatus").innerHTML = `
            <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    fill="currentColor" class="bi bi-shield-fill-exclamation"
                    viewBox="0 0 16 16" style="fill: #d9534f; margin-top: -3px">
                    <path fill-rule="evenodd"
                        d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm-.55 8.502L7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0zM8.002 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                </svg>
            </i>
            <strong>Не подтверждён</strong>
            `;
        }
    }

    async printBuyerProfileSetting() {
        let buyer = JSON.parse(sessionStorage.getItem("buyer"));
        let user = JSON.parse(sessionStorage.getItem("user"));

        document.getElementById("content").innerHTML =
            `
            <div class="container light-style flex-grow-1 container-p-y">
                <h4 class="font-weight-bold py-3 mb-4 text-center">Настройки аккаунта "${buyer.name} ${buyer.lastname}"</h4>
                <div class="card overflow-hidden">
                    <div class="row no-gutters row-bordered row-border-light">
                        <div class="col-md-3 pt-0">
                            <div class="list-group list-group-flush account-settings-links">
                                <a class="list-group-item list-group-item-action active" data-toggle="list"
                                   href="#account-general">Основные</a>
                                <a class="list-group-item list-group-item-action" data-toggle="list"
                                   href="#account-change-password">Смена пароля</a>
                                <a class="list-group-item list-group-item-action" data-toggle="list" href="#account-info">Информация</a>
                                <a class="list-group-item list-group-item-action" data-toggle="list"
                                   href="#account-social-links">Социальные сети</a>
<!--                                <a class="list-group-item list-group-item-action" data-toggle="list"-->
<!--                                   href="#">Загрузка аватара</a>-->
                            </div>
                        </div>
        
                        <div class="col-md-9">
                            <div class="tab-content">
                                <div class="tab-pane fade active show" id="account-general">

                                    <div class="card-body">
                                        <div class="form-group">
                                            <label class="form-label">Логин</label>
                                            <input type="text" class="form-control  mb-3" id="login" value="${user.login}"
                                                   disabled>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label">Имя</label>
                                            <input type="text" class="form-control mb-3" id="name" name="name"
                                                   value="${buyer.name}">
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label">Фамилия</label>
                                            <input type="text" class="form-control mb-3" id="lastname" name="lastname"
                                                   value="${buyer.lastname}">
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label">E-mail</label>
                                            <input type="text" class="form-control mb-3" name="email" id="email"
                                                   value="${buyer.email}">
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label">Рабочая фирма</label>
                                            <input type="text" class="form-control mb-3" id="employeeCompany"
                                                   name="employeeCompany"
                                                   value="${buyer.employeeCompany}">
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label">Профессия</label>
                                            <input type="text" class="form-control mb-3" id="employee" name="employee"
                                                   value="${buyer.employee}">
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="account-change-password">
                                    <div class="card-body" style="padding: 16px">
                                        <div class="form-group mb-3">
                                            <label class="form-label">Текущий пароль</label>
                                            <input type="password" id="password" name="password" class="form-control">
                                        </div>
        
                                        <div class="form-group mb-3">
                                            <label class="form-label">Новый пароль</label>
                                            <input type="password" id="newPassword" name="newPassword" class="form-control">
                                        </div>
        
                                        <div class="form-group mb-3">
                                            <label class="form-label">Подтверждение пароля</label>
                                            <input type="password" class="form-control" name="newPasswordRepeat"
                                                   id="newPasswordRepeat">
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="account-info">
                                    <div class="card-body" style="padding: 16px">
                                        <div class="form-group">
                                            <label class="form-label">Описание</label>
                                            <textarea class="form-control mb-3" rows="5" id="buyerDescription"
                                                      name="buyerDescription"
                                                      style="resize: none"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label">Дата рождения</label>
                                            <input type="text" class="form-control mb-3" placeholder="дд.мм.гггг" id="birthDate"
                                                   name="birthDate"
                                                   value="${buyer.birthDate}">
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label">Город</label>
                                            <select class="form-select custom-select mb-3" id="town" name="town">
                                                <option>Abja-Paluoja</option>
                                                <option>Antsla</option>
                                                <option>Valga</option>
                                                <option>Viljandi</option>
                                                <option>Võru</option>
                                                <option>Võhma</option>
                                                <option>Jõgeva</option>
                                                <option>Jõhvi</option>
                                                <option>Kallaste</option>
                                                <option>Karksi-Nuia</option>
                                                <option>Keila</option>
                                                <option>Kehra</option>
                                                <option>Kiviõli</option>
                                                <option>Kilingi-Nõmme</option>
                                                <option>Kohtla-Järve</option>
                                                <option>Kunda</option>
                                                <option>Kuressaare</option>
                                                <option>Kärdla</option>
                                                <option>Lihula</option>
                                                <option>Loksa</option>
                                                <option>Maardu</option>
                                                <option>Mustvee</option>
                                                <option>Mõisaküla</option>
                                                <option>Narva</option>
                                                <option>Narva-Jõesuu</option>
                                                <option>Otepää</option>
                                                <option>Paide</option>
                                                <option>Paldiski</option>
                                                <option>Põlva</option>
                                                <option>Põltsamaa</option>
                                                <option>Püssi</option>
                                                <option>Pärnu</option>
                                                <option>Rakvere</option>
                                                <option>Rapla</option>
                                                <option>Saue</option>
                                                <option>Sillamäe</option>
                                                <option>Sindi</option>
                                                <option>Suure-Jaani</option>
                                                <option>Tallinn</option>
                                                <option>Tamsalu</option>
                                                <option>Tapa</option>
                                                <option>Tartu</option>
                                                <option>Tõrva</option>
                                                <option>Türi</option>
                                                <option>Haapsalu</option>
                                                <option>Elva</option>
                                            </select>
                                        </div>
                                        <div class="form-group mb-3">
                                            <label class="form-label">Адрес</label>
                                            <input type="text" id="address" name="address" class="form-control" value="${buyer.address}">
                                        </div>
                                    </div>
        
                                    <hr class="border-light m-0">
        
                                    <div class="card-body" style="padding: 16px">
                                        <h6 class="mb-4 mt-2">Контакты</h6>
                                        <div class="form-group mb-3">
                                            <label class="form-label">Номер телефона</label>
                                            <input type="text" class="form-control" name="phoneNumber" id="phoneNumber"
                                                   value="${buyer.phoneNumber}">
                                        </div>
                                        <div class="form-group mb-3">
                                            <label class="form-label">Сайт</label>
                                            <input type="text" class="form-control" id="userWebsite" name="userWebsite"
                                                   value="${buyer.userWebsite}">
                                        </div>
                                    </div>
                                </div>
        
                                <div class="tab-pane fade" id="account-social-links">
                                    <div class="card-body" style="padding: 16px">
                                        <div class="form-group mb-3">
                                            <label class="form-label">Github</label>
                                            <input type="text" class="form-control" id="userGithub" name="userGithub"
                                                   value="${buyer.userGithub}">
                                        </div>
                                        <div class="form-group mb-3">
                                            <label class="form-label">Twitter</label>
                                            <input type="text" class="form-control" id="userTwitter" name="userTwitter"
                                                   value="${buyer.userTwitter}">
                                        </div>
                                        <div class="form-group mb-3">
                                            <label class="form-label">Instagram</label>
                                            <input type="text" class="form-control" id="userInstagram" name="userInstagram"
                                                   value="${buyer.userInstagram}">
                                        </div>
                                        <div class="form-group mb-3">
                                            <label class="form-label">Facebook</label>
                                            <input type="text" class="form-control" id="userFacebook" name="userFacebook"
                                                   value="${buyer.userFacebook}">
                                        </div>
                                        <div class="form-group mb-3">
                                            <label class="form-label">VK</label>
                                            <input type="text" class="form-control" id="userVk" name="userVk"
                                                   value="${buyer.userVk}">
                                        </div>
                                        <div class="form-group mb-3">
                                            <label class="form-label">Telegram</label>
                                            <input type="text" class="form-control" id="userTelegram" name="userTelegram"
                                                   value="${buyer.userTelegram}">
                                        </div>
                                    </div>
                                </div>
        
        
        
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-right mt-2 d-flex">
                    <div style="margin-left: auto">
                        <a href="#buyerProfile" id="editProfileCancel" class="btn btn-secondary">Отменить</a>
                        <a href="#editBuyerProfile" id="editProfileButton" class="btn btn-primary">Сохранить</a>
                    </div>
                </div>
            </div>

            `;

        document.getElementById("email").disabled = true;
        document.getElementById("phoneNumber").disabled = true;

        document.getElementById("editProfileButton").addEventListener("click", await buyerModule.editBuyerProfile);

        document.getElementById("editProfileCancel").onclick = function () {
            document.getElementById("info").innerHTML = "";
            printBuyerModule.printBuyerProfile();
        };

        /*
        Добавить поле в аватаром

        <div class="tab-pane fade" id="account-avatar">
                                    <div class="card-body" style="padding: 16px">
                                        <div class="form-group mb-3">
                                            <div class="card-body media align-items-center d-flex flex-row">
                                                <span>Ваш текущий аватар: </span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"
                                                         fill="currentColor"
                                                         class="bi bi-question-circle-fill" viewBox="0 0 16 16">
                                                        <path style="fill: #007bff"
                                                              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"></path>
                                                    </svg>

                                                    <img src="insertAvatar/${buyer.avatar.path}" alt="" width="80" height="80"
                                                         id="image">
                                            </div>
                                        </div>

                                        <hr>

                                        <div class="form-group mb-3">
                                            <select class="form-select" name="avatarId">
                                                <option disabled>Выберите пользовательский аватар:</option>
                                                <c:forEach var="avatar" items="${listAvatars}">
                                                    <option value="${avatar.id}" selected>${avatar.path}</option>
                                                </c:forEach>
                                            </select>

                                            <div class="form-group mt-3">
                                                <span>Если Вы желаете добавить аватар, то нажмите сюда: </span>
                                                <a href="avatarUploadForm" class="btn btn-outline-primary"
                                                   style="margin-left: 3px; margin-top: -1px">Добавить фото</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
         */

    }

    async printCartList() {
        document.getElementById("content").innerHTML = "";
        let cartList = JSON.parse(sessionStorage.getItem("cartList"));
        let promoCode = JSON.parse(sessionStorage.getItem("promoCode"));
        let promoCodeUsed = sessionStorage.getItem("promoCodeUsed");
        let promoCodeName = sessionStorage.getItem("promoCodeName");

        let productCount = cartList.length;

        let content = document.getElementById("content");

        if (cartList.length !== 0) {

            let divsForList = document.createElement("div");

            let divForAll5 = document.createElement("div");
            let divForAll4 = document.createElement("div");
            let divForAll3 = document.createElement("div");
            let divForAll2 = document.createElement("div");
            let divForAll1 = document.createElement("div");
            let divForAll = document.createElement("div");

            let productCountDiv = document.createElement("div");
            productCountDiv.classList.add("d-flex", "flex-row", "justify-content-between");
            productCountDiv.innerHTML = `<h4 class="py-4 font-weight-bold m-0">Товаров в корзине: ${productCount}</h4>`;

            divForAll1.appendChild(productCountDiv);

            let totalPriceDiv = document.createElement("div")

            for (let product of cartList) {

                let cart = document.createElement("div");
                let cart1 = document.createElement("div");

                cart.classList.add("card", "p-4");
                cart1.classList.add("row", "d-flex", "flex-nowrap");

                let pictureDiv = document.createElement("div");
                let descriptionDiv = document.createElement("div");
                let descriptionDiv1 = document.createElement("div");

                pictureDiv.classList.add("col-md-5", "col-11", "bg-light", "shadow", "w-25", "d-flex", "justify-content-center");

                let img = document.createElement('img');
                img.classList.add('card-img-top');
                img.style.cssText = `max-width: 9rem; max-height: 12rem`;
                img.setAttribute('src', `insertCover/${product.cover.path}`);

                pictureDiv.appendChild(img);

                divForAll5.classList.add("container-fluid");
                divForAll4.classList.add("row");
                divForAll3.classList.add("col-md-10", "col-11", "mx-auto");
                divForAll2.classList.add("row", "mt-5", "gx-3", "d-flex", "flex-nowrap");
                divForAll1.classList.add("col-md-12", "col-lg-8", "col-11", "main_cart", "mb-lg-0", "mb-5", "shadow", "d-flex", "flex-column", "w-75");
                divForAll.classList.add("d-flex", "mb-5");

                let deleteProductDiv = document.createElement("div");
                deleteProductDiv.classList.add("row", "d-flex", "justify-content-between", "p-4");

                let deleteProductSpan = document.createElement("div");
                deleteProductSpan.classList.add("col-8", "mt-4")
                deleteProductSpan.innerHTML =
                    `
                        <a href="#deleteProductFromCart" id="deleteProductFromCart"
                           style="text-decoration: none; font-weight: 500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20"
                                 height="20"
                                 fill="currentColor" class="bi bi-trash-fill"
                                 viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
                            </svg>
                            Удалить
                        </a>
                    `;

                deleteProductSpan.onclick = function () {
                    productModule.deleteProductFromCart(cartList.indexOf(product) + 1);
                };

                let productPriceDiv = document.createElement("div");
                productPriceDiv.classList.add("col-4", "d-flex", "justify-content-end", "mt-4")
                let productPrice = document.createElement("h4");
                productPrice.appendChild(document.createTextNode(product.price + "€"))
                productPriceDiv.appendChild(productPrice)

                deleteProductDiv.appendChild(deleteProductSpan);
                deleteProductDiv.appendChild(productPriceDiv);

                descriptionDiv1.innerHTML =
                    `
                    <div class="col-md-7 col-11 px-4 mt-2 w-100">
                        <div class="d-flex justify-content-between">
                            <div class="w-50">
                                <h5>${product.brand} ${product.series} ${product.model}</h5>
                                <a class="mb-2 small" data-bs-target="#exampleModal${product.id}" data-bs-toggle="modal" id="viewDetailButton"
                                   style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis" href="#">Смотреть описание</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal fade" id="exampleModal${product.id}" tabindex="-1"
                     aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Описание товара
                                    "<i>${product.brand} ${product.series} ${product.model}</i>"
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>Категория: <span
                                        style="font-weight: bold">${product.category.categoryName}</span></p>
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

                                <p>Тип оперативной памяти: <span style="font-weight: bold">${product.ramType}</span>
                                </p>
                                <p>Оперативная память (RAM): <span
                                        style="font-weight: bold">${product.ramSize}</span>
                                </p>
                                <p>Частота оперативной памяти: <span
                                        style="font-weight: bold">${product.ramClockSpeed}</span>
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
                                <p>Время работы батареи: <span style="font-weight: bold">${product.batteryLife}</span>
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
                    `;

                descriptionDiv1.appendChild(deleteProductDiv)

                descriptionDiv.classList.add("flex-shrink-1");
                descriptionDiv.appendChild(descriptionDiv1);

                cart1.appendChild(pictureDiv);
                cart1.appendChild(descriptionDiv);

                cart.classList.add("mb-2")
                cart.appendChild(cart1);

                divsForList.insertAdjacentElement("beforeEnd", cart);
            }

            if (promoCodeUsed === "true") {
                document.getElementById("promoCodeName").disabled = true;
                document.getElementById("promoCodeName").value = promoCodeName;
                document.getElementById("usePromoCodeButton").disabled = true;
            }

            let productSum = 0;
            let totalProductSum = 0;

            let approxDate = await productModule.loadApproxDate();

            for (let i = 0; i < cartList.length; i++) {
                productSum += cartList[i].price;
                productSum = Math.trunc(productSum * 100) / 100;
                totalProductSum += (productSum + (productSum * 0.2)) + 5;
                totalProductSum = Math.trunc(totalProductSum * 100) / 100;
                if (promoCodeUsed === "true") {
                    totalProductSum += (productSum + (productSum * 0.2)) + 5;
                    totalProductSum = Math.trunc(totalProductSum * 100) / 100;
                }
            }

            totalPriceDiv.innerHTML =
                `
                <div class="col-md-12 col-lg-4 col-11 mt-lg-0 mt-md-5 w-100">
                    <div class="right_side p-3 shadow bg-white">
                        <h2 class="cart_name mb-5">Общая сумма</h2>
                        <div class="price_indiv d-flex justify-content-between">
                            <p>Цена товара(ов)</p>
                            <p>
                                <span>${productSum}</span>€
                            </p>
                        </div>
                        <div class="price_indiv d-flex justify-content-between">
                            <p>Стомость доставки</p>
                            <p><span>5</span>€</p>
                        </div>
                        <div class="price_indiv d-flex justify-content-between">
                            <p>Налог на добавленную стоймость (НДС)</p>
                            <p><span>20</span>%</p>
                        </div>
                        <hr/>
                        <div class="total-amt d-flex justify-content-between font-weight-bold" style="color: #1c7430">
                            <p>Промо-код (123%) </p>
                            <p>asd</p>
                        </div>
                        <div class="total-amt d-flex justify-content-between font-weight-bold">
                            <p>Общая сумма (с учетом НДС) </p>
                            <p><span>${totalProductSum}</span>€</p>
                        </div>
                        <a href="#paymentForm"
                           class="btn btn-primary text-uppercase">Оплатить</a>
                    </div>

                    <div class="mt-3 shadow">
                        <div class="card">
                            <div class="card-body">
                                <span>Введите промо-код (необязательно)</span>
                                <form id="usePromoCodeForm">
                                    <div class="mt-2">
                                        <input type="text" id="promoCodeName" placeholder="Введите промо-код"
                                               class="form-control font-weight-bold">
                                    </div>
                                    <input class="btn btn-primary btn-sm mt-2" id="usePromoCodeButton" type="submit" value="Применить">
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="mt-3 shadow p-3 bg-white">
                        <div class="pt-4">
                            <h5 class="mb-4">Примерная дата доставки</h5>
                            <p>${approxDate.beforeDate} - ${approxDate.afterDate}</p>
                        </div>
                    </div>
                </div>
                `;

            totalPriceDiv.classList.add("w-25");

            divForAll1.appendChild(divsForList)
            divForAll2.appendChild(divForAll1)
            divForAll3.appendChild(divForAll2)
            divForAll4.appendChild(divForAll3)
            divForAll5.appendChild(divForAll4)

            divForAll.appendChild(divForAll5);
            divForAll2.appendChild(totalPriceDiv);

            content.insertAdjacentElement("beforeEnd", divForAll)

            document.getElementById("usePromoCodeForm").onsubmit = function () {
                productModule.usePromoCode()
            };

            console.log(promoCodeUsed)

        } else {
            document.getElementById("content").innerHTML =
                `
                <div class="d-flex w-50 mx-auto my-auto main_cart shadow"
                     style="background-color: #FFFFFF">
                    <div class="d-flex flex-column mx-auto my-auto">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             style="margin: 0 auto; margin-bottom: 1rem; margin-top: 5rem"
                             width="128" height="128" fill="currentColor" class="bi bi-cart-x-fill"
                             viewBox="0 0 16 16">
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7.354 5.646L8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708z"></path>
                        </svg>
                        <h2 class="text-center mb-3">Корзина пуста :(</h2>
                        <span class="text-muted mb-2"
                              style="font-size: 18px">Добавьте что-нибудь, чтобы сделать меня счастливым :)</span>
                        <a href="#" class="btn btn-primary w-50 mx-auto mt-2" id="goShoppingButton"
                           style="margin-bottom: 5rem">Продолжить покупки</a>
                    </div>
                </div>
                `;

            document.getElementById("goShoppingButton").onclick = function () {
                printProductModule.printListProducts();
            };
        }
    }
}

let printBuyerModule = new PrintBuyerModule();
export {printBuyerModule};
