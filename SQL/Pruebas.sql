use quicknotes_db;

select
	bin_to_uuid(id_usuario),
    nombres,
    apellidos,
    username,
    correo_e
from usuarios
order by username
limit 2, 3;

CALL `quicknotes_db`.`registrar_usuario`('Isai', 'Contreras', '2000-06-18', 'alexis_5476@hotmail.com', 'CYANx86', 'UTn_2222&');

CALL `quicknotes_db`.`nueva_nota`('3cceb754-da4f-11ec-9d62-9829a665462f', 'NotaUno', 'Hola, mundo xd.');
CALL `quicknotes_db`.`nueva_nota`('3cceb754-da4f-11ec-9d62-9829a665462f', 'OtraNota', 'Hola, mundo otravez xd.');

CALL `quicknotes_db`.`cantidad_notas_usuario`('3cceb754-da4f-11ec-9d62-9829a665462f');
CALL `quicknotes_db`.`consulta_notas_usuario`('2ca1cbfa-dc95-11ec-9d62-9829a665462f', 1, 100);

CALL `quicknotes_db`.`busqueda_notas`('2ca1cbfa-dc95-11ec-9d62-9829a665462f', 1, 10, "nota", '2022-05-22 00:00:00', '2022-05-25 23:59:59');

CALL `quicknotes_db`.`consultar_usuarios`();

select * from notas where id_usuario = '2ca1cbfa-dc95-11ec-9d62-9829a665462f';