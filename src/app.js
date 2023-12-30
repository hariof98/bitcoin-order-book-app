import React, { useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import OrderBookComponent from "./components/order-book-component/orderBookComponent";
import LiveData from "./utils/contexts/LiveData";

const AppLayout = () => {
    const { book } = useContext(LiveData);
    const [contextData, setContextData] = useState(book);

    const layout = (
        <div>
            <LiveData.Provider value={{ book: contextData, setContextData }}>
                <OrderBookComponent values={contextData} />
            </LiveData.Provider>
        </div>
    );

    return layout;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
