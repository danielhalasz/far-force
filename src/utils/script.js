// Get the input, button, and results elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');
const randomButton = document.getElementById('randomButton');

// Function to handle the search
async function handleSearch() {
  const query = searchInput.value.trim();
  // console.log(query);
  if (query) {
    try {
      searchResults.innerHTML = '';
      const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*&limit=3&formatversion=2`;
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      const relevantData = data.query.search;
      relevantData.forEach((e) => {
        searchResults.innerHTML += `
        <h1>${e.title}</h1>
        <p>${e.snippet}</p>
        <a href=${`https://en.wikipedia.org/?curid=${e.pageid}`} target="_blank">Link to article</a>
        <hr>
        `;
        // console.log(e)
        searchInput.value = '';
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      searchResults.innerText = 'Error fetching data';
    }
  } else {
    searchResults.innerText = 'Please enter a search query';
  }
}

// Add event listener to the search button
searchButton.addEventListener('click', handleSearch);

// Optional: Add event listener to the input field for live search
// searchInput.addEventListener('input', handleSearch);

const randomResult = async () => {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&rvprop=content&grnlimit=1&origin=*`
    );
    const data = await response.json();
    // console.log(data.query.pages);
    const pageId = Object.keys(data.query.pages);
    const page = data.query.pages[pageId];
    const title = page.title;
    const pageUrl = `https://en.wikipedia.org/?curid=${page.pageid}`;
    searchResults.innerHTML = `
        <h1>${title}</h1>
        <a href=${pageUrl} target="_blank">Link to article</a>
        <hr>
        `;
  } catch (error) {
    console.error(error);
  }
};

randomButton.addEventListener('click', randomResult);
