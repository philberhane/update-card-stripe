# Stripe Card Update

## This project is to update card information on Stripe (delete the  current card & save a new one) The following steps are needed for this to work:

1) Clone this repo

2) Install dependencies by running 'npm install' on the terminal while in the root folder

3) Go to Stripe's website, log in, and enable Test Mode (there should be a 'View Test Data' on bottom of the page)

4) While on Stripe's website, create a test customer with an arbitrary email and random card information (the actual card number must be '4242424242424242')

5) Also, while on Stripe's website, take note of your Private and Public API Keys

6) In the main.js file (root -> Client -> js -> main.js), edit the 'pk_test_...' string on line 2 with your public API Key

7) In the index.js file (root -> Server -> routes -> indes.js), edit the 'sk_test_...' string on line 14 with your private API Key

8) Run 'node app.js' on the terminal while in the Server folder

10) On your browser, type in 'localhost:3000' as the URL.

11) The email being input MUST match the test customer's email. Also, the card number must be 4242424242424242