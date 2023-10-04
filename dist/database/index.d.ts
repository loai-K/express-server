import { Pool } from 'pg';
declare const db: Pool;
export declare const dbQuery: (query: string, params?: Array<string>) => Promise<any[]>;
export declare const dbClient: (query: string, params?: string[]) => Promise<any[] | undefined>;
export default db;
//# sourceMappingURL=index.d.ts.map