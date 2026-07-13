const { Resend } = require('resend');


const resend = new Resend(
    process.env.RESEND_API_KEY
);





async function enviarEmailVerificacao(email, nome, token){


    const link =
    `vamosair://resetar-senha/${token}`;



    await resend.emails.send({

        from: 'Seu App <onboarding@resend.dev>',


        to: email,


        subject:'Confirme seu email ❤️',


        html:`

        <h1>Olá ${nome}!</h1>


        <p>
        Obrigado por criar sua conta.
        </p>


        <p>
        Clique abaixo para confirmar seu email:
        </p>


        <a href="${link}"

        style="
        background:#E11D48;
        color:white;
        padding:12px 20px;
        border-radius:8px;
        text-decoration:none;
        ">

        Confirmar email

        </a>

        `


    });


}









async function enviarEmailReset(email, nome, token){


    const link = 
    `${process.env.APP_URL}/usuarios/resetar-senha/${token}`;



    await resend.emails.send({


        from:'Seu App <onboarding@resend.dev>',


        to:email,


        subject:'Recuperação de senha 🔐',


        html:`


        <h1>Olá ${nome}!</h1>


        <p>
        Recebemos uma solicitação para alterar sua senha.
        </p>


        <p>
        Clique abaixo para criar uma nova senha:
        </p>



        <a href="${link}"

        style="
        background:#001eff;
        color:white;
        padding:12px 20px;
        border-radius:8px;
        text-decoration:none;
        ">


        Redefinir senha


        </a>



        <p>
        Esse link expira em 10 minutos.
        </p>


        `


    });


}






module.exports = {

    enviarEmailVerificacao,

    enviarEmailReset

};