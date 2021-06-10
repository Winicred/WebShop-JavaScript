package JSONBuilder;

import entity.Buyer;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

public class JSONBuyerBuilder {
    public JsonObject createJSONBuyer(Buyer buyer) {
        JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder();
        jsonObjectBuilder.add("id", buyer.getId())
                .add("name", buyer.getName())
                .add("lastname", buyer.getLastname())
                .add("money", buyer.getMoney())
                .add("email", buyer.getEmail())
                .add("phoneNumber", buyer.getPhoneNumber());

        if (buyer.getTown() == null) {
            jsonObjectBuilder.add("town", "");
        } else {
            jsonObjectBuilder.add("town", buyer.getTown());
        }

        if (buyer.getBuyerDescription() == null) {
            jsonObjectBuilder.add("buyerDescription", "");
        } else {
            jsonObjectBuilder.add("buyerDescription", buyer.getBuyerDescription());
        }

        if (buyer.getBirthDate() == null) {
            jsonObjectBuilder.add("birthDate", "");
        } else {
            jsonObjectBuilder.add("birthDate", buyer.getBirthDate());
        }

        if (buyer.getEmployee() == null) {
            jsonObjectBuilder.add("employee", "");
        } else {
            jsonObjectBuilder.add("employee", buyer.getEmployee());
        }

        if (buyer.getEmployeeCompany() == null) {
            jsonObjectBuilder.add("employeeCompany", "");
        } else {
            jsonObjectBuilder.add("employeeCompany", buyer.getEmployeeCompany());
        }

        if (buyer.getAddress() == null) {
            jsonObjectBuilder.add("address", "");
        } else {
            jsonObjectBuilder.add("address", buyer.getAddress());
        }

        if (buyer.getUserWebsite() == null) {
            jsonObjectBuilder.add("userWebsite", "");
        } else {
            jsonObjectBuilder.add("userWebsite", buyer.getUserWebsite());
        }

        if (buyer.getUserGithub() == null) {
            jsonObjectBuilder.add("userGithub", "");
        } else {
            jsonObjectBuilder.add("userGithub", buyer.getUserGithub());
        }

        if (buyer.getUserTwitter() == null) {
            jsonObjectBuilder.add("userTwitter", "");
        } else {
            jsonObjectBuilder.add("userTwitter", buyer.getUserTwitter());
        }

        if (buyer.getUserInstagram() == null) {
            jsonObjectBuilder.add("userInstagram", "");
        } else {
            jsonObjectBuilder.add("userInstagram", buyer.getUserInstagram());
        }

        if (buyer.getUserFacebook() == null) {
            jsonObjectBuilder.add("userFacebook", "");
        } else {
            jsonObjectBuilder.add("userFacebook", buyer.getUserFacebook());
        }

        if (buyer.getUserVk() == null) {
            jsonObjectBuilder.add("userVk", "");
        } else {
            jsonObjectBuilder.add("userVk", buyer.getUserVk());
        }

        if (buyer.getUserTelegram() == null) {
            jsonObjectBuilder.add("userTelegram", "");
        } else {
            jsonObjectBuilder.add("userTelegram", buyer.getUserTelegram());
        }

        if (buyer.getAvatar() == null) {
            jsonObjectBuilder.add("avatar", "");
        } else {
            jsonObjectBuilder.add("avatar", new JSONAvatarBuilder().createJSONAvatar(buyer.getAvatar()));
        }

        return jsonObjectBuilder.build();
    }
}
