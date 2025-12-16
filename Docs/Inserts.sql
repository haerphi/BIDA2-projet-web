-- Début du script : Création des utilisateurs et de la table temporaire
WITH inserted_users AS (
    INSERT INTO public.users (name, email, role)
        VALUES
            ('Alice Dupont', 'alice.dupont@example.com', 'admin'),
            ('Bob Martin', 'bob.martin@example.com', 'user'),
            ('Carla Tremblay', 'carla.tremblay@example.com', 'user'),
            ('David Lefevre', 'david.lefevre@example.com', 'user'),
            ('Eve Moreau', 'eve.moreau@example.com', 'user'),
            ('Frank Bernard', 'frank.bernard@example.com', 'user')
        RETURNING user_id, email
)
SELECT user_id, email INTO TEMPORARY TABLE temp_users FROM inserted_users;

-- Insertion des identifiants (Credential)
INSERT INTO public.credential (password, user_id)
SELECT
    '$2b$10$rnUqq03CFpGNUCQ8LnGdte/898xiYXw.G/Tsq7nbn6dJbrHSiXGQa', -- HASH de mot de passe unique
    user_id
FROM temp_users;

-- Début du bloc DO pour utiliser les variables
DO $$
    DECLARE
        alice_id UUID;
        bob_id UUID;
        carla_id UUID;
        david_id UUID;
        eve_id UUID;
        frank_id UUID;
    BEGIN
        -- Récupération des UUIDs dans les variables
        SELECT user_id INTO alice_id FROM temp_users WHERE email = 'alice.dupont@example.com';
        SELECT user_id INTO bob_id FROM temp_users WHERE email = 'bob.martin@example.com';
        SELECT user_id INTO carla_id FROM temp_users WHERE email = 'carla.tremblay@example.com';
        SELECT user_id INTO david_id FROM temp_users WHERE email = 'david.lefevre@example.com';
        SELECT user_id INTO eve_id FROM temp_users WHERE email = 'eve.moreau@example.com';
        SELECT user_id INTO frank_id FROM temp_users WHERE email = 'frank.bernard@example.com';

        -- Insertion des Relations d'Amitié (Friends)
        INSERT INTO public.friends ("userA_id", "userB_id", accepted_at)
        VALUES
            -- Alice est amie avec Bob (Prêt possible)
            (alice_id, bob_id, now() - interval '3 months'),
            -- Alice est amie avec David (Prêt possible)
            (alice_id, david_id, now() - interval '1 month'),
            -- Alice est amie avec Carla (Prêt possible)
            (alice_id, carla_id, now() - interval '1 month'),
            -- Alice a envoyé une demande d'amitié à Eve (non acceptée - Prêt IMPOSSIBLE)
            (alice_id, eve_id, null),
            -- Alice a reçu une demande d'amitié de Frank (non acceptée - Prêt IMPOSSIBLE)
            (frank_id, alice_id, null),

            -- Bob est ami avec Carla (Prêt possible)
            (bob_id, carla_id, now() - interval '2 months'),
            -- David est ami avec Eve (Prêt possible)
            (david_id, eve_id, now() - interval '15 days');

        -- Insertion des Livres (Books)
        INSERT INTO public.books (created_at, updated_at, title, author, condition, owner_id)
        VALUES
            -- Livres d'Alice
            (now() - interval '2 months', now() - interval '2 months', 'Le Petit Prince', 'Antoine de Saint-Exupéry', 'new', alice_id),
            (now() - interval '10 days', now() - interval '10 days', 'Crime et Châtiment', 'Fiodor Dostoïevski', 'good', alice_id),
            (now() - interval '1 year', now() - interval '6 months', 'La Stratégie Ender', 'Orson Scott Card', 'used', alice_id),
            (now() - interval '3 months', now() - interval '3 months', '1984', 'George Orwell', 'good', alice_id),

            -- Livres de Bob
            (now() - interval '1 month', now() - interval '1 month', 'L''Étranger', 'Albert Camus', 'used', bob_id),
            (now() - interval '3 months', now() - interval '1 month', 'Le Comte de Monte-Cristo', 'Alexandre Dumas', 'good', bob_id),

            -- Livres de Carla
            (now() - interval '5 days', now() - interval '5 days', 'Dix Petits Nègres', 'Agatha Christie', 'new', carla_id),
            (now() - interval '20 days', now() - interval '20 days', 'Voyage au bout de la nuit', 'Louis-Ferdinand Céline', 'good', carla_id),

            -- Livres de David
            (now() - interval '7 months', now() - interval '7 months', 'Sapiens', 'Yuval Noah Harari', 'good', david_id),

            -- Livres d'Eve
            (now() - interval '4 months', now() - interval '4 months', 'Harry Potter et le Prisonnier d''Azkaban', 'J.K. Rowling', 'used', eve_id);

        -- Insertion des Prêts (Loans)

        -- Prêt #1 : Bob emprunte 'Le Petit Prince' à Alice - Prêt en cours
        insert into loans (created_at, updated_at, loan_id, should_be_returned_at, returned_at, book_id, borrower_id)
        values (
            now() - interval '10 days',
            now() - interval '10 days',
            gen_random_uuid(),
            now() + interval '20 days',
            null,
            (select book_id from books where title = 'Le Petit Prince' and owner_id = alice_id limit 1),
            bob_id
               );

        -- Prêt #2 : Bob emprunte '1984' à Alice - Prêt en cours (retard)
        insert into loans (created_at, updated_at, loan_id, should_be_returned_at, returned_at, book_id, borrower_id)
        values (
                   now() - interval '15 days',
                   now() - interval '15 days',
                   gen_random_uuid(),
                   now() - interval '5 days',
                   null,
                   (select book_id from books where title = '1984' and owner_id = alice_id limit 1),
                   bob_id
               );

        -- Prêt #3 : Bob emprunte 'Crime et Châtiment' à Alice - Prêt en cours (en retard)
        insert into loans (created_at, updated_at, loan_id, should_be_returned_at, returned_at, book_id, borrower_id)
        values (
                   now() - interval '12 days',
                   now() - interval '12 days',
                   gen_random_uuid(),
                   now() - interval '7 days',
                   null,
                   (select book_id from books where title = 'Crime et Châtiment' and owner_id = alice_id limit 1),
                   bob_id
               );

        -- Prêt #3 : Clara emprunte 'La Stratégie Ender' à Alice - Prêt terminé
        insert into loans (created_at, updated_at, loan_id, should_be_returned_at, returned_at, book_id, borrower_id)
        values (
                   now() - interval '11 days',
                   now() - interval '11 days',
                   gen_random_uuid(),
                   now() - interval '11 days',
                   now() - interval '3 days',
                   (select book_id from books where title = 'La Stratégie Ender' and owner_id = alice_id limit 1),
                   carla_id
               );

        -- Prêt #4 : Alice emprunte 'Sapiens' à David - Prêt en cours
        insert into loans (created_at, updated_at, loan_id, should_be_returned_at, returned_at, book_id, borrower_id)
        values (
                   now() - interval '3 days',
                   now() - interval '3 days',
                   gen_random_uuid(),
                   now() + interval '27 days',
                   null,
                   (select book_id from books where title = 'Sapiens' and owner_id = david_id limit 1),
                   alice_id
               );
    END $$;

-- Nettoyage de la table temporaire après l'exécution du bloc DO
DROP TABLE temp_users;