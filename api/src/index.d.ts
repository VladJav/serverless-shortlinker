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
}