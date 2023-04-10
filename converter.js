 (async function () {

 let firstField  =  document.querySelector('#eur');
 let secondField =  document.querySelector('#uah');
 let switcher    =  document.querySelector('.converter__switcher')
 let exchangeRates = await getExchangeRates();
    async function getExchangeRates() {
        var myHeaders = new Headers();
        myHeaders.append("apikey", "A7Fptj9sPIy3rLvRJGQzZ3cFYxboYvuG");

        var requestOptions = {
          method: 'GET',
          redirect: 'follow',
          headers: myHeaders
        };

      const response = await fetch('https://api.apilayer.com/exchangerates_data/latest?symbols=&base=UAH', requestOptions);
      const data = await response.json();
      return data.rates;
    }

    async function convert(sourceCurrency) {                            // sSourceCurrency
      const targetCurrency = sourceCurrency === 'UAH' ? 'EUR' : 'UAH';  // sTargetCurrency
      const input = document.getElementById(sourceCurrency);            // eSourceCurrency
      const targetInput = document.getElementById(targetCurrency);      // eTargetCurrency
      const inputValue = input.value;
      const rates = await exchangeRates;
      const conversionRate = rates[targetCurrency] / rates[sourceCurrency];
      targetInput.value = (inputValue * conversionRate).toFixed(2);
    }

    document.getElementById('EUR').addEventListener('input', () => convert('EUR'));
    document.getElementById('UAH').addEventListener('input', () => convert('UAH'));
 })();


