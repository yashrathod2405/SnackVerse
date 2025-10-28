import { useState } from 'react';

export const useAlert = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'success', duration = 3000) => {
    setAlert({ message, type, duration });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return {
    alert,
    showAlert,
    hideAlert
  };
};

export default useAlert;
