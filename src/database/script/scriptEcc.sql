-- MySQL Script generated by MySQL Workbench
-- Sun Nov 27 00:03:13 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

-- ONLY MySQL Workbench 
SET
 
  UNIQUE_CHECKS = 0;

SET
  
  FOREIGN_KEY_CHECKS = 0;

SET
  
  SQL_MODE = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- ONLY MySQL Workbench

-- -----------------------------------------------------
-- Schema scriptEcc
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema scriptEcc
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `scriptEcc` DEFAULT CHARACTER SET utf8mb4;

USE `scriptEcc`;

-- -----------------------------------------------------
-- Table `scriptEcc`.`Rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scriptEcc`.`Rol` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

insert into
  Rol(nombre)
values
  ('Administrador'),
  ('Profesor'),
  ('Usuario');

-- -----------------------------------------------------
-- Table `scriptEcc`.`Tematica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scriptEcc`.`Tematica` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

insert into
  Tematica(nombre)
values
  ('Presencial'),
  ('Virtual');

-- -----------------------------------------------------
-- Table `scriptEcc`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scriptEcc`.`Usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `clave` VARCHAR(255) NOT NULL,
  `telefono` VARCHAR(45) NOT NULL,
  `imagen` VARCHAR(45) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `fecha_eliminacion` DATETIME,
  `Rol_id` INT NOT NULL,
  `Tematica_id` INT NOT NULL,
  `Administrador_id` INT,
  PRIMARY KEY (`id`),
  INDEX `fk_Usuario_Rol_idx` (`Rol_id` ASC),
  INDEX `fk_Usuario_Tematica1_idx` (`Tematica_id` ASC),
  INDEX `fk_Usuario_Usuario1_idx` (`Administrador_id` ASC),
  CONSTRAINT `fk_Usuario_Rol` FOREIGN KEY (`Rol_id`) REFERENCES `scriptEcc`.`Rol` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuario_Tematica1` FOREIGN KEY (`Tematica_id`) REFERENCES `scriptEcc`.`Tematica` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuario_Usuario1` FOREIGN KEY (`Administrador_id`) REFERENCES `scriptEcc`.`Usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

insert into
  Usuario(
    nombre,
    apellido,
    email,
    clave,
    telefono,
    imagen,
    fecha_creacion,
    fecha_eliminacion,
    Rol_id,
    Tematica_id,
    Administrador_id
  )
values
  (
    'admin',
    'Moidi',
    'admin@gmail.com',
    '$2a$10$aUdcbgF77/Kd0D1ErnlmsedTIjSNI2ZdmTSo15faBJJ4/RQ18s.GS',
    '31347890',
    '1669567076571urban-user.png',
    '2022-11-27 05:00:00',
    '2022-11-27 05:00:00',
    1,
    1,
    NULL
  );

-- -----------------------------------------------------
-- Table `scriptEcc`.`Nivel_curso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scriptEcc`.`Nivel_curso` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

insert into
  Nivel_curso(nombre)
values
  ('Basico'),
  ('Intermedio'),
  ('Avanzado');

-- -----------------------------------------------------
-- Table `scriptEcc`.`Tipo_curso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scriptEcc`.`Tipo_curso` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `scriptEcc`.`Curso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scriptEcc`.`Curso` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `descripcion` TEXT(500) NOT NULL,
  `estudiantes` INT,
  `lecciones` INT,
  `puntuacion` INT,
  `imagen` VARCHAR(255) NOT NULL,
  `img_nivel` VARCHAR(255) NOT NULL,
  `cantidad_horas` INT NOT NULL,
  `precio` DECIMAL(30) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `fecha_modificacion` DATETIME NOT NULL,
  `fecha_eliminacion` DATETIME NOT NULL,
  `Administrador_id` INT,
  `Profesor_id` INT,
  `Tematica_id` INT,
  `Nivel_curso_id` INT,
  `Tipo_curso_id` INT,
  PRIMARY KEY (`id`),
  INDEX `fk_Curso_Usuario1_idx` (`Administrador_id` ASC),
  INDEX `fk_Curso_Usuario2_idx` (`Profesor_id` ASC),
  INDEX `fk_Curso_Tematica1_idx` (`Tematica_id` ASC),
  INDEX `fk_Curso_Nivel_curso1_idx` (`Nivel_curso_id` ASC),
  INDEX `fk_Curso_Tipo_curso1_idx` (`Tipo_curso_id` ASC),
  CONSTRAINT `fk_Curso_Usuario1` FOREIGN KEY (`Administrador_id`) REFERENCES `scriptEcc`.`Usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Curso_Usuario2` FOREIGN KEY (`Profesor_id`) REFERENCES `scriptEcc`.`Usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Curso_Tematica1` FOREIGN KEY (`Tematica_id`) REFERENCES `scriptEcc`.`Tematica` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Curso_Nivel_curso1` FOREIGN KEY (`Nivel_curso_id`) REFERENCES `scriptEcc`.`Nivel_curso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Curso_Tipo_curso1` FOREIGN KEY (`Tipo_curso_id`) REFERENCES `scriptEcc`.`Tipo_curso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `scriptEcc`.`Turno_horarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scriptEcc`.`Turno_horarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `scriptEcc`.`Comision`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scriptEcc`.`Comision` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `numero_comision` INT NOT NULL,
  `cantidad_vacantes` INT NOT NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `fecha_modificacion` DATETIME NOT NULL,
  `fecha_eliminacion` DATETIME NOT NULL,
  `fecha_inicio` DATETIME NOT NULL,
  `fecha_finalizacion` DATETIME NOT NULL,
  `Administrador_id` INT NOT NULL,
  `Profesor_id` INT NOT NULL,
  `Curso_db_id` INT NOT NULL,
  `Turno_horario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Comision_Usuario1_idx` (`Administrador_id` ASC),
  INDEX `fk_Comision_Usuario2_idx` (`Profesor_id` ASC),
  INDEX `fk_Comision_Curso1_idx` (`Curso_db_id` ASC),
  INDEX `fk_Comision_Turno_horario1_idx` (`Turno_horario_id` ASC),
  CONSTRAINT `fk_Comision_Usuario1` FOREIGN KEY (`Administrador_id`) REFERENCES `scriptEcc`.`Usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comision_Usuario2` FOREIGN KEY (`Profesor_id`) REFERENCES `scriptEcc`.`Usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comision_Curso1` FOREIGN KEY (`Curso_db_id`) REFERENCES `scriptEcc`.`Curso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comision_Turno_horario1` FOREIGN KEY (`Turno_horario_id`) REFERENCES `scriptEcc`.`Turno_horarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `scriptEcc`.`Cursar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scriptEcc`.`Cursar` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `valoracion` INT NOT NULL,
  `Alumno_id` INT NOT NULL,
  `Curso_db_id` INT NOT NULL,
  `Comision_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Cursar_Usuario1_idx` (`Alumno_id` ASC),
  INDEX `fk_Cursar_Curso1_idx` (`Curso_db_id` ASC),
  INDEX `fk_Cursar_Comision1_idx` (`Comision_id` ASC),
  CONSTRAINT `fk_Cursar_Usuario1` FOREIGN KEY (`Alumno_id`) REFERENCES `scriptEcc`.`Usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cursar_Curso1` FOREIGN KEY (`Curso_db_id`) REFERENCES `scriptEcc`.`Curso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cursar_Comision1` FOREIGN KEY (`Comision_id`) REFERENCES `scriptEcc`.`Comision` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `scriptEcc`.`Modulo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scriptEcc`.`Modulo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `numero_modulo` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` TEXT(500) NOT NULL,
  `Curso_db_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Modulo_Curso1_idx` (`Curso_db_id` ASC),
  CONSTRAINT `fk_Modulo_Curso1` FOREIGN KEY (`Curso_db_id`) REFERENCES `scriptEcc`.`Curso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `scriptEcc`.`Temas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scriptEcc`.`Temas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `numero_tema` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `Modulo_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Tema_Modulo1_idx` (`Modulo_id` ASC),
  CONSTRAINT `fk_Tema_Modulo1` FOREIGN KEY (`Modulo_id`) REFERENCES `scriptEcc`.`Modulo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `scriptEcc`.`Academia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scriptEcc`.`Academia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `scriptEcc`.`Asociado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scriptEcc`.`Asociado` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Usuario_db_id` INT NOT NULL,
  `Academia_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Asociado_Usuario1_idx` (`Usuario_db_id` ASC),
  INDEX `fk_Asociado_Academia1_idx` (`Academia_id` ASC),
  CONSTRAINT `fk_Asociado_Usuario1` FOREIGN KEY (`Usuario_db_id`) REFERENCES `scriptEcc`.`Usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Asociado_Academia1` FOREIGN KEY (`Academia_id`) REFERENCES `scriptEcc`.`Academia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;


/* Modificado - 04/04/2024

  Nombres de las tablas => {
    Rols -> Rol
    Tematicas -> Tematica
    Usuario_dbs -> Usuario
    Nivel_cursos -> Nivel_curso
    Tipo_cursos -> Tipo_curso
    Curso_dbs -> Curso
    Turno_horarios -> Turno_horario
    Comisions-> Comision
    Cursars -> Cursar
    Modulos -> Modulo
    Temas -> Tema
    Academias -> Academia
    Asociados -> Asociado
  } 

*/