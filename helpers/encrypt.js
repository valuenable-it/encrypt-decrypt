/* eslint-disable no-undef */
const { JWK, JWE, JWS } = require('node-jose');
const { _privateKey } = require('../config/privatekey.config.js');
const { _publicKey } = require('../config/publickey.config.js');

const encryptPayload = async payload => {
   let publicKey = await JWK.asKey(_publicKey, 'pem');

   let privateKey = await JWK.asKey(_privateKey, 'pem');

   let keystore = JWK.createKeyStore();
   await keystore.add(privateKey);

   const encrypt = async (
      raw,
      format = 'compact',
      contentAlg = 'A256GCM',
      alg = 'RSA-OAEP',
   ) => {
      const buffer = Buffer.from(JSON.stringify(raw));
      const encrypted = await JWE.createEncrypt(
         { format: format, contentAlg: contentAlg, fields: { alg: alg } },
         publicKey,
      )
         .update(buffer)
         .final();
      return await encrypted;
   };

   const sign = async data => {
      const opt = { format: 'compact' };
      const keySignature = keystore.get({ use: 'sig' });
      let signed = JWS.createSign(opt, keySignature).update(data).final();
      return await signed;
   };

   try {
      //encrypt with receiving party public cert to ensure only respective party can decode
      let data = await encrypt(payload);
      //sign with our private cert to establish our identity
      let encodedPayload = await sign(data);
      // console.log('encoded payload', encodedPayload);
      return encodedPayload;
   } catch (error) {
      console.log(error);
      return 'Error at encryption layer';
   }
};
// encryptPayload({ name: 'Manish' });
module.exports = { encryptPayload };
