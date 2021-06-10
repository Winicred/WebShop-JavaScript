package JSONBuilder;

import entity.History;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

public class JSONHistoryBuilder {
    public JsonObject createJSONHistory(History history) {
        JsonObjectBuilder job = Json.createObjectBuilder();
        job.add("id", history.getId())
                .add("product", history.getProduct().getBrand() + " " + history.getProduct().getSeries() + " " + history.getProduct().getSeries())
                .add("status", history.getStatus())
                .add("buyer", history.getBuyer().getName() + " " + history.getBuyer().getLastname())
                .add("buyerId", history.getBuyer().getId())
                .add("phoneNumber", history.getBuyer().getPhoneNumber())
                .add("takeOn", history.getTakeOn().toString())
                .add("price", history.getProduct().getPrice());
        return job.build();
    }
}
