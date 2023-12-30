const CONSTANTS = Object.freeze({
    EVENT_NAME: "subscribe",
    CHANNEL_NAME: "book",
    SYMBOL: "tBTCUSD",
    PRECISION: "P0",
    FREQUENCY: "F0",
});

export const SERVICE_URL = "wss://api-pub.bitfinex.com/ws/2";

export const MESSAGE = JSON.stringify({
    event: CONSTANTS.EVENT_NAME,
    channel: CONSTANTS.CHANNEL_NAME,
    symbol: CONSTANTS.SYMBOL,
    prec: CONSTANTS.PRECISION,
    freq: CONSTANTS.FREQUENCY,
});
