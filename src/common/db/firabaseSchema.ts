export class User {
  id!: string;
  email!: string;
  name!: string;
  apellido!: string;
  password!: string;
  sectorOmic: string;
  roles: Rol[];
  estadoConsulta: EstadoConsulta[];
}

export class Rol {
  id: Int16Array;
  name: String;
  permissions: String[];
}

export class Denunciante {
  id!: string;
  dni!: Int16Array;
  cuil!: Int16Array;
  telefono_celular: String;
  telefono_fijo: String;
  domicilioDireccion: String;
  domicilioNumero: String;
  domicilioPiso: String;
  codigoPostal: Int16Array;
  Localidad: Localidad;
  consultas: Consulta[];
  createdAt: Date;
}

export class Archivo {
  id: Int16Array;
  nombre: String;
  tipo: String;
  createdAt: Date;
  //Relaciones
  consultaId: Consulta; // Asociado a la consulta.id
}

export class EmpresaDenunciada {
  id: Int16Array;
  nombre: String;
  cuit: Int16Array; //Unique.
  telefono: string;
  domicilioDireccion: String;
  domicilioNumero: Int16Array;
  domicilioPiso: Int16Array;
  createdA: Date;
  //Relaciones
  localidad: Localidad;
  reclamos: Reclamo[];
  consultas: Consulta[];
}

export class Reclamo {
  id: Int16Array;
  fechaReclamo: Date;
  fechaRecepcion: Date;
  estado: String;
  createdAt: Date;
  //Relaciones
  empresaDenunciadaId: EmpresaDenunciada;
}

export class Localidad {
  id: Int16Array;
  nombre: String;
  provincia: String;
  createdAt: Date;
  empresasDenunciadas: EmpresaDenunciada[];
  denunciantes: Denunciante[];
}

export class Consulta {
  id: Int16Array;
  descripcion: String;
  createdAt: Date;
  // Relaciones
  TipoConsulta: TipoConsulta;
  EmpresaDenunciada: EmpresaDenunciada;
  archivos: Archivo[];
  estadosConsulta: EstadoConsulta[];
  denuncianteId: User;
  ultimoEstadoConsultaId: Int16Array;
  EstadoConsulta: EstadoConsulta[];
}

export class TipoConsulta {
  id: Int16Array;
  nombre: String;
  descripcion: String;
  createdAt: Date;
  // Relaciones
  consultas: Consulta[];
}

export class EstadoConsulta {
  id: Int16Array;
  nombre: String;
  descripcion: String;
  createdAt: Date;
  // Relaciones
  Consulta: Consulta;
  empleadoOmicId: User;
  ultimoEstado: Consulta;
}

export class UserAccess {
  id!: string;
  email!: string;
  created!: Date;
}

export class UserAccessRequest {
  id!: string;
  email!: string;
  message?: string;
  created!: Date;
}
