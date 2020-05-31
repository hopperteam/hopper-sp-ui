import * as express from "express";
import crypto from "crypto";
import * as jwt from "jsonwebtoken";

const SALT = "TL]{~eeo=u8J>j>@th8Psh4FQZ:^Wz)UMi;/vXst";

export function handleError(err: Error, res: express.Response, statusCode: number = 200, debugMessage="") {
    console.log(debugMessage);
    console.log(err);
    // pass error to frontend
    res.status(statusCode);
    res.json({
        "status": "error",
        "reason": err.message
    });
}

export function hashPassword(password: string): string {
    const hash = crypto.createHash("sha256");
    hash.update(SALT);
    hash.update(password);
    return hash.digest("hex");
}

export function createRsaPair(passphrase: string): crypto.KeyPairSyncResult<string, string> {
    const { generateKeyPairSync } = crypto;
    return generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: "pkcs1",
            format: "pem"
        },
        privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
            cipher: "aes-256-cbc",
            "passphrase": passphrase
        }
    });
}

export function encryptVerify(toEncrypt: object, passphrase: string, privateKey: string): string {
    return jwt.sign(toEncrypt,
        {
            key : privateKey,
            "passphrase": passphrase
        }, { algorithm: "RS256" })
}
