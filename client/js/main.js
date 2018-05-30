// Create a Stripe client.
var stripe = Stripe('pk_test_0U6K7eIq032LINQia1VlDOcK');

// Create an instance of Elements.
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
var style = {
  base: {
    color: '#32325d',
    lineHeight: '18px',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

// Create an instance of the card Element.
var card = elements.create('card', {style: style});


// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');

// Handle real-time validation errors from the card Element.
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Handle form submission.
var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Creates a name property based on user input and tokenizes it
  var card_name = document.getElementById('name').value

  stripe.createToken(card, { name: card_name}).then(function(result) {
    if (result.error) {
      // Inform the user if there was an error.
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      
        // Send the token to your server.

        
        //Creates an object to send to the server
        const input = {
        token : result.token.id,
        email : document.getElementById('email').value,
        }
            
        
        
        fetch("/updateCard", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(input)
        })
            .then(response => {
                return response.json();
            })
        
            .then(output => {
            // Clears the form and renders a server response
            document.getElementById('payment-form').reset()
            card.clear()
            document.getElementById('server-response').innerHTML = output.message
            
            
            // Styles the response, success=blue, error=red
            if (output.message.indexOf('Success') === 0) {
                document.getElementById('server-response').style.color = '#238bb9'
            } else {
                document.getElementById('server-response').style.color = '#fa755a'
            }
            
            
            })

            
        
        
        
        }   
   
    })
      
})


