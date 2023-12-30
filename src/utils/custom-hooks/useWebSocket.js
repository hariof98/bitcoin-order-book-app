import { useState, useEffect, useContext, useRef } from "react";
import LiveData from "../contexts/LiveData";
import useSorting from "./useSorting";
import useTradeBook from "./useTradeBook";
import useMutationObserver from "./useMutationObserver";

const useWebSocket = (url, message) => {
    const [socket, setSocket] = useState(null);

    const { book, setContextData } = useContext(LiveData);

    const prevSortValueRef = useRef([]);
    prevSortValueRef.current = book;

    let arr = [];

    let flagError = false;

    let firstRender = true;

    const limit = 200;

    useEffect(() => {
        arr = [];

        const ws = new WebSocket(url);

        ws.onopen = () => {
            //console.log("WebSocket connection established");

            ws.send(message);
        };

        ws.onmessage = (event) => {
            //console.log("message received via WebSocket");

            const parsedData = JSON.parse(event.data);

            if (parsedData.length) {
                const dataList = parsedData.filter((data) => {
                    return Array.isArray(data) && data.length <= 3;
                });

                const finalDataList = dataList.map((val) => {
                    return {
                        price: val[0],
                        count: val[1],
                        amount: val[2],
                    };
                });

                arr.push(...finalDataList);

                if (!flagError) {
                    if (firstRender) {
                        if (arr.length > limit) {
                            ws.onclose();
                        }
                    } else {
                        performOperation();
                    }
                }
            }
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
            firstRender = false;
            performOperation();
        };

        ws.onerror = (err) => {
            flagError = true;
            console.error(err);
            return err;
        };

        function performOperation() {
            // hook to perform trading algorithm
            const sortValue = useTradeBook(arr);

            const result = [sortValue];

            // hook to perform sorting algorithm
            const sort = useSorting(result[0], prevSortValueRef);

            // for persisiting the latest data on refresh
            sessionStorage.setItem("chart-data", JSON.stringify(sort));

            //useMutationObserver();

            setContextData(sort);
        }

        return () => {
            ws.close();
        };
    }, []);

    return socket;
};

export default useWebSocket;
