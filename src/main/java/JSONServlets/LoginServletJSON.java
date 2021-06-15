package JSONServlets;

import JSONBuilder.JSONBuyerBuilder;
import JSONBuilder.JSONProductBuilder;
import JSONBuilder.JSONUserBuilder;
import entity.Avatar;
import entity.Buyer;
import entity.Product;
import entity.User;
import jakarta.ejb.EJB;
import jakarta.json.*;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import session.*;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@MultipartConfig()
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
    @EJB
    private AvatarFacade avatarFacade;

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

    private String getFileName(Part part) {
        final String partHeader = part.getHeader("content-disposition");
        for (String content : part.getHeader("content-disposition").split(";")) {
            if (content.trim().startsWith("filename")) {
                return content.substring(content.indexOf('=') + 1)
                        .trim()
                        .replace("\"", "");
            }
        }
        return null;
    }

//    @Override
//    public void init() {
//        if (userFacade.findAll().size() > 0) return;
//        String salt = LoginServletJSON.createSalt();
//        String adminEncryptedPassword = LoginServletJSON.createHash("admin", salt);
//
//        Buyer buyer = new Buyer("PUPILNAME", "PUPILLASTNAME", 100000.0, "PUPIL@ivkhk.ee", "PUPIL TOWN", "1234 5678", "PUPIL DESCRIPTION", "14.12.2000", "PUPIL EMLOYEE", "IVKHK", "PUPIL ADDRESS", "kutsehariduskeskus.ee", "PUPILGITHUB", "PUPILTWITTER", "PUPILINSTAGRAM", "PUPILFACEBOOK", "PUPILVK", "PUPILTELEGRAM", null);
//        buyerFacade.create(buyer);
//
//        User user = new User("admin", adminEncryptedPassword, salt, "confirmed", buyer);
//        userFacade.create(user);
//
//        Role role = new Role("ADMIN");
//        roleFacade.create(role);
//
//        UserRoles userRoles = new UserRoles(user, role);
//        userRolesFacade.create(userRoles);
//
//        role = new Role("MANAGER");
//        roleFacade.create(role);
//
//        role = new Role("BUYER");
//        roleFacade.create(role);
//    }

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");

        JsonObjectBuilder job = Json.createObjectBuilder();

        String uploadFolder = ManagerServletJSON.pathToFile.getString("directory");
        String json = "";

        String path = request.getServletPath();
        switch (path) {
            case "/createUserJSON":
                List<Part> fileParts = request
                        .getParts()
                        .stream()
                        .filter(part -> "file".equals(part.getName()))
                        .collect(Collectors.toList()
                        );

                Set<String> imagesExtension = new HashSet<>();
                imagesExtension.add("jpg");
                imagesExtension.add("png");
                imagesExtension.add("gif");

                String fileFolder = "";
                Avatar avatar = null;

                for (Part filePart : fileParts) {
                    String fileName = getFileName(filePart);
                    String fileExtension = fileName.substring(fileName.length() - 3);

                    if (imagesExtension.contains(fileExtension)) {
                        fileFolder = "avatars";
                    }

                    StringBuilder sbFullPathToFile = new StringBuilder();
                    sbFullPathToFile.append(uploadFolder)
                            .append(File.separator)
                            .append(fileFolder)
                            .append(File.separator)
                            .append(fileName);

                    File file = new File(sbFullPathToFile.toString());
                    file.mkdirs();

                    try (InputStream fileContent = filePart.getInputStream()) {
                        Files.copy(fileContent, file.toPath(), StandardCopyOption.REPLACE_EXISTING);
                    }

                    if ("avatars".equals(fileFolder)) {
                        avatar = new Avatar(sbFullPathToFile.toString());
                        avatarFacade.create(avatar);
                    }
                }

                String name = request.getParameter("name");
                String lastName = request.getParameter("lastName");
                String email = request.getParameter("email");
                String phoneNumber = request.getParameter("phoneNumber");
                String login = request.getParameter("userLogin");
                String password = request.getParameter("password");
                String repeatPassword = request.getParameter("repeatPassword");

                if (repeatPassword.equals(password)) {
                    Buyer buyer = new Buyer(name, lastName, 0.0, email, null, phoneNumber, null, null, null, null, null, null, null, null, null, null, null, null, avatar);
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
                    httpSession.setAttribute("promoCodeUsed", false);

                    json = job.add("requestStatus", true)
                            .add("info", "Пользователь " + '"' + user.getLogin() + '"' + " зарегестрирован.")
                            .add("token", httpSession.getId())
                            .add("role", userRolesFacade.getTopRoleForUser(user))
                            .build()
                            .toString();
                }
                break;

            case "/loginJSON":
                List<Product> cartList = new ArrayList<>();

                JsonReader jsonReader = Json.createReader(request.getReader());
                JsonObject jsonObject = jsonReader.readObject();

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


                Buyer currentBuyer = buyerFacade.find(loginUser.getBuyer().getId());

                String promoCodeName = "";

                HttpSession httpSession = request.getSession(true);
                httpSession.setAttribute("user", loginUser);
                httpSession.setAttribute("cartList", cartList);
                httpSession.setAttribute("isPromoCodeUsed", false);
                httpSession.setAttribute("promoCodeUsed", false);
                httpSession.setAttribute("promoCodeInput", "");

                json = job.add("requestStatus", true)
                        .add("info", "Вы вошли как " + '"' + loginUser.getLogin() + '"' + ".")
                        .add("token", httpSession.getId())
                        .add("role", userRolesFacade.getTopRoleForUser(loginUser))
                        .add("cartList", new ArrayList<>().toString())
                        .add("buyer", new JSONBuyerBuilder().createJSONBuyer(currentBuyer))
                        .add("user", new JSONUserBuilder().createJSONUser(loginUser))
                        .add("userId", loginUser.getId())
                        .add("buyerBalance", loginUser.getBuyer().getMoney())
                        .add("promoCode", "")
                        .add("promoCodeName", promoCodeName)
                        .add("promoCodeUsed", false)
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
            throws IOException, ServletException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        processRequest(request, response);
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }
}