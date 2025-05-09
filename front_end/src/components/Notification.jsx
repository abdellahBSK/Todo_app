import React, { useState, useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded shadow-lg z-50`}>
      {message}
      <button
        onClick={() => {
          setIsVisible(false);
          if (onClose) onClose();
        }}
        className="ml-2 font-bold"
      >
        ×
      </button>
    </div>
  );
};

export default Notification;