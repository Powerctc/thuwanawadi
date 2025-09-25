document.addEventListener('DOMContentLoaded', () => {
  const movieGrid = document.getElementById('movie-grid');

  async function fetchMovies() {
    try {
      const response = await fetch('24hours.json'); // Path to your JSON file
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const movies = await response.json();
      displayMovies(movies);
    } catch (error) {
      console.error("Could not fetch movies:", error);
      movieGrid.innerHTML = '<p class="text-red-400">Failed to load movies. Please try again later.</p>';
    }
  }

  function displayMovies(movies) {
    movieGrid.innerHTML = ''; // Clear existing content

    movies.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.classList.add(
        'movie-card',
        'cursor-pointer',
        'relative', // Added for potential overlay effects
        'group'     // Added for potential hover effects with Tailwind
      );

      // Store movie data directly on the element for easy access
      movieCard.dataset.movie = JSON.stringify(movie);

      movieCard.innerHTML = `
        <img src="${movie.logo}" alt="${movie.title} Poster" class="w-full h-auto object-cover rounded-t-lg">
        <div class="p-4">
          <h3 class="text-lg font-semibold text-white truncate">${movie.title}</h3>
          <p class="text-gray-400 text-sm">${movie.year} | ${movie.category}</p>
        </div>
      `;

      // Add click listener to each movie card
      movieCard.addEventListener('click', () => {
        // Store the selected movie data in localStorage
        localStorage.setItem('selectedMovie', JSON.stringify(movie));
        // Redirect to the detail page
        window.location.href = 'movie_detail.html';
      });

      movieGrid.appendChild(movieCard);
    });
  }

  fetchMovies();
});
