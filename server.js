import app from './src/app.js'
import connection from "./infra/connection.js";

const PORT = 3000

connection.connect((erro) => {
    if (erro) {
        console.log(erro);
    } else {
        console.log("Deu certo!");
    }
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
});
