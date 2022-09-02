export interface Event {
    id:number,
    title:string,
    description?:string,
    mode:string,
    province?:string,
    city?:string,
    street?:string,
    number?:number,
    link?:string,
    init_date:Date,
    end_date:Date,
    cancelled:boolean,
    idType:number,
    photo?:string,
    idUser:number,
    finished:boolean,

    adminUser:string,
    type?:string,
    people?: number,
    valor?: number,
    adminPhoto?:string,
    verifiedadmin?:boolean,
    participateDisabled?: boolean,
}