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
CREATE DEFINER=`root`@`localhost` PROCEDURE `nueva_nota`(
	in _id_usuario		varchar(36),
    in _titulo			varchar(64),
    in _contenido		varchar(2048)
)
begin
	
    insert into notas(id_nota, id_usuario, titulo, contenido, fecha_creacion)
    values (uuid_to_bin(uuid()), uuid_to_bin(_id_usuario), _titulo, _contenido, now());
    
end$$
DELIMITER ;

-- // Editar nota existente \\ --
DELIMITER $$
drop procedure if exists editar_nota;
$$DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `editar_nota`(
	in _id_nota			varchar(36),
    in _titulo			varchar(64),
    in _contenido		varchar(2048)
)
begin

	update notas set
		titulo = ifnull(_titulo, titulo),
        contenido = ifnull(_contenido, contenido)
	where
		id_nota = uuid_to_bin(_id_nota) and
		activo = 1;

end$$
DELIMITER ;

-- // Consultar notas de un usuario \\ --
DELIMITER $$
drop procedure if exists consulta_notas_usuario;
$$DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `consulta_notas_usuario`(
	in _id_usuario			varchar(36),
    in _page				int,
    in _size				int
)
begin

	declare pagem int;
	set pagem = ((_page - 1) * _size);

	select
		bin_to_uuid(id_nota) as "ID",
        bin_to_uuid(id_usuario) as "UserID",
		fecha_creacion as "Fecha de creacion",
		titulo as "Titulo",
        contenido as "Contenido",
        activo as "Activo"
	from notas where
		id_usuario = uuid_to_bin(_id_usuario) and
		activo = 1
	order by fecha_creacion desc
	limit pagem, _size;

end$$
DELIMITER ;

-- // Consultar una nota por su ID \\ --
DELIMITER $$
drop procedure if exists consulta_nota;
$$DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `consulta_nota`(
	in _id_nota			varchar(36)
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
		id_nota = uuid_to_bin(_id_nota) and
        activo = 1;

end$$
DELIMITER ;

-- Contador de notas por usuario --
DELIMITER $$
drop procedure cantidad_notas_usuario;
$$ DELIMITER;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `cantidad_notas_usuario`(
	in _id_usuario			varchar(36)
)
BEGIN

	select
		count(*) as "Total"
	from notas where
		id_usuario = uuid_to_bin(_id_usuario) and
        activo = 1;

END$$
DELIMITER ;

-- BÚSQUEDA AVANZADA --
DELIMITER $$
drop procedure busqueda_notas;
$$ DELIMITER;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `busqueda_notas`(
	in _id_usuario			varchar(36),
    in _page				int,
    in _size				int,
    in _contenido			varchar(2048),
    in _init_date			datetime,
    in _final_date			datetime
)
BEGIN

	declare pagem int;
    declare string_contain varchar(258);
    declare start_date varchar(258);
    declare end_date varchar(258);
    
	set pagem = ((_page - 1) * _size);
    
	if (_contenido is not null) then
		set string_contain = concat(' and contenido like "%', _contenido, '%"');
	else
		set string_contain = "";
    end if;
    
    if (_init_date is not null) then
		set start_date = concat(' and fecha_creacion >= ', '"', _init_date, '"');
    else
		set start_date = "";
    end if;
    
    if (_final_date is not null) then
		set end_date = concat(' and fecha_creacion <= ', '"', _final_date, '"');
    else
		set end_date = "";
    end if;
    
    set @qry_string = concat(
		'select
			bin_to_uuid(id_nota) as ID,
			bin_to_uuid(id_usuario) as UserID,
			fecha_creacion,
			titulo as Titulo,
			contenido as Contenido,
			activo as Activo
		from notas where
			id_usuario = uuid_to_bin("', _id_usuario, '")',
            string_contain, start_date, end_date, ' and activo = 1 ',
		'order by fecha_creacion desc limit ', pagem, ', ',  _size, ';'
    );
    
    select @qry_string;
    
     prepare qry from @qry_string;
	 execute qry;
	
END$$
DELIMITER ;

-- // Baja lógica de una nota por su UD \\ --
DELIMITER $$
drop procedure if exists borrar_nota;
$$DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `borrar_nota`(
	in _id_nota			varchar(36)
)
begin

	update notas
		set activo = 0
    where id_nota = uuid_to_bin(_id_nota);

end$$
DELIMITER ;