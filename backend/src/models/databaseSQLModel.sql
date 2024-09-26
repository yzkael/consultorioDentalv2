--POSTGRESS DB

CREATE DATABASE simple_consultorio_v2;

use simple_consultorio_v2;

    -- Debo quitar Unique
    -- Esto con el proposito de permitir que se creen diferentes personas y diferentes roles
    -- DEBO ANHADIR EL creado_por Column luego cuando introduzca el logins

CREATE TABLE Personas(
    id_persona BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    ap_paterno VARCHAR(50) NOT NULL,
    ap_materno VARCHAR(50) NOT NULL,
    carnet VARCHAR(50) NOT NULL,
    correo  VARCHAR(50) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    fecha_crear DATE DEFAULT CURRENT_DATE
);

    -- Debo quitar el unique para denotar el fin de ese usuario con ese rol especifico
    -- El valor seguira manteniendose en la base de datos
    -- DEBO ANHADIR EL creado_por Column luego cuando introduzca el logins
CREATE TABLE Personal(
    id_personal INTEGER PRIMARY KEY REFERENCES Personas(id_persona),
    username VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    fecha_fin DATE
);

CREATE TABLE Administrativo(
    id_administrativo INTEGER PRIMARY KEY REFERENCES Personal(id_personal),
    cargo INTEGER REFERENCES Cargos(id_cargo)
);

--Valores Cargos son HARDCODED
CREATE TABLE Cargos (
    id_cargo BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Cargos Administrativos
INSERT INTO Cargos(nombre) VALUES ('Recepcionista');
INSERT INTO Cargos(nombre) VALUES ('Administrador');


CREATE TABLE Dentistas(
    id_dentista INTEGER PRIMARY KEY REFERENCES Personal(id_personal),
    especialidad INTEGER REFERENCES Especialidades(id_especialidad)
);

CREATE TABLE Especialidades(
    id_especialidad BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

--Especialidades para los dentistas
INSERT INTO Especialidades(nombre) VALUES('Maxilofacial');
INSERT INTO Especialidades(nombre) VALUES ('Endodoncista');
INSERT INTO Especialidades(nombre) VALUES ('General');
INSERT INTO Especialidades(nombre) VALUES ('Ayudante');



CREATE TABLE Pacientes(
    id_paciente INTEGER REFERENCES Personas(id_persona)
);

CREATE TABLE Consultas_Medicos(
    id_consultas_medico BIGSERIAL PRIMARY KEY,
    destista INTEGER REFERENCES Dentistas(id_dentista),
    consulta INTEGER REFERENCES Consultas(id_consulta)
);


CREATE TABLE Consultas(
    id_consulta BIGSERIAL PRIMARY KEY,
    paciente INTEGER REFERENCES Pacientes(id_paciente),
    creado_por INTEGER REFERENCES Administrativo(id_administrativo),
    fecha_designada DATE NOT NULL,
    hora_designada TIME NOT NULL,
    estado_consulta VARCHAR(10) DEFAULT "pendiente",
    procedimientos INTEGER REFERENCES Procedimientos(id_procedimiento)    
);

CREATE TABLE Procedimientos_Consultas(
    id_procedimientos_consultas BIGSERIAL PRIMARY KEY,
    procedimiento INTEGER REFERENCES Procedimientos(id_procedimiento),
    consulta INTEGER REFERENCES Consultas(id_consulta)
);

CREATE TABLE Procedimientos(
    id_procedimiento BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL
);

CREATE TABLE Procedimientos_Medicamentos(
    id_procedimiento_medicamento BIGSERIAL PRIMARY KEY,
    medicamento INTEGER REFERENCES Medicamentos(id_medicamento),
    procedimiento INTEGER REFERENCES Procedimientos(id_procedimiento)
);


CREATE TABLE Medicamentos(
    id_medicamento BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    cantidad INTEGER NOT NULL
);