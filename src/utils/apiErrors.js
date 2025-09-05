class ApiErrors extends Error {
    constructor(statusCode, message = "something went wrong",errors = [],stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.stack = stack;
        this.success = false;
        this.message = message;
        this.date = new Date();
        this.data = null;
        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiErrors;