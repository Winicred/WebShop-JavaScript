package JSONBuilder;

import entity.PromoCode;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

public class JSONPromoCodeBuilder {
    public JsonObject createJSONPromoCode(PromoCode promoCode) {
        JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder();
        jsonObjectBuilder.add("id", promoCode.getId())
                .add("promoCodeName", promoCode.getPromoCodeName())
                .add("percent", promoCode.getPercent());
        return jsonObjectBuilder.build();
    }
}
