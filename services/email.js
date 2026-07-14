const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function enviarEmailVerificacao(email, nome, token) {
    try {
        const link = `${process.env.APP_URL}/usuarios/verificar/${token}`;

        console.log("Enviando email para:", email);

        const resposta = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Confirme seu email ❤️",
            html: `
                <h1>Olá ${nome}</h1>

                <p>Clique abaixo para confirmar sua conta.</p>

                <a href="${link}">
                    Confirmar Email
                </a>
            `
        });

        console.log("RESPOSTA RESEND:");
        console.log(resposta);

    } catch (erro) {
        console.error("ERRO AO ENVIAR EMAIL:");
        console.error(erro);
    }
}