package JSONServlets;

import JSONBuilder.JSONProductBuilder;
import entity.*;
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
import java.util.GregorianCalendar;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(name = "BuyerServletJSON", urlPatterns = {
        "/buyProductJSON",
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
        String path = request.getServletPath();

        HttpSession httpSession = request.getSession(true);
        User user = (User) httpSession.getAttribute("user");

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
                        History history = new History("success", product, buyer, new GregorianCalendar().getTime());
                        historyFacade.create(history);
                        json = job.add("requestStatus", "false")
                                .add("info", "Товар \" + '\"' + product.getBrand() + \" \" + product.getSeries() + \" \" + product.getModel() + '\"' + \" куплен пользователем: \" + '\"' + buyer.getName() + \" \" + buyer.getLastname() + '\"' + \".")
                                .build()
                                .toString();
                    } else {
                        json = job.add("requestStatus", "false")
                                .add("info", "Недостаточно средств на балансе.")
                                .build()
                                .toString();
                        History history = new History("reserved", product, buyer, new GregorianCalendar().getTime());
                        historyFacade.create(history);
                        break;
                    }
                }
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