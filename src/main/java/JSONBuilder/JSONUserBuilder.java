package JSONBuilder;

import entity.User;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

public class JSONUserBuilder {
    public JsonObject createJSONUser(User user) {
        JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder();
        jsonObjectBuilder.add("id", user.getId())
                .add("login", user.getLogin())
                .add("userStatus", user.getUserStatus())
                .add("buyer", new JSONBuyerBuilder().createJSONBuyer(user.getBuyer()));

        return jsonObjectBuilder.build();
    }
}
