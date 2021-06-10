package session;

import entity.Role;
import entity.User;
import entity.UserRoles;
import jakarta.ejb.EJB;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.List;

@Stateless
public class UserRolesFacade extends AbstractFacade<UserRoles> {

    @PersistenceContext(unitName = "JPTVR19WebShopPU")
    private EntityManager entityManager;

    @EJB
    private RoleFacade roleFacade;
    @EJB
    private UserRolesFacade userRolesFacade;

    public UserRolesFacade() {
        super(UserRoles.class);
    }

    @Override
    protected EntityManager getEntityManager() {
        return entityManager;
    }

    public boolean isRole(String roleName, User user) {
        try {
            UserRoles userRoles = (UserRoles) entityManager.createQuery("SELECT userRoles FROM UserRoles userRoles WHERE userRoles.role.roleName = :roleName AND userRoles.user = :user")
                    .setParameter("roleName", roleName)
                    .setParameter("user", user)
                    .getSingleResult();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getTopRoleForUser(User user) {
        List<UserRoles> listUserRoles = entityManager.createQuery("SELECT userRoles FROM UserRoles userRoles WHERE userRoles.user = :user")
                .setParameter("user", user)
                .getResultList();
        for (UserRoles listUserRole : listUserRoles) {
            if ("ADMIN".equals(listUserRole.getRole().getRoleName())) {
                return "ADMIN";
            }
        }

        for (UserRoles listUserRole : listUserRoles) {
            if ("MANAGER".equals(listUserRole.getRole().getRoleName())) {
                return "MANAGER";
            }
        }
        for
        (UserRoles listUserRole : listUserRoles) {
            if ("BUYER".equals(listUserRole.getRole().getRoleName())) {
                return "BUYER";
            }
        }
        return "-";
    }

    public void setNewRole(UserRoles userRoles) {
        this.entityManager.createQuery("DELETE FROM UserRoles userRoles WHERE userRoles.user = :user")
                .setParameter("user", userRoles.getUser())
                .executeUpdate();
        UserRoles ur;
        if ("ADMIN".equals(userRoles.getRole().getRoleName())) {
            ur = new UserRoles(userRoles.getUser(), roleFacade.findByName("ADMIN"));
            this.create(ur);
            ur = new UserRoles(userRoles.getUser(), roleFacade.findByName("MANAGER"));
            this.create(ur);
            ur = new UserRoles(userRoles.getUser(), roleFacade.findByName("BUYER"));
            this.create(ur);
        }
        if ("MANAGER".equals(userRoles.getRole().getRoleName())) {
            ur = new UserRoles(userRoles.getUser(), roleFacade.findByName("MANAGER"));
            this.create(ur);
            ur = new UserRoles(userRoles.getUser(), roleFacade.findByName("BUYER"));
            this.create(ur);
        }
        if ("BUYER".equals(userRoles.getRole().getRoleName())) {
            ur = new UserRoles(userRoles.getUser(), roleFacade.findByName("BUYER"));
            this.create(ur);
        }
    }

    public List<String> findRoles(User user) {
        return entityManager.createQuery("SELECT ur.role.roleName FROM UserRoles ur WHERE ur.user = :user")
                .setParameter("user", user)
                .getResultList();

    }

    public void setRole(String roleName, User user) {
        Role role = roleFacade.findByName(roleName);
        UserRoles ur = new UserRoles(user, role);
        userRolesFacade.create(ur);
    }
}