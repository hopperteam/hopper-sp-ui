export namespace Config {
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

        constructor(data: any) {
            this.port = data.port;
            this.mongoUri = data.mongoUri;
            this.passphrase = data.passphrase;
            this.baseUrl = data.baseUrl;
            this.spRequestUrl = data.spRequestUrl;
            this.callbackUrl = data.callbackUrl;
            this.redirectUrl = data.redirectUrl;
            this.notificationUrl = data.notificationUrl;
        }
    }

    function getEnv(key: any, name: string, status: any): any{
        if(!key){
            console.log("Missing " + name + " in environment definition");
            status.status = true;
        }

        return key;
    }

    export let instance : ConfigHolder;
}