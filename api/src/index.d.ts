export {}

declare global {
    namespace Express {
        export interface Request {
            user: {
                email: string,
                userId: string
            }
        }
    }
    namespace NodeJS {
        interface ProcessEnv {
            JWT_ACCESS_SECRET: string;
            JWT_REFRESH_SECRET: string;
            JWT_ACCESS_TTL?: string;
            DYNAMODB_USER_TABLE: string;
            DYNAMODB_TOKEN_TABLE: string;
        }
    }
}