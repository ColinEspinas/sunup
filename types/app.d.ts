export default createApp;
export type AppOptions = {
    state?: string;
    router?: object;
    root: string;
    component: string;
};
/**
 * @typedef {object} AppOptions
 * @property {string} [state]
 * @property {object} [router]
 * @property {string} root
 * @property {string} component
 */
/**
 * Bootstrap a sunup application
 * @param {AppOptions} options
 */
declare function createApp({ state, router, root, component }: AppOptions): {
    state: any;
    router: any;
    root: string;
};
