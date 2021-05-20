package JSONBuilder;

import entity.User;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

public class JSONUserBuilder {
    public JsonObject createJSONUser(User user) {
        JsonObjectBuilder job = Json.createObjectBuilder();
        job.add("id", user.getId())
                .add("login", user.getLogin())
                .add("buyer", new JSONBuyerBuilder().createJsonBuyer(user.getBuyer()));
        return job.build();
    }
}
