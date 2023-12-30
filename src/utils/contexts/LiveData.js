import { createContext } from "react";

const LiveData = createContext({
    book: {
        bids: [],
        asks: [],
    },
});

export default LiveData;
