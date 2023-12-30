import useWebSocket from "../../utils/custom-hooks/useWebSocket";
import { SERVICE_URL, MESSAGE } from "../../utils/constants";
import { useEffect, useState } from "react";
import useMutationObserver from "../../utils/custom-hooks/useMutationObserver";

const OrderBookComponent = (props) => {
    const [accordian, setAccordian] = useState(true);

    const [precision, setPrecision] = useState(0);

    let msg;

    let adjustPrecision = JSON.parse(MESSAGE);

    if (precision === 0) {
        msg = MESSAGE;
    } else {
        adjustPrecision.prec = `P${precision}`;
        msg = adjustPrecision;
    }

    const socket = useWebSocket(SERVICE_URL, msg);

    const { values } = props;
    // console.log(values);

    const getStorageData = JSON.parse(sessionStorage.getItem("chart-data"));

    const mainLayout = (
        <div>
            <div className="container containers">
                <div className="header">
                    <h3
                        className="chart-title"
                        onClick={() => {
                            setAccordian(!accordian);
                        }}>
                        ORDER BOOK BTC/USD ⬇️
                    </h3>

                    <div className="controls">
                        {precision > 0 ? (
                            <button onClick={() => decreasePrecision()}>Decrease Precision</button>
                        ) : (
                            <button disabled={true}>Decrease Precision</button>
                        )}

                        {precision < 4 ? (
                            <button onClick={() => increasePrecision()}>Increase Precision</button>
                        ) : (
                            <button disabled={true}>Increase Precision</button>
                        )}
                    </div>
                </div>

                {accordian ? (
                    <div className="chart-data-container">
                        <table className="chart-fold" cellSpacing="0" cellPadding="0">
                            <thead className="table-heading">
                                <tr>
                                    <th>COUNT</th>
                                    <th>AMOUNT</th>
                                    <th>TOTAL</th>
                                    <th>PRICE</th>
                                </tr>
                            </thead>

                            <thead className="first-fold-data">
                                {values.bids && values.bids.length !== 0 ? (
                                    values.bids.map((data, index) => {
                                        return (
                                            <tr key={index} className="table-data bids">
                                                <td>{data?.count}</td>
                                                <td>{data?.amount.toFixed(4)}</td>
                                                <td>{(data?.count * data?.amount).toFixed(4)}</td>
                                                <td>{data?.price.toLocaleString("en-IN")}</td>
                                            </tr>
                                        );
                                    })
                                ) : getStorageData !== null ? (
                                    getStorageData.bids.map((data, index) => {
                                        return (
                                            <tr key={index} className="table-data bids">
                                                <td>{data?.count}</td>
                                                <td>{data?.amount.toFixed(4)}</td>
                                                <td>{(data?.count * data?.amount).toFixed(4)}</td>
                                                <td>{data?.price.toLocaleString("en-IN")}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td>Bids Data Loading...</td>
                                    </tr>
                                )}
                            </thead>
                        </table>

                        <table className="chart-fold" cellSpacing="0" cellPadding="0">
                            <thead>
                                <tr>
                                    <th>PRICE</th>
                                    <th>TOTAL</th>
                                    <th>AMOUNT</th>
                                    <th>COUNT</th>
                                </tr>
                            </thead>

                            <thead className="second-fold-data">
                                {values.asks && values.asks.length !== 0 ? (
                                    values.asks.map((data, index) => {
                                        return (
                                            <tr key={index} className="table-data asks">
                                                <td>{data?.price.toLocaleString("en-IN")}</td>
                                                <td>{(data?.count * data?.amount).toFixed(4)}</td>
                                                <td>{data?.amount.toFixed(4)}</td>
                                                <td>{data?.count}</td>
                                            </tr>
                                        );
                                    })
                                ) : getStorageData !== null ? (
                                    getStorageData.asks.map((data, index) => {
                                        return (
                                            <tr key={index} className="table-data asks">
                                                <td>{data?.price.toLocaleString("en-IN")}</td>
                                                <td>{(data?.count * data?.amount).toFixed(4)}</td>
                                                <td>{data?.amount.toFixed(4)}</td>
                                                <td>{data?.count}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td>Ask Data Loading...</td>
                                    </tr>
                                )}
                            </thead>
                        </table>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );

    const increasePrecision = () => {
        precision < 4 ? setPrecision(precision + 1) : setPrecision(4);
    };

    const decreasePrecision = () => {
        precision > 0 ? setPrecision(precision - 1) : setPrecision(0);
    };

    useEffect(() => {
        useMutationObserver();
    });

    return mainLayout;
};

export default OrderBookComponent;
