# Gestion de prets de livres entre amis

## Entites :

### User:

- id (UUID)
- name (string)
- email (string)
- password (string - hashed)
- created_at (datetime)

### Book:

- id (UUID)
- title (string)
- author (string)
- owner_id (UUID)
- available (boolean)

### Friend:

- id (UUID)
- name (string)
- email (string)

### Loan:

- id (UUID)
- book_id (UUID)
- friend_id (UUID)
- loan_date (datetime) - return_date (datetime?)

### Review:

- id (UUID)
- book_id (UUID)
- rating (int)
- comment (string) - reviewer_name (string)

## Fonctionnalites et CRUD :

- ✅ Login avec un email et mot de passe (POST vers l'API)
- ✅ Logout (invalidation du token/session)

- ✅ Creer un user (formulaire, POST vers l'API)
- ✅ Lire la liste des users (GET, affichage dynamique) - ADMIN
- Modifier un user existant (formulaire, PUT/PATCH)
- ✅ Supprimer un user (avec confirmation) - ADMIN et self
- ✅ Afficher les details d'un user (fiche individuelle) - ADMIN et self

- ✅ Creer un book (formulaire, POST vers l'API)
- Lire la liste des books (GET, affichage dynamique)
- Modifier un book existant (formulaire, PUT/PATCH)
- ✅ Supprimer un book (avec confirmation)
- Afficher les details d'un book (fiche individuelle)

- Creer un friend (formulaire, POST vers l'API)
- Lire la liste des friends (GET, affichage dynamique)
- Modifier un friend existant (formulaire, PUT/PATCH)
- Supprimer un friend (avec confirmation)
- Afficher les details d'un friend (fiche individuelle)

- Creer un loan (formulaire, POST vers l'API)
- Lire la liste des loans (GET, affichage dynamique)
- Modifier un loan existant (formulaire, PUT/PATCH)
- Supprimer un loan (avec confirmation)
- Afficher les details d'un loan (fiche individuelle)

- Creer un review (formulaire, POST vers l'API)
- Lire la liste des reviews (GET, affichage dynamique)
- Modifier un review existant (formulaire, PUT/PATCH)
- Supprimer un review (avec confirmation)
- Afficher les details d'un review (fiche individuelle)

## Todo:

- Ajouter des transactions
  - lors du signUp (pour créer le `User` et puis le `Credential`)
