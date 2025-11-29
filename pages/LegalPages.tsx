import React, { useState } from 'react';
import { SEO } from '../components/SEO';

export const PrivacyPolicy = () => (
  <div className="prose dark:prose-invert max-w-3xl mx-auto py-8">
    <SEO title="Privacy Policy" description="Privacy Policy for OmniCalc." />
    <h1>Privacy Policy</h1>
    <p>Last updated: October 2023</p>
    <p>At OmniCalc, accessible from omnicalc.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by OmniCalc and how we use it.</p>
    <h2>Consent</h2>
    <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
    <h2>Information we collect</h2>
    <p>Since OmniCalc is a client-side application, we do not store your personal data on our servers. All calculations happen directly in your browser.</p>
  </div>
);

export const TermsOfService = () => (
  <div className="prose dark:prose-invert max-w-3xl mx-auto py-8">
    <SEO title="Terms of Service" description="Terms and conditions for using OmniCalc." />
    <h1>Terms of Service</h1>
    <h2>1. Terms</h2>
    <p>By accessing this Website, accessible from OmniCalc, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws.</p>
    <h2>2. Use License</h2>
    <p>Permission is granted to temporarily download one copy of the materials on OmniCalc's Website for personal, non-commercial transitory viewing only.</p>
  </div>
);

export const AboutUs = () => (
  <div className="prose dark:prose-invert max-w-3xl mx-auto py-8">
    <SEO title="About Us" description="Learn more about the team behind OmniCalc." />
    <h1>About Us</h1>
    <p>OmniCalc was built with a single mission: to provide fast, free, and private calculators for everyone.</p>
    <p>Unlike other calculator sites that riddle you with ads and slow load times, we prioritize performance and user experience. Our tools are built using modern web technologies to ensure they work offline and on any device.</p>
  </div>
);

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    
    // Construct the mailto link
    const recipient = "syedharis0@yahoo.com";
    const subject = encodeURIComponent(`Contact Request from OmniCalc: ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    
    // Open default email client
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-xl mx-auto py-8 space-y-6">
      <SEO title="Contact Us" description="Get in touch with the OmniCalc team." />
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 dark:text-gray-400">Have questions or suggestions? Send us a message.</p>
      </div>
      <form className="space-y-4 bg-white dark:bg-dark-lighter p-6 rounded-xl shadow border border-gray-100 dark:border-gray-800" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg dark:bg-dark dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none transition-shadow" 
            placeholder="Your Name" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg dark:bg-dark dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none transition-shadow" 
            placeholder="name@example.com" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg dark:bg-dark dark:border-gray-700 h-32 focus:ring-2 focus:ring-primary outline-none transition-shadow" 
            placeholder="How can we help?"
          ></textarea>
        </div>
        <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
          Send Message
        </button>
      </form>
      <p className="text-center text-xs text-gray-400 mt-4">
        This will open your default email client to send the message.
      </p>
    </div>
  );
};