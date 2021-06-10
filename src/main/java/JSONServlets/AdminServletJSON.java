package JSONServlets;

import JSONBuilder.JSONBuyerBuilder;
import JSONBuilder.JSONCategoryBuilder;
import JSONBuilder.JSONPromoCodeBuilder;
import JSONBuilder.JSONUserBuilder;
import entity.*;
import jakarta.ejb.EJB;
import jakarta.json.*;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import session.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@MultipartConfig()
@WebServlet(name = "AdminServletJSON", urlPatterns = {
        "/listUsersJSON",
        "/getUserJSON",
        "/listUsersWithRoleJSON",
        "/listRolesJSON",
        "/setRoleToUserJSON",
        "/confirmUserJSON",
        "/changeUserRoleJSON",
        "/listPromoCodesJSON",
        "/addPromoCodeJSON",
        "/deletePromoCodeJSON",
})
public class AdminServletJSON extends HttpServlet {
    @EJB
    private UserFacade userFacade;
    @EJB
    private UserRolesFacade userRolesFacade;
    @EJB
    private ProductFacade productFacade;
    @EJB
    private RoleFacade roleFacade;
    @EJB
    private PromoCodeFacade promoCodeFacade;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        HttpSession session = request.getSession(true);
        String json = null;
        JsonObjectBuilder job = Json.createObjectBuilder();

        String path = request.getServletPath();
        switch (path) {
            case "/listUsersJSON":
                response.setContentType("application/json");
                List<User> listUsers = userFacade.findAll();

                JsonArrayBuilder jab = Json.createArrayBuilder();
                for (User u : listUsers) {
                    String role = userRolesFacade.getTopRoleForUser(u);
                    jab.add(Json.createObjectBuilder()
                            .add("user", new JSONUserBuilder().createJSONUser(u))
                            .add("buyer", new JSONBuyerBuilder().createJSONBuyer(u.getBuyer()))
                            .add("role", role).build()
                    );
                }

                json = job.add("requestStatus", true)
                        .add("info", "Список пользователей")
                        .add("listUsers", jab.build())
                        .build()
                        .toString();
                break;

            case "/listUsersWithRoleJSON":
                listUsers = userFacade.findAll();
                jab = Json.createArrayBuilder();
                job = Json.createObjectBuilder();

                for (User u : listUsers) {
                    String role = userRolesFacade.getTopRoleForUser(u);

                    job.add("user", new JSONUserBuilder().createJSONUser(u))
                            .add("role", role);
                    jab.add(job.build());
                }

                json = jab.build().toString();
                break;

            case "/listRolesJSON":
                List<Role> listRoles = roleFacade.findAll();
                jab = Json.createArrayBuilder();
                job = Json.createObjectBuilder();

                for (Role r : listRoles) {
                    job.add("id", r.getId())
                            .add("roleName", r.getRoleName());
                    jab.add(job.build());
                }

                json = jab.build().toString();
                break;

            case "/setRoleToUserJSON":
                JsonReader jsonReader = Json.createReader(request.getInputStream());
                JsonObject jsonObject = jsonReader.readObject();

                Long newUserId = Long.parseLong(jsonObject.getString("userId"));
                Long newRoleId = Long.parseLong(jsonObject.getString("roleId"));

                User newUserWithNewRole = userFacade.find(newUserId);
                Role newRole = roleFacade.find(newRoleId);
                UserRoles userRoles = new UserRoles(newUserWithNewRole, newRole);
                userRolesFacade.setNewRole(userRoles);

                json = job.add("requestStatus", true)
                        .add("info", "Роль пользователя " + '"' + newUserWithNewRole.getLogin() + '"' + " изменена.")
                        .build()
                        .toString();
                break;

            case "/confirmUserJSON":
                jsonReader = Json.createReader(request.getInputStream());
                jsonObject = jsonReader.readObject();

                long userId = jsonObject.getInt("userId");

                User unconfirmedUser = userFacade.find(userId);

                unconfirmedUser.setUserStatus("confirmed");
                userFacade.edit(unconfirmedUser);

                json = job.add("requestStatus", false)
                        .add("info", "Пользователь " + unconfirmedUser.getBuyer().getName() + " " + unconfirmedUser.getBuyer().getLastname() + " подтверждён.")
                        .build()
                        .toString();
                break;

            case "/changeUserRoleJSON":
                jsonReader = Json.createReader(request.getInputStream());
                jsonObject = jsonReader.readObject();

                userId = jsonObject.getInt("userId");

                User userWithOldRole = userFacade.find(userId);
                String strRoleId = "3";

                if (userWithOldRole.getUserStatus().equals("confirmed")) {
                    if (userRolesFacade.isRole("BUYER", userWithOldRole)) {
                        strRoleId = "2";
                    }

                    if (userRolesFacade.isRole("MANAGER", userWithOldRole)) {
                        strRoleId = "1";
                    }

                    if (userRolesFacade.isRole("ADMIN", userWithOldRole)) {
                        strRoleId = "3";
                    }
                } else {
                    json = job.add("requestStatus", false)
                            .add("info", "Необходимо подтвердить пользователя")
                            .build()
                            .toString();
                    break;
                }

                String roleId = strRoleId;
                Role newRoleForUser = roleFacade.find(Long.parseLong(roleId));
                userRoles = new UserRoles(userWithOldRole, newRoleForUser);
                userRolesFacade.setNewRole(userRoles);

                json = job.add("requestStatus", false)
                        .add("info", "Роль пользователя " + '"' + userWithOldRole.getBuyer().getName() + " " + userWithOldRole.getBuyer().getLastname() + '"' + " изменена на " + '"' + newRoleForUser.getRoleName() + '"' + ".")
                        .build()
                        .toString();
                break;

            case "/listPromoCodesJSON":
                List<PromoCode> promoCodeList = promoCodeFacade.findAll();

                JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
                promoCodeList.forEach(promoCode -> {
                    jsonArrayBuilder.add(new JSONPromoCodeBuilder().createJSONPromoCode(promoCode));
                });

                json = jsonArrayBuilder.build().toString();
                break;

            case "/addPromoCodeJSON":
                jsonReader = Json.createReader(request.getInputStream());
                jsonObject = jsonReader.readObject();

                String promoCodeName = jsonObject.getString("promoCodeName");
                String percent = jsonObject.getString("percent");

                PromoCode promoCode = new PromoCode(promoCodeName, Integer.parseInt(percent));
                promoCodeFacade.create(promoCode);

                json = job.add("requestStatus", true)
                        .add("info", "Промо-код " + '"' + promoCode.getPromoCodeName() + '"' + " с процентом " + '"' + promoCode.getPercent() + '"' + " добавлен.")
                        .build()
                        .toString();
                break;

            case "/deletePromoCodeJSON":
                jsonReader = Json.createReader(request.getInputStream());
                jsonObject = jsonReader.readObject();

                long promoCodeId = jsonObject.getInt("promoCodeId");

                PromoCode deletedPromoCode = promoCodeFacade.find(promoCodeId);
                promoCodeFacade.remove(deletedPromoCode);

                json = job.add("requestStatus", true)
                        .add("info", "Промо-код " + '"' + deletedPromoCode.getPromoCodeName() + " удалён.")
                        .build()
                        .toString();
                break;
        }

        if (json == null && "".equals(json)) {
            json = job.add("requestStatus", false)
                    .add("info", "Ошибка обработки запроса.")
                    .build()
                    .toString();
        }

        try (PrintWriter out = response.getWriter()) {
            out.println(json);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }

}
