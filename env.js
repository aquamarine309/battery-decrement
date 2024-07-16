import { isLocalEnvironment } from "./core/devtools.js";

export const DEV = isLocalEnvironment();