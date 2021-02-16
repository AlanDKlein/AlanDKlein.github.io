// This function builds the verbiage to display about the destination
const buildPageFacts = (data) => {
  // const countryName = data.name;
  // const capital = data.capital;
  // const currency = data.currencies[0].name;
  // const symbol = data.currencies[0].symbol;
  // const language = data.languages[0].name;
  // const pop = data.population;
  // const stringPop = Number(pop).toLocaleString();
  document.getElementById("facts").innerHTML = `The dominant language of ${
    data.name
  } is ${data.languages[0].name}, and the currency is the ${
    data.currencies[0].symbol
  }${data.currencies[0].name}.  The population of ${data.name} is ${Number(
    data.population
  ).toLocaleString()} people and the capital city is ${data.capital}.`;
};
