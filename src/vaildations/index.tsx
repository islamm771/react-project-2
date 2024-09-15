export const productsValidation = (product:{title: string,description: string,imageURL: string,price: string}) =>{

    const errors:{title: string,description: string,imageURL: string,price: string} = {
        title: "",
        description: "",
        imageURL: "",
        price: "",
    }

    if(!product.title.trim() || product.title.length < 10 || product.title.length > 80){
        errors.title = "Product Title must be between 10 characters and 80 characters"
    }
    if(!product.description.trim() || product.description.length < 50 || product.description.length > 200){
        errors.description = "Product Description must be between 50 characters and 200 characters"
    }
    

    return errors;
}