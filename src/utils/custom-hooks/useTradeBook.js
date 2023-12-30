const useTradeBook = (snapshot) => {
    const tradingBook = {
        bids: [],
        asks: [],
    };

    snapshot
        .filter((data) => data.count > 0)
        .forEach((data) => {
            if (data.amount > 0) {
                // add or update bids
                tradingBook.bids.push({
                    price: data.price,
                    count: data.count,
                    amount: data.amount,
                });
            } else if (data.amount < 0) {
                // add or update asks
                tradingBook.asks.push({
                    price: data.price,
                    count: data.count,
                    amount: data.amount,
                });
            }
        });

    snapshot
        .filter((data) => data.count === 0)
        .forEach((data) => {
            if (data.amount !== 1 && data.amount > 0) {
                tradingBook.bids.push({
                    price: data.price,
                    count: data.count,
                    amount: data.amount,
                });
            } else if (data.amount !== -1 && data.amount < 0) {
                console.log(data);

                tradingBook.asks.push({
                    price: data.price,
                    count: data.count,
                    amount: data.amount,
                });
            }
        });

    //console.log("Updated Trading Book:", tradingBook);
    return tradingBook;
};

export default useTradeBook;
