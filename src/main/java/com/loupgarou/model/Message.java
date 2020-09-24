package com.loupgarou.model;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Message implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer idMessage;
	private Date dateMessage;
	private String message;
	@ManyToOne
	@JoinColumn(name = "joueurId", nullable = false, referencedColumnName = "joueurId")
	private Joueur joueurId;
	@ManyToOne
	@JoinColumn(name = "partieId", nullable = false, referencedColumnName = "partieId")
	private Partie partieId;
	@ManyToOne
	@JoinColumn(name = "chatId", nullable = false, referencedColumnName = "chatId")
	private Chat chatId;
	@OneToOne
	@JoinColumn(name = "idMessageParents", nullable = false, referencedColumnName = "idMessage")
	private Message msgParentsId;

	public Message() {
		super();
	}

	public Integer getIdMessage() {
		return idMessage;
	}
	public void setIdMessage(Integer idMessage) {
		this.idMessage = idMessage;
	}
	public Date getDateMessage() {
		return dateMessage;
	}
	public void setDateMessage(Date dateMessage) {
		this.dateMessage = dateMessage;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}

	public Joueur getJoueurId() {
		return joueurId;
	}

	public void setJoueurId(Joueur joueurId) {
		this.joueurId = joueurId;
	}

	public Partie getPartieId() {
		return partieId;
	}

	public void setPartieId(Partie partieId) {
		this.partieId = partieId;
	}

	public Chat getChatId() {
		return chatId;
	}

	public void setChatId(Chat chatId) {
		this.chatId = chatId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
