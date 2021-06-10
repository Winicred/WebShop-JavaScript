package JSONBuilder;

import entity.Avatar;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

public class JSONAvatarBuilder {
    public JsonObject createJSONAvatar(Avatar avatar) {
        JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder();
        jsonObjectBuilder.add("id", avatar.getId());

        if (avatar.getPath() == null) {
            jsonObjectBuilder.add("path", "https://mk0imanamice4w9ihk9d.kinstacdn.com/wp-content/uploads/2016/03/unknown-user.jpg");
        } else {
            jsonObjectBuilder.add("path", avatar.getPath());
        }
        return jsonObjectBuilder.build();
    }
}
