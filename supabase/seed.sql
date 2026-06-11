-- Catálogo inicial de ejemplo — reemplazar con los cursos y precios reales
-- de Tarareando antes de lanzar (pregunta abierta #1 del plan).

insert into productos (tipo, nombre, slug, descripcion, precio, num_clases) values
  ('curso', 'Curso de canto para niños', 'curso-canto-ninos',
   'Aprende técnica vocal desde cero con ejercicios divertidos pensados para niños de 7 a 12 años.',
   149.00, null),
  ('curso', 'Curso de guitarra para adolescentes', 'curso-guitarra-adolescentes',
   'De los primeros acordes a tocar tus canciones favoritas. Para adolescentes de 13 a 17 años.',
   149.00, null),
  ('recurso', 'Pack de pistas y partituras', 'pack-pistas-partituras',
   'Material descargable para practicar en casa: pistas, partituras y guías de estudio.',
   39.00, null),
  ('paquete_clases', 'Paquete de 4 clases en vivo', 'paquete-4-clases',
   'Cuatro clases en vivo 1 a 1 por videollamada. Agenda cada clase cuando quieras.',
   240.00, 4),
  ('asesoria', 'Asesoría personalizada', 'asesoria-personalizada',
   'Sesión 1 a 1 para resolver tus dudas, definir tu ruta de aprendizaje o preparar una audición.',
   80.00, null)
on conflict (slug) do nothing;
