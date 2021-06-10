package JSONServlets;

import JSONBuilder.JSONBuyerBuilder;
import JSONBuilder.JSONProductBuilder;
import entity.Buyer;
import entity.History;
import entity.Product;
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
import java.util.GregorianCalendar;
import java.util.List;

@WebServlet(name = "BuyerServletJSON", urlPatterns = {
        "/buyProductJSON",
        "/listBuyersJSON",
        "/addProductToBag",
        "/deleteProductFromCartJSON",
        "/editBuyerProfileJSON",
})

public class BuyerServletJSON extends HttpServlet {

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
    private HistoryFacade historyFacade;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        String json = "";
        JsonReader jsonReader = Json.createReader(request.getReader());
        JsonObjectBuilder job = Json.createObjectBuilder();

        HttpSession httpSession = request.getSession(true);
        User user = (User) httpSession.getAttribute("user");

        @SuppressWarnings("unchecked")
        List<Product> cartList = (List<Product>) httpSession.getAttribute("cartList");

        String path = request.getServletPath();
        switch (path) {
            case "/buyProductJSON":
                JsonObject jsonObject = jsonReader.readObject();
                long productId = jsonObject.getInt("productId");

                Product product = productFacade.find(productId);
                Buyer buyer = buyerFacade.find(user.getBuyer().getId());

                if (product.getCount() > 0) {
                    if (buyer.getMoney() - product.getPrice() >= 0) {
                        product.setCount(product.getCount() - 1);
                        productFacade.edit(product);
                        buyer.setMoney(buyer.getMoney() - product.getPrice());
                        buyerFacade.edit(buyer);
                        History history = new History("Оплачен", product, buyer, new GregorianCalendar().getTime());
                        historyFacade.create(history);
                        json = job.add("requestStatus", "false")
                                .add("info", "Товар " + '"' + product.getBrand() + " " + product.getSeries() + " " + product.getModel() + '"' + "куплен пользователем: " + '"' + buyer.getName() + " " + buyer.getLastname() + '"' + ".")
                                .build()
                                .toString();
                    } else {
                        json = job.add("requestStatus", "false")
                                .add("info", "Недостаточно средств на балансе.")
                                .build()
                                .toString();
                        History history = new History("Забронирован", product, buyer, new GregorianCalendar().getTime());
                        historyFacade.create(history);
                    }

                    break;
                }

            case "/listBuyersJSON":
                List<Buyer> listBuyers = buyerFacade.findAll();

                JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
                listBuyers.forEach(currentBuyer -> {
                    jsonArrayBuilder.add(new JSONBuyerBuilder().createJSONBuyer(currentBuyer));
                });

                json = job.add("requestStatus", true)
                        .add("listBuyers", jsonArrayBuilder.build())
                        .build()
                        .toString();
                break;

            case "/addProductToBag":
                jsonObject = jsonReader.readObject();

                productId = jsonObject.getInt("productId");
                product = productFacade.find(productId);

                cartList.add(0, product);

                httpSession.setAttribute("cartList", cartList);

                json = job.add("requestStatus", true)
                        .add("info", "Товар " + '"' + product.getBrand() + " " + product.getModel() + " " + product.getSeries() + '"' + " добавлен.")
                        .add("product", new JSONProductBuilder().createJSONProduct(product))
                        .build()
                        .toString();
                break;

            case "/deleteProductFromCartJSON":
                jsonObject = jsonReader.readObject();

                productId = jsonObject.getInt("productId");
                product = productFacade.find(productId);

                cartList.remove(product);

                httpSession.setAttribute("cartList", cartList);

                json = job.add("requestStatus", true)
                        .add("info", "Товар " + '"' + product.getBrand() + " " + product.getModel() + " " + product.getSeries() + '"' + " добавлен.")
                        .add("product", new JSONProductBuilder().createJSONProduct(product))
                        .build()
                        .toString();
                break;

            case "/editBuyerProfileJSON":
                jsonObject = jsonReader.readObject();

                buyer = buyerFacade.find(user.getBuyer().getId());

                String name = jsonObject.getString("name");
                String lastname = jsonObject.getString("lastname");
                String employeeCompany = jsonObject.getString("employeeCompany");
                String employee = jsonObject.getString("employee");
                String password = jsonObject.getString("password");
                String newPassword = jsonObject.getString("newPassword");
                String newPasswordRepeat = jsonObject.getString("newPasswordRepeat");
                String buyerDescription = jsonObject.getString("buyerDescription");
                String birthDate = jsonObject.getString("birthDate");
                String town = jsonObject.getString("town");
                String address = jsonObject.getString("address");
                String userWebsite = jsonObject.getString("userWebsite");
                String userGithub = jsonObject.getString("userGithub");
                String userTwitter = jsonObject.getString("userTwitter");
                String userInstagram = jsonObject.getString("userInstagram");
                String userFacebook = jsonObject.getString("userFacebook");
                String userVk = jsonObject.getString("userVk");
                String userTelegram = jsonObject.getString("userTelegram");

                if (!"".equals(password) && !"".equals(newPassword) && !"".equals(newPasswordRepeat)) {
                    if (password.equals(user.getPassword())) {
                        if (newPasswordRepeat.equals(newPassword)) {
                            password = newPassword;
                        } else {
                            json = job.add("requestStatus", false)
                                    .add("info", "Неверно указан пароль!")
                                    .build()
                                    .toString();
                            break;
                        }
                    }
                } else {
                    password = user.getPassword();
                }

                buyer.setName(name);
                buyer.setLastname(lastname);
                buyer.setEmployee(employee);
                buyer.setEmployeeCompany(employeeCompany);
                buyer.setTown(town);
                buyer.setBuyerDescription(buyerDescription);
                buyer.setBirthDate(birthDate);
                buyer.setAddress(address);
                buyer.setUserWebsite(userWebsite);
                buyer.setUserGithub(userGithub);
                buyer.setUserTwitter(userTwitter);
                buyer.setUserInstagram(userInstagram);
                buyer.setUserFacebook(userFacebook);
                buyer.setUserVk(userVk);
                buyer.setUserTelegram(userTelegram);
                buyerFacade.edit(buyer);

                user.setPassword(password);
                userFacade.edit(user);

                json = job.add("requestStatus", true)
                        .add("info", "Данные пользователя " + '"' + buyer.getName() + " " + buyer.getLastname() + '"' + " изменены.")
                        .build()
                        .toString();
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