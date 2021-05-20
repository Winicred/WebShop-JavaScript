package session;

import entity.Avatar;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Stateless
public class AvatarFacade extends AbstractFacade<Avatar> {

    @PersistenceContext(unitName = "JPTVR19WebShopPU")
    private EntityManager em;

    public AvatarFacade() {
        super(Avatar.class);
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

}