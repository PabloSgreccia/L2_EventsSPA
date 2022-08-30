export interface Event {
    _id?:number,
    title:String,
    description:String,
    mode:String,
    province?:String,
    city?:String,
    street?:String,
    number?:number,
    link?:String,
    init_date:Date,
    end_date:Date,
    cancelled:boolean,
    type:string,
    photo?:String,
    finished:boolean,
    adminUser:string,

    people?: number,
    valor?: number,
    adminPhoto?:string,
    verifiedadmin?:boolean,
    participateDisabled?: boolean,
}