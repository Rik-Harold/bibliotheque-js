/**
 * Class de gestion de la bibliothèque
 */
class Bibliotheque {
    // Paramètres de la bibliothèque
    // livres = []
    // utilisateurs = []
    emprunts = []
    prochainIdLivre = 1
    prochainIdUtilisateur = 1
    prochainIdEmprunt = 1    

    /**
     * Ajoute un livre à la bibliothèque avec validation complète
     * @param {string} titre - Titre du livre
     * @param {string} auteur - Auteur du livre
     * @param {number} quantiteTotal - Quantité de ce livre ajoutés
     * @returns {object} Résultat de l'opération
     */
    ajouterLivre(titre, auteur, quantiteTotal) {
        // Vérification des paramètres
        let livres = JSON.parse(localStorage.getItem('livres'))
        if ((typeof(titre) == typeof(auteur)) && typeof(titre) == "string" && typeof(quantiteTotal) == "number") {
            // Vérification si le livre n'existait pas
            if (!livres.some(livre => livre.titre == titre)) {
                // Ajout du livre
                livres.push({
                    id: this.prochainIdLivre,
                    titre: titre,
                    auteur: auteur,
                    quantiteTotal: quantiteTotal,
                    quantiteDisponible: quantiteTotal
                })
                // Mise à jour du localStorage
                localStorage.setItem('livres', JSON.stringify(livres))
                // Identification du prochain id
                this.prochainIdLivre += 1
                // Notification d'ajout
                return { succes: true, message: "Livre ajouté avec succès!" };
            } else {
                // Notification d'ajout
                return { succes: false, message: "Ce livre existe déjà!" };
            }
        } else {
            // Notificatiin d'erreur
            return { succes: false, message: "Les paramètres saisies ne sont pas corrects" };
        }
    }

    /**
     * Recherche des livres selon différents critères
     * @param {string} criteres - Critères de recherche
     * @returns {array} Liste des livres trouvés
     */
    rechercherLivres(criteres) {
        // TODO: Implémenter la recherche avancée
        // - Recherche par titre (partielle, insensible à la casse)
        // - Recherche par auteur
        // - Recherche par genre
        // - Recherche par année ou plage d'années
        // - Combiner plusieurs critères
        // - Trier les résultats par pertinence

        // Tableau des livres recherchés
        let booksFiltered = []
        
        let livres = JSON.parse(localStorage.getItem('livres'))
        livres.forEach(livre => {
            // Vérification par critères
            if (livre.titre.toLowerCase().includes(criteres.toLowerCase()) || livre.auteur.toLowerCase().includes(criteres.toLowerCase())) {
                // Ajout du livre
                booksFiltered.push(livre)
            }
        });
        
        // Mise à disposition des données
        console.log("Résultats de recherches");
        return booksFiltered;
    }

    /**
     * Supprime un livre dans la bibliothèque
     * @param {number} id - Identifiant du livre
     * @returns {Object} - Notification de la suppression
    */
    supprimerLivre(id) {
        if (typeof(id) == "number") {
            // Récupération du livre
            let livres = JSON.parse(localStorage.getItem('livres'))
            const index = livres.findIndex(livre => livre.id === parseInt(id))
            if (index) {
                // Suppression du livre
                const sup = livres.splice(index, 1)
                // Mise à jour du localStorage
                localStorage.setItem('livres', JSON.stringify(livres))
                // Notification de suppression
                return { succes: true, message: "Livre supprimé avec succès!", sup }
            } else {
                return { succes: false, message: "Cet identifiant n'existe pas pour ce livre!" }
            }
        } else {
            return { succes: false, message: "Le format des données n'est pas correct!" }
        }
    }

