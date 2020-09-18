package com.loupgarou.rest;

import java.util.List;

import javax.ejb.Stateless;
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
import com.loupgarou.model.Message;

/**
 * 
 */
@Stateless
@Path("/messages")
public class MessageEndpoint {
	@PersistenceContext(unitName = "LoupGarou_BackEnd-persistence-unit")
	private EntityManager em;

	@POST
	@Consumes("application/json")
	public Response create(Message entity) {
		em.persist(entity);
		return Response.created(
				UriBuilder.fromResource(MessageEndpoint.class)
						.path(String.valueOf(entity.getIdMessage())).build())
				.build();
	}

	@DELETE
	@Path("/{id:[0-9][0-9]*}")
	public Response deleteById(@PathParam("id") Integer id) {
		Message entity = em.find(Message.class, id);
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
		TypedQuery<Message> findByIdQuery = em
				.createQuery(
						"SELECT DISTINCT m FROM Message m LEFT JOIN FETCH m.joueurId LEFT JOIN FETCH m.partieId LEFT JOIN FETCH m.chatId LEFT JOIN FETCH m.msgParentsId WHERE m.idMessage = :entityId ORDER BY m.idMessage",
						Message.class);
		findByIdQuery.setParameter("entityId", id);
		Message entity;
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
	@Produces("application/json")
	public List<Message> listAll(@QueryParam("start") Integer startPosition,
			@QueryParam("max") Integer maxResult) {
		TypedQuery<Message> findAllQuery = em
				.createQuery(
						"SELECT DISTINCT m FROM Message m LEFT JOIN FETCH m.joueurId LEFT JOIN FETCH m.partieId LEFT JOIN FETCH m.chatId LEFT JOIN FETCH m.msgParentsId ORDER BY m.idMessage",
						Message.class);
		if (startPosition != null) {
			findAllQuery.setFirstResult(startPosition);
		}
		if (maxResult != null) {
			findAllQuery.setMaxResults(maxResult);
		}
		final List<Message> results = findAllQuery.getResultList();
		return results;
	}

	@PUT
	@Path("/{id:[0-9][0-9]*}")
	@Consumes("application/json")
	public Response update(@PathParam("id") Integer id, Message entity) {
		if (entity == null) {
			return Response.status(Status.BAD_REQUEST).build();
		}
		if (id == null) {
			return Response.status(Status.BAD_REQUEST).build();
		}
		if (!id.equals(entity.getIdMessage())) {
			return Response.status(Status.CONFLICT).entity(entity).build();
		}
		if (em.find(Message.class, id) == null) {
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
