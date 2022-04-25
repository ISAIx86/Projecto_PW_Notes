-- <<< CREATE ALL TABLES >>>

-- ARCHIVO QUERY PARA LA CREACION DE LAS TABLAS NECESARIAS
-- DEL PROYECTO QUICK NOTES.

-- PROGRAMACIÓN WEB / GRUPO 03
-- EQUIPO:
-- * ALEXIS ISAÍ CONTRERAS GARZA / MATRÍCULA 1823636
-- * LILI MARLENE AVALOS RENDON / MATRÍCULA 1940852

-- AUTOR: ALEXIS ISAÍ CONTRERAS GARZA (CYANx86).

-- // Crear la base de datos \\ --
create database quicknotes_db;

-- // Usar base de datos con este nombre \\ --
use quicknotes_db;

-- // USUARIOS \\ --
create table if not exists usuarios (
  id_usuario binary(16) not null,
  nombres varchar(60) not null,
  apellidos varchar(60) not null,
  foto_perfil blob,
  fecha_nac date not null,
  correo_e varchar(50) not null,
  username varchar(32) not null,
  password varchar(16) not null,
  fecha_creacion datetime(1) not null,
  activo tinyint not null default '1',
  primary key (id_usuario)
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_0900_ai_ci;


-- // NOTAS \\ --
create table if not exists notas (
  id_nota binary(16) not null,
  id_usuario binary(16) not null,
  titulo varchar(64) not null,
  fecha_creacion datetime(1) not null,
  contenido varchar(2048) default null,
  activo tinyint not null default '1',
  primary key (id_nota),
  key fk_nota_usuario_idx (id_usuario),
  constraint fk_nota_usuario foreign key (id_usuario) references usuarios (id_usuario)
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_0900_ai_ci;