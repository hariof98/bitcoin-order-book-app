const useSorting = (currData, prevData) => {
    // sorting bids
    const bidsSort = currData.bids.sort((a, b) => b.price - a.price);

    const a = [...bidsSort, ...prevData.current.bids];
    const b = a.sort((a, b) => b.price - a.price);
    const finalBids = b.length <= 100 ? b : b.slice(0, 100);

    // sorting asks
    const asksSort = currData.asks.sort((a, b) => a.price - b.price);

    const c = [...asksSort, ...prevData.current.asks];
    const d = c.sort((a, b) => a.price - b.price);
    const finalAsks = d.length <= 100 ? d : d.slice(0, 100);

    // removing duplicates
    const uniqueBidsArray = Array.from(new Set(finalBids.map(JSON.stringify))).map(JSON.parse);

    const uniqueAsksArray = Array.from(new Set(finalAsks.map(JSON.stringify))).map(JSON.parse);

    const e = {
        bids: uniqueBidsArray,
        asks: uniqueAsksArray,
    };

    return e;
};

export default useSorting;
