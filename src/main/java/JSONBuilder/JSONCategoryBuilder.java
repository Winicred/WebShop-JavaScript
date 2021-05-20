package JSONBuilder;

import entity.Category;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

public class JSONCategoryBuilder {
    public JsonObject createJSONCategory(Category category) {
        JsonObjectBuilder job = Json.createObjectBuilder();
        job.add("id", category.getId())
                .add("categoryName", category.getCategoryName());
        return job.build();
    }
}
