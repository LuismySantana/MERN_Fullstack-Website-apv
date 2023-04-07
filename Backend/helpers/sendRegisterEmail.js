import nodemailer from "nodemailer";



const sendRegisterEmail = async (userData) => {
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
		subject: "APV - Verifica tu cuenta",
		text: "Verifica tu email en APV", // Texto plano que no es analizado como HTML
		html: `
			<h3>¡Bienvenido ${name}!</h3>
			<p>Verifica tu cuenta para APV clicando en este enlace:
				<a href="${process.env.FRONTEND_URL}/confirm-email/${email}/${token}" target="_blank">Verifica tu cuenta</a>
			</p>
			
			<p>Si tu no has creado una cuenta en APV, ignora este mensaje.</p>
		`
    });

	console.log(`Mensaje enviado: %s${info.messageId}`);

}



export default sendRegisterEmail;