module.exports = `
<main>
<div class="container" id="container">
  <header>
    <h1>GIPHY PARTY</h1>
    <img src="./img/PoweredBy_200_Horizontal_Light-Backgrounds_With_Logo.gif">
  </header>

  <form id="form">
    <input type="text" name="search-term" class="search-input" id="search-input" required>
    <button class="btn btn-green" id="search-btn">Search!</button>
    <button class="btn btn-purple" id="remove-all-btn">Remove All</button>
  </form>

  <div class="helper" id="helper">
    <p>Please enter a search term.</p>
  </div>

  <div class="gifs-container" id="gifs-container"></div>
</div>
</main>
`;
