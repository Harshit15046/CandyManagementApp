//  the base URL for the CRUD CRUD API
const baseURL = "https://crudcrud.com/api/307aa284baec420f8cb30c3003b206b3";

// Function to add a new candy
async function addCandy() {
  
  const name = document.getElementById('candy-name').value;
  const description = document.getElementById('candy-description').value;
  const price = document.getElementById('candy-price').value;
  const quantity = document.getElementById('candy-quantity').value;

  // Create a new candy object
  const newCandy = {
    name: name,
    description: description,
    price: price,
    quantity: quantity
  };

  // Send a POST request to the CRUD CRUD API to add the new candy
  try {
    const response = await fetch(`${baseURL}/candies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCandy)
    });

    if (response.ok) {
      // Clear the input fields
      clearFields();
      // Update the candy list
      getCandies();
    }
  } catch (error) {
    console.error('Error adding candy:', error);
  }
}

// Function to get and display all candies
async function getCandies() {
  try {
    const response = await fetch(`${baseURL}/candies`);
    const candies = await response.json();
    updateCandyList(candies);
  } catch (error) {
    console.error('Error fetching candies:', error);
  }
}

// Function to update the candy list displayed on the page
function updateCandyList(candies) {
  // Get the candy list container
  const list = document.getElementById('candylist');

  // Clear the current list
  list.innerHTML = '';

  // Iterate over the candies array to create the list items
  candies.forEach(candy => {
    const item = document.createElement('div');
    item.innerHTML = `
      <h3>${candy.name}</h3>
      <p>Description: ${candy.description}</p>
      <p>Price: ${candy.price}</p>
      <p>Quantity: ${candy.quantity}</p>
    `;
    list.appendChild(item);
  });
}

// Clear the input fields after adding a candy
function clearFields() {
  document.getElementById('candy-name').value = '';
  document.getElementById('candy-description').value = '';
  document.getElementById('candy-price').value = '';
  document.getElementById('candy-quantity').value = '';
}

// Call getCandies on page load to display the initial list
document.addEventListener('DOMContentLoaded', getCandies);