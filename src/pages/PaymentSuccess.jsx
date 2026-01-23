import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

function PaymentSuccess() {
  const navigate = useNavigate();

  const handleViewOrder = () => {
    navigate('/my-orders');
  };

  useEffect(() => {
    // Launch confetti for 2 seconds
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    const confettiInterval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(confettiInterval);
        return;
      }

      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        }
      });
    }, 300);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[600px] bg-white px-6 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#edd9c1] text-[#3f1f0a] px-6 py-6 rounded-2xl shadow-2xl max-w-xl w-full text-center"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold mb-3 text-[#3f1f0a]"
        >
          🎉 Thank You!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg mb-6"
        >
          Your payment was successful and your order has been placed.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleViewOrder}
          className="bg-[#3f1f0a] text-white font-light py-2 px-6 rounded-full transition duration-300 cursor-pointer"
        >
          View My Order
        </motion.button>
      </motion.div>
    </div>
  );
}

export default PaymentSuccess;
