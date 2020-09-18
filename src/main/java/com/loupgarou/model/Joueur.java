package com.loupgarou.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class Joueur implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer joueurId;
	private String nom;
	private String prenom;
	private String identifiant;
	private String mdp;
	private String pseudo;
	private Integer pointsAmitie;
	@ManyToMany
	@JoinColumn(name="amisJoueurId", nullable = false, referencedColumnName = "joueurId")
	private Set<Joueur> amisJoueurId;

	public Joueur() {
		super();
	}

	public Integer getJoueurId() {
		return joueurId;
	}

	public void setJoueurId(Integer joueurId) {
		this.joueurId = joueurId;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setNrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getIdentifiant() {
		return identifiant;
	}

	public void setIdentifiant(String identifiant) {
		this.identifiant = identifiant;
	}

	public String getMdp() {
		return mdp;
	}

	public void setMdp(String mdp) {
		this.mdp = mdp;
	}

	public String getPseudo() {
		return pseudo;
	}

	public void setPseudo(String pseudo) {
		this.pseudo = pseudo;
	}

	public Integer getPointsAmitie() {
		return pointsAmitie;
	}

	public void setPointsAmitie(Integer pointsAmitie) {
		this.pointsAmitie = pointsAmitie;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
