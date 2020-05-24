import * as express from "express";

import { Config } from "../../config";
import * as utils from "../utils";
import Session from "../types/session";

export default class AuthMiddleware {

    public static auth(permissionName: string): express.Handler {
        const namespacedPermission = Config.instance.permissionNamespace + "." + permissionName;
        return async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
            // get cookie from frontend
            const sid = req.cookies.HOPPER_SESSION;
            if (sid == undefined) {
                utils.handleError(new Error(Config.instance.authRedirectUrl + "?target=" + Config.instance.baseUrl),
                    res, 401);
                return;
            }

            const session = await Session.decode(sid);

            if (!session){
                utils.handleError(new Error(Config.instance.authRedirectUrl + "?target=" + Config.instance.baseUrl),
                    res, 401);
                return;
            }

            if (!session.user.roles.includes(namespacedPermission)) {
                utils.handleError(new Error("No permission to use this service"), res, 403);
                return;
            }

            // @ts-ignore
            req.session = session;
            next();
        }
    }
}