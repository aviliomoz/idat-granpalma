export type Cliente = {
  id: 1;
  dni: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  email: string;
};

export type Imagen = {
  id: number;
  habitacion_id: number;
  url: string;
};

export type Habitacion = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  capacidad: number;
  estado: boolean;
  imagenes: Imagen[];
};

export type Reserva = {
  id: string;
  cliente_id: number;
  habitacion_id: number;
  fecha_llegada: string;
  fecha_salida: string;
  huespedes: number;
  estado: boolean;
};

export type Filtro = {
  llegada: string;
  salida: string;
  adultos: number;
  infantes: number;
};

export type Correo = {
  id: number;
  correo: string;
}
