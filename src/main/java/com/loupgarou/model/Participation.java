package com.loupgarou.model;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@IdClass(ParticipationId.class)
public class Participation implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@ManyToOne
	@JoinColumn(name = "joueurId", nullable = false, referencedColumnName = "joueurId")
	private Joueur joueurId;
	@Id
	@ManyToOne
	@JoinColumn(name = "roleId", nullable = false, referencedColumnName = "roleId")
	private Role roleId;
	@Id
	@ManyToOne
	@JoinColumn(name = "partieId", nullable = false, referencedColumnName = "partieId")
	private Partie partieId;
	private boolean chef;

	public Participation() {
		super();
	}

	public boolean isChef() {
		return chef;
	}

	public void setChef(boolean chef) {
		this.chef = chef;
	}

	public Joueur getJoueurId() {
		return joueurId;
	}

	public void setJoueurId(Joueur joueurId) {
		this.joueurId = joueurId;
	}

	public Role getRoleId() {
		return roleId;
	}

	public void setRoleId(Role roleId) {
		this.roleId = roleId;
	}

	public Partie getPartieId() {
		return partieId;
	}

	public void setPartieId(Partie partieId) {
		this.partieId = partieId;
	}

}
