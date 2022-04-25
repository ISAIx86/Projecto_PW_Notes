-- <<< NOTAS STORED PROCEDURES >>>

-- ARCHIVO QUERY PARA LA CREACION DE LOS PROCEDIMIENTOS
-- PARA TRATAR LA TABLA DE NOTAS DEL PROYECTO QUICK NOTES.

-- PROGRAMACIÓN WEB / GRUPO 03
-- EQUIPO:
-- * ALEXIS ISAÍ CONTRERAS GARZA / MATRÍCULA 1823636
-- * LILI MARLENE AVALOS RENDON / MATRÍCULA 1940852

-- AUTOR: ALEXIS ISAÍ CONTRERAS GARZA (CYANx86).

-- // Usar base de datos con este nombre \\ --
use quicknotes_db;

-- // Crear nueva nota \\ --
DELIMITER $$
drop procedure if exists nueva_nota;
$$DELIMITER ;
DELIMITER $$
create definer=root@localhost procedure nueva_nota(
	in _id_usuario		binary(16),
    in _titulo			varchar(64),
    in _contenido		varchar(255)
)
begin
	
    insert into notas(id_nota, id_usuario, titulo, contenido, fecha_creacion)
    values (uuid_to_bin(uuid()), _id_usuario, _titulo, _contenido, now());
    
end$$
DELIMITER ;

-- // Editar nota existente \\ --
DELIMITER $$
drop procedure if exists editar_nota;
$$DELIMITER ;
DELIMITER $$
create definer=root@localhost procedure editar_nota(
	in _id_nota			binary(16),
    in _titulo			varchar(64),
    in _contenido		varchar(2048)
)
begin

	update notas set
		titulo = ifnull(_titulo, titulo),
        contenido = ifnull(_contenido, contenido)
	where
		id_nota = _id_nota and
		activo = 1;

end$$
DELIMITER ;

-- // Consultar notas de un usuario \\ --
DELIMITER $$
drop procedure if exists consulta_notas_usuario;
$$DELIMITER ;
DELIMITER $$
create definer=root@localhost procedure consulta_notas_usuario(
	in _id_usuario			binary(16)
)
begin

	select
		bin_to_uuid(id_nota) as "ID",
        bin_to_uuid(id_usuario) as "UserID",
		fecha_creacion as "Fecha de creacion",
		titulo as "Titulo",
        contenido as "Contenido",
        activo as "Activo"
	from notas where
		id_usuario = _id_usuario and
		activo = 1;

end$$
DELIMITER ;

-- // Consultar una nota por su ID \\ --
DELIMITER $$
drop procedure if exists consulta_nota;
$$DELIMITER ;
DELIMITER $$
create definer=root@localhost procedure consulta_nota(
	in _id_nota			binary(16)
)
begin

	select
		bin_to_uuid(id_nota) as "ID",
        bin_to_uuid(id_usuario) as "UserID",
		fecha_creacion as "Fecha de creacion",
		titulo as "Titulo",
		contenido as "Contenido",
        activo as "Activo"
	from notas where
		id_nota = _id_nota and
        activo = 1;

end$$
DELIMITER ;

-- // Baja lógica de una nota por su UD \\ --
DELIMITER $$
drop procedure if exists borrar_nota;
$$DELIMITER ;
DELIMITER $$
create definer=root@localhost procedure borrar_nota(
	in _id_nota			binary(16)
)
begin

	update notas
		set activo = 0
    where id_nota = _id_nota;

end$$
DELIMITER ;