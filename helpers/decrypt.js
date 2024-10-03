/* eslint-disable no-unused-vars */
const { JWK, JWE, JWS } = require('node-jose');
const { _privateKey } = require('../config/privatekey.config.js');
const { _publicKey } = require('../config/publickey.config.js');

const decryptPayload = async payload => {
   let publicKey = await JWK.asKey(_publicKey, 'pem');

   let privateKey = await JWK.asKey(_privateKey, 'pem');

   const verifySign = async data => {
      return await JWS.createVerify(publicKey)
         .verify(data)
         .then(verifyData => {
            return verifyData;
         });
   };

   const decrypt = async encryptedBody => {
      return await JWE.createDecrypt(privateKey)
         .decrypt(encryptedBody.payload.toString())
         .then(decodedData => {
            return decodedData;
         });
   };

   try {
      // verify sign with sender public cert to verify sender identity
      const data = await verifySign(payload);
      // decrypt with our private key
      const decodedData = await decrypt(data);
      console.log('decoded payload', decodedData.payload.toString('utf8'));
      return decodedData.payload.toString('utf8');
   } catch (error) {
      console.log(error);
      throw new Error('Error at decryption layer');
   }
};
module.exports = { decryptPayload };
