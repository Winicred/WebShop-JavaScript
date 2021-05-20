package JSONBuilder;

import entity.Cover;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

public class JSONCoverBuilder {
    public JsonObject createJSONCover(Cover cover) {
        JsonObjectBuilder job = Json.createObjectBuilder();
        job.add("id", cover.getId())
                .add("description", cover.getDescription())
                .add("path", cover.getPath());
        return job.build();
    }
}
