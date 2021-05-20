package entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class PromoCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String promoCodeName;
    private Integer percent;

    public PromoCode() {
    }

    public PromoCode(String promoCodeName, Integer percent) {
        this.promoCodeName = promoCodeName;
        this.percent = percent;
    }

    @Override
    public String toString() {
        return "PromoCode{" +
                "id=" + id +
                ", promoCodeName='" + promoCodeName + '\'' +
                ", percent=" + percent +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PromoCode promoCode = (PromoCode) o;

        if (id != null ? !id.equals(promoCode.id) : promoCode.id != null) return false;
        if (promoCodeName != null ? !promoCodeName.equals(promoCode.promoCodeName) : promoCode.promoCodeName != null)
            return false;
        return percent != null ? percent.equals(promoCode.percent) : promoCode.percent == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (promoCodeName != null ? promoCodeName.hashCode() : 0);
        result = 31 * result + (percent != null ? percent.hashCode() : 0);
        return result;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPromoCodeName() {
        return promoCodeName;
    }

    public void setPromoCodeName(String promoCodeName) {
        this.promoCodeName = promoCodeName;
    }

    public Integer getPercent() {
        return percent;
    }

    public void setPercent(Integer percent) {
        this.percent = percent;
    }
}
