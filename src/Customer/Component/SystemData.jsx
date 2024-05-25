import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBrowserName, setSystemDetails, fetchIpAddress } from '../../redux/session';

const SystemData = () => {
  const dispatch = useDispatch();
  const { browserName, systemDetails, ipAddress, status, error } = useSelector((state) => state.systemData);

  useEffect(() => {
    const browser = detectBrowser();
    dispatch(setBrowserName(browser));

    const system = detectSystem();
    dispatch(setSystemDetails(system));

    dispatch(fetchIpAddress());
  }, [dispatch]);

  const detectBrowser = () => {
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown';
    if (userAgent.indexOf('Firefox') > -1) {
      browserName = 'Firefox';
    } else if (userAgent.indexOf('Brave') > -1 || userAgent.indexOf('Chrome') > -1) {
      browserName = 'Brave web browser';
    } else if (userAgent.indexOf('Safari') > -1) {
      browserName = 'Safari';
    } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) {
      browserName = 'Internet Explorer';
    }
    if (userAgent.match(/Android/i)) {
      browserName = 'Android Browser';
    } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
      browserName = 'Safari (iOS)';
    }
    return browserName;
  };

  const detectSystem = () => {
    const platform = navigator.platform;
    const userAgent = navigator.userAgent;
    let systemDetails = `${platform}`;
    if (userAgent.match(/Android/i)) {
      systemDetails += ' (Android)';
    } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
      systemDetails += ' (iOS)';
    }
    return systemDetails;
  };

  return (
    <div>
      <p>Browser: {browserName}</p>
      <p>System: {systemDetails}</p>
      <p>IP Address: {ipAddress}</p>
      {status === 'loading' && <p>Loading IP address...</p>}
      {status === 'failed' && <p>Error fetching IP address: {error}</p>}
    </div>
  );
};

export default SystemData;
