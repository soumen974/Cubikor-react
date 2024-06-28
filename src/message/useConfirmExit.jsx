import { useEffect } from 'react';

const useConfirmExit = (message) => {
  useEffect(() => {
    const confirmExit = (e) => {
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    window.addEventListener('beforeunload', confirmExit);

    return () => {
      window.removeEventListener('beforeunload', confirmExit);
    };
  }, [message]);
};

export default useConfirmExit;
