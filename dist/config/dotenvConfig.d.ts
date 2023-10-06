import 'dotenv/config';
export declare const appConfig: {
    name: string;
    port: number;
    path: string;
    environment: string;
    isProduction: boolean;
    logState: string | boolean;
    cookieSecret: string;
    bcryptHash: string;
    saltRounds: number;
    tokenSecret: string;
    tokenSecretRefresh: string;
    tokenExpires: string;
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