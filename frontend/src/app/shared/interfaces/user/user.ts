export interface User {
    id:number,
    name:string,
    email:string,
    password?:string,
    role:string,
    photo?:string,
    validated:number,

    active?: boolean,
    foto?:string | null,
    privacy?:string | boolean | null,
    validationCode?: null
}
