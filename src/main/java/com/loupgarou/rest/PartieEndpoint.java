package com.loupgarou.rest;

import java.util.Date;
import java.util.List;

import javax.ejb.Stateless;
import javax.management.Query;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.OptimisticLockException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;
import com.loupgarou.model.Partie;

/**
 * 
 */
@Stateless
@Path("/parties")
public class PartieEndpoint {
	@PersistenceContext(unitName = "LoupGarou_BackEnd-persistence-unit")
	private EntityManager em;

	@POST
	@Consumes("application/json")
	public Response create(Partie entity) {
		em.persist(entity);
		return Response.created(
				UriBuilder.fromResource(PartieEndpoint.class)
						.path(String.valueOf(entity.getPartieId())).build())
				.build();
	}

	@DELETE
	@Path("/{id:[0-9][0-9]*}")
	public Response deleteById(@PathParam("id") Integer id) {
		Partie entity = em.find(Partie.class, id);
		if (entity == null) {
			return Response.status(Status.NOT_FOUND).build();
		}
		em.remove(entity);
		return Response.noContent().build();
	}

	@GET
	@Path("/{id:[0-9][0-9]*}")
	@Produces("application/json")
	public Response findById(@PathParam("id") Integer id) {
		TypedQuery<Partie> findByIdQuery = em
				.createQuery(
						"SELECT DISTINCT p FROM Partie p WHERE p.partieid = :entityId ORDER BY p.partieid",
						Partie.class);
		findByIdQuery.setParameter("entityId", id);
		Partie entity;
		try {
			entity = findByIdQuery.getSingleResult();
		} catch (NoResultException nre) {
			entity = null;
		}
		if (entity == null) {
			return Response.status(Status.NOT_FOUND).build();
		}
		return Response.ok(entity).build();
	}
	
	@GET
	@Path("/stat1/{id:[0-9][0-9]*}")
	@Produces("application/json")
	public Response stat1(@PathParam("id") Integer id) {
		javax.persistence.Query findByIdQuery = em
				.createQuery(
						"SELECT DISTINCT \r\n" + 
						"		(SELECT MAX(partie.datepartie) FROM partie) AS Derniere_Partie,\r\n" + 
						"		(SELECT COUNT(partie) FROM partie ) AS Nbr_Partie,\r\n" + 
						"		(SELECT COUNT(partie) FROM partie\r\n" + 
						"			INNER JOIN Participation participation ON participation.partieId = partie\r\n" + 
						"			INNER JOIN Role role ON role = participation.roleId 			\r\n" + 
						"			WHERE libelle = partie.resultat) AS Partie_Gagne,\r\n" + 
						"		(SELECT COUNT(partie) FROM partie\r\n" + 
						"			INNER JOIN Participation participation ON participation.partieId = partie\r\n" + 
						"			INNER JOIN Role role ON role = participation.roleId 			\r\n" + 
						"			WHERE libelle <> partie.resultat) AS Partie_Perdu\r\n" + 
						"FROM Partie partie\r\n" + 
						"INNER JOIN Participation participation ON participation.partieId = partie\r\n" + 
						"INNER JOIN Role role ON role = participation.roleId \r\n" + 
						"WHERE participation.joueurId.joueurId = :entityId");
		findByIdQuery.setParameter("entityId", id);
		List<String> List;
		try {
			List = (List<String>) findByIdQuery.getResultList();
		} catch (NoResultException nre) {
			List = null;
		}
		if (List == null) {
			return Response.status(Status.NOT_FOUND).build();
		}
		return Response.ok(List).build();
	}
	
	
	@GET
	@Path("/stat2/{id:[0-9][0-9]*}")
	@Produces("application/json")
	public Response stat2(@PathParam("id") Integer id) {
		javax.persistence.Query findByIdQuery = em
				.createQuery(
						"SELECT role.libelle, COUNT(participation)\r\n" + 
						"FROM Participation participation\r\n" + 
						"RIGHT JOIN Role role ON role = participation.roleId \r\n" + 
						"WHERE participation.joueurId.joueurId = :entityId  OR participation IS NULL \r\n" + 
						"GROUP BY role.libelle");
		findByIdQuery.setParameter("entityId", id);
		List<String> List;
		try {
			List = (List<String>) findByIdQuery.getResultList();
		} catch (NoResultException nre) {
			List = null;
		}
		if (List == null) {
			return Response.status(Status.NOT_FOUND).build();
		}
		return Response.ok(List).build();
	}
	
	

	@GET
	@Produces("application/json")
	public List<Partie> listAll(@QueryParam("start") Integer startPosition,
			@QueryParam("max") Integer maxResult) {
		TypedQuery<Partie> findAllQuery = em.createQuery(
				"SELECT DISTINCT p FROM Partie p ORDER BY p.partieid",
				Partie.class);
		if (startPosition != null) {
			findAllQuery.setFirstResult(startPosition);
		}
		if (maxResult != null) {
			findAllQuery.setMaxResults(maxResult);
		}
		final List<Partie> results = findAllQuery.getResultList();
		return results;
	}

	@PUT
	@Path("/{id:[0-9][0-9]*}")
	@Consumes("application/json")
	public Response update(@PathParam("id") Integer id, Partie entity) {
		if (entity == null) {
			return Response.status(Status.BAD_REQUEST).build();
		}
		if (id == null) {
			return Response.status(Status.BAD_REQUEST).build();
		}
		if (!id.equals(entity.getPartieId())) {
			return Response.status(Status.CONFLICT).entity(entity).build();
		}
		if (em.find(Partie.class, id) == null) {
			return Response.status(Status.NOT_FOUND).build();
		}
		try {
			entity = em.merge(entity);
		} catch (OptimisticLockException e) {
			return Response.status(Response.Status.CONFLICT)
					.entity(e.getEntity()).build();
		}

		return Response.noContent().build();
	}
}
