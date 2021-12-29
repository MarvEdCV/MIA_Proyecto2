CREATE TABLE competicion (
    id_competicion   NUMBER NOT NULL,
    nombre           VARCHAR2(50 CHAR) NOT NULL,
    anio              NUMBER NOT NULL,
    tipo             VARCHAR2(20 CHAR) NOT NULL,
    campeon          VARCHAR2(50 CHAR) NOT NULL,
    pais             VARCHAR2(50 CHAR) NOT NULL,
    equipo_id_equipo NUMBER NOT NULL
);

ALTER TABLE competicion ADD CONSTRAINT competicion_pk PRIMARY KEY ( id_competicion );

CREATE SEQUENCE Secuencia_competicion
INCREMENT BY 1
START WITH 1
NOMINVALUE
NOMAXVALUE;

CREATE OR REPLACE TRIGGER T_competicion
BEFORE INSERT ON competicion
REFERENCING NEW AS NEW FOR EACH ROW
DECLARE valorSecuencia NUMBER := 0;
BEGIN
SELECT Secuencia_competicion.NEXTVAL INTO valorSecuencia FROM DUAL;
:NEW.id_competicion := valorSecuencia;
END;

CREATE TABLE director_tecnico (
    id_director      NUMBER NOT NULL,
    nombres          VARCHAR2(50 CHAR) NOT NULL,
    fecha_nac        DATE NOT NULL,
    pais             VARCHAR2(50 CHAR) NOT NULL,
    estado           VARCHAR2(10 CHAR) NOT NULL,
    fecha_ini        DATE NOT NULL,
    fecha_fin        DATE NOT NULL,
    equipo_id_equipo NUMBER NOT NULL
);

ALTER TABLE director_tecnico ADD CONSTRAINT director_tecnico_pk PRIMARY KEY ( id_director );

CREATE SEQUENCE Secuencia_DT
INCREMENT BY 1
START WITH 1
NOMINVALUE
NOMAXVALUE;

CREATE OR REPLACE TRIGGER T_DT
BEFORE INSERT ON director_tecnico
REFERENCING NEW AS NEW FOR EACH ROW
DECLARE valorSecuencia NUMBER := 0;
BEGIN
SELECT Secuencia_DT.NEXTVAL INTO valorSecuencia FROM DUAL;
:NEW.id_director := valorSecuencia;
END;

CREATE TABLE empleados (
    id_empleado      NUMBER NOT NULL,
    nombre           VARCHAR2(50 CHAR) NOT NULL,
    apellido         VARCHAR2(50 CHAR) NOT NULL,
    cantidadnoticias NUMBER NOT NULL
);

ALTER TABLE empleados ADD CONSTRAINT empleados_pk PRIMARY KEY ( id_empleado );

CREATE SEQUENCE Secuencia_empleados
INCREMENT BY 1
START WITH 1
NOMINVALUE
NOMAXVALUE;

CREATE OR REPLACE TRIGGER T_empleados
BEFORE INSERT ON empleados
REFERENCING NEW AS NEW FOR EACH ROW
DECLARE valorSecuencia NUMBER := 0;
BEGIN
SELECT Secuencia_empleados.NEXTVAL INTO valorSecuencia FROM DUAL;
:NEW.id_empleado := valorSecuencia;
END;

CREATE TABLE equipo (
    id_equipo NUMBER NOT NULL,
    nombre    VARCHAR2(50 CHAR) NOT NULL,
    fecha_fun DATE NOT NULL,
    pais      VARCHAR2(50 CHAR) NOT NULL
);

ALTER TABLE equipo ADD CONSTRAINT equipo_pk PRIMARY KEY ( id_equipo );

CREATE SEQUENCE Secuencia_equipo
INCREMENT BY 1
START WITH 1
NOMINVALUE
NOMAXVALUE;

CREATE OR REPLACE TRIGGER T_equipo
BEFORE INSERT ON equipo
REFERENCING NEW AS NEW FOR EACH ROW
DECLARE valorSecuencia NUMBER := 0;
BEGIN
SELECT Secuencia_equipo.NEXTVAL INTO valorSecuencia FROM DUAL;
:NEW.id_equipo := valorSecuencia;
END;

CREATE TABLE estadios (
    id_estadio NUMBER NOT NULL,
    pais       VARCHAR2(50 BYTE) NOT NULL,
    nombre     VARCHAR2(100 CHAR) NOT NULL,
    fecha_ing  DATE NOT NULL,
    capacidad  NUMBER NOT NULL,
    direccion  VARCHAR2(100 CHAR) NOT NULL,
    estado     VARCHAR2(25 CHAR) NOT NULL
);

ALTER TABLE estadios ADD CONSTRAINT estadios_pk PRIMARY KEY ( id_estadio );

CREATE SEQUENCE Secuencia_estadios
INCREMENT BY 1
START WITH 1
NOMINVALUE
NOMAXVALUE;

