const basePath = "https://finnhub.io/api/v1"

//Method for searching stock symbols
export const searchSymbols = async(query) => {
    const url = `${basePath}/search?q=${query}&token=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);

    if(!response.ok) 
    { 
        const message = `An error has ocuured: ${response.status} `;
        throw new Error(message);
    }

    return await response.json();  //COnverts response from API into json
}

//ompany Profile 2
export const fetchStockDetails = async (stockSymbol) =>
{
    const url = `${basePath}/profile2?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);
   

    if(!response.ok) 
        { 
            const message = `An error has ocuured: ${response.status} `;
            throw new Error(message);
        }
    
        return await response.json();  //COnverts response from API into json
}

//Quote - to get most recent price of stock
export const Quote = async (stockSymbol) =>
{
    const url = `${basePath}/quote?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`
    const response = await fetch(url);
   
    if(!response.ok) 
        { 
            const message = `An error has ocuured: ${response.status} `;
            throw new Error(message);
        }
    
        return await response.json();  //COnverts response from API into json

}

//Stock Candles
 export const fetchHistoricalData = async (stockSymbol, resolution, from, to) =>
{
    const url = 
    `${basePath}/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}$to=${to}&token=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);
    
    if(!response.ok) 
        { 
            const message = `An error has ocuured: ${response.status} `;
            throw new Error(message);
        }
    
        return await response.json();  //COnverts response from API into json
}