module.exports = {
    
    /* THE FOLLOWING FUNCTION WILL:
   
   1) Retrieve the Customer's ID from Stripe's database using their email.
   2) Use this ID to retreive the Credit Card ID
   3) Use both the Customer and Credit Card IDs to Delete the Credit Card
   4) Add a new Credit Card using the tokenized information, thus completing our update
   
    */
    
    updateCard(req, res) {
        
    const stripe = require("stripe")('sk_test...');
        
    
    /* STEP ONE:
    Retrieve the Customer's ID from Stripe's database using their email. 
    */   
    stripe.customers.list(
        { email: req.body.email },
        function(err, customers) {
            const customerId = customers.data[0].id
       
            
            
            /*STEP TWO:
            Use Customer ID to retreive the Credit Card ID
            */
            stripe.customers.listCards(
                customerId, function(err, cards) {

                /*This "if" statement basically says to check if the user
                has a card on file. If so, continue to update it. If not,
                then send the message 'You dont have a card on file'
                */
                 if (cards.data[0]) {
                    
                    const cardId = cards.data[0].id
                
               
                
                   /* STEP THREE:
                    Use both the Customer ID and Credit Card ID to Delete the Credit Card
                    */  
                    stripe.customers.deleteCard(
                        customerId,
                        cardId,
                        function(err, confirmation) {
                            }
                            );
                    
                     
                    /* STEP FOUR:
                    Add a new Credit Card using the tokenized information, thus completing our update
                    */
                    stripe.customers.createSource(
                        customerId,
                        { card: req.body.token },
                        function(err, card) {
                            res.status(201).send({ 
                                message: 'Success: The card has been successfully updated!!'
                                })
                        }
                        );
                    
                    
                } else {
                    res.status(500).send({
                        message: 'Error: You do not have a card on file to update!'
                            })
                       }
                    
        })
    })         
  }   
}