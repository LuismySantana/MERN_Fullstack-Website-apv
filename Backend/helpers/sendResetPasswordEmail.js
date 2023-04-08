import nodemailer from "nodemailer";



const sendResetPasswordEmail = async (userData) => {
    const { email, name, token } = userData;

    // Primero seteamos la configuracion de envio
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PWD
        }
    });

    // Enviamos el email
    const info = await transport.sendMail({
		from: "noreply@apvadmin.com",
		to: email,
		subject: "APV - Recuperar contraseña",
		text: "Recuperar contraseña para APV", // Texto plano que no es analizado como HTML
		html: `
			<h3>¡Hola ${name}!</h3>
			<p>Has solicitado recupear tu contraseña para APV, haz click aquí para hacerlo:
				<a href="${process.env.FRONTEND_URL}/reset-password/${email}/${token}" target="_blank">Recuperar contraseña</a>
			</p>
			
			<p>Si tu no has solicitado un cambio de contraseña en APV, ignora este mensaje.</p>
		`
    });

	console.log(`Mensaje enviado: %s${info.messageId}`);

}



export default sendResetPasswordEmail;