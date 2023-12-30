Author: Hari

Date: 30/12/2023

Library: React

Bundler: Parcel

State Management: React Context

Stylesheet: SCSS 

Formatter: Prettier (I've adopted rules that align with my coding style)

Commands:
 - npm install
 - cd /src/chart/
 - npx parcel app.html

Project Brief:  This React application is built to display the order book of bitfinex trading platform. 
This is achieved with the help of WebSockets that transmits the demo data constantly when the connection is established. 
The data from WS is filtered based on the trading algorithm which is mentioned at https://docs.bitfinex.com/reference/ws-public-books. 
As the algorithm states the data is separated into two (Bids and Asks) and it is maintained globally in the application.

Approach: 
- app.js file is the root of the application, in which the order book component is rendered.

- I have used custom hooks for all the data related operations in order to follow the single responsibility principle.

- useWebSockets.js file is a custom hook which is used to establish the WebSocket connection 
  and the initial filtration of data.

- useTradeBook.js hook contains the trading algorithm, with which the data is classified as Bids and Asks.

- useSorting.js hook is used to fine tune the data by employing sorting functionality for the added data.

- Once when the data is processed, it is updated and stored globally with React Context.

- I chose to utilize React Context for state management instead of libraries like Redux. 
  React Context proves to be highly effective in handling state when the components and data usage are minimal.

- useMutationObserver.js hook is used to highlight the changes that takes place in the table.

- NOTE: I've utilized session storage to persist data upon page refresh. 
        While the initial load might take a couple of seconds, subsequent reloads will retrieve the last loaded data from storage

- Overall, this approach is flexible and efficient. It leverages distinct, reusable custom hooks 
  for various operations allows the component to concentrate solely on rendering the data, resulting in a lightweight structure.


Updated Project Brief: Now the chart will show the data continuously without throttling. 

- This is done by adding a precision(P0 - continous data fetch) to the WebSocket. Also, the setTimeout is removed 
from the code to support the continous data flow.

- Moved the MutationObserver hook from useWebSockets.js to orderBookComponent.js for a better representation of 
the data row changes. This is done because, orderBookComponent.js is the file where the DOM manipulation happens, 
so moving the code to this component provides better, accurate and immediate representation.

- Since we are getting data one by one from the WebSocket, I have added a condition that collects the data in 
an array and once when the limit is reached the data will be rendered in the DOM initially. 
After the initial render, the data will change continuously. This provides a better user experience.

- With this implementation, a potential concern may arise due to the limited resource availability of the public API 
provided by Bitfinex. Consequently, there is a possibility of encountering interruptions in data flow 
during continuous fetch operations. If that happens, try refresing the browser once to start the fetching again.
