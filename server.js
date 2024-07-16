const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./conexion");
const datos_usuarios = require("./routes/datos_usuario");
const emo_men = require("./routes/historial_emociones_mensuales");
const emo_nega = require("./routes/emo_negativas");
const emo_pos = require("./routes/emo_positivas");
const emo_neu = require("./routes/emo_neutras");
const usuario = require("./routes/usuario");
const login = require("./routes/login");

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

// Rutas de la API
app.use("/datos_usuario", datos_usuarios);
app.use("/historial_emociones_mensuales", emo_men);
app.use("/emociones_negativas", emo_nega);
app.use("/emociones_positivas", emo_pos);
app.use("/emociones_neutras", emo_neu);
app.use("/usuario", usuario);
app.use("/login", login);
// Puerto en el que escucha el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
