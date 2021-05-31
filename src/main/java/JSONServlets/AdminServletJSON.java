package JSONServlets;

import JSONBuilder.JSONUserBuilder;
import entity.Role;
import entity.User;
import jakarta.ejb.EJB;
import jakarta.json.*;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import session.ProductFacade;
import session.RoleFacade;
import session.UserFacade;
import session.UserRolesFacade;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@MultipartConfig()
@WebServlet(name = "AdminServletJSON", urlPatterns = {
        "/listUsersJSON",
        "/getUserJSON",
        "/listUsersWithRoleJSON",
        "/listRolesJSON",
        "/setRoleToUserJSON"
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

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        HttpSession session = request.getSession(false);
        String json = null;
        JsonObjectBuilder job = Json.createObjectBuilder();
        JsonObject jsonObject = null;
        String path = request.getServletPath();
        switch (path) {
            case "/listUsersJSON":
                response.setContentType("application/json");
                List<User> listUsers = userFacade.findAll();

                JsonArrayBuilder jab = Json.createArrayBuilder();
                for (User user : listUsers) {
                    String role = userRolesFacade.getTopRoleForUser(user);
                    jab.add(Json.createObjectBuilder()
                            .add("user", new JSONUserBuilder().createJSONUser(user))
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
                break;

            case "/listRolesJson":
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

            case "/setRoleToUserJson":
                JsonReader jsonReader = Json.createReader(request.getInputStream());
                jsonObject = jsonReader.readObject();

                long newUserId = jsonObject.getInt("userId");
                long newRoleId = jsonObject.getInt("roleId");

                User userWithNewRole = userFacade.find(newUserId);
                Role newRole = roleFacade.find(newRoleId);
                userRolesFacade.setRole(newRole.getRoleName(), userWithNewRole);

                json = job.add("requestStatus", true)
                        .add("info", "Роль пользователя " + userWithNewRole + " изменена.")
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
