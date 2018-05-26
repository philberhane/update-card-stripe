module.exports = {
    
    /* The following function will
   
   1) Retrieve the Customer's ID from Stripe's database using their email.
   2) Use this ID to retreive the Credit Card ID
   3) Use both the Customer and Credit Card IDs to Delete the Credit Card
   4) Add a new Credit Card, thus completing our update
   
    */
    
    updateCard(req, res) {
        
    const stripe = require("stripe")("sk_test_SomoK17KafHOIXWqNAegapd5");
    
   
        
 /* STEP ONE:
 Retrieve the Customer's ID from Stripe's database using their email. 
 */
        
    stripe.customers.list(
  { email: 'customer@gmail.com' },
  function(err, customers) {
    // asynchronously called
       const customerId = customers.data[0].id
   //    console.log(customerId)
       
      /*STEP TWO:
      Use Customer ID to retreive the Credit Card ID
      */
       
            stripe.customers.listCards(
                customerId, function(err, cards) {
                // asynchronously called
                const cardId = cards.data[0].id
                
                   /* STEP THREE:
                    Use both the Customer and Credit Card IDs to Delete the Credit Card
                    */  
                    stripe.customers.deleteCard(
                    customerId,
                    cardId,
                        function(err, confirmation) {
                            // asynchronously called
                            console.log('The card has been successfully deleted!')
                            }
                            );
                    
                });
      
  }
);
    

    
    
    
    
}
    
}