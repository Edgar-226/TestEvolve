
printRating= (rating) =>{
    switch (rating) {
        case 'One':
            return '⭐';    
        case 'Two':
            return '⭐⭐';
        case 'Three':
            return '⭐⭐⭐';
        case 'Four':
            return '⭐⭐⭐⭐';
        case 'Five':
            return '⭐⭐⭐⭐⭐';
        default:
            return 'No rating';
    }
}

fetch('../web-scrapping/data.json')
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('books-list');
    data.forEach(book => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex align-items-center';
      li.innerHTML = `
        <div>
          <strong>${book.title}</strong><br>
          <span class="">Price: ${book.price}</span>
          <span class="ms-2 text-warning">Rating: ${ printRating(book.rating)}</span>
        </div>
      `;
      list.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Error loading data.json:', error);
  });


  