// Es recomendable hacer helpers para no cargar mucho los scripts. Asi mismo es recomendable que hagas muchos helpers con ayudas individuales a uno muy grandes porque los import tardarían más en cargar

const generateToken = () => {
    return Date.now().toString(32) + Math.random().toString(32).substring(2);

}



export default generateToken;