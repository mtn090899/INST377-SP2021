async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'
  const request = await fetch(endpoint);
  const food_info = await request.json();
  
  function findMatches(wordToMatch, food_info) {
      return food_info.filter(result => {
          const regex = new RegExp(wordToMatch, 'gi');
          return result.category.match(regex);
      });
  }

  const searchInput = document.querySelector('input');
  const suggestions = document.querySelector('.suggestions')

  function displayMatches(event) {
      const matchArray = findMatches(event.target.value, food_info);
      const html = matchArray.map(result => {      
          const regex = new RegExp(event.target.value, 'gi');
          const category = result.category.replace(regex, `<span class="title-case">${event.target.value}</span>`);

          return `
              <li>
              <span class= "place">
              <div class="list-name">
                  ${result.name}
              </div>
              ${category}<br/>
              <address>
              ${result.address_line_1}<br/>
              ${result.city}<br/>
              ${result.zip}<br/>
              </address>
              </span>
              </li>
              `
          ;
      }).join('');
      suggestions.innerHTML = html;
  }

  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt) });
}

window.onload = windowActions;










function convertRestaurantsToCategories(restaurantList) {
  // process your restaurants here!
  return list;
}

function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  CanvasJS.addColorSet('customColorSet1', [
    // add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/
  ]);

  return {
    animationEnabled: true,
    colorSet: 'customColorSet1',
    title: {
      text: 'Change This Title'
    },
    axisX: {
      interval: 1,
      labelFontSize: 12
    },
    axisY2: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Change This Title',
      labelFontSize: 12,
      scaleBreaks: {customBreaks: []} // Add your scale breaks here https://canvasjs.com/docs/charts/chart-options/axisy/scale-breaks/custom-breaks/
    },
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      dataPoints: datapointsFromRestaurantsList
    }]
  };
}

function runThisWithResultsFromServer(jsonFromServer) {
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
  const options = makeYourOptionsObject(reorganizedData);
  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();
}

// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});