import { cleanEnv, str, port } from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production', 'test']
        }),
        MONGO_URL: str(),
        PORT: port({ default: 4000 }),
        JWT_SECRET: str()
    })
}

export default validateEnv;
