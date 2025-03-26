-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Usuario'
-- 
-- ---

DROP TABLE IF EXISTS `Usuario`;
		
CREATE TABLE `Usuario` (
  `idUsuario` INTEGER(5) NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(50) NOT NULL,
  `idEvento` INTEGER(5) NOT NULL,
  PRIMARY KEY (`idUsuario`)
);

-- ---
-- Table 'Boleto'
-- 
-- ---

DROP TABLE IF EXISTS `Boleto`;
		
CREATE TABLE `Boleto` (
  `idBoleto` INTEGER(5) NOT NULL AUTO_INCREMENT,
  `tipo` BINARY(1) NOT NULL,
  `idUsuario` INTEGER(5) NOT NULL,
  PRIMARY KEY (`idBoleto`)
);

-- ---
-- Table 'Casilla'
-- 
-- ---

DROP TABLE IF EXISTS `Casilla`;
		
CREATE TABLE `Casilla` (
  `idCasilla` INTEGER(5) NOT NULL AUTO_INCREMENT,
  `idImagen` INTEGER(5) NOT NULL,
  `coordenadaX` INTEGER(6) NOT NULL,
  `coordenadaY` INTEGER(6) NOT NULL,
  `idPregunta` INTEGER(5) NOT NULL,
  PRIMARY KEY (`idCasilla`),
  PRIMARY KEY (`idImagen`)
);

-- ---
-- Table 'Pregunta'
-- 
-- ---

DROP TABLE IF EXISTS `Pregunta`;
		
CREATE TABLE `Pregunta` (
  `idPregunta` INTEGER(5) NOT NULL AUTO_INCREMENT,
  `pregunta` VARCHAR(200) NOT NULL,
  `opcionA` VARCHAR(50) NULL,
  `opcionB` VARCHAR(50) NULL,
  `opcionC` VARCHAR(50) NULL,
  `opcionD` VARCHAR NULL,
  `respuesta` VARCHAR(7) NOT NULL,
  PRIMARY KEY (`idPregunta`)
);

-- ---
-- Table 'IntentoCorrecto'
-- 
-- ---

DROP TABLE IF EXISTS `IntentoCorrecto`;
		
CREATE TABLE `IntentoCorrecto` (
  `idCorrecto` INTEGER(5) NOT NULL AUTO_INCREMENT,
  `idUsuario` INTEGER(5) NOT NULL,
  `idCasilla` INTEGER(5) NOT NULL,
  `idImagen` INTEGER(5) NOT NULL,
  PRIMARY KEY (`idCorrecto`)
);

-- ---
-- Table 'IntentoIncorrecto'
-- 
-- ---

DROP TABLE IF EXISTS `IntentoIncorrecto`;
		
CREATE TABLE `IntentoIncorrecto` (
  `idIncorrecto` INTEGER(5) NOT NULL AUTO_INCREMENT,
  `opcionElegida` VARCHAR(7) NOT NULL,
  `idUsuario` INTEGER(5) NOT NULL,
  `idCasilla` INTEGER(5) NOT NULL,
  `idImagen` INTEGER(5) NOT NULL,
  PRIMARY KEY (`idIncorrecto`)
);

-- ---
-- Table 'Evento'
-- 
-- ---

DROP TABLE IF EXISTS `Evento`;
		
CREATE TABLE `Evento` (
  `idEvento` INTEGER(5) NOT NULL AUTO_INCREMENT,
  `fechaInicio` DATETIME NOT NULL,
  `fechaFinal` DATETIME NOT NULL,
  PRIMARY KEY (`idEvento`)
);

-- ---
-- Table 'Imagen'
-- 
-- ---

DROP TABLE IF EXISTS `Imagen`;
		
CREATE TABLE `Imagen` (
  `idImagen` INTEGER(5) NOT NULL AUTO_INCREMENT,
  `URL` VARCHAR(200) NOT NULL,
  `estado` BINARY(1) NOT NULL,
  `respuesta` VARCHAR(50) NOT NULL,
  `idEvento` INTEGER(5) NOT NULL,
  `idUsuario` INTEGER(5) NOT NULL,
  PRIMARY KEY (`idImagen`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Usuario` ADD FOREIGN KEY (idEvento) REFERENCES `Evento` (`idEvento`);
ALTER TABLE `Boleto` ADD FOREIGN KEY (idUsuario) REFERENCES `Usuario` (`idUsuario`);
ALTER TABLE `Casilla` ADD FOREIGN KEY (idPregunta) REFERENCES `Pregunta` (`idPregunta`);
ALTER TABLE `IntentoCorrecto` ADD FOREIGN KEY (idUsuario) REFERENCES `Usuario` (`idUsuario`);
ALTER TABLE `IntentoCorrecto` ADD FOREIGN KEY (idCasilla) REFERENCES `Casilla` (`idCasilla`);
ALTER TABLE `IntentoCorrecto` ADD FOREIGN KEY (idImagen) REFERENCES `Casilla` (`idImagen`);
ALTER TABLE `IntentoIncorrecto` ADD FOREIGN KEY (idUsuario) REFERENCES `Usuario` (`idUsuario`);
ALTER TABLE `IntentoIncorrecto` ADD FOREIGN KEY (idCasilla) REFERENCES `Casilla` (`idCasilla`);
ALTER TABLE `IntentoIncorrecto` ADD FOREIGN KEY (idImagen) REFERENCES `Casilla` (`idImagen`);
ALTER TABLE `Imagen` ADD FOREIGN KEY (idEvento) REFERENCES `Evento` (`idEvento`);
ALTER TABLE `Imagen` ADD FOREIGN KEY (idUsuario) REFERENCES `Usuario` (`idUsuario`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Usuario` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Boleto` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Casilla` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Pregunta` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `IntentoCorrecto` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `IntentoIncorrecto` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Evento` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Imagen` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Usuario` (`idUsuario`,`usuario`,`idEvento`) VALUES
-- ('','','');
-- INSERT INTO `Boleto` (`idBoleto`,`tipo`,`idUsuario`) VALUES
-- ('','','');
-- INSERT INTO `Casilla` (`idCasilla`,`idImagen`,`coordenadaX`,`coordenadaY`,`idPregunta`) VALUES
-- ('','','','','');
-- INSERT INTO `Pregunta` (`idPregunta`,`pregunta`,`opcionA`,`opcionB`,`opcionC`,`opcionD`,`respuesta`) VALUES
-- ('','','','','','','');
-- INSERT INTO `IntentoCorrecto` (`idCorrecto`,`idUsuario`,`idCasilla`,`idImagen`) VALUES
-- ('','','','');
-- INSERT INTO `IntentoIncorrecto` (`idIncorrecto`,`opcionElegida`,`idUsuario`,`idCasilla`,`idImagen`) VALUES
-- ('','','','','');
-- INSERT INTO `Evento` (`idEvento`,`fechaInicio`,`fechaFinal`) VALUES
-- ('','','');
-- INSERT INTO `Imagen` (`idImagen`,`URL`,`estado`,`respuesta`,`idEvento`,`idUsuario`) VALUES
-- ('','','','','','');