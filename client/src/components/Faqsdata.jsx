import React, { useState } from 'react';

const faqs = [
  {
    question: "Where do you ship?",
    answer: "We ship all across India.",
  },
  {
    question: "Does the gift box ship as shown?",
    answer: `Yes. Each set of products come laid in our beautiful print boxes with coordinating ribbon. Each box will ship inside a shipper box so it stays nice and pretty. We take great care in curating each gift, and we ship exactly what you see on each product page. However, there may be slight variation in color due to viewing on different screen resolutions.\nOn the rare occasion that we are out of stock on a particular item, one of our gifting specialists will personally contact you with options of equal or greater value.`,
  },
  {
    question: "How can I track my order?",
    answer: "Once you place your order online, you will receive an order confirmation emailed to your address which will include a tracking number.",
  },
  {
    question: "How long will it take to get my order?",
    answer: `Orders take 1 - 2 business days to process and 4 - 7 business days to ship via standard shipping. We offer free standard shipping across India.\nFor faster deliveries you can choose expedited shipping at check out at an additional cost. If you select one of our expedited shipping options, we will fulfil orders placed before 1pm IST the same business day, otherwise they will be fulfilled the next business day.`,
  },
  {
    question: "Can I have my order rushed?",
    answer: "Absolutely. We offer expedited shipping at checkout at an additional cost and if you are local to Delhi, we can deliver via messenger.",
  },
  {
    question: "Do you offer local pick up? Can I Pickup my gift ?",
    answer: "Yes, absolutely, you can pick up your gift from our studio at 35, Sant Fateh Singh Nagar, Dugri Road, Ludhiana. Monday – Friday 10 am – 3 pm with prior call.",
  },
  {
    question: "Do you offer free shipping on all orders?",
    answer: "We offer free Standard shipping across India, please allow 4-6 days for shipping, this does not include our processing time of 1-2 business days.\nShipping rates apply for Custom orders.",
  },
  {
    question: "Since this is a gift, can I request a specific delivery date for my gift order?",
    answer: "We are happy to work with you to make sure that your gift is received within a certain window of your desired date. Email us at luxelife.gifting@gmail.com and we'll work with you to make this happen.",
  },
  {
    question: "Help, I accidentally supplied the incorrect information––can I make changes to my order?",
    answer: "We understand that you may need to make some changes to your order such as incorrect address or name. We will do our best to accommodate if we have not already sent your order out (our processing time is 1-2 business days for standard delivery) Please email us at luxelife.gifting@gmail.com and we’ll do everything we can to help.",
  },
  {
    question: "Can I send gifts to multiple locations?",
    answer: "Absolutely! Please contact luxelife.gifting@gmail.com and we can get you squared away.",
  },
  {
    question: "Can you include a personalized note in my order?",
    answer: "Yes, we can include your personal note - simply write it in the box when you check out and we will handwrite your sentiment and include it with your gift.",
  },
  {
    question: "If I change my mind, can I cancel my order?",
    answer: "Orders once placed, cannot be cancelled.",
  },
  {
    question: "What is your return policy?",
    answer: "At The Luxelife, it is our passion to create a beautiful gifting experience. We guarantee the presentation and quality of our gifts upon delivery. Due to the nature of the items we include in our gift boxes, we are unable to accept returns or issue refunds. In the unlikely event your gift box has arrived in less than perfect condition, please notify us within 48 hours of delivery so we have the opportunity to make it right for you. You can reach us via email at luxelife.gifting@gmail.com",
  },
  {
    question: "What if my gift or products arrive damaged?",
    answer: "We are sorry to hear that, please share unboxing video of the shipping boxes and the products inside within 48 hours of delivery and email them to luxelife.gifting@gmail.com with the Subject line, DAMAGED SHIPMENT. We will work to remedy the situation ASAP",
  },
  {
    question: "Do The Luxelife Gifting boxes ever change ?",
    answer: "The Luxelife is a thoughtful gifting brand and we constantly innovate and update our gift boxes with unique ideas and products! We specialize in most of the major festivals and change them year to year to keep them unique.",
  },
  {
    question: "Can I customize my box?",
    answer: "We love to create custom boxes. Whether for corporate, wedding, or a special event, we would love to curate a bespoke box for your special occasion. Please email us at luxelife.gifting@gmail.com to find out more about our minimums and how we can work together.",
  },
  {
    question: "Can you personalise / add my logo to gift box? Do you create private label boxes?",
    answer: "Yes, we can create fully branded gift boxes for your company, or special event in multiple quantities. Please feel free to email us with any questions at luxelife.gifting@gmail.com",
  },
];



function Faqsdata() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen px-4 mx-auto max-w-7xl py-20 mt-5">
      <div className="text-center mb-12">
         <h2 class="font-heading mb-4 font-bold tracking-tight text-[#5B3A1A]  text-3xl sm:text-4xl"  style={{ fontFamily: "'Playfair Display', serif" }}>Frequently Asked Questions</h2>
            <p className="text-center text-[18px]  leading-snug font-normal tracking-wide text-[#5B3A1A] mb-[20px]" style={{ fontFamily: "'Lato', sans-serif" }}>
                 Find answers to common questions about our products and services.
            </p>
      </div>
      <div className="space-y-4 " >
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg "
            
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="faq-toggle w-full flex justify-between items-center p-6 text-left cursor-pointer"
            >
               
              <h3 className="font-bold text-xl text-[#3f1f0a] cursor-pointer" style={{ fontFamily: "'Lato', sans-serif" }}>{faq.question}</h3>
              <i
                className={`fas fa-chevron-down text-[#3f1f0a] transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              ></i>
            </button>
            <div
              className={`px-6 pb-2 overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
               <p className="text-[18px]  leading-snug font-normal tracking-wide text-[#5B3A1A]  mb-[10px]" style={{ fontFamily: "'Lato', sans-serif" }}>{faq.answer}</p>
              {faq.list && (
                <ul
                  className={`${
                    faq.ordered ? 'list-decimal' : 'list-disc'
                  } pl-5 text-gray-600 space-y-1`}
                >
                  {faq.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center bg-[#edd9c1] rounded-xl p-8" >
        <h2 className="text-2xl font-bold text-[#3f1f0a] mb-3" style={{ fontFamily: "'Lato', sans-serif" }}>Still have questions?</h2>
       <p className="text-[18px]  leading-snug font-normal tracking-wide text-[#5B3A1A]  mb-[10px]" style={{ fontFamily: "'Lato', sans-serif" }}>
          Our support team is happy to help you with any other questions you might have.
        </p>
        <button className="px-6 py-3 bg-[#3f1f0a] text-white rounded-lg  transition font-medium" style={{ fontFamily: "'Lato', sans-serif" }}>
          Contact Support
        </button>
      </div>
    </div>
  );
}

export default Faqsdata;
