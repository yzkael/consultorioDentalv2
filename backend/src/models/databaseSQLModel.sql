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


-- TODO:                               IMPLEMENTACION PENDIENTE
CREATE TABLE Horario_Atiende(
    id_horario_atiende BIGSERIAL PRIMARY KEY,
    dentista INTEGER REFERENCES Dentistas(id_dentista),
    horario INTEGER REFERENCES Horarios(id_horario)
);

CREATE TABLE Horarios(
    id_horario BIGSERIAL PRIMARY KEY,
    horario VARCHAR(50) DEFAULT 'manhana' --Dependera si es manhana, noche, media tarde, todos estos valores se lidiaran en la capa negocios
)

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


--Puedo eliminar esta tabla y anhadir la columna ayudante en la tabla consulta para asi 
--poner a un medico principal y varios ayudantes
-- CREATE TABLE Consultas_Medicos(
--     id_consultas_medico BIGSERIAL PRIMARY KEY,
--     destista INTEGER REFERENCES Dentistas(id_dentista),
--     consulta INTEGER REFERENCES Consultas(id_consulta)
-- );

CREATE TABLE Consultas(
    id_consulta BIGSERIAL PRIMARY KEY,
    paciente INTEGER REFERENCES Pacientes(id_paciente),
    creado_por INTEGER REFERENCES Administrativo(id_administrativo),
    fecha_designada DATE NOT NULL,
    hora_designada TIME NOT NULL,
    consulta_completa BOOLEAN DEFAULT false,
    dentista INTEGER REFERENCES Dentistas(id_dentista)
);
--Las personas que participaron de la Consulta
--Esta tabla se generara a la par de que la consulta fuese completada
CREATE TABLE Ayudantes_Consultas(
    id_ayudante_consulta BIGSERIAL PRIMARY KEY,
    ayudante INTEGER REFERENCES Dentistas(id_dentista),
    consulta INTEGER REFERENCES Consultas(id_consulta)
);
--De la consulta se crea una Receta que sirve como forma de cobranza 
CREATE TABLE Recetas(
    id_receta BIGSERIAL PRIMARY KEY,
    fecha_emision DATE DEFAULT CURRENT_DATE,
    descripcion INTEGER NOT NULL,
    precio_a_pagar INTEGER NOT NULL,
    creado_por INTEGER REFERENCES Dentistas(id_dentista),
    consulta INTEGER REFERENCES Consultas(id_consulta)
);

--Tabla a crear por si la API es creada
-- CREATE TABLE Prescripcion_Medicamentos()

--Tenia planeado tener el monto total en la tabla para siempre tener la referencia de cuatno hay que pagar
-- Pero lidiare con el saldo en la capa de negocios
--Cuando se genere una receta debera notificar al UI de que se debe cobrar una Receta Generada
-- Podria poner alguna senhalizacion en la Tarjeta de Manejar Cobros
CREATE TABLE Pagos (
    id_pago BIGSERIAL PRIMARY KEY,
    observaciones TEXT NULL,
    monto_pagado INTEGER NOT NULL, -- El monto pagado por el paciente
    fecha_pago DATE DEFAULT CURRENT_DATE,
    metodo_pago VARCHAR(50) NOT NULL, -- Efectivo, tarjeta, transferencia, etc.
    facturado BOOLEAN DEFAULT FALSE, -- Indica si se emitió factura
    id_factura INTEGER REFERENCES Facturas(id_factura) NULL, -- Relación opcional con la tabla Facturas
    id_receta INTEGER NOT NULL REFERENCES Recetas(id_receta),
    -- monto_total INTEGER REFERENCES Recetas(precio_a_pagar) 
);

--Todos los % y los calculos seran lidiados en la capa de Negocios

CREATE TABLE Facturas (
    id_factura BIGSERIAL PRIMARY KEY,
    id_pago INTEGER NOT NULL REFERENCES Pagos(id_pago),
    numero_factura VARCHAR(20) NOT NULL,
    fecha_emision DATE DEFAULT CURRENT_DATE,
    nit_cliente VARCHAR(15),
    nombre_cliente VARCHAR(255) DEFAULT "PACIENTE",
    codigo_control VARCHAR(50),
    importe_base DECIMAL(10, 2) NOT NULL,
    debito_fiscal DECIMAL(10, 2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'Emitida' -- Estado de la factura (Emitida, Anulada, Pagada, etc.)
);




--OPCIONAL: Si en caso no puedo utilizar la API para los medicamentos tendria que crear la tabla


--Me gustaria intentar utilizar una API para reunir los medicamentos
CREATE TABLE Medicamentos(
    id_medicamento BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    cantidad INTEGER NOT NULL
);