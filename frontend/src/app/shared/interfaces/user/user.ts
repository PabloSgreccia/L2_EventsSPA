export interface User {
    _id?:number,
    name:String,
    email:String,
    password?:String,
    role?:String,
    photo?:String,
    validated?:number
}
