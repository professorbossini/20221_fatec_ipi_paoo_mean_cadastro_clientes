import { AbstractControl } from '@angular/forms'
import { Observable, Observer } from 'rxjs'

export const mimeTypeValidator = (
    control: AbstractControl
): Promise <{[key:string]:any}> | Observable <{[key: string]: any}>=> {
    const arquivo = control.value as File
    const leitor = new FileReader()
    const observable = new Observable((observer: Observer <{[key: string]: any}>) => {

        leitor.addEventListener ('loadend', () => {
            const bytes = new Uint8Array (leitor.result as ArrayBuffer).subarray(0, 4)
            let valido: boolean = false
            let header = ""
            for (let i = 0; i < bytes.length; i++){
                header += bytes[i].toString(16)
            }
            console.log(header)
            switch (header){
                // isso é png
                case '89504e47':
                // esses todos são variações de jpg
                case 'ffd8ffe0':
                case 'ffd8ffe1':
                case 'ffd8ffe2':
                case 'ffd8ffe3':
                case 'ffd8ffe8':
                // isso é bmp
                case '424db682':
                    valido = true
                break
                default:
                    valido = false
            }
            observer.next(valido ? null : {mimTypeInvalido: true})
            observer.complete()

        })
        leitor.readAsArrayBuffer(arquivo)
    })
    return observable
}