package JSONServlets;

import JSONBuilder.JSONProductBuilder;
import entity.Buyer;
import entity.Product;
import entity.Role;
import entity.User;
import jakarta.ejb.EJB;
import jakarta.json.*;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import session.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(name = "LoginServletJSON", urlPatterns = {
        "/createUserJSON",
        "/loginJSON",
        "/logoutJSON",
        "/listProductsJSON",
})

public class LoginServletJSON extends HttpServlet {

    @EJB
    private UserFacade userFacade;
    @EJB
    private ProductFacade productFacade;
    @EJB
    private BuyerFacade buyerFacade;
    @EJB
    private UserRolesFacade userRolesFacade;
    @EJB
    private RoleFacade roleFacade;

    public static String createSalt() {
        try {
            SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG");
            byte[] salt = new byte[16];
            secureRandom.nextBytes(salt);
            return new BigInteger(salt).toString(16);
        } catch (NoSuchAlgorithmException ex) {
            Logger.getLogger(LoginServletJSON.class.getName()).log(Level.SEVERE, "Не найден алгоритм!", ex);
        }
        return null;
    }

    public static String createHash(String password, String salt) {
        try {
            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
            messageDigest.update(password.getBytes(StandardCharsets.UTF_8));
            byte[] key = messageDigest.digest();
            return new BigInteger(key).toString(16);
        } catch (NoSuchAlgorithmException ex) {
            Logger.getLogger(LoginServletJSON.class.getName()).log(Level.SEVERE, "Не найден алгоритм!", ex);
        }
        return null;
    }

    @Override
    public void init() {
        if (roleFacade.findAll().size() > 0) return;
        Role role = new Role("ADMIN");
        roleFacade.create(role);
        role = new Role("MANAGER");
        roleFacade.create(role);
        role = new Role("BUYER");
        roleFacade.create(role);
    }

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        String json = "";
        JsonReader jsonReader = Json.createReader(request.getReader());
        JsonObjectBuilder job = Json.createObjectBuilder();
        String path = request.getServletPath();
        switch (path) {
            case "/createUserJSON":
                JsonObject jsonObject = jsonReader.readObject();
                String name = jsonObject.getString("name", "");
                String lastName = jsonObject.getString("lastName", "");
                String email = jsonObject.getString("email", "");
                String phoneNumber = jsonObject.getString("phoneNumber", "");
                String login = jsonObject.getString("login", "");
                String password = jsonObject.getString("password", "");
                String repeatPassword = jsonObject.getString("repeatPassword", "");

                if (repeatPassword.equals(password)) {
                    Buyer buyer = new Buyer(name, lastName, 0.0, email, null, phoneNumber, null, null, null, null, null, null, null, null, null, null, null, null, null);
                    buyerFacade.create(buyer);

                    String salt = LoginServletJSON.createSalt();
                    String userEncryptedPassword = LoginServletJSON.createHash(password, salt);
                    User user = new User(login, userEncryptedPassword, salt, "unconfirmed", buyer);
                    try {
                        userFacade.create(user);
                    } catch (Exception e) {
                        buyerFacade.remove(buyer);
                        json = job.add("requestStatus", "false")
                                .add("info", "Такой пользователь уже существует!")
                                .build()
                                .toString();
                        break;
                    }

                    userRolesFacade.setRole("BUYER", user);
                    HttpSession httpSession = request.getSession(true);
                    httpSession.setAttribute("user", user);
                    json = job.add("requestStatus", "true")
                            .add("info", "Пользователь " + '"' + user.getLogin() + '"' + " зарегестрирован.")
                            .add("token", httpSession.getId())
                            .add("role", userRolesFacade.getTopRoleForUser(user))
                            .build()
                            .toString();
                }
                break;

            case "/loginJSON":
                jsonObject = jsonReader.readObject();
                login = jsonObject.getString("login", "");
                password = jsonObject.getString("password", "");

                User loginUser = userFacade.findByLogin(login);
                if (loginUser == null) {
                    json = job.add("requestStatus", false)
                            .add("info", "Нет такого пользователя!")
                            .build()
                            .toString();
                    break;
                }

                password = LoginServletJSON.createHash(password, loginUser.getSalt());
                if (!password.equals(loginUser.getPassword())) {
                    json = job.add("requestStatus", false)
                            .add("info", "Нет такого пользователя!")
                            .build()
                            .toString();
                    break;
                }

                HttpSession httpSession = request.getSession(true);
                httpSession.setAttribute("user", loginUser);
                json = job.add("requestStatus", true)
                        .add("info", "Вы вошли как " + '"' + loginUser.getLogin() + '"' + ".")
                        .add("token", httpSession.getId())
                        .add("role", userRolesFacade.getTopRoleForUser(loginUser))
                        .build()
                        .toString();
                break;

            case "/logoutJSON":
                httpSession = request.getSession(false);

                if (httpSession != null) {
                    httpSession.invalidate();
                    json = job.add("requestStatus", true)
                            .add("info", "Вы вышли!")
                            .build()
                            .toString();
                }
                break;

            case "/listProductsJSON":
                List<Product> listProducts = productFacade.findAll();

                JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
                listProducts.forEach(product -> {
                    jsonArrayBuilder.add(new JSONProductBuilder().createJSONProduct(product));
                });

                json = jsonArrayBuilder.build().toString();
                break;
        }

        if ("".equals(json) || json == null) {
            json = job.add("requestStatus", false)
                    .add("info", "Ошибка обработки запроса!")
                    .build()
                    .toString();
        }

        try (PrintWriter out = response.getWriter()) {
            out.println(json);
        }

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        processRequest(request, response);
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }
}