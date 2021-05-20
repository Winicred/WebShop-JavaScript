package JSONServlets;

import JSONBuilder.JSONCategoryBuilder;
import JSONBuilder.JSONProductBuilder;
import entity.Category;
import entity.Cover;
import entity.Product;
import jakarta.ejb.EJB;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;
import session.CategoryFacade;
import session.CoverFacade;
import session.ProductFacade;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.HashSet;
import java.util.List;
import java.util.ResourceBundle;
import java.util.Set;
import java.util.stream.Collectors;

@MultipartConfig()
@WebServlet(name = "ManagerServletJSON", urlPatterns = {
        "/createProductJSON",
        "/createCategoryJSON",
})
public class ManagerServletJSON extends HttpServlet {
    public static final ResourceBundle pathToFile = ResourceBundle.getBundle("property.pathToFile");

    @EJB
    private CoverFacade coverFacade;
    @EJB
    private ProductFacade productFacade;
    @EJB
    private CategoryFacade categoryFacade;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        JsonObjectBuilder job = Json.createObjectBuilder();
        JsonObject jsonObject = null;

        String uploadFolder = ManagerServletJSON.pathToFile.getString("directory");
        String json = null;

        String path = request.getServletPath();
        switch (path) {
            case "/createProductJSON":
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
                Cover cover = null;

                for (Part filePart : fileParts) {
                    String fileName = getFileName(filePart);
                    String fileExtension = fileName.substring(fileName.length() - 3);

                    if (imagesExtension.contains(fileExtension)) {
                        fileFolder = "images";
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

                    if ("images".equals(fileFolder)) {
                        cover = new Cover(fileName, sbFullPathToFile.toString());
                        coverFacade.create(cover);
                    }
                }

                if (cover == null) {
                    json = job.add("requestStatus", "false")
                            .add("info", "Выберите файл обложки товара.")
                            .build()
                            .toString();
                    break;
                }

                String brand = request.getParameter("brand");
                String series = request.getParameter("series");
                String model = request.getParameter("model");
                String color = request.getParameter("color");
                String weight = request.getParameter("weight");
                String length = request.getParameter("length");
                String width = request.getParameter("width");
                String height = request.getParameter("height");
                String screenDiagonal = request.getParameter("screenDiagonal");
                String resolution = request.getParameter("resolution");
                String touchScreen = request.getParameter("touchScreen");
                String operationSystem = request.getParameter("operationSystem");
                String cpuClass = request.getParameter("cpuClass");
                String cpuType = request.getParameter("cpuType");
                String cpuModel = request.getParameter("cpuModel");
                String cpuFrequency = request.getParameter("cpuFrequency");
                String ramType = request.getParameter("ramType");
                String ramSize = request.getParameter("ramSize");
                String ramClockSpeed = request.getParameter("ramClockSpeed");
                String ssd = request.getParameter("ssd");
                String ssdCapacity = request.getParameter("ssdCapacity");
                String hdd = request.getParameter("hdd");
                String hddCapacity = request.getParameter("hddCapacity");
                String totalPcMemory = request.getParameter("totalPcMemory");
                String gpuType = request.getParameter("gpuType");
                String gpuModel = request.getParameter("gpuModel");
                String diskDrive = request.getParameter("diskDrive");
                String camera = request.getParameter("camera");
                String microphone = request.getParameter("microphone");
                String bodyMaterial = request.getParameter("bodyMaterial");
                String russianKeyboardLayout = request.getParameter("russianKeyboardLayout");
                String estonianKeyboardLayout = request.getParameter("estonianKeyboardLayout");
                String backlitKeyboard = request.getParameter("backlitKeyboard");
                String waterproofKeyboard = request.getParameter("waterproofKeyboard");
                String batteryTechnology = request.getParameter("batteryTechnology");
                String batteryLife = request.getParameter("batteryLife");
                String guarantee = request.getParameter("guarantee");
                String price = request.getParameter("price");
                String count = request.getParameter("count");
                String categoryId = "1";

                Category category = categoryFacade.find(Long.parseLong(categoryId));

                Product product = new Product(brand, series, model, color, weight, length, width, height, screenDiagonal, resolution, touchScreen, operationSystem, cpuClass, cpuType, cpuModel, cpuFrequency, ramType, ramSize, ramClockSpeed, ssd, ssdCapacity, hdd, hddCapacity, totalPcMemory, gpuType, gpuModel, diskDrive, camera, microphone, bodyMaterial, russianKeyboardLayout, estonianKeyboardLayout, backlitKeyboard, waterproofKeyboard, batteryTechnology, batteryLife, guarantee, Double.parseDouble(price), Integer.parseInt(count), category, cover);
                productFacade.create(product);
                JSONProductBuilder jsonProductBuilder = new JSONProductBuilder();
                JsonObject jsonProduct = jsonProductBuilder.createJSONProduct(product);
                json = job.add("requestStatus", "true")
                        .add("info", "Товар " + '"' + product.getBrand() + " " + product.getSeries() + " " + product.getModel() + '"' + " добавлен.")
                        .add("product", jsonProduct.toString())
                        .build()
                        .toString();
                response.setContentType("application/json");
                break;

            case "/createCategoryJSON":
                String listCategories = categoryFacade.findAll().toString();

                String categoryName = jsonObject.getString("categoryName", "");

                if (listCategories.contains(categoryName)) {
                    json = job.add("requestStatus", "false")
                            .add("info", "Категория " + categoryName + " уже есть.")
                            .build()
                            .toString();
                } else {
                    category = new Category(categoryName);
                    categoryFacade.create(category);
                    JSONCategoryBuilder jsonCategoryBuilder = new JSONCategoryBuilder();
                    JsonObject jsonCategory = jsonCategoryBuilder.createJSONCategory(category);
                    json = job.add("requestStatus", "true")
                            .add("info", "Категория " + '"' + categoryName + '"' + " добавлена.")
                            .add("category", jsonCategory.toString())
                            .build()
                            .toString();
                }

                request.setAttribute("listCategories", listCategories);
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