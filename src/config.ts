export namespace Config {
    export function loadConfig(): boolean{
        const data: any = {};
        const status: any = {status: false};
        data.port = getEnv(process.env.PORT, "PORT", status);
        data.backendUrl = getEnv(process.env.BACKENDURL, "BACKENDURL", status);

        instance = new ConfigHolder(data);
        return status.status;
    }

    class ConfigHolder {
        readonly port: number;
        readonly backendUrl: string;

        constructor(data: any) {
            this.port = data.port;
            this.backendUrl = data.backendUrl;
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