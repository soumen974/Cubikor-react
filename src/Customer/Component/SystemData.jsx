import React, { useEffect, useState } from 'react';

const SystemDAta = () => {
  const [browserName, setBrowserName] = useState('');
  const [systemDetails, setSystemDetails] = useState('');
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    // Get browser name
    const browser = detectBrowser();
    setBrowserName(browser);

    // Get system details
    const system = detectSystem();
    setSystemDetails(system);

    // Get IP address
    fetchIpAddress();

    // You can now send these details to your server for session tracking
    // For example, using fetch or any AJAX library

  }, []); // Only run this effect once, on component mount

  // Function to detect browser
  const detectBrowser = () => {
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown';
    if (userAgent.indexOf('Firefox') > -1) {
      browserName = 'Firefox';
    } else if (userAgent.indexOf('Chrome') > -1) {
      browserName = 'Chrome';
    } else if (userAgent.indexOf('Safari') > -1) {
      browserName = 'Safari';
    } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) {
      browserName = 'Internet Explorer';
    }
    // Check for mobile browsers
    if (userAgent.match(/Android/i)) {
      browserName = 'Android Browser';
    } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
      browserName = 'Safari (iOS)';
    }
    return browserName;
  };

  // Function to detect system details
  const detectSystem = () => {
    const platform = navigator.platform;
    const userAgent = navigator.userAgent;
    let systemDetails = `${platform}`;
    // Check for mobile platforms
    if (userAgent.match(/Android/i)) {
      systemDetails += ' (Android)';
    } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
      systemDetails += ' (iOS)';
    }
    return systemDetails;
  };

  // Function to fetch IP address
  const fetchIpAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setIpAddress(data.ip);
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
  };

  return (
    <div>
      <p>Browser: {browserName}</p>
      <p>System: {systemDetails}</p>
      <p>IP Address: {ipAddress}</p>
    </div>
  );
};

export default SystemDAta;
