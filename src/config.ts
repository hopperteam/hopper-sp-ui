import * as fs from "fs";

export namespace Config {
    function getEnv(key: any, name: string, status: any): any{
        if(!key){
            console.log("Missing " + name + " in environment definition");
            status.status = true;
        }

        return key;
    }

    export function loadConfig(): boolean{
        const data: any = {};
        const status: any = {status: false};
        data.port = getEnv(process.env.PORT, "PORT", status);
        data.mongoUri = getEnv(process.env.MONGOURI, "MONGOURI", status);
        data.passphrase = getEnv(process.env.PASSPHRASE, "PASSPHRASE", status);
        data.baseUrl = getEnv(process.env.BASEURL, "BASEURL", status);
        data.spRequestUrl = getEnv(process.env.SPREQUESTURL, "SPREQUESTURL", status);
        data.callbackUrl = getEnv(process.env.CALLBACKURL, "CALLBACKURL", status);
        data.redirectUrl = getEnv(process.env.REDIRECTURL, "REDIRECTURL", status);
        data.passphrase = getEnv(process.env.PASSPHRASE, "PASSPHRASE", status);
        data.notificationUrl = getEnv(process.env.NOTIFICATIONURL, "NOTIFICATIONURL", status);
        data.jwtCertPath = getEnv(process.env.JWTCERTPATH, "JWTCERTPATH", status);
        data.permissionNamespace = getEnv(process.env.PERMISSIONNAMESPACE, "PERMISSIONNAMESPACE", status);
        data.authRedirectUrl = getEnv(process.env.AUTHREDIRECTURL, "AUTHREDIRECTURL", status);

        instance = new ConfigHolder(data);
        return status.status;
    }

    class ConfigHolder {
        readonly port: number;
        readonly mongoUri: string;
        readonly passphrase: string;
        readonly baseUrl: string;
        readonly spRequestUrl: string;
        readonly callbackUrl: string;
        readonly redirectUrl: string;
        readonly notificationUrl: string;
        readonly jwtCert: Buffer;
        readonly permissionNamespace: string;
        readonly authRedirectUrl: string;

        constructor(data: any) {
            this.port = data.port;
            this.mongoUri = data.mongoUri;
            this.passphrase = data.passphrase;
            this.baseUrl = data.baseUrl;
            this.spRequestUrl = data.spRequestUrl;
            this.callbackUrl = data.callbackUrl;
            this.redirectUrl = data.redirectUrl;
            this.notificationUrl = data.notificationUrl;
            this.permissionNamespace = data.permissionNamespace;
            this.authRedirectUrl = data.authRedirectUrl;

            if(data.jwtCertPath)
                this.jwtCert = fs.readFileSync(data.jwtCertPath);
        }
    }

    export let instance : ConfigHolder;
}