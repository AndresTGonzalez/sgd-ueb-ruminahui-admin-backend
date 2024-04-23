-- Add provinces
INSERT INTO
  public."Province" (id, name)
VALUES
  (1, 'Azuay'),
  (2, 'Bolívar'),
  (3, 'Cañar'),
  (4, 'Carchi'),
  (5, 'Cotopaxi'),
  (6, 'Chimborazo'),
  (7, 'El Oro'),
  (8, 'Esmeraldas'),
  (9, 'Guayas'),
  (10, 'Imbabura'),
  (11, 'Loja'),
  (12, 'Los Rios'),
  (13, 'Manabi'),
  (14, 'Morona Santiago'),
  (15, 'Napo'),
  (16, 'Pastaza'),
  (17, 'Pichincha'),
  (18, 'Tungurahua'),
  (19, 'Zamora Chinchipe'),
  (20, 'Galápagos'),
  (21, 'Sucumbíos'),
  (22, 'Orellana'),
  (23, 'Santo Domingo de Los Tsáchilas'),
  (24, 'Santa Elena'),
  (25, 'Zonas No Delimitadas');

-- Add cities
INSERT INTO
  public."City"(id, name, "provinceId")
VALUES
  (1, 'Cuenca', 1),
  (2, 'Girón', 1),
  (3, 'Gualaceo', 1),
  (4, 'Nabón', 1),
  (5, 'Paute', 1),
  (6, 'Pucara', 1),
  (7, 'San Fernando', 1),
  (8, 'Santa Isabel', 1),
  (9, 'Sigsig', 1),
  (10, 'Oña', 1),
  (11, 'Chordeleg', 1),
  (12, 'El Pan', 1),
  (13, 'Sevilla de Oro', 1),
  (14, 'Guachapala', 1),
  (15, 'Camilo Ponce Enríquez', 1),
  (16, 'Guaranda', 2),
  (17, 'Chillanes', 2),
  (18, 'Chimbo', 2),
  (19, 'Echeandía', 2),
  (20, 'San Miguel', 2),
  (21, 'Caluma', 2),
  (22, 'Las Naves', 2),
  (23, 'Azogues', 3),
  (24, 'Biblián', 3),
  (25, 'Cañar', 3),
  (26, 'La Troncal', 3),
  (27, 'El Tambo', 3),
  (28, 'Déleg', 3),
  (29, 'Suscal', 3),
  (30, 'Tulcán', 4),
  (31, 'Bolívar', 4),
  (32, 'Espejo', 4),
  (33, 'Mira', 4),
  (34, 'Montúfar', 4),
  (35, 'San Pedro de Huaca', 4),
  (36, 'Latacunga', 5),
  (37, 'La Maná', 5),
  (38, 'Pangua', 5),
  (39, 'Pujili', 5),
  (40, 'Salcedo', 5),
  (41, 'Saquisilí', 5),
  (42, 'Sigchos', 5),
  (43, 'Riobamba', 6),
  (44, 'Alausi', 6),
  (45, 'Colta', 6),
  (46, 'Chambo', 6),
  (47, 'Chunchi', 6),
  (48, 'Guamote', 6),
  (49, 'Guano', 6),
  (50, 'Pallatanga', 6),
  (51, 'Penipe', 6),
  (52, 'Cumandá', 6),
  (53, 'Machala', 7),
  (54, 'Arenillas', 7),
  (55, 'Atahualpa', 7),
  (56, 'Balsas', 7),
  (57, 'Chilla', 7),
  (58, 'El Guabo', 7),
  (59, 'Huaquillas', 7),
  (60, 'Marcabelí', 7),
  (61, 'Pasaje', 7),
  (62, 'Piñas', 7),
  (63, 'Portovelo', 7),
  (64, 'Santa Rosa', 7),
  (65, 'Zaruma', 7),
  (66, 'Las Lajas', 7),
  (67, 'Esmeraldas', 8),
  (68, 'Eloy Alfaro', 8),
  (69, 'Muisne', 8),
  (70, 'Quinindé', 8),
  (71, 'San Lorenzo', 8),
  (72, 'Atacames', 8),
  (73, 'Rioverde', 8),
  (74, 'La Concordia', 8),
  (75, 'Guayaquil', 9),
  (76, 'Alfredo Baquerizo Moreno (Juján)', 9),
  (77, 'Balao', 9),
  (78, 'Balzar', 9),
  (79, 'Colimes', 9),
  (80, 'Daule', 9),
  (81, 'Durán', 9),
  (82, 'El Empalme', 9),
  (83, 'El Triunfo', 9),
  (84, 'Milagro', 9),
  (85, 'Naranjal', 9),
  (86, 'Naranjito', 9),
  (87, 'Palestina', 9),
  (88, 'Pedro Carbo', 9),
  (89, 'Samborondón', 9),
  (90, 'Santa Lucía', 9),
  (91, 'Salitre (Urbina Jado)', 9),
  (92, 'San Jacinto de Yaguachi', 9),
  (93, 'Playas', 9),
  (94, 'Simón Bolívar', 9),
  (95, 'Coronel Marcelino Maridueña', 9),
  (96, 'Lomas de Sargentillo', 9),
  (97, 'Nobol', 9),
  (98, 'General Antonio Elizalde', 9),
  (99, 'Isidro Ayora', 9),
  (100, 'Ibarra', 10),
  (101, 'Antonio Ante', 10),
  (102, 'Cotacachi', 10),
  (103, 'Otavalo', 10),
  (104, 'Pimampiro', 10),
  (105, 'San Miguel de Urcuquí', 10),
  (106, 'Loja', 11),
  (107, 'Calvas', 11),
  (108, 'Catamayo', 11),
  (109, 'Celica', 11),
  (110, 'Chaguarpamba', 11),
  (111, 'Espíndola', 11),
  (112, 'Gonzanamá', 11),
  (113, 'Macará', 11),
  (114, 'Paltas', 11),
  (115, 'Puyango', 11),
  (116, 'Saraguro', 11),
  (117, 'Sozoranga', 11),
  (118, 'Zapotillo', 11),
  (119, 'Pindal', 11),
  (120, 'Quilanga', 11),
  (121, 'Olmedo', 11),
  (122, 'Babahoyo', 12),
  (123, 'Baba', 12),
  (124, 'Montalvo', 12),
  (125, 'Puebloviejo', 12),
  (126, 'Quevedo', 12),
  (127, 'Urdaneta', 12),
  (128, 'Ventanas', 12),
  (129, 'Vínces', 12),
  (130, 'Palenque', 12),
  (131, 'Buena Fé', 12),
  (132, 'Valencia', 12),
  (133, 'Mocache', 12),
  (134, 'Quinsaloma', 12),
  (135, 'Portoviejo', 13),
  (136, 'Bolívar', 13),
  (137, 'Chone', 13),
  (138, 'El Carmen', 13),
  (139, 'Flavio Alfaro', 13),
  (140, 'Jipijapa', 13),
  (141, 'Junín', 13),
  (142, 'Manta', 13),
  (143, 'Montecristi', 13),
  (144, 'Paján', 13),
  (145, 'Pichincha', 13),
  (146, 'Rocafuerte', 13),
  (147, 'Santa Ana', 13),
  (148, 'Sucre', 13),
  (149, 'Tosagua', 13),
  (150, '24 de Mayo', 13),
  (151, 'Pedernales', 13),
  (152, 'Olmedo', 13),
  (153, 'Puerto López', 13),
  (154, 'Jama', 13),
  (155, 'Jaramijó', 13),
  (156, 'San Vicente', 13),
  (157, 'Morona', 14),
  (158, 'Gualaquiza', 14),
  (159, 'Limón Indanza', 14),
  (160, 'Palora', 14),
  (161, 'Santiago', 14),
  (162, 'Sucúa', 14),
  (163, 'Huamboya', 14),
  (164, 'San Juan Bosco', 14),
  (165, 'Taisha', 14),
  (166, 'Logroño', 14),
  (167, 'Pablo Sexto', 14),
  (168, 'Tiwintza', 14),
  (169, 'Tena', 15),
  (170, 'Archidona', 15),
  (171, 'El Chaco', 15),
  (172, 'Quijos', 15),
  (173, 'Carlos Julio Arosemena Tola', 15),
  (174, 'Pastaza', 16),
  (175, 'Mera', 16),
  (176, 'Santa Clara', 16),
  (177, 'Arajuno', 16),
  (178, 'Quito', 17),
  (179, 'Cayambe', 17),
  (180, 'Mejia', 17),
  (181, 'Pedro Moncayo', 17),
  (182, 'Rumiñahui', 17),
  (183, 'San Miguel de Los Bancos', 17),
  (184, 'Pedro Vicente Maldonado', 17),
  (185, 'Puerto Quito', 17),
  (186, 'Ambato', 18),
  (187, 'Baños de Agua Santa', 18),
  (188, 'Cevallos', 18),
  (189, 'Mocha', 18),
  (190, 'Patate', 18),
  (191, 'Quero', 18),
  (192, 'San Pedro de Pelileo', 18),
  (193, 'Santiago de Píllaro', 18),
  (194, 'Tisaleo', 18),
  (195, 'Zamora', 19),
  (196, 'Chinchipe', 19),
  (197, 'Nangaritza', 19),
  (198, 'Yacuambi', 19),
  (199, 'Yantzaza (Yanzatza)', 19),
  (200, 'El Pangui', 19),
  (201, 'Centinela del Cóndor', 19),
  (202, 'Palanda', 19),
  (203, 'Paquisha', 19),
  (204, 'San Cristóbal', 20),
  (205, 'Isabela', 20),
  (206, 'Santa Cruz', 20),
  (207, 'Lago Agrio', 21),
  (208, 'Gonzalo Pizarro', 21),
  (209, 'Putumayo', 21),
  (210, 'Shushufindi', 21),
  (211, 'Sucumbíos', 21),
  (212, 'Cascales', 21),
  (213, 'Cuyabeno', 21),
  (214, 'Orellana', 22),
  (215, 'Aguarico', 22),
  (216, 'La Joya de Los Sachas', 22),
  (217, 'Loreto', 22),
  (218, 'Santo Domingo', 23),
  (219, 'Santa Elena', 24),
  (220, 'La Libertad', 24),
  (221, 'Salinas', 24),
  (222, 'Las Golondrinas', 25),
  (223, 'Manga del Cura', 25),
  (224, 'El Piedrero', 25);

