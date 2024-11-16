
import React, { useState } from 'react';
import {
  ShoppingCart,
  User,
  Download,
  CreditCard,
  ArrowLeft,
  Check,
  ChevronRight,
  X,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import emailjs from '@emailjs/browser';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const BadgeMerchandise = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [email, setEmail] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastOrder, setLastOrder] = useState(null); // New state for storing last order details

  const badges = [
    {
      id: 1,
      name: 'Beginner',
      description: 'Complete a habit for 3 consecutive days',
      price: 19.99,
      image: '/assets/1.png',
      colors: ['Sky Blue', 'Sunset Orange', 'Lime Green'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 2,
      name: 'Committed',
      description: 'Verify a 7-day streak in any habit',
      price: 22.99,
      image: '/assets/2.png',
      colors: ['Electric Yellow', 'Crimson Red', 'Forest Green'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 3,
      name: 'Consistent',
      description: 'Have a 30-day streak in any habit',
      price: 24.99,
      image: '/assets/3.png',
      colors: ['Bright Blue', 'Vibrant Purple', 'Mint Green'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 4,
      name: 'Challenge Seeker',
      description: 'Join your first challenge',
      price: 19.99,
      image: '/assets/4.png',
      colors: ['purple', 'Electric Violet', 'Crimson'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 5,
      name: 'Challenge Conqueror',
      description: 'Successfully complete any challenge',
      price: 26.99,
      image: '/assets/5.png',
      colors: ['Golden Yellow', 'Deep Red', 'Ocean Blue'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 6,
      name: 'Goal Getter',
      description: 'Reach or exceed 100 points across all activities',
      price: 28.99,
      image: '/assets/6.png',
      colors: ['Sunset Pink', 'Sky Blue', 'Silver'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 7,
      name: 'Master of Habits',
      description: 'Achieve a continuous 90-day streak in a habit',
      price: 34.99,
      image: '/assets/7.png',
      colors: ['Midnight Blue', 'Royal Purple', 'Gold'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 8,
      name: 'Habit Hero',
      description: 'Complete 5 unique habit goals',
      price: 29.99,
      image: '/assets/8.png',
      colors: ['Emerald Green', 'Electric Orange', 'Deep Black'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 9,
      name: 'Streak Star',
      description: 'Achieve a 60-day streak in any habit',
      price: 23.99,
      image: '/assets/9.png',
      colors: ['Bright Yellow', 'Steel Blue', 'Electric Pink'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 10,
      name: 'Perfectionist',
      description: 'Successfully complete 10 challenges',
      price: 37.99,
      image: '/assets/10.png',
      colors: ['Crystal White', 'Neon Red', 'Violet'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
  ];
  
  

  const addToCart = (badge) => {
    setCart([
      ...cart,
      { ...badge, quantity: 1, size: 'M', color: badge.colors[0] },
    ]);
    window.alert("Added to Cart");
  };

  const generateOrderNumber = () => {
    return 'ORD-' + Date.now().toString().slice(-8);
  };

 
  const handleEmailSubmit = async () => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
  
    setEmailError('');
    setIsProcessing(true);
    const orderNum = generateOrderNumber();
    setOrderNumber(orderNum);
  
    // Store order details before clearing the cart
    const currentOrder = {
      orderNumber: orderNum,
      email: email.trim(),
      cart: [...cart], // Clone the cart to preserve data
      totalAmount: cart.reduce((sum, item) => sum + item.price, 0).toFixed(2),
      date: new Date().toLocaleDateString(),
    };
    setLastOrder(currentOrder);
  
    try {
      // Initialize EmailJS (only if not already initialized elsewhere in your code)
      emailjs.init('W_dY7TuoOC8I1NHav');
  
      // Prepare email template parameters
      const templateParams = {
        user_email: currentOrder.email,  // Use user_email to match the template
        order_number: currentOrder.orderNumber,
        order_details: currentOrder.cart.map((item) =>
          `${item.name} - Size: ${item.size} - Color: ${item.color} - $${item.price.toFixed(
            2
          )}`
        ).join('\n'),
        total_amount: `$${currentOrder.totalAmount}`,
        order_date: currentOrder.date,
      };
  
      // Send email via EmailJS
      await emailjs.send(
        'service_r8k2urj',      // Your EmailJS service ID
        'template_b4c030e',     // Your EmailJS template ID
        templateParams          // Template parameters to be sent
      );
  
      setShowEmailModal(false);
      setShowPayment(true);
  
      // Simulate payment processing
      setTimeout(() => {
        setShowPayment(false);
        setOrderConfirmed(true);
        setShowCart(false);
        setIsProcessing(false);
        // Clear cart and email after successful order
        setCart([]);
        setEmail('');
      }, 2000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setEmailError('Failed to process order. Please try again.');
      setIsProcessing(false);
    }
  };
  
  const generatePDF = () => {
    try {
      if (!lastOrder) {
        alert('No order details available to generate PDF.');
        return;
      }

      const doc = new jsPDF();

      // Add header with proper positioning
      doc.setFontSize(20);
      doc.text('Order Receipt', 105, 20, { align: 'center' });

      // Add order details with proper spacing
      doc.setFontSize(12);
      doc.text(`Order Number: ${lastOrder.orderNumber}`, 20, 40);
      doc.text(`Date: ${lastOrder.date}`, 20, 50);
      doc.text(`Email: ${lastOrder.email}`, 20, 60);

      // Create table with proper formatting
      const tableData = lastOrder.cart.map((item) => [
        item.name,
        item.size,
        item.color,
        `$${item.price.toFixed(2)}`,
      ]);

      doc.autoTable({
        startY: 70,
        head: [['Item', 'Size', 'Color', 'Price']],
        body: tableData,
        foot: [
          [
            'Total',
            '',
            '',
            `$${lastOrder.totalAmount}`,
          ],
        ],
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 5 },
        headStyles: { fillColor: [0, 121, 107] }, // Changed to a more subdued color
      });

      doc.save(`order-receipt-${lastOrder.orderNumber}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const CartPanel = () => (
    <div className="fixed right-0 top-0 h-full w-96 bg-gray-800 shadow-2xl p-6 z-50 transform transition-transform border-l border-purple-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-purple-400">Shopping Cart</h2>
        <button
          onClick={() => setShowCart(false)}
          className="text-purple-400 hover:text-purple-300"
        >
          <ArrowLeft />
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="border-b border-gray-700 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-purple-300">{item.name}</h3>
                <p className="text-sm text-gray-400">
                  Size: {item.size} • Color: {item.color}
                </p>
              </div>
              <p className="font-medium text-purple-400">${item.price}</p>
            </div>
          </div>
        ))
      )}

      <div className="absolute bottom-0 left-0 w-full p-6 bg-gray-800 border-t border-purple-500">
        <div className="flex justify-between mb-4">
          <span className="text-purple-300">Total:</span>
          <span className="font-bold text-purple-400">
            $
            {cart
              .reduce((sum, item) => sum + item.price, 0)
              .toFixed(2)}
          </span>
        </div>
        <button
          onClick={() => setShowEmailModal(true)}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-500 transition-colors duration-300"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );

  const EmailModal = () => (
    <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
      <DialogContent className="bg-gray-800 border border-purple-500">
        <DialogHeader>
          <DialogTitle className="text-purple-300">Enter Your Email</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mb-2 ${emailError ? 'border-red-500' : 'border-gray-600'}`}
            disabled={isProcessing}
          />
          
          {emailError && (
            <p className="text-red-500 text-sm mb-2">{emailError}</p>
          )}
          <Button
            onClick={handleEmailSubmit}
            className="w-full bg-purple-600 hover:bg-purple-500"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Continue to Payment'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-xl w-96 text-center border border-purple-500">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
        <h3 className="text-xl font-medium mb-2 text-purple-300">
          Processing Payment
        </h3>
        <p className="text-gray-400">Please don't close this window...</p>
      </div>
    </div>
  );

  const OrderSummaryModal = () => (
    <Dialog open={showSummaryModal} onOpenChange={setShowSummaryModal}>
      <DialogContent className="bg-gray-800 border border-purple-500">
        <DialogHeader>
          <DialogTitle className="text-purple-300">Order Summary</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="mb-4">
            <p className="text-gray-400">Order Number: {lastOrder?.orderNumber}</p>
            <p className="text-gray-400">Date: {lastOrder?.date}</p>
            <p className="text-gray-400">Email: {lastOrder?.email}</p>
          </div>
          <div className="space-y-4">
            {lastOrder?.cart.map((item, index) => (
              <div key={index} className="flex justify-between border-b border-gray-700 pb-2">
                <div>
                  <p className="text-purple-300">{item.name}</p>
                  <p className="text-sm text-gray-400">
                    Size: {item.size} • Color: {item.color}
                  </p>
                </div>
                <p className="text-purple-400">${item.price}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between font-bold">
            <span className="text-purple-300">Total:</span>
            <span className="text-purple-400">${lastOrder?.totalAmount}</span>
          </div>
          <Button
            onClick={generatePDF}
            className="w-full bg-purple-600 hover:bg-purple-500 mt-4"
          >
            <Download className="mr-2" /> Download Receipt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const OrderConfirmation = () => (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-purple-500">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-purple-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-purple-300">
          Thank you for your purchase!
        </h2>
        <p className="text-gray-400">
          Order confirmation has been sent to your email.
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={generatePDF}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors duration-300"
        >
          <Download className="w-4 h-4" /> Download Receipt
        </button>
        <button
          onClick={() => setShowSummaryModal(true)}
          className="flex items-center gap-2 px-4 py-2 border border-purple-500 rounded-lg hover:bg-gray-700 text-purple-400 transition-colors duration-300"
        >
          View Order Summary
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-700">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-purple-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-purple-400">Badge Merchandise</h1>
              <p className="text-gray-400">Wear Your Achievements with Pride!</p>
            </div>
            <div className="flex items-center gap-6">
              {/* <button className="flex items-center gap-2 text-purple-300 hover:text-purple-400 transition-colors duration-300">
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button> */}
              <button
                onClick={() => setShowCart(true)}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition-colors duration-300"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart ({cart.length})</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {orderConfirmed ? (
          <OrderConfirmation />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge) => (
              <Card
                key={badge.id}
                className="overflow-hidden hover:shadow-purple-700/50 transition-shadow bg-gray-800 border border-purple-700"
              >
                <CardHeader className="p-0">
                  <img
                    src={badge.image}
                    alt={badge.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="mb-2 mt-4 text-purple-300">{badge.name}</CardTitle>
                  <p className="text-gray-400 mb-4">{badge.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-purple-400">
                      ${badge.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(badge)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition-colors duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Modals and Panels */}
      {showCart && <CartPanel />}
      <EmailModal />
      {showPayment && <PaymentModal />}
      {showSummaryModal && <OrderSummaryModal />}
    </div>
  );
};

export default BadgeMerchandise;
