import {} from 'dotenv/config';
import app from './src/app.js'

const PORT = process.env.PORT


app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT ?? 3000}`);
});
