package session;

import entity.History;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.List;

@Stateless
public class HistoryFacade extends AbstractFacade<History> {

    @PersistenceContext(unitName = "JPTVR19WebShopPU")
    private EntityManager em;

    public HistoryFacade() {
        super(History.class);
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public List<History> findBoughtProducts(History history) {
        try {
            return em.createQuery("SELECT h FROM History h WHERE h.takeOn = NULL AND h.buyer = :buyer")
                    .setParameter("history", history)
                    .getResultList();
        } catch (Exception e) {
            return null;
        }
    }
}
