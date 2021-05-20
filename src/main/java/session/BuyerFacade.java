package session;

import entity.Buyer;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Stateless
public class BuyerFacade extends AbstractFacade<Buyer> {

    @PersistenceContext(unitName = "JPTVR19WebShopPU")
    private EntityManager em;

    public BuyerFacade() {
        super(Buyer.class);
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
}
