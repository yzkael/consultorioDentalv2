-- POSTGRESS DB

CREATE DATABASE simple_consultorio_v2;

USE simple_consultorio_v2;

CREATE TABLE extensiones(
    extension VARCHAR(10) PRIMARY KEY
);

--Hardcoded Values

INSERT INTO extension(extension) VALUES("SC");
INSERT INTO extension(extension) VALUES("LP");
INSERT INTO extension(extension) VALUES("CB");
INSERT INTO extension(extension) VALUES("PA");
INSERT INTO extension(extension) VALUES("OR");
INSERT INTO extension(extension) VALUES("BN");
INSERT INTO extension(extension) VALUES("TJ");
INSERT INTO extension(extension) VALUES("CH");
INSERT INTO extension(extension) VALUES("PT");


CREATE TABLE personas(
    id_persona BIGSERIAL PRIMARY KEY,
    apellido_paterno VARCHAR(50) NOT NULL,
    apellido_materno VARCHAR(50) NOT NULL,
    correo VARCHAR(50) NOT NULL UNIQUE,
    fecha_creacion DATE DEFAULT CURRENT_DATE,
    carnet INTEGER NOT NULL,
    extension VARCHAR(10) REFERENCES extensiones(extension) NULL
);

CREATE TABLE cargos(
    id_cargo BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    especialidad_medico VARCHAR(50) NULL --Resalta que es opcional
);


--Hardcoded Values

INSERT INTO cargos(nombre) VALUES ('recepcionista');
INSERT INTO cargos(nombre) VALUES ('cajero');
INSERT INTO cargos(nombre,especialidad_medico) VALUES('medico','general');
INSERT INTO cargos(nombre,especialidad_medico) VALUES('medico','dermatologo');
INSERT INTO cargos(nombre,especialidad_medico) VALUES('medico','pediatra');
INSERT INTO cargos(nombre,especialidad_medico) VALUES('medico','oftalmologo');


CREATE TABLE empleados(
    id_empleado INTEGER REFERENCES personas(id_persona) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    esta_active BOOLEAN DEFAULT true,
    fecha_creacion DATE DEFAULT CURRENT_DATE,
    cargo INTEGER REFERENCES cargos(id_cargo),
    fecha_fin DATE NULL
);

CREATE TABLE pacientes(
    id_paciente INTEGER REFERENCES personas(id_persona),
    creado_por INTEGER REFERENCES empleados(id_empleado),
    fecha_creacion DATE DEFAULT CURRENT_DATE
);

--Hardcoded Tables

CREATE TABLE horarios(
    id_hora BIGSERIAL PRIMARY KEY,
    hora TIME NOT NULL UNIQUE --Vendran Datos como "14:30:00 HardCoded" 
);

CREATE TABLE tipo_consultas(
    id_tipo_consulta BIGSERIAL PRIMARY KEY, 
    nombre VARCHAR(50) --Vendran los datos "consulta y reconsulta"
)

CREATE TABLE consultas(
    id_consulta BIGSERIAL PRIMARY KEY,
    fecha_asignada DATE NOT NULL,
    medico_asignado INTEGER REFERENCES empleados(id_empleado),
    creado_por INTEGER REFERENCES empleados(id_empleado),
    paciente INTEGER REFERENCES paciente(id_paciente),
    fecha_creacion DATE DEFAULT CURRENT_DATE,
    consulta_completada BOOLEAN DEFAULT false,  
    hora_asignada INTEGER REFERENCES horarios(id_hora),
    tipo_consultas INTEGER REFERENCES tipo_consultas(id_tipo_consulta)
);