    /**
     * Ajoute un utilisateur à la bibliothèque
     * @param {string} nom - Nom de l'utilisateur
     * @param {string} prenom - Prénom de l'utilisateur
     * @param {string} email - Email de l'utilisateur
     * @returns {object} Résultat de l'opération
     */
    ajouterUtilisateur(nom, prenom, email) {
        // TODO: Implémenter l'ajout d'utilisateur
        // - Valider l'email (format correct)
        // - Valider le téléphone (10 chiffres)
        // - Vérifier que l'email n'existe pas déjà
        // - Créer l'utilisateur avec ID unique

        // Récupération des utilisateurs
        let utilisateurs = JSON.parse(localStorage.getItem('utilisateurs'))
        console.log("test");
        console.log(utilisateurs);
        
        
        if ((typeof(nom) == typeof(prenom)) && (typeof(prenom) == typeof(email)) &&  typeof(prenom) == "string") {
            // Valisation de l'email
            if (this.validerEmail(email) && !utilisateurs.some(utilisateur => utilisateur.email == email)) {
                // Ajout de l'utilisateur
                utilisateurs.push({
                    id: this.prochainIdUtilisateur,
                    nom: nom,
                    prenom: prenom,
                    email: email,
                })
                // Mise à jour du localStorage
                localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs))
                // Identification du prochain id
                this.prochainIdUtilisateur += 1
                // Notification d'ajout
                return { succes: true, message: "Utilisateur ajouté avec succès!" };
            } else {
                // Notification d'ajout
                return { succes: false, message: "Ce email existe déjà!" };
            }
        } else {
            // Notificatiin d'erreur
            return { succes: false, message: "Les paramètres saisies ne sont pas corrects" };
        }
    }

    /**
     * Supprime un utilisateur dans la bibliothèque
     * @param {number} id - Identifiant de l'utilisateur
     * @returns {Object} - Notification de la suppression
    */
    supprimerUtilisateur(id) {
        if (typeof(id) == "number") {
            // Récupération de l'utilisateur
            let utilisateurs = JSON.parse(localStorage.getItem('utilisateurs'))
            const index = utilisateurs.findIndex(utilisateur => utilisateur.id === parseInt(id))
            if (index != -1) {
                // Suppression de l'utilisateur
                const sup = utilisateurs.splice(index, 1)
                // Mise à jour du localStorage
                localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs))
                
                // Notification de suppression
                return { succes: true, message: "Utilisateur supprimé avec succès!", sup }
            } else {
                return { succes: false, message: "Cet identifiant n'existe pas pour cet utilisateur!" }
            }
        } else {
            return { succes: false, message: "Le format des données n'est pas correct!" }
        }
    }

    /**
     * Permet à un utilisateur d'emprunter un livre
     * @param {number} utilisateurId - ID de l'utilisateur
     * @param {number} livreId - ID du livre
     * @returns {object} Résultat de l'opération
     */
    emprunterLivre(utilisateurId, livreId) {
        // TODO: Implémenter l'emprunt avec règles métier
        // - Vérifier que l'utilisateur existe
        // - Vérifier que le livre existe et est disponible
        // - Vérifier que l'utilisateur n'a pas déjà 3 emprunts
        // - Calculer la date de retour (14 jours)
        // - Enregistrer l'emprunt

        // Vérification de l'existense de l'utilisateur
        if (this.utilisateurs.some(unUtilisateur => unUtilisateur.id == utilisateurId) && this.livres.some(unLivre => unLivre.id == livreId && unLivre.quantiteDisponible > 0) ) {
            // Ajout du livre dans l'objet utlisateur
        } else {
            return { succes: false, message: "Cet utilisateur n'existe pas!" }
        }
        
        console.log("À implémenter : emprunterLivre");
        return { succes: false, message: "Fonction à implémenter" };
    }

    /**
     * Permet de retourner un livre emprunté
     * @param {number} empruntId - ID de l'emprunt
     * @returns {object} Résultat de l'opération
     */
    retournerLivre(empruntId) {
        // TODO: Implémenter le retour de livre
        // - Vérifier que l'emprunt existe et est actif
        // - Calculer les éventuels frais de retard
        // - Marquer l'emprunt comme terminé
        // - Rendre le livre disponible
        
        console.log("À implémenter : retournerLivre");
        return { succes: false, message: "Fonction à implémenter" };
    }

    /**
     * Valide le format d'un email
     * @param {string} email - Email à valider
     * @returns {boolean} True si valide
     */
    validerEmail(email) {
        // TODO: Implémenter la validation email
        const regex = new RegExp(/^[a-zA-Z0-9._%+-]+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/)
        return regex.test(email)
    }

    /**
     * Initialise la bibliothèque avec des données de test
     */
    initialiserDonneesTest() {
        // Création de livres
        const book1 = {titre: "Le Petit Prince", auteur: "Saint-Exupéry", quantiteTotal: 3}
        const book2 = {titre: "1984", auteur: "George Orwell", quantiteTotal: 2}
        // Création d'utilisateurs
        const user1 = {id: 1, nom: "Dupont", prenom: "Jean", email: "jean@email.com"}
        const user2 = {id: 2, nom: "Martin", prenom: "Marie", email: "marie@email.com"}

        // Ajoute des livres
        const infoLivres1 = this.ajouterLivre(book1.titre, book1.auteur, book1.quantiteTotal)
        const infoLivres2 = this.ajouterLivre(book2.titre, book2.auteur, book2.quantiteTotal)
        console.log(infoLivres1);
        console.log(infoLivres2);
        
        // Ajouter des utilisateurs
        const infoUtilisateur1 = this.ajouterUtilisateur(user1.nom, user1.prenom, user1.email)
        const infoUtilisateur2 = this.ajouterUtilisateur(user2.nom, user2.prenom, user2.email)
        console.log(infoUtilisateur1);
        console.log(infoUtilisateur2);
    }

    /**
     * Affiche les livres de la bibliothèque
     * @returns {Array} Liste des livres
     */
    getLivres() {
        // Récupération depuis localStorage
        const getData = JSON.parse(localStorage.getItem('livres'))
        return getData
    }

    /**
     * Affiche les utilisateurs de la bibliothèque
     * @returns {Array} Liste des utilisateurs
     */
    getUtilisateurs() {
        // Récupération depuis localStorage
        const getData = JSON.parse(localStorage.getItem('utilisateurs'))
        return getData
    }
}

