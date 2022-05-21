-- <<< USUARIOS STORED PROCEDURES >>>

-- ARCHIVO QUERY PARA LA CREACION DE LOS PROCEDIMIENTOS
-- PARA TRATAR LA TABLA DE USUARAIOS DEL PROYECTO QUICK NOTES.

-- PROGRAMACIÓN WEB / GRUPO 03
-- EQUIPO:
-- * ALEXIS ISAÍ CONTRERAS GARZA / MATRÍCULA 1823636
-- * LILI MARLENE AVALOS RENDON / MATRÍCULA 1940852

-- AUTOR: ALEXIS ISAÍ CONTRERAS GARZA (CYANx86).

-- // Usar base de datos con este nombre \\ --
use quicknotes_db;

-- // Registro de usuarios \\ --
DELIMITER $$
drop procedure if exists registrar_usuario;
$$DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `registrar_usuario`(
    in _nombres			varchar(64),
    in _apellidos		varchar(64),
    in _fecha_nac		date,
    in _email			varchar(64),
    in _username		varchar(32),
    in _password		varchar(16)
)
begin

	if not exists(select 1 from usuarios where (correo_e = _email or username = _username) and activo = 1) then
		insert into usuarios (id_usuario, nombres, apellidos, fecha_nac, correo_e, username, password, fecha_creacion)
		values (uuid_to_bin(uuid()), _nombres, _apellidos, _fecha_nac, _email, _username, _password, now());
        select "registered_user" as result;
	else
		select "already_exists" as result;
    end if;

end
$$ DELIMITER ;

-- // Editar usuarios \\ --
DELIMITER $$
drop procedure if exists editar_usuario;
$$DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `editar_usuario`(
	in _id_usuario		varchar(36),
    in _nombres			varchar(64),
    in _apellidos		varchar(64),
    in _fecha_nac		date,
    in _email			varchar(64),
    in _username		varchar(32),
    in _password		varchar(16)
)
begin

	update usuarios set
		nombres = ifnull(_nombres, nombres),
        apellidos = ifnull(_apellidos, apellidos),
        fecha_nac = ifnull(_fecha_nac, fecha_nac),
        password = ifnull(_password, password)
	where
		id_usuario = uuid_to_bin(_id_usuario) and
        activo = 1;

	if not exists (select 1 from usuarios where (correo_e = _email or username = _username) and id_usuario != _id_usuario and activo = 1) then
		update usuarios set
			correo_e = ifnull(_email, correo_e),
            username = ifnull(_username, username)
		where
			id_usuario = uuid_to_bin(_id_usuario) and
			activo = 1;
		select "updated_eu" as result;
	else select "already_exists" as result;
    end if;
    
end
$$ DELIMITER ;

-- // Consultar usuario por su ID \\ --
DELIMITER $$
drop procedure if exists consultar_usuario_id;
$$DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `consultar_usuario_id`(
	in _id_usuario		varchar(36)
)
begin

	select
		bin_to_uuid(id_usuario) as "ID",
        nombres as "Nombres",
        apellidos as "Apellidos",
        fecha_nac as "Fecha de nacimiento",
        correo_e as "Correo electronico",
        username as "Usuario",
        password as "Contrasena",
        fecha_creacion as "Fecha de creacion",
        activo as "Activo"
	from usuarios where id_usuario = uuid_to_bin(_id_usuario) and activo = 1;

end$$
DELIMITER ;

-- // Consultar todos los usuarios \\ --
DELIMITER $$
drop procedure if exists consultar_usuarios;
$$DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `consultar_usuarios`()
begin

	select
		bin_to_uuid(id_usuario) as "ID",
        nombres as "Nombres",
        apellidos as "Apellidos",
        fecha_nac as "Fecha de nacimiento",
        correo_e as "Correo electronico",
        username as "Usuario",
        password as "Contrasena",
        fecha_creacion as "Fecha de creacion",
        activo as "Activo"
	from usuarios where activo = 1;

end$$
DELIMITER ;

-- // Proceso de inicio de sesión \\ --
DELIMITER $$
drop procedure if exists login_usuario;
$$DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `login_usuario`(
	in _email		varchar(64),
    in _password	varchar(16)
)
begin

	if exists (select 1 from usuarios where correo_e = _email and activo = 1) then
		if exists (select 1 from usuarios where correo_e = _email and password = _password and activo = 1) then
			select
				"user_logged" as result,
				bin_to_uuid(id_usuario) as "ID",
                username as "Nombre de usuario",
                correo_e as "Correo electronico"
			from usuarios
            where correo_e = _email;
		else
			select "wrong_password" as result;
		end if;
	else
		select "user_no_exists" as result;
	end if;
    
end$$
DELIMITER ;

-- // Dar de baja un usuario \\ --
DELIMITER $$
drop procedure if exists borrar_usuario;
$$DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `borrar_usuario`(
	in _id_usuario		varchar(36)
)
begin

	update usuarios set
		activo = 0
	where id_usuario = uuid_to_bin(_id_usuario);

end$$
DELIMITER ;