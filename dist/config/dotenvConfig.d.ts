import 'dotenv/config';
export declare const appConfig: {
    name: string;
    port: number;
    path: string;
    environment: string;
    cookieSecret: string | undefined;
    bcryptHash: string | undefined;
    saltRounds: number;
    tokenSecret: string | undefined;
    tokenSecretRefresh: string | undefined;
    tokenExpires: string | undefined;
    database: {
        host: string | undefined;
        port: number;
        name: string | undefined;
        user: string | undefined;
        password: string | undefined;
    };
    email: {
        host: string | undefined;
        port: string | undefined;
        user: string | undefined;
        password: string | undefined;
        from: string | undefined;
        name: string | undefined;
    };
};
export default appConfig;
//# sourceMappingURL=dotenvConfig.d.ts.map