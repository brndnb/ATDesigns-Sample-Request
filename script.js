
  
  const itemSelect = document.getElementById('itemSelect');
  const tariffField = document.getElementById('tariffField');
  const descriptionField = document.getElementById("descriptionField");
  const lineItemDiv = document.getElementById("line-items-container");
  const lineItemBtn = document.getElementById("line-item-btn");
  const quantityField = document.getElementById("quantity");
  
  // Create custom dropdown options
  items.forEach(item => {
    const div = document.createElement('div');
    div.setAttribute('data-value', item.ItemId);
    div.textContent = item.ItemId;
    itemSelect.appendChild(div);
  });
  
  // Handle custom dropdown item selection and search
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', event => {
    const searchText = event.target.value.toLowerCase();
    const options = itemSelect.querySelectorAll('div');
  
    options.forEach(option => {
      if (option.textContent.toLowerCase().indexOf(searchText) > -1) {
        option.style.display = '';
      } else {
        option.style.display = 'none';
      }
    });
  });
  
  searchInput.addEventListener('focus', () => {
    itemSelect.style.display = 'block';
  });
  
  searchInput.addEventListener('blur', () => {
    setTimeout(() => {
      itemSelect.style.display = 'none';
    }, 150);
  });
  
  itemSelect.addEventListener('click', event => {
    if (event.target.tagName === 'DIV') {
      const selectedItemId = event.target.getAttribute('data-value');
      const selectedItem = items.find(item => item.ItemId === selectedItemId);
  
      if (selectedItem) {
        searchInput.value = selectedItem.ItemId;
        tariffField.value = selectedItem.HS_Tariff;
        descriptionField.value = selectedItem.Description;
      }
    }
  });
  
  // Add line item to container
  function addLineItem(event) {
    event.preventDefault(); // prevent form submission
    // Get selected item and its values
    const selectedItemId = searchInput.value;
    const selectedItem = items.find(item => item.ItemId === selectedItemId);
    if (!selectedItem) {
      // handle the case where the selected item is not found
      return;
    }
    const itemName = selectedItem.Description;
    const itemId = selectedItem.ItemId;
    const hsTariff = selectedItem.HS_Tariff;
    const quantity = quantityField.value || 1; // get quantity value or default to 1
    // Create a new paragraph element with the item name, HS Tariff, and quantity
    const lineItemId = `line-item-${selectedItemId}-${hsTariff}-${itemId}`;
    if (document.getElementById(lineItemId)) {
      // A line item with the same ID already exists, so don't add a new one
      return;
    }
    const lineItem = document.createElement('p');
    lineItem.id = lineItemId;
    lineItem.innerHTML = `${itemId} - HS Tariff (${hsTariff}) - QTY (<strong>${quantity} pieces</strong>)`;
    // Add the line item to the container
    lineItemDiv.appendChild(lineItem);
    searchInput.value = "";
    quantityField.value = "";
  }
  
// Add event listener to button to add line item
lineItemBtn.addEventListener('click', addLineItem);


const printBtn = document.getElementById('print-btn');

printBtn.addEventListener('click', () => {
  window.print();
});
