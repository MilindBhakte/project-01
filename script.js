// Define the API endpoint
const apiUrl = 'http://localhost:8000/api/users';

// Add an event listener to handle form submission
document.getElementById('customer-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Gather form data from HTML fields
  const formData = {
    company: document.getElementById('company').value,
    first_name: document.getElementById('firstName').value,
    last_name: document.getElementById('lastName').value,
    phone_no: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    web_site: document.getElementById('website').value,
    industry: document.getElementById('industry').value,
    segment: document.getElementById('segment').value,
    country: document.getElementById('country').value,
    state: document.getElementById('state').value,
    city: document.getElementById('city').value
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData) // Convert form data to JSON
  })
  .then(response => response.json())
  .then(data => {
    if (data.msg === 'jam gaya chut k') { // Assuming this message indicates success
      alert('Customer added successfully!');
      // Optionally, reload the list to include the new customer or reset the form
      location.reload(); // Reload the page to show updated customer list
    } else {
      alert('Failed to add customer. Please try again.');
    }
  })
  .catch(error => console.error('Error:', error));
});