CREATE OR REPLACE TRIGGER T_estadios
BEFORE INSERT ON estadios
REFERENCING NEW AS NEW FOR EACH ROW
DECLARE valorSecuencia NUMBER := 0;
BEGIN
SELECT Secuencia_estadios.NEXTVAL INTO valorSecuencia FROM DUAL;
:NEW.id_estadio := valorSecuencia;
END;

CREATE TABLE jugador (
    id_jugador       NUMBER NOT NULL,
    nombre           VARCHAR2(50 CHAR) NOT NULL,
    fecha_nac        DATE NOT NULL,
    nacionalidad     VARCHAR2(50 CHAR) NOT NULL,
    posicion         VARCHAR2(50 CHAR) NOT NULL,
    fecha_ini        DATE NOT NULL,
    fecha_fin        DATE NOT NULL,
    equipo_id_equipo NUMBER NOT NULL
);

ALTER TABLE jugador ADD CONSTRAINT jugador_pk PRIMARY KEY ( id_jugador );

CREATE SEQUENCE Secuencia_jugador
INCREMENT BY 1
START WITH 1
NOMINVALUE
NOMAXVALUE;

CREATE OR REPLACE TRIGGER T_jugador
BEFORE INSERT ON jugador
REFERENCING NEW AS NEW FOR EACH ROW
DECLARE valorSecuencia NUMBER := 0;
BEGIN
SELECT Secuencia_jugador.NEXTVAL INTO valorSecuencia FROM DUAL;
:NEW.id_jugador := valorSecuencia;
END;


CREATE TABLE noticias (
    id_noticia            NUMBER NOT NULL,
    notica                VARCHAR2(200 CHAR) NOT NULL,
    equipo_id_equipo      NUMBER NOT NULL,
    empleados_id_empleado NUMBER NOT NULL
);

ALTER TABLE noticias ADD CONSTRAINT noticias_pk PRIMARY KEY ( id_noticia );

CREATE SEQUENCE Secuencia_noticias
INCREMENT BY 1
START WITH 1
NOMINVALUE
NOMAXVALUE;

CREATE OR REPLACE TRIGGER T_noticias
BEFORE INSERT ON noticias
REFERENCING NEW AS NEW FOR EACH ROW
DECLARE valorSecuencia NUMBER := 0;
BEGIN
SELECT Secuencia_noticias.NEXTVAL INTO valorSecuencia FROM DUAL;
:NEW.id_noticia := valorSecuencia;
END;


CREATE TABLE partido (
    id_partido          NUMBER NOT NULL,
    fecha               DATE NOT NULL,
    publico             NUMBER NOT NULL,
    resultado           VARCHAR2(20 CHAR) NOT NULL,
    estado              VARCHAR2(20 CHAR) NOT NULL,
    estadios_id_estadio NUMBER NOT NULL,
    equipo_id_equipo    NUMBER NOT NULL,
    equipo_id_equipo2   NUMBER NOT NULL
);

ALTER TABLE partido ADD CONSTRAINT partido_pk PRIMARY KEY ( id_partido );

CREATE SEQUENCE Secuencia_partido
INCREMENT BY 1
START WITH 1
NOMINVALUE
NOMAXVALUE;

CREATE OR REPLACE TRIGGER T_partido
BEFORE INSERT ON partido
REFERENCING NEW AS NEW FOR EACH ROW
DECLARE valorSecuencia NUMBER := 0;
BEGIN
SELECT Secuencia_partido.NEXTVAL INTO valorSecuencia FROM DUAL;
:NEW.id_partido := valorSecuencia;
END;

CREATE TABLE partido_incidencias (
    id_pi              NUMBER NOT NULL,
    incidencia         VARCHAR2(250 CHAR) NOT NULL,
    minuto             NUMBER NOT NULL,
    jugador_id_jugador NUMBER NOT NULL,
    partido_id_partido NUMBER NOT NULL
);

ALTER TABLE partido_incidencias ADD CONSTRAINT partido_incidencias_pk PRIMARY KEY ( id_pi );

CREATE SEQUENCE Secuencia_PI
INCREMENT BY 1
START WITH 1
NOMINVALUE
NOMAXVALUE;

CREATE OR REPLACE TRIGGER T_PI
BEFORE INSERT ON partido_incidencias
REFERENCING NEW AS NEW FOR EACH ROW
DECLARE valorSecuencia NUMBER := 0;
BEGIN
SELECT Secuencia_PI.NEXTVAL INTO valorSecuencia FROM DUAL;
:NEW.id_pi := valorSecuencia;
END;


CREATE TABLE subs_equipos (
    id_suscripciones NUMBER NOT NULL,
    usuarios_id      NUMBER NOT NULL,
    equipo_id_equipo NUMBER NOT NULL
);

ALTER TABLE subs_equipos ADD CONSTRAINT subs_equipos_pk PRIMARY KEY ( id_suscripciones );

CREATE SEQUENCE Secuencia_subs_equipos
INCREMENT BY 1
START WITH 1
NOMINVALUE
NOMAXVALUE;

