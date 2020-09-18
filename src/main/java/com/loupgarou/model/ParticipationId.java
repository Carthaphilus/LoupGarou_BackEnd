package com.loupgarou.model;

import java.io.Serializable;

public class ParticipationId implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer joueurId;
	private Integer roleId;
	private Integer partieId;
	
	public ParticipationId() {
		super();
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((joueurId == null) ? 0 : joueurId.hashCode());
		result = prime * result + ((partieId == null) ? 0 : partieId.hashCode());
		result = prime * result + ((roleId == null) ? 0 : roleId.hashCode());
		return result;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ParticipationId other = (ParticipationId) obj;
		if (joueurId == null) {
			if (other.joueurId != null)
				return false;
		} else if (!joueurId.equals(other.joueurId))
			return false;
		if (partieId == null) {
			if (other.partieId != null)
				return false;
		} else if (!partieId.equals(other.partieId))
			return false;
		if (roleId == null) {
			if (other.roleId != null)
				return false;
		} else if (!roleId.equals(other.roleId))
			return false;
		return true;
	}

	public Integer getJoueurId() {
		return joueurId;
	}

	public void setJoueurId(Integer joueurId) {
		this.joueurId = joueurId;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public Integer getPartieId() {
		return partieId;
	}

	public void setPartieId(Integer partieId) {
		this.partieId = partieId;
	}
	
}
