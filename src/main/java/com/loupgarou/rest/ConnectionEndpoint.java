package com.loupgarou.rest;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.loupgarou.model.Joueur;

@Stateless
@Path("/login")
public class ConnectionEndpoint {
	@PersistenceContext(unitName = "LoupGarou_BackEnd-persistence-unit")
	private EntityManager em;
	
	@GET
	@Path("/{login:.*}/{password:.*}")
	@Produces("application/json")
	public Response findOneByIdentifiantAndMdp(@PathParam("login") String identifiant, @PathParam("password") String mdp) {
		TypedQuery<Joueur> findByQuery = em
				.createQuery(
						"SELECT DISTINCT j FROM Joueur j LEFT JOIN FETCH j.amisJoueurId WHERE j.identifiant = :entityIdentifiant AND j.mdp = :entityMdp ORDER BY j.joueurId",
						Joueur.class);
		findByQuery.setParameter("entityIdentifiant", identifiant);
		findByQuery.setParameter("entityMdp", mdp);
		Joueur entity;
		try {
			entity = findByQuery.getSingleResult();
		} catch (NoResultException nre) {
			entity = null;
		}
		if (entity == null) {
			return Response.status(Status.NOT_FOUND).build();
		}
		return Response.ok(entity).build();
	}
}
