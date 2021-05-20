package entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class Product implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String brand;
    private String series;
    private String model;
    private String color;
    private String weight;
    private String length;
    private String width;
    private String height;

    private String screenDiagonal;
    private String resolution;
    private String touchScreen;

    private String operationSystem;

    private String cpuType;
    private String cpuClass;
    private String cpuModel;
    private String cpuFrequency;

    private String ramType;
    private String ramSize;
    private String ramClockSpeed;

    private String ssd;
    private String ssdCapacity;
    private String hdd;
    private String hddCapacity;
    private String totalPcMemory;

    private String gpuType;
    private String gpuModel;

    private String diskDrive;
    private String camera;
    private String microphone;

    private String bodyMaterial;
    private String russianKeyboardLayout;
    private String estonianKeyboardLayout;
    private String backlitKeyboard;
    private String waterproofKeyboard;

    private String batteryTechnology;
    private String batteryLife;

    private String guarantee;

    private Double price;
    private Integer count;
    @OneToOne
    private Category category;
    @OneToOne
    private Cover cover;

    public Product() {
    }

    public Product(String brand, String series, String model, String color, String weight, String length, String width, String height, String screenDiagonal, String resolution, String touchScreen, String operationSystem, String cpuType, String cpuClass, String cpuModel, String cpuFrequency, String ramType, String ramSize, String ramClockSpeed, String ssd, String ssdCapacity, String hdd, String hddCapacity, String totalPcMemory, String gpuType, String gpuModel, String diskDrive, String camera, String microphone, String bodyMaterial, String russianKeyboardLayout, String estonianKeyboardLayout, String backlitKeyboard, String waterproofKeyboard, String batteryTechnology, String batteryLife, String guarantee, Double price, Integer count, Category category, Cover cover) {
        this.brand = brand;
        this.series = series;
        this.model = model;
        this.color = color;
        this.weight = weight;
        this.length = length;
        this.width = width;
        this.height = height;
        this.screenDiagonal = screenDiagonal;
        this.resolution = resolution;
        this.touchScreen = touchScreen;
        this.operationSystem = operationSystem;
        this.cpuType = cpuType;
        this.cpuClass = cpuClass;
        this.cpuModel = cpuModel;
        this.cpuFrequency = cpuFrequency;
        this.ramType = ramType;
        this.ramSize = ramSize;
        this.ramClockSpeed = ramClockSpeed;
        this.ssd = ssd;
        this.ssdCapacity = ssdCapacity;
        this.hdd = hdd;
        this.hddCapacity = hddCapacity;
        this.totalPcMemory = totalPcMemory;
        this.gpuType = gpuType;
        this.gpuModel = gpuModel;
        this.diskDrive = diskDrive;
        this.camera = camera;
        this.microphone = microphone;
        this.bodyMaterial = bodyMaterial;
        this.russianKeyboardLayout = russianKeyboardLayout;
        this.estonianKeyboardLayout = estonianKeyboardLayout;
        this.backlitKeyboard = backlitKeyboard;
        this.waterproofKeyboard = waterproofKeyboard;
        this.batteryTechnology = batteryTechnology;
        this.batteryLife = batteryLife;
        this.guarantee = guarantee;
        this.price = price;
        this.count = count;
        this.category = category;
        this.cover = cover;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", brand='" + brand + '\'' +
                ", series='" + series + '\'' +
                ", model='" + model + '\'' +
                ", color='" + color + '\'' +
                ", weight='" + weight + '\'' +
                ", length='" + length + '\'' +
                ", width='" + width + '\'' +
                ", height='" + height + '\'' +
                ", screenDiagonal='" + screenDiagonal + '\'' +
                ", resolution='" + resolution + '\'' +
                ", touchScreen='" + touchScreen + '\'' +
                ", operationSystem='" + operationSystem + '\'' +
                ", cpuType='" + cpuType + '\'' +
                ", cpuClass='" + cpuClass + '\'' +
                ", cpuModel='" + cpuModel + '\'' +
                ", cpuFrequency='" + cpuFrequency + '\'' +
                ", ramType='" + ramType + '\'' +
                ", ramSize='" + ramSize + '\'' +
                ", ramClockSpeed='" + ramClockSpeed + '\'' +
                ", ssd='" + ssd + '\'' +
                ", ssdCapacity='" + ssdCapacity + '\'' +
                ", hdd='" + hdd + '\'' +
                ", hddCapacity='" + hddCapacity + '\'' +
                ", totalPcMemory='" + totalPcMemory + '\'' +
                ", gpuType='" + gpuType + '\'' +
                ", gpuModel='" + gpuModel + '\'' +
                ", diskDrive='" + diskDrive + '\'' +
                ", camera='" + camera + '\'' +
                ", microphone='" + microphone + '\'' +
                ", bodyMaterial='" + bodyMaterial + '\'' +
                ", russianKeyboardLayout='" + russianKeyboardLayout + '\'' +
                ", estonianKeyboardLayout='" + estonianKeyboardLayout + '\'' +
                ", backlitKeyboard='" + backlitKeyboard + '\'' +
                ", waterproofKeyboard='" + waterproofKeyboard + '\'' +
                ", batteryTechnology='" + batteryTechnology + '\'' +
                ", batteryLife='" + batteryLife + '\'' +
                ", guarantee='" + guarantee + '\'' +
                ", price=" + price +
                ", count=" + count +
                ", category=" + category +
                ", cover=" + cover +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Product product = (Product) o;

        if (id != null ? !id.equals(product.id) : product.id != null) return false;
        if (brand != null ? !brand.equals(product.brand) : product.brand != null) return false;
        if (series != null ? !series.equals(product.series) : product.series != null) return false;
        if (model != null ? !model.equals(product.model) : product.model != null) return false;
        if (color != null ? !color.equals(product.color) : product.color != null) return false;
        if (weight != null ? !weight.equals(product.weight) : product.weight != null) return false;
        if (length != null ? !length.equals(product.length) : product.length != null) return false;
        if (width != null ? !width.equals(product.width) : product.width != null) return false;
        if (height != null ? !height.equals(product.height) : product.height != null) return false;
        if (screenDiagonal != null ? !screenDiagonal.equals(product.screenDiagonal) : product.screenDiagonal != null)
            return false;
        if (resolution != null ? !resolution.equals(product.resolution) : product.resolution != null) return false;
        if (touchScreen != null ? !touchScreen.equals(product.touchScreen) : product.touchScreen != null) return false;
        if (operationSystem != null ? !operationSystem.equals(product.operationSystem) : product.operationSystem != null)
            return false;
        if (cpuType != null ? !cpuType.equals(product.cpuType) : product.cpuType != null) return false;
        if (cpuClass != null ? !cpuClass.equals(product.cpuClass) : product.cpuClass != null) return false;
        if (cpuModel != null ? !cpuModel.equals(product.cpuModel) : product.cpuModel != null) return false;
        if (cpuFrequency != null ? !cpuFrequency.equals(product.cpuFrequency) : product.cpuFrequency != null)
            return false;
        if (ramType != null ? !ramType.equals(product.ramType) : product.ramType != null) return false;
        if (ramSize != null ? !ramSize.equals(product.ramSize) : product.ramSize != null) return false;
        if (ramClockSpeed != null ? !ramClockSpeed.equals(product.ramClockSpeed) : product.ramClockSpeed != null)
            return false;
        if (ssd != null ? !ssd.equals(product.ssd) : product.ssd != null) return false;
        if (ssdCapacity != null ? !ssdCapacity.equals(product.ssdCapacity) : product.ssdCapacity != null) return false;
        if (hdd != null ? !hdd.equals(product.hdd) : product.hdd != null) return false;
        if (hddCapacity != null ? !hddCapacity.equals(product.hddCapacity) : product.hddCapacity != null) return false;
        if (totalPcMemory != null ? !totalPcMemory.equals(product.totalPcMemory) : product.totalPcMemory != null)
            return false;
        if (gpuType != null ? !gpuType.equals(product.gpuType) : product.gpuType != null) return false;
        if (gpuModel != null ? !gpuModel.equals(product.gpuModel) : product.gpuModel != null) return false;
        if (diskDrive != null ? !diskDrive.equals(product.diskDrive) : product.diskDrive != null) return false;
        if (camera != null ? !camera.equals(product.camera) : product.camera != null) return false;
        if (microphone != null ? !microphone.equals(product.microphone) : product.microphone != null) return false;
        if (bodyMaterial != null ? !bodyMaterial.equals(product.bodyMaterial) : product.bodyMaterial != null)
            return false;
        if (russianKeyboardLayout != null ? !russianKeyboardLayout.equals(product.russianKeyboardLayout) : product.russianKeyboardLayout != null)
            return false;
        if (estonianKeyboardLayout != null ? !estonianKeyboardLayout.equals(product.estonianKeyboardLayout) : product.estonianKeyboardLayout != null)
            return false;
        if (backlitKeyboard != null ? !backlitKeyboard.equals(product.backlitKeyboard) : product.backlitKeyboard != null)
            return false;
        if (waterproofKeyboard != null ? !waterproofKeyboard.equals(product.waterproofKeyboard) : product.waterproofKeyboard != null)
            return false;
        if (batteryTechnology != null ? !batteryTechnology.equals(product.batteryTechnology) : product.batteryTechnology != null)
            return false;
        if (batteryLife != null ? !batteryLife.equals(product.batteryLife) : product.batteryLife != null) return false;
        if (guarantee != null ? !guarantee.equals(product.guarantee) : product.guarantee != null) return false;
        if (price != null ? !price.equals(product.price) : product.price != null) return false;
        if (count != null ? !count.equals(product.count) : product.count != null) return false;
        if (category != null ? !category.equals(product.category) : product.category != null) return false;
        return cover != null ? cover.equals(product.cover) : product.cover == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (brand != null ? brand.hashCode() : 0);
        result = 31 * result + (series != null ? series.hashCode() : 0);
        result = 31 * result + (model != null ? model.hashCode() : 0);
        result = 31 * result + (color != null ? color.hashCode() : 0);
        result = 31 * result + (weight != null ? weight.hashCode() : 0);
        result = 31 * result + (length != null ? length.hashCode() : 0);
        result = 31 * result + (width != null ? width.hashCode() : 0);
        result = 31 * result + (height != null ? height.hashCode() : 0);
        result = 31 * result + (screenDiagonal != null ? screenDiagonal.hashCode() : 0);
        result = 31 * result + (resolution != null ? resolution.hashCode() : 0);
        result = 31 * result + (touchScreen != null ? touchScreen.hashCode() : 0);
        result = 31 * result + (operationSystem != null ? operationSystem.hashCode() : 0);
        result = 31 * result + (cpuType != null ? cpuType.hashCode() : 0);
        result = 31 * result + (cpuClass != null ? cpuClass.hashCode() : 0);
        result = 31 * result + (cpuModel != null ? cpuModel.hashCode() : 0);
        result = 31 * result + (cpuFrequency != null ? cpuFrequency.hashCode() : 0);
        result = 31 * result + (ramType != null ? ramType.hashCode() : 0);
        result = 31 * result + (ramSize != null ? ramSize.hashCode() : 0);
        result = 31 * result + (ramClockSpeed != null ? ramClockSpeed.hashCode() : 0);
        result = 31 * result + (ssd != null ? ssd.hashCode() : 0);
        result = 31 * result + (ssdCapacity != null ? ssdCapacity.hashCode() : 0);
        result = 31 * result + (hdd != null ? hdd.hashCode() : 0);
        result = 31 * result + (hddCapacity != null ? hddCapacity.hashCode() : 0);
        result = 31 * result + (totalPcMemory != null ? totalPcMemory.hashCode() : 0);
        result = 31 * result + (gpuType != null ? gpuType.hashCode() : 0);
        result = 31 * result + (gpuModel != null ? gpuModel.hashCode() : 0);
        result = 31 * result + (diskDrive != null ? diskDrive.hashCode() : 0);
        result = 31 * result + (camera != null ? camera.hashCode() : 0);
        result = 31 * result + (microphone != null ? microphone.hashCode() : 0);
        result = 31 * result + (bodyMaterial != null ? bodyMaterial.hashCode() : 0);
        result = 31 * result + (russianKeyboardLayout != null ? russianKeyboardLayout.hashCode() : 0);
        result = 31 * result + (estonianKeyboardLayout != null ? estonianKeyboardLayout.hashCode() : 0);
        result = 31 * result + (backlitKeyboard != null ? backlitKeyboard.hashCode() : 0);
        result = 31 * result + (waterproofKeyboard != null ? waterproofKeyboard.hashCode() : 0);
        result = 31 * result + (batteryTechnology != null ? batteryTechnology.hashCode() : 0);
        result = 31 * result + (batteryLife != null ? batteryLife.hashCode() : 0);
        result = 31 * result + (guarantee != null ? guarantee.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (count != null ? count.hashCode() : 0);
        result = 31 * result + (category != null ? category.hashCode() : 0);
        result = 31 * result + (cover != null ? cover.hashCode() : 0);
        return result;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getSeries() {
        return series;
    }

    public void setSeries(String series) {
        this.series = series;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
    }

    public String getWidth() {
        return width;
    }

    public void setWidth(String width) {
        this.width = width;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getScreenDiagonal() {
        return screenDiagonal;
    }

    public void setScreenDiagonal(String screenDiagonal) {
        this.screenDiagonal = screenDiagonal;
    }

    public String getResolution() {
        return resolution;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }

    public String getTouchScreen() {
        return touchScreen;
    }

    public void setTouchScreen(String touchScreen) {
        this.touchScreen = touchScreen;
    }

    public String getOperationSystem() {
        return operationSystem;
    }

    public void setOperationSystem(String operationSystem) {
        this.operationSystem = operationSystem;
    }

    public String getCpuType() {
        return cpuType;
    }

    public void setCpuType(String cpuType) {
        this.cpuType = cpuType;
    }

    public String getCpuClass() {
        return cpuClass;
    }

    public void setCpuClass(String cpuClass) {
        this.cpuClass = cpuClass;
    }

    public String getCpuModel() {
        return cpuModel;
    }

    public void setCpuModel(String cpuModel) {
        this.cpuModel = cpuModel;
    }

    public String getCpuFrequency() {
        return cpuFrequency;
    }

    public void setCpuFrequency(String cpuFrequency) {
        this.cpuFrequency = cpuFrequency;
    }

    public String getRamType() {
        return ramType;
    }

    public void setRamType(String ramType) {
        this.ramType = ramType;
    }

    public String getRamSize() {
        return ramSize;
    }

    public void setRamSize(String ramSize) {
        this.ramSize = ramSize;
    }

    public String getRamClockSpeed() {
        return ramClockSpeed;
    }

    public void setRamClockSpeed(String ramClockSpeed) {
        this.ramClockSpeed = ramClockSpeed;
    }

    public String getSsd() {
        return ssd;
    }

    public void setSsd(String ssd) {
        this.ssd = ssd;
    }

    public String getSsdCapacity() {
        return ssdCapacity;
    }

    public void setSsdCapacity(String ssdCapacity) {
        this.ssdCapacity = ssdCapacity;
    }

    public String getHdd() {
        return hdd;
    }

    public void setHdd(String hdd) {
        this.hdd = hdd;
    }

    public String getHddCapacity() {
        return hddCapacity;
    }

    public void setHddCapacity(String hddCapacity) {
        this.hddCapacity = hddCapacity;
    }

    public String getTotalPcMemory() {
        return totalPcMemory;
    }

    public void setTotalPcMemory(String totalPcMemory) {
        this.totalPcMemory = totalPcMemory;
    }

    public String getGpuType() {
        return gpuType;
    }

    public void setGpuType(String gpuType) {
        this.gpuType = gpuType;
    }

    public String getGpuModel() {
        return gpuModel;
    }

    public void setGpuModel(String gpuModel) {
        this.gpuModel = gpuModel;
    }

    public String getDiskDrive() {
        return diskDrive;
    }

    public void setDiskDrive(String diskDrive) {
        this.diskDrive = diskDrive;
    }

    public String getCamera() {
        return camera;
    }

    public void setCamera(String camera) {
        this.camera = camera;
    }

    public String getMicrophone() {
        return microphone;
    }

    public void setMicrophone(String microphone) {
        this.microphone = microphone;
    }

    public String getBodyMaterial() {
        return bodyMaterial;
    }

    public void setBodyMaterial(String bodyMaterial) {
        this.bodyMaterial = bodyMaterial;
    }

    public String getRussianKeyboardLayout() {
        return russianKeyboardLayout;
    }

    public void setRussianKeyboardLayout(String russianKeyboardLayout) {
        this.russianKeyboardLayout = russianKeyboardLayout;
    }

    public String getEstonianKeyboardLayout() {
        return estonianKeyboardLayout;
    }

    public void setEstonianKeyboardLayout(String estonianKeyboardLayout) {
        this.estonianKeyboardLayout = estonianKeyboardLayout;
    }

    public String getBacklitKeyboard() {
        return backlitKeyboard;
    }

    public void setBacklitKeyboard(String backlitKeyboard) {
        this.backlitKeyboard = backlitKeyboard;
    }

    public String getWaterproofKeyboard() {
        return waterproofKeyboard;
    }

    public void setWaterproofKeyboard(String waterproofKeyboard) {
        this.waterproofKeyboard = waterproofKeyboard;
    }

    public String getBatteryTechnology() {
        return batteryTechnology;
    }

    public void setBatteryTechnology(String batteryTechnology) {
        this.batteryTechnology = batteryTechnology;
    }

    public String getBatteryLife() {
        return batteryLife;
    }

    public void setBatteryLife(String batteryLife) {
        this.batteryLife = batteryLife;
    }

    public String getGuarantee() {
        return guarantee;
    }

    public void setGuarantee(String guarantee) {
        this.guarantee = guarantee;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Cover getCover() {
        return cover;
    }

    public void setCover(Cover cover) {
        this.cover = cover;
    }
}