// Déclaration
localStorage.setItem('livres', JSON.stringify([]))
localStorage.setItem('utilisateurs', JSON.stringify([]))
localStorage.setItem('emprunts', JSON.stringify([]))
let bibliotheque = new Bibliotheque()

// Données test
bibliotheque.initialiserDonneesTest()

// const results = bibliotheque.ajouterLivre("test", "auteur test", "123-4-22-258741-7", 2024, "roman")
// Affichage
// console.log(results);

// console.log(bibliotheque.getLivres());
// console.log(bibliotheque.getUtilisateurs());

// Recherche dans les livres
// const results1 = bibliotheque.rechercherLivres("george")
// console.log(results1);

// // Supprimer un livre
// const results2 = bibliotheque.supprimerLivre(2)
// console.log(results2);

// // Recherche du livre supprimé dans la bibliothèque
// const results3 = bibliotheque.rechercherLivres("george")
// console.log(results3);

// Affichage de tous les livres
// console.log(bibliotheque.getLivres());


/**
 * Supression d'un utlisateur
 * @param {number} id - Identififiant de l'utilisateur
*/
const deleteOneUser = (id, users) => {
    // Demande de confirmation
    const reponseUser1 = confirm("Voulez-vous vraiment supprimer cet utilisateur ?")
    // Supression si confirmé
    if (reponseUser1) {
        const info = bibliotheque.supprimerLivre(id)
        console.log(info)
    }
    // Mise à jour de la liste des utilisateurs
    updateUsers(users)
}

