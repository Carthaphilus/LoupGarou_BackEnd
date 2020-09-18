package com.loupgarou.model;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class Partie implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer partieid;
	private String resultat;
	private Date datepartie;

	public Partie() {
		super();
	}
	public Integer getPartieId() {
		return partieid;
	}
	public void setPartieId(Integer partieId) {
		this.partieid = partieId;
	}
	public String getResultat() {
		return resultat;
	}
	public void setResultat(String resultat) {
		this.resultat = resultat;
	}
	public Date getDatePartie() {
		return datepartie;
	}
	public void setDatePartie(Date datePartie) {
		this.datepartie = datePartie;
	}

}
