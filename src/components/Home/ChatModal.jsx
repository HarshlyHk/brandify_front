import React, { useEffect, useState } from "react";
const ChatModal = () => {
  const [isChatModalOpen, setChatModalOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="fixed top-0 z-50 w-full">
      <button
        className="fixed bottom-8 right-8 bg-transparent text-white border-none rounded-lg p-2 flex items-center justify-center cursor-pointer  text-xl "
        onClick={() => setChatModalOpen(true)}
      >
        <svg
          fill="red"
          height="40px"
          width="40px"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 60 60"
        >
          <g>
            <path d="M26,9.586C11.664,9.586,0,20.09,0,33c0,4.499,1.418,8.856,4.106,12.627c-0.51,5.578-1.86,9.712-3.813,11.666 c-0.304,0.304-0.38,0.768-0.188,1.153C0.276,58.789,0.625,59,1,59c0.046,0,0.093-0.003,0.14-0.01 c0.349-0.049,8.432-1.213,14.317-4.585c3.33,1.333,6.874,2.009,10.544,2.009c14.336,0,26-10.503,26-23.414S40.337,9.586,26,9.586z" />
            <path d="M55.894,37.042C58.582,33.27,60,28.912,60,24.414C60,11.503,48.337,1,34,1c-8.246,0-15.968,3.592-20.824,9.42 C17.021,8.614,21.38,7.586,26,7.586c15.439,0,28,11.4,28,25.414c0,5.506-1.945,10.604-5.236,14.77 c4.946,1.887,9.853,2.6,10.096,2.634c0.047,0.006,0.094,0.01,0.14,0.01c0.375,0,0.724-0.211,0.895-0.554 c0.192-0.385,0.116-0.849-0.188-1.153C57.753,46.753,56.403,42.619,55.894,37.042z" />
          </g>
        </svg>
      </button>

      {isChatModalOpen && (
        <div className="fixed bottom-8 right-4 bg-black rounded-lg p-4 w-full max-w-xs border-2 border-gray-700 text-white z-[1000] animate-fadeIn sm:bottom-24 sm:right-5 sm:w-96">
          <button
            className="bg-red-600 text-white border-none px-3 py-1 rounded cursor-pointer float-right transition hover:bg-red-700"
            onClick={() => setChatModalOpen(false)}
          >
            Close
          </button>
          <div className="my-2">
            {[
              {
                question: "What is the delivery time?",
                answer:
                  "Our order processing time is 24 hrs. Once shipped it takes 3-7 days to get delivered, depending on location.",
              },
              {
                question: "How to track my order?",
                answer: (
                  <>
                    <p>
                      If you haven't received your tracking ID within 24 hours,
                      share your order ID here, and we'll provide it within 1-2
                      hours.
                    </p>
                    <p>
                      Already have tracking details? Use the links below to
                      track your order:
                    </p>
                    <ul className="list-disc ml-5">
                      <li>
                        <a
                          to="https://www.shiprocket.in/shipment-tracking/"
                          className="text-blue-500 underline"
                        >
                          Shiprocket
                        </a>
                      </li>
                      <li>
                        <a
                          to="https://www.shreemaruti.com/track-your-shipment/"
                          className="text-blue-500 underline"
                        >
                          Shree Maruti
                        </a>
                      </li>
                    </ul>
                  </>
                ),
              },
              {
                question: "What is your contact info?",
                answer:
                  "You can reach us through Instagram DM @drip.co.in or email us at ifeeldrip@gmail.com. We aim to respond within 24 hours.",
              },
              {
                question: "Where is your store located?",
                answer:
                  "We do not have an offline store, but we are based in Delhi. If you have any doubts about the product, feel free to DM us on Instagram at @drip.co.in. We can arrange a live video call to assist you.",
              },
            ].map((item, index) => (
              <div key={index} className="mb-4">
                <div
                  className="bg-white text-black px-3 py-2 cursor-pointer rounded-t uppercase transition hover:bg-gray-200"
                  onClick={() => toggleAccordion(index)}
                >
                  {item.question}
                </div>
                {activeAccordion === index && (
                  <div className="bg-white text-black px-3 py-2 rounded-b border-t border-black">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatModal;
