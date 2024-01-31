INSERT INTO users (username, password, hobbies, number_street_name, city, friend_radius, photo_url)
VALUES ('jacksmith',
        'password123',
        'planes and trains',
        '415 main st',
        'Sausalito',
        10,
        'cool url'),
        ('nighthawk',
        'password123',
        'eggs and more',
        '21 Lower Crescent Ave',
        'Sausalito',
        15,
        'cool url'),
        ('tigerclaw45',
        'password123',
        'anime',
        '3700 Dublin Blvd',
        'Dublin',
        20,
        'cool url'),
        ('janesmith',
        'password123',
        'razor scooters',
        '5697 Black Ave',
        'Pleasanton',
        7,
        'cool url');

INSERT INTO messages (content, sent_at, sent_by, sent_to)
VALUES (
    'sup',
    '2024-01-19 10:23:54+02',
    'janesmith',
    'jacksmith'
),
(
    'heeeeeey',
    '2024-01-19 10:25:54+02',
    'janesmith',
    'jacksmith'
),
(
    'pick up dude',
    '2024-01-19 10:27:54+02',
    'janesmith',
    'jacksmith'
),
(
    'leave me alone',
    '2024-01-19 10:29:54+02',
    'jacksmith',
    'janesmith'
),
(
    'spy things are everywhere',
    '2024-01-19 10:28:54+02',
    'nighthawk',
    'jacksmith'
);