-- Add Marital Status
INSERT INTO
  public."MaritalStatus"(id, name)
VALUES
  (1, 'Soltero/a'),
  (2, 'Casado/a'),
  (3, 'Unión de hecho'),
  (4, 'Divorciado/a'),
  (5, 'Viudo/a');

-- Add Gender
INSERT INTO
  public."Sex"(id, name)
VALUES
  (1, 'Masculino'),
  (2, 'Femenino');

-- Add Functions
INSERT INTO
  public."Function"(id, name)
VALUES
  (1, 'Docente'),
  (2, 'Conserje'),
  (3, 'Vicerrector'),
  (4, 'Rector'),
  (5, 'Psicopedagogo/a'),
  (6, 'DECE'),
  (7, 'Inspector/a General'),
  (8, 'Coordinador/a DECE');

-- Add Laboral Regime
INSERT INTO
  public."LaboralRegime"(id, name)
VALUES
  (1, 'LOEI'),
  (2, 'LOSEP'),
  (3, 'Código del Trabajo');

-- Add Laboral Relationship
INSERT INTO
  public."LaboralRelationship"(id, name)
VALUES
  (1, 'Nombramiento Definitivo'),
  (2, 'Nombramiento Provisional'),
  (3, 'Contrato');

-- Add Journal
INSERT INTO
  public."Journal"(id, name)
VALUES
  (1, 'Matutina'),
  (2, 'Vespertina');

-- Add Campus
INSERT INTO
  public."Campus"(id, name, address, "secondaryName")
VALUES
  (
    1,
    'Campus Principal',
    'Av. Rodrigo Pachano',
    'Colegio Rumiñahui'
  );

INSERT INTO
  public."AssistanceDispositive"(id, name, "campusId", serial)
VALUES
  (
    1,
    'Asistencia no presencial',
    1,
    'ruminahui_NP'
  );

-- Add Categories
-- Categories A to J
INSERT INTO
  public."Category"(id, name, salary)
VALUES
  (1, 'A', 2034),
  (2, 'B', 1760),
  (3, 'C', 1676),
  (4, 'D', 1412),
  (5, 'E', 1212),
  (6, 'F', 1086),
  (7, 'G', 986),
  (8, 'H', 817),
  (9, 'I', 817),
  (10, 'J', 817);