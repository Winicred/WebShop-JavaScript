package JSONBuilder;

import entity.Buyer;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

public class JSONBuyerBuilder {
    public JsonObject createJsonBuyer(Buyer buyer) {
        JsonObjectBuilder job = Json.createObjectBuilder();
        job.add("id", buyer.getId())
                .add("name", buyer.getName())
                .add("lastname", buyer.getLastname())
                .add("money", "null")
                .add("email", buyer.getEmail())
                .add("town", "null")
                .add("phoneNumber", buyer.getPhoneNumber())
                .add("buyerDescription", "null")
                .add("birthDate", "null")
                .add("employee", "null")
                .add("employeeCompany", "null")
                .add("address", "null")
                .add("userWebsite", "null")
                .add("userGithub", "null")
                .add("userTwitter", "null")
                .add("userInstagram", "null")
                .add("userFacebook", "null")
                .add("userVk", "null")
                .add("userTelegram", "null");

        return job.build();
    }
}
