export interface Usuario {
    id?: string,
    contrasena?: string,
    ingresoMensual?: number,
    gastos?: Array<Gasto>,
    gastosDelMes?: Array<Gasto>,
    gastoTotal?: number,
    retos?: Retos,
    ultimoMes?: number,
    ultimoAno?: number,
}


//------------------------------------------Gasto
export interface Gasto {
    id: string,
    precio: number,
    dia: number,
    diaCobro?: number,
    tipo: "Mensual" | "Trimestral" | "Anual";
    estado?: "Pendiente" | "Cercano" | "Pagado" | "SinPagar",
    color?: string,
    meses?: Array<number>;
    mes?: number;
    ano?: number;
}
//------------------------------------------


//------------------------- -----------------Reto
export interface RetoPropio {
    id?: string, //nombre que se le dé al crearlo
    idCompartido?:string,
    idCreador?: string, // id del usuario actual creador
    ahorroNecesario?: number,
    aporte?:number,
    aporteIndividualTotal?:number,
    aporteTotal?:number,
    fecha?: string,
    aceptados?: Array<string>,
    pendientes?: Array<string>
}

export interface RetoCompartido {
    id?: string, /*id del reto aceptado, es el nombre
                orginal del reto más el id del creador*/
    idReal?: string, //id original del reto
    idCreador?: string,//id del que creó el reto
    idQuienAcepta?:string,
    ahorroNecesario?: number,
    aporte?:number,
    aporteIndividualTotal?:number,
    fecha?: string,
    aceptados?: Array<string>,
}

export interface Retos {
    ahorroTotalPropios?: number;
    ahorroTotalAceptados?: number,
    ahorroTotalMensualPropios?:number,
    ahorroTotalMensualAceptados?:number,
    propios?: Array<RetoPropio>,
    aceptados?: Array<RetoCompartido>,
    pendientes?: Array<RetoCompartido>,
    listeners?: Array<RetoCompartido>
}
//------------------------------------------




