package JSONServlets;

import JSONBuilder.JSONUserBuilder;
import entity.Role;
import entity.User;
import jakarta.ejb.EJB;
import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import session.ProductFacade;
import session.UserFacade;
import session.UserRolesFacade;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@MultipartConfig()
@WebServlet(name = "AdminServletJSON", urlPatterns = {
        "/listUsersJSON",
})
public class AdminServletJSON extends HttpServlet {
    @EJB
    private UserFacade userFacade;
    @EJB
    private UserRolesFacade userRolesFacade;
    @EJB
    private ProductFacade productFacade;

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
                List<Role> listUserRoles = null;
                JsonArrayBuilder jab = Json.createArrayBuilder();
                for (User user : listUsers) {
                    String role = userRolesFacade.getTopRoleForUser(user);
                    jab.add(Json.createObjectBuilder()
                            .add("user", new JSONUserBuilder().createJSONUser(user))
                            .add("role", role)
                            .build()
                    );
                }

                json = job.add("requestStatus", "true")
                        .add("info", "Список пользователей: ")
                        .add("listUsers", jab.build())
                        .build()
                        .toString();
                break;
        }

        if (json == null && "".equals(json)) {
            json = job.add("requestStatus", "false")
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
