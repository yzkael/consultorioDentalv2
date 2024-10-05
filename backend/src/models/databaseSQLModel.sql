--POSTGRESS DB

CREATE DATABASE simple_consultorio_v2;

use simple_consultorio_v2;

    -- DEBO ANHADIR EL creado_por Column luego cuando introduzca el logins
    --En realidad supongo que si anhado un "gerente" rol que pueda crear necesitare un creado_por
    
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

--Cargo especial Sudo
INSERT INTO Cargos(nombre) VALUES ('sudo');


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


--Anhadir creado_por column para identificar el trabajador
--Anhadire la columna is_active para identificar que no fue softDeleteado
CREATE TABLE Pacientes(
    id_paciente INTEGER PRIMARY KEY REFERENCES Personas(id_persona),
    creado_por INTEGER REFERENCES Administrativo(id_administrativo),
    is_active BOOLEAN DEFAULT true
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


--Tal vez sea mejor deshacerse del procedimiento y simplemente dejar un espacio libre para que el medico/dentista pueda describir libremente lo que realizo. 

CREATE TABLE Procedimientos_Consultas(
    id_procedimientos_consultas BIGSERIAL PRIMARY KEY,
    procedimiento INTEGER REFERENCES Procedimientos(id_procedimiento),
    consulta INTEGER REFERENCES Consultas(id_consulta)
);

--Podria simplemente crear Procedimiento: Titlo, Descripcion y precio asi podriamos tambien facilitar el cobro en caja.
-- Esto debido que aunque el procedimiento sea "el mismo" por las diferentes razones que conllevan cada tratamiento y las complicaciones que se dieron en su realizacion, el cobro podria variar

CREATE TABLE Procedimientos(
    id_procedimiento BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL
);

--Anhadir la columna: Dosis para identificar cada cuantas horas sera requerido su consumo
CREATE TABLE Procedimientos_Medicamentos(
    id_procedimiento_medicamento BIGSERIAL PRIMARY KEY,
    medicamento INTEGER REFERENCES Medicamentos(id_medicamento),
    procedimiento INTEGER REFERENCES Procedimientos(id_procedimiento)
);

--Me gustaria intentar utilizar una API para reunir los medicamentos
CREATE TABLE Medicamentos(
    id_medicamento BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    cantidad INTEGER NOT NULL
);