import { FaTruck, FaCheck, FaBox, FaShoppingBag } from "react-icons/fa";

const getOrderStep = (createdAt) => {
  const now = new Date();
  const created = new Date(createdAt);
  const diffMs = now - created;
  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays >= 15) return 4; // Delivered
  if (diffHours >= 36) return 3; // In Transit
  if (diffHours >= 4) return 2; // Packed
  return 1; // Confirmed
};

const OrderProgressBar = ({ createdAt }) => {
  const step = getOrderStep(createdAt);
  const steps = [
    { label: "Confirmed", icon: <FaCheck /> },
    { label: "Packed", icon: <FaBox /> },
    { label: "In Transit", icon: <FaTruck /> },
    { label: "Delivered", icon: <FaShoppingBag /> },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <div className="relative">
        {/* Progress line */}
        <div className="absolute top-4 left-0 right-0 flex">
          {steps.slice(0, -1).map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 h-0.5 ${
                step - 1 > idx ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        
        {/* Steps */}
        <div className="flex justify-between relative">
          {steps.map((s, idx) => (
            <div key={s.label} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                  step > idx
                    ? "bg-green-500 border-green-500 text-white"
                    : step === idx
                    ? "border-gray-800 bg-white text-gray-800"
                    : "border-gray-300 bg-white text-gray-400"
                }`}
              >
                {s.icon}
              </div>
              <span
                className={`mt-3 text-xs font-medium ${
                  step > idx ? "text-gray-800" : "text-gray-500"
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderProgressBar;