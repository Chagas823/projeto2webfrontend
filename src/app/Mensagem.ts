import { Usuario } from "./Usuario";

 export interface Mensagem{
    id: number,
    mensagem: string,
    emissor: Usuario,
    receptor: Usuario,
    data: Date,
    dataString: string
}