/**
 * Supression d'un livre
 * @param {number} id - Identififiant de l'utilisateur
*/
const deleteOneBook = (id) => {
    // Demande de confirmation
    const reponseUser2 = confirm("Voulez-vous vraiment supprimer ce livre ?")
    // Supression si confirmé
    if (reponseUser2) {
        const info = bibliotheque.supprimerLivre(id)
        console.log(info)
    }
    // Mise à jour de la liste des livres
    updateBooks()
}

/**
 * Supression d'un utlisateur
 * @param {number} id - Identififiant de l'utilisateur
*/
const addOneUser = (id, users) => {
    // Demande de confirmation
    const reponseUser1 = confirm("Voulez-vous vraiment supprimer cet utilisateur ?")
    // Supression si confirmé
    if (reponseUser1) {
        const info = bibliotheque.supprimerLivre(id)
        console.log(info)
    }
    // Mise à jour de la liste des utilisateurs
    updateUsers(users)
}

/**
 * Mise à jour et affichage des utilisateurs
 * @param {Array} data - Identififiant de l'utilisateur
*/
const updateUsers = () => {
    // Récupération de la zone utilisateur
    let userZone = document.getElementById('users')
    // Récupération des utilisateurs
    const dataUsers = bibliotheque.getUtilisateurs()
    // Parcours des utilisateurs
    userZone.innerHTML = dataUsers.map(user => `
        <tr>
            <td class="p-4">${user.nom}</td>
            <td class="p-4">${user.prenom}</td>
            <td class="p-4">${user.email}</td>
            <td class="p-4">
                <button onclick="deleteOneUser(${user.id})"><i class="fa-solid fa-trash text-red-500 cursor-pointer px-8 py-2"></i></button>
            </td>
        </tr>
    `).join('');
    console.log(dataUsers);
}

/**
 * Mise à jour et affichage des livres
 * @param {Array} data - Identififiant de l'utilisateur
*/
const updateBooks = (data) => {
    // Récupération de la zone d'afficage
    let booksZone = document.getElementById('liste-livres')
    // Récupération des livres
    const dataBooks = bibliotheque.getLivres()
    // Parcours des livres pour l'affichage en lecture
    booksZone.innerHTML = dataBooks.map(book => `
        <div>
            <div class="bg-blue-100 shadow-lg rounded-lg w-[200px] h-[300px] p-4 cursor-pointer flex justify-between text-center align-center flex-col text-black">
                <h3>${book.titre}</h3>
                <p>${book.auteur}</p>
            </div>
            <button onclick="deleteOneUser(${book.id})" class="mt-4 bg-red-500 w-full text-center py-4 text-white rounded-lg cursur-pointer">
                Supprimer ce livre
            </button>
        </div>
    `).join('');
    console.log(dataBooks);
}

/**
 * Mise à jour et affichage des livres emprunter
 * @param {Array} data - Identififiant de l'utilisateur
*/
const updateBooksEmprunter = (data) => {
    // Récupération de la zone d'affichage
    let booksEmprunts = document.getElementById('liste-emprunts')
    // Récupération des livres
    const dataBooks = bibliotheque.getLivres()
    // Parcours des livres à emprunter
    booksEmprunts.innerHTML = dataBooks.map(book => `
        <div>
            <div class="bg-blue-100 shadow-lg rounded-lg w-[200px] h-[300px] p-4 cursor-pointer flex justify-between text-center align-center flex-col text-black">
                <h3>${book.titre}</h3>
                <p>${book.auteur}</p>
            </div>
            <button class="mt-4 bg-cyan-600 w-full text-center py-4 text-white rounded-lg cursur-pointer">
                Emprunter ce livre
            </button>
        </div>
    `).join('');
}

// Ecoute du chargement de la page
window.addEventListener("load", () => {
    // Affichages des informations au chargements
    updateBooks()
    updateUsers()
    updateBooksEmprunter()
})
