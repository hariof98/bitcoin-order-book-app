const useMutationObserver = () => {
    const observerConfig = {
        subtree: true,
        childList: true,
        characterData: true,
        characterDataOldValue: true,
    };

    const observeElement = (element, classToAdd) => {
        const observer = new MutationObserver((entries) => {
            entries.forEach((entry) => {
                const targetElement = entry.target.parentNode.parentElement;

                if (targetElement.classList.contains(classToAdd)) {
                    targetElement.classList.add(`${classToAdd}-color-animation`);

                    setTimeout(() => {
                        targetElement.classList.remove(`${classToAdd}-color-animation`);
                    }, 500);
                }
            });
        });

        observer.observe(element, observerConfig);

        return observer;
    };

    const bidsElements = document.querySelectorAll("tr.table-data.bids");
    const asksElements = document.querySelectorAll("tr.table-data.asks");

    const bidsObservers = Array.from(bidsElements).map((element) => observeElement(element, "bids"));
    const asksObservers = Array.from(asksElements).map((element) => observeElement(element, "asks"));

    return () => {
        bidsObservers.forEach((observer) => observer.disconnect());
        asksObservers.forEach((observer) => observer.disconnect());
    };
};

export default useMutationObserver;
