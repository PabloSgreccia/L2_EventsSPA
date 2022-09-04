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
    init_date:Date | string,
    end_date:Date | string,
    cancelled:boolean,
    idType:number,
    photo?:string,
    finished:boolean,

    cantPeople:number,

    type: {
        type:string,
        photo:string,
    }

    user: {
        id:number,
        name:string,
        photo:string
        validated:number
    },
}
