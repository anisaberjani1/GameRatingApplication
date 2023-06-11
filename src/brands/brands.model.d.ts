export interface brandDTO{
    id:number,
    name: string,
    description:string,
    dateOfRelease:Date,
    picture: string,
}

export interface brandCreationDTO{
    name: string,
    dateOfRelease?:Date,
    picture?: File,
    pictureURL?:string,
    description?:string
}

export interface brandsDTO{
    id:number,
    name:string,
    company:string,
    picture:string
}