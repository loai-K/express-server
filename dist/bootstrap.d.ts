export declare const lifecycle: {
    isOpen: () => boolean;
    on: (_: 'close', listener: () => void) => number;
    close: () => Promise<void>;
    delay: (ms: number, timer: (step: number) => Promise<void>) => Promise<void>;
    init: () => Promise<void>;
};
export default lifecycle;
//# sourceMappingURL=bootstrap.d.ts.map