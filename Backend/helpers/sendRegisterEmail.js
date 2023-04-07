import nodemailer from "nodemailer";



const sendRegisterEmail = (email, token) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PWD
        }
      });
}



export default sendRegisterEmail;