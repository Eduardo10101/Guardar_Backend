const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET;



function verificarToken(req,res,next){


    const authHeader = req.headers.authorization;


    if(!authHeader){

        return res.status(401).json({

            mensagem:'Token não enviado.'

        });

    }



    const token = authHeader.split(' ')[1];



    if(!token){

        return res.status(401).json({

            mensagem:'Token inválido.'

        });

    }




    try{


        const usuario = jwt.verify(
            token,
            JWT_SECRET
        );


        req.usuario = usuario;


        next();



    }catch(error){


        return res.status(403).json({

            mensagem:'Token expirado ou inválido.'

        });


    }


}



module.exports = verificarToken;