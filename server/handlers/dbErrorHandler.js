const getUniqueKeyErrorMessage = (err) => {
    let output
    try {
        let fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2,err.message.lastIndexOf('_1'))
        let output1 =  fieldName.slice(56) +' already exists.'
        output = output1.charAt(0).toUpperCase() + output1.slice(1)
    } catch (ex) {
        output = 'Unique field already exists'
    }

    return output
}

const errorMessage = err =>{
    let message =''
    if(err.code){
        switch(err.code){
            case 11000:
            case 11001:
                message = getUniqueKeyErrorMessage(err)
                break
            default:
                message="Something went wrong"
        }
    }
    else{
        for (let errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message
        }
    }
    return message
}
export default errorMessage