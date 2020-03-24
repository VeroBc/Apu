const express = require('express')
const sgMail = require('@sendgrid/mail');

const app = express()
app.use(express.urlencoded({ extended: false }));

const puerto = 7779

const msg = {
    to: 'verobc.cel@gmail.com',
    from: 'verobc.cel@gmail.com'
};

app.get('/enviarEmail', (req, res) => {

    sgMail.setApiKey(SENDGRID_API_KEY);
    let aMsg = msg;
    aMsg.subject ='Enviando correos con SendGrid is Fun'
    aMsg.text = 'Esta es una prueba para enviar correos'
    aMsg.html = '<strong>Esta es una prueba para enviar correos</strong>'

    sgMail
        .send(aMsg)
        .then(() => {console.log('correo enviado')}, console.error);
    res.send('Aquí vamos a mandar un email')
});

app.get('/llenarForm',  (req, res) => {
    res.sendFile( __dirname + '/HTML/userForm.html');
});

app.get('/estilos/userForm',  (req, res) => {
    res.sendFile( __dirname + '/CSS/userForm.css');
});

app.post('/recibirData',  (req, res) => {
    let mensaje = "Gracias por enviar la información: ";
    mensaje += " Nombres: " +req.body.fname + " " + req.body.lname + "."
    mensaje += " DNI: "+ req.body.dni
    mensaje += " Email: " + req.body.email 
    mensaje += " Sede: " + req.body.sede

    if ( req.body.curso1 != null) 
        mensaje += ". Curso 1: " + req.body.curso1

    if ( req.body.curso2 != null)    
        mensaje += ". Curso 2: " + req.body.curso2

    if ( req.body.curso3 != null)
        mensaje += ". Curso 3: " + req.body.curso3

    mensaje += " Periodo: " + req.body.start

    res.send(mensaje);

    sgMail.setApiKey(SENDGRID_API_KEY);

    let aMsg = msg;
    aMsg.subject ='Recibir data de formulario'
    aMsg.text = mensaje
    sgMail.send(aMsg)

});


app.listen(puerto, () => console.log(`Estamos empezando a escucharte por tercera vez ${puerto}!`))
