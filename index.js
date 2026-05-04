```javascript
const readline = require('readline');

// Tasas de conversión de divisas (respecto a USD)
const exchangeRates = {
  'USD': 1,
  'EUR': 0.92,
  'GBP': 0.79,
  'JPY': 149.50,
  'AUD': 1.52,
  'CAD': 1.36,
  'CHF': 0.88,
  'CNY': 7.24,
  'INR': 83.12,
  'MXN': 17.05
};

// Factores de conversión de unidades
const unitConversions = {
  length: {
    'm': 1,
    'cm': 100,
    'mm': 1000,
    'km': 0.001,
    'in': 39.3701,
    'ft': 3.28084,
    'yd': 1.09361,
    'mi': 0.000621371
  },
  weight: {
    'kg': 1,
    'g': 1000,
    'mg': 1000000,
    'oz': 35.274,
    'lb': 2.20462,
    't': 0.001
  },
  temperature: {
    'C': 'celsius',
    'F': 'fahrenheit',
    'K': 'kelvin'
  },
  volume: {
    'l': 1,
    'ml': 1000,
    'cm3': 1000,
    'galUS': 0.264172,
    'galUK': 0.219969,
    'pt': 1.75975,
    'fl_oz': 33.814
  }
};

// Función para convertir divisas
function convertCurrency(amount, fromCurrency, toCurrency) {
  const fromCurr = fromCurrency.toUpperCase();
  const toCurr = toCurrency.toUpperCase();

  if (!exchangeRates[fromCurr] || !exchangeRates[toCurr]) {
    return {
      error: `Divisa no soportada. Divisas disponibles: ${Object.keys(exchangeRates).join(', ')}`
    };
  }

  if (isNaN(amount)) {
    return { error: 'La cantidad debe ser un número válido' };
  }

  const amountInUSD = amount / exchangeRates[fromCurr];
  const result = amountInUSD * exchangeRates[toCurr];

  return {
    original: amount,
    fromCurrency: fromCurr,
    toCurrency: toCurr,
    result: parseFloat(result.toFixed(2)),
    rate: parseFloat((exchangeRates[toCurr] / exchangeRates[fromCurr]).toFixed(6))
  };
}

// Función para convertir unidades de longitud
function convertLength(amount, fromUnit, toUnit) {
  const from = fromUnit.toLowerCase();
  const to = toUnit.toLowerCase();

  if (!unitConversions.length[from] || !unitConversions.length[to]) {
    return {
      error: `Unidad de longitud no soportada. Unidades: ${Object.keys(unitConversions.length).join(', ')}`
    };
  }

  if (isNaN(amount)) {
    return { error: 'La cantidad debe ser un número válido' };
  }

  const meters = amount / unitConversions.length[from];
  const result = meters * unitConversions.length[to];

  return {
    original: amount,
    fromUnit: from,
    toUnit: to,
    result: parseFloat(result.toFixed(6))
  };
}

// Función para convertir unidades de peso
function convertWeight(amount, fromUnit, toUnit) {
  const from = fromUnit.toLowerCase();
  const to = toUnit.toLowerCase();

  if (!unitConversions.weight[from] || !unitConversions.weight[to]) {
    return {
      error: `Unidad de peso no soportada. Unidades: ${Object.keys(unitConversions.weight).join(', ')}`
    };
  }

  if (isNaN(amount)) {
    return { error: 'La cantidad debe ser un número válido' };
  }

  const kg = amount / unitConversions.weight[from];
  const result = kg * unitConversions.weight[to];

  return {
    original: amount,
    fromUnit: from,
    toUnit: to,
    result: parseFloat(result.toFixed(6))
  };
}

// Función para convertir temperatura
function convertTemperature(value, fromTemp, toTemp) {
  const from = fromTemp.toUpperCase();
  const to = toTemp.toUpperCase();

  if (!unitConversions.temperature[from] || !unitConversions.temperature[to]) {
    return {
      error: `Unidad de temperatura no soportada. Unidades: C (Celsius), F (Fahrenheit), K (Kelvin)`
    };
  }

  if (isNaN(value)) {
    return { error: 'El valor debe ser un número válido' };
  }

  let celsius;

  // Convertir a Celsius
  if (from === 'C') {
    celsius = value;
  } else if (from === 'F') {
    celsius = (value - 32) * 5 / 9;
  } else if (from === 'K') {
    celsius = value - 273.15;
  }

  let result;

  // Convertir de Celsius al destino
  if (to === 'C') {
    result = celsius;
  } else if (to === 'F') {
    result = celsius * 9 / 5 + 32;
  } else if (to === 'K') {
    result = celsius + 273.15;
  