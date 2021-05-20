package session;

import entity.User;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Stateless
public class UserFacade extends AbstractFacade<User> {

    @PersistenceContext(unitName = "JPTVR19WebShopPU")
    private EntityManager entityManager;

    public UserFacade() {
        super(User.class);
    }

    @Override
    protected EntityManager getEntityManager() {
        return entityManager;
    }

    public User findByLogin(String login) {
        try {
            return (User) entityManager.createQuery("SELECT u FROM User u WHERE u.login=:login")
                    .setParameter("login", login)
                    .getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

}
