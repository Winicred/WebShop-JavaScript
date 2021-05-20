package JSONBuilder;

import entity.Product;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

public class JSONProductBuilder {
    public JsonObject createJSONProduct(Product product) {
        JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder();
        jsonObjectBuilder.add("id", product.getId())
                .add("brand", product.getBrand())
                .add("series", product.getSeries())
                .add("model", product.getModel())
                .add("color", product.getColor())
                .add("weight", product.getWeight())
                .add("length", product.getLength())
                .add("width", product.getWidth())
                .add("height", product.getHeight())
                .add("screenDiagonal", product.getScreenDiagonal())
                .add("resolution", product.getResolution())
                .add("touchScreen", product.getTouchScreen())
                .add("operationSystem", product.getOperationSystem())
                .add("cpuType", product.getCpuType())
                .add("cpuClass", product.getCpuClass())
                .add("cpuModel", product.getCpuModel())
                .add("cpuFrequency", product.getCpuFrequency())
                .add("ramType", product.getRamType())
                .add("ramSize", product.getRamSize())
                .add("ramClockSpeed", product.getRamClockSpeed())
                .add("ssd", product.getSsd())
                .add("ssdCapacity", product.getSsdCapacity())
                .add("hdd", product.getHdd())
                .add("hddCapacity", product.getHddCapacity())
                .add("totalPcMemory", product.getTotalPcMemory())
                .add("gpuType", product.getGpuType())
                .add("gpuModel", product.getGpuModel())
                .add("diskDrive", product.getDiskDrive())
                .add("camera", product.getCamera())
                .add("microphone", product.getMicrophone())
                .add("bodyMaterial", product.getBodyMaterial())
                .add("russianKeyboardLayout", product.getRussianKeyboardLayout())
                .add("estonianKeyboardLayout", product.getEstonianKeyboardLayout())
                .add("backlitKeyboard", product.getBacklitKeyboard())
                .add("waterproofKeyboard", product.getWaterproofKeyboard())
                .add("batteryTechnology", product.getBatteryTechnology())
                .add("batteryLife", product.getBatteryLife())
                .add("guarantee", product.getGuarantee())
                .add("price", product.getPrice())
                .add("count", product.getCount())
                .add("category", new JSONCategoryBuilder().createJSONCategory(product.getCategory()))
                .add("cover", new JSONCoverBuilder().createJSONCover(product.getCover()));

        if (product.getWeight() == null) {
            jsonObjectBuilder.add("weight", "null");
        }

        if (product.getLength() == null) {
            jsonObjectBuilder.add("length", "null");
        }

        if (product.getWidth() == null) {
            jsonObjectBuilder.add("width", "null");
        }

        if (product.getHeight() == null) {
            jsonObjectBuilder.add("height", "null");
        }

        if (product.getScreenDiagonal() == null) {
            jsonObjectBuilder.add("screenDiagonal", "null");
        }

        if (product.getResolution() == null) {
            jsonObjectBuilder.add("resolution", "null");
        }

        if (product.getOperationSystem() == null) {
            jsonObjectBuilder.add("operationSystem", "null");
        }

        if (product.getCpuFrequency() == null) {
            jsonObjectBuilder.add("cpuFrequency", "null");
        }

        if (product.getRamClockSpeed() == null) {
            jsonObjectBuilder.add("ramClockSpeed", "null");
        }

        if (product.getSsdCapacity() == null) {
            jsonObjectBuilder.add("ssdCapacity", "null");
        }

        if (product.getHddCapacity() == null) {
            jsonObjectBuilder.add("hddCapacity", "null");
        }

        if (product.getBodyMaterial() == null) {
            jsonObjectBuilder.add("bodyMaterial", "null");
        }

        if (product.getBatteryLife() == null) {
            jsonObjectBuilder.add("batteryLife", "null");
        }

        return jsonObjectBuilder.build();
    }
}
