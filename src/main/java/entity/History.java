package entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
public class History implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String status;
    @OneToOne()
    private Product product;
    @OneToOne()
    private Buyer buyer;
    @Temporal(TemporalType.TIMESTAMP)
    private Date takeOn;

    public History() {
    }


    public History(String status, Product product, Buyer buyer, Date takeOn) {
        this.status = status;
        this.product = product;
        this.buyer = buyer;
        this.takeOn = takeOn;
    }

    @Override
    public String toString() {
        return "History{" +
                "id=" + id +
                ", status='" + status + '\'' +
                ", product=" + product +
                ", buyer=" + buyer +
                ", takeOn=" + takeOn +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        History history = (History) o;

        if (id != null ? !id.equals(history.id) : history.id != null) return false;
        if (status != null ? !status.equals(history.status) : history.status != null) return false;
        if (product != null ? !product.equals(history.product) : history.product != null) return false;
        if (buyer != null ? !buyer.equals(history.buyer) : history.buyer != null) return false;
        return takeOn != null ? takeOn.equals(history.takeOn) : history.takeOn == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (product != null ? product.hashCode() : 0);
        result = 31 * result + (buyer != null ? buyer.hashCode() : 0);
        result = 31 * result + (takeOn != null ? takeOn.hashCode() : 0);
        return result;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Buyer getBuyer() {
        return buyer;
    }

    public void setBuyer(Buyer buyer) {
        this.buyer = buyer;
    }

    public Date getTakeOn() {
        return takeOn;
    }

    public void setTakeOn(Date takeOn) {
        this.takeOn = takeOn;
    }
}