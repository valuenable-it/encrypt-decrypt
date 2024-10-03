const express = require('express');
const router = express.Router();
const { encryptPayload } = require('../helpers/encrypt.js');
const { decryptPayload } = require('../helpers/decrypt.js');

// Encryption route: Accepts plain text and returns encrypted data
router.post('/encrypt', async (req, res) => {
   try {
      const encryptedData = await encryptPayload(req.body);
      res.json({ success: true, encryptedData });
   } catch (error) {
      console.error('Error at encryption route:', error);
      res.status(500).json({ success: false, message: 'Encryption failed' });
   }
});

// Decryption route: Accepts encrypted data and returns decrypted plain text
router.post('/decrypt', async (req, res) => {
   const { payload } = req.body;
   try {
      const decryptedData = await decryptPayload(payload);
      console.log('decryptedData', decryptedData);
      res.send({ success: true, decryptedData });
   } catch (error) {
      console.error('Error at decryption route:', error);
      res.status(500).json({ success: false, message: 'Decryption failed' });
   }
});

module.exports = router;
