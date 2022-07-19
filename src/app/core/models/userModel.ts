import { IUser } from "../interfaces/IUser";

export class User implements IUser {
    id!: number
    name!: string
    email!: string
    ph_no!: string
    city!: string
    state!: string
    password!: string

}