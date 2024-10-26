// A classe AppError define um tipo de erro customizado que carrega uma mensagem (message) e um código de status HTTP (statusCode).

class AppError {
    message: string
    statusCode: number

    constructor(message: string, statusCode: number = 400){
        this.message = message
        this.statusCode = statusCode
    }
}

export { AppError }





