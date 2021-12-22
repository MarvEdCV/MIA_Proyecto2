@@ -0,0 +1,77 @@
CREATE TABLE pais (
    id_pais NUMBER NOT NULL,
    pais    VARCHAR2(50 CHAR) NOT NULL
);

ALTER TABLE pais ADD CONSTRAINT pais_pk PRIMARY KEY ( id_pais );

CREATE TABLE tipousuario (
    id_tipousuario NUMBER NOT NULL,
    tipo_usuario   VARCHAR2(20 CHAR) NOT NULL
);

ALTER TABLE tipousuario ADD CONSTRAINT tipousuario_pk PRIMARY KEY ( id_tipousuario );

CREATE TABLE usuarios (
    id                         NUMBER NOT NULL,
    usuario                    VARCHAR2(15 CHAR) NOT NULL,
    contra                     VARCHAR2(20 CHAR) NOT NULL,
    email                      VARCHAR2(100 CHAR) NOT NULL,
    tipo_usuario               INTEGER NOT NULL,
    nombre                     VARCHAR2(50 CHAR) NOT NULL,
    apellido                   VARCHAR2(50 CHAR) NOT NULL,
    tipousuario_id_tipousuario NUMBER NOT NULL,
    telefono                   NUMBER NOT NULL,
    fotografia               VARCHAR2(200 CHAR) NOT NULL,
    genero                     VARCHAR2(5 CHAR),
    fecha_nacimiento           DATE NOT NULL,
    direccion                  VARCHAR2(200 CHAR) NOT NULL,
    tipo_membrecia             VARCHAR2(50 CHAR) NOT NULL,
    pais_id_pais               NUMBER NOT NULL,
    fecha_registro             DATE NOT NULL
);

ALTER TABLE usuarios
    ADD CONSTRAINT usuarios_pk PRIMARY KEY ( id);

ALTER TABLE usuarios
    ADD CONSTRAINT usuarios_pais_fk FOREIGN KEY ( pais_id_pais )
        REFERENCES pais ( id_pais );

ALTER TABLE usuarios
    ADD CONSTRAINT usuarios_tipousuario_fk FOREIGN KEY ( tipousuario_id_tipousuario )
        REFERENCES tipousuario ( id_tipousuario );

CREATE SEQUENCE Secuencia_Incremento1
INCREMENT BY 1
START WITH 1
NOMINVALUE
NOMAXVALUE;

CREATE OR REPLACE TRIGGER Trigger_Incremento1
BEFORE INSERT ON tipousuario
REFERENCING NEW AS NEW FOR EACH ROW
DECLARE valorSecuencia NUMBER := 0;
BEGIN
SELECT Secuencia_Incremento1.NEXTVAL INTO valorSecuencia FROM DUAL;
:NEW.id_tipousuario := valorSecuencia;
END;

CREATE SEQUENCE Secuencia_Incremento_Pais
INCREMENT BY 1
START WITH 1
NOMINVALUE
NOMAXVALUE;

CREATE OR REPLACE TRIGGER Trigger_Incremento_Pais
BEFORE INSERT ON pais
REFERENCING NEW AS NEW FOR EACH ROW
DECLARE valorSecuencia NUMBER := 0;
BEGIN
SELECT Secuencia_Incremento_Pais.NEXTVAL INTO valorSecuencia FROM DUAL;
:NEW.id_pais := valorSecuencia;
END;

insert into tipousuario (tipo_usuario) values ('Administrador');
insert into tipousuario (tipo_usuario) values ('Empleado');
insert into tipousuario (tipo_usuario) values ('Cliente');