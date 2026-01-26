declare module "https://deno.land/std@0.168.0/http/server.ts" {
  export interface ConnInfo {
    readonly localAddr: Deno.Addr;
    readonly remoteAddr: Deno.Addr;
  }
  export type Handler = (request: Request, connInfo: ConnInfo) => Response | Promise<Response>;
  export function serve(handler: Handler): void;
}