CREATE OR REPLACE TRIGGER T_subs_equipos
BEFORE INSERT ON subs_equipos
REFERENCING NEW AS NEW FOR EACH ROW
DECLARE valorSecuencia NUMBER := 0;
BEGIN
SELECT Secuencia_subs_equipos.NEXTVAL INTO valorSecuencia FROM DUAL;
:NEW.id_suscripciones := valorSecuencia;
END;

CREATE TABLE usuarios (
    id                         NUMBER NOT NULL,
    contra                     VARCHAR2(20 CHAR) NOT NULL,
    email                      VARCHAR2(100 CHAR) UNIQUE NOT NULL,
    confirmado                 NUMBER DEFAULT 0 NOT NULL,
    nombre                     VARCHAR2(50 CHAR) NOT NULL,
    apellido                   VARCHAR2(50 CHAR) NOT NULL,
    EsAdmin	                   NUMBER DEFAULT 0 NOT NULL,
    telefono                   NUMBER NOT NULL,
    fotografia                 VARCHAR2(200 CHAR) NOT NULL,
    genero                     VARCHAR2(5 CHAR),
    fecha_nacimiento           DATE NOT NULL,
    direccion                  VARCHAR2(200 CHAR) NOT NULL,
    tipo_membrecia             VARCHAR2(50 CHAR) DEFAULT 'GRATIS' NOT NULL,
    pais    				   VARCHAR2(50 CHAR) NOT NULL,
    fecha_registro             DATE DEFAULT SYSDATE NOT NULL
);
ALTER TABLE usuarios
    ADD CONSTRAINT usuarios_pk PRIMARY KEY (id);

CREATE SEQUENCE Secuencia_Incremento_Usuario
INCREMENT BY 1
START WITH 1
NOMINVALUE
NOMAXVALUE;

CREATE OR REPLACE TRIGGER Trigger_Incremento_Usuario
BEFORE INSERT ON Usuarios
REFERENCING NEW AS NEW FOR EACH ROW
DECLARE valorSecuencia NUMBER := 0;
BEGIN
SELECT Secuencia_Incremento_Usuario.NEXTVAL INTO valorSecuencia FROM DUAL;
:NEW.id := valorSecuencia;
END;

ALTER TABLE competicion
    ADD CONSTRAINT competicion_equipo_fk FOREIGN KEY ( equipo_id_equipo )
        REFERENCES equipo ( id_equipo );

ALTER TABLE director_tecnico
    ADD CONSTRAINT director_tecnico_equipo_fk FOREIGN KEY ( equipo_id_equipo )
        REFERENCES equipo ( id_equipo );

ALTER TABLE jugador
    ADD CONSTRAINT jugador_equipo_fk FOREIGN KEY ( equipo_id_equipo )
        REFERENCES equipo ( id_equipo );

ALTER TABLE noticias
    ADD CONSTRAINT noticias_empleados_fk FOREIGN KEY ( empleados_id_empleado )
        REFERENCES empleados ( id_empleado );

ALTER TABLE noticias
    ADD CONSTRAINT noticias_equipo_fk FOREIGN KEY ( equipo_id_equipo )
        REFERENCES equipo ( id_equipo );

ALTER TABLE partido
    ADD CONSTRAINT partido_equipo_fk FOREIGN KEY ( equipo_id_equipo )
        REFERENCES equipo ( id_equipo );

ALTER TABLE partido
    ADD CONSTRAINT partido_equipo_fkv2 FOREIGN KEY ( equipo_id_equipo2 )
        REFERENCES equipo ( id_equipo );

ALTER TABLE partido
    ADD CONSTRAINT partido_estadios_fk FOREIGN KEY ( estadios_id_estadio )
        REFERENCES estadios ( id_estadio );

ALTER TABLE partido_incidencias
    ADD CONSTRAINT partido_incidencias_jugador_fk FOREIGN KEY ( jugador_id_jugador )
        REFERENCES jugador ( id_jugador );

ALTER TABLE partido_incidencias
    ADD CONSTRAINT partido_incidencias_partido_fk FOREIGN KEY ( partido_id_partido )
        REFERENCES partido ( id_partido );

ALTER TABLE subs_equipos
    ADD CONSTRAINT subs_equipos_equipo_fk FOREIGN KEY ( equipo_id_equipo )
        REFERENCES equipo ( id_equipo );

ALTER TABLE subs_equipos
    ADD CONSTRAINT subs_equipos_usuarios_fk FOREIGN KEY ( usuarios_id )
        REFERENCES usuarios ( id );
       
INSERT INTO
USUARIOS (nombre,apellido,contra,email,confirmado,EsAdmin,telefono,fotografia,genero,FECHA_NACIMIENTO ,DIRECCION,TIPO_MEMBRECIA,pais,FECHA_REGISTRO)
VALUES
('admin','admin','admin','admin@gmail.com',1,1,12345678,'foto','M','31/07/2001','Ciudad','Gratis','Guatemala',SYSDATE);




