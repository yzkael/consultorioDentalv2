--POSTGRESS DB

CREATE DATABASE simple_consultorio_v2;

use simple_consultorio_v2;


CREATE TABLE Personas(
    id_persona BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    ap_paterno VARCHAR(50) NOT NULL,
    ap_materno VARCHAR(50) NOT NULL,
    carnet VARCHAR(50) NOT NULL,
    genero VARCHAR(5) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    fecha_crear DATE DEFAULT CURRENT_DATE
);

CREATE TABLE Personal(
    id_personal INTEGER REFERENCES Personas(id_persona),
    username VARCHAR(50) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    fecha_fin DATE
);

CREATE TABLE Administrativo(
    id_administrativo INTEGER REFERENCES Personal(id_personal),
    cargo INTEGER REFERENCES Cargos(id_cargo)
);

CREATE TABLE Cargos (
    id_cargo BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Dentistas(
    id_dentista INTEGER REFERENCES Personal(id_personal),
    especialidad INTEGER REFERENCES Especialidades(id_especialidad)
);

CREATE TABLE Especialidades(
    id_especialidad BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

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