/* eslint-disable */
const fs = require('fs');
const readline = require('readline');
const {
  google
} = require('googleapis');
const path = require('path');
const CLINET_SECRET = path.resolve(process.cwd(), './client_secret.json');
const TOKEN_PATH = path.resolve(process.cwd(), './token.json');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
async function getSpreadsheetData() {
  let promise = new Promise((resolve, reject) => {
    // Load client secrets from a local file.
    fs.readFile(CLINET_SECRET, (error, content) => {
      if (error) return reject({
        message: 'try to read client_secret.json',
        error,
      });
      // Authorize a client with credentials, then call the Google Sheets API.
      try {
        const credentials = JSON.parse(content)
        authorize(credentials, listMajors);
      } catch (e) {
        if (e) {
          reject({
            message: 'try to parse client_secret.json',
            error: e,
          });
        }
      }
    });

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    function authorize(credentials, callback) {
      const {
        client_secret,
        client_id,
        redirect_uris
      } = credentials.web;
      const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
      });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    function getNewToken(oAuth2Client, callback) {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
          if (err) return reject({
            message: 'Error while trying to retrieve access token: ',
            error: err,
          });
          oAuth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return reject({
              message: 'Store token to local systen',
              error: err,
            });
            // console.log('Token stored to', TOKEN_PATH);
          });
          callback(oAuth2Client);
        });
      });
    }

    /**
     * Prints the names and majors of students in a sample spreadsheet:
     * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
     * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
     */
    function listMajors(auth) {
      const sheets = google.sheets({
        version: 'v4',
        auth
      });
      sheets.spreadsheets.values.get({
        spreadsheetId: '1NwXx8Pqx_wR0O3YrpmxnWwiMv_M-6qzXu5giH566QHY',
        range: 'A2:G',
      }, (err, res) => {
        if (err) return reject({
          message: 'The spreadsheet API returned an error:',
          error: err,
        });
        const rows = res.data.values;
        if (rows.length) {
          // Print columns A and E, which correspond to indices 0 and 4.
          resolve(rows)
        } else {
          console.log('No data found.');
          resolve(null);
        }
      });
    }
  });
  return promise;
}


module.exports = getSpreadsheetData
