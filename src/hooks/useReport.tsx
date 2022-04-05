import { useState } from 'react';

import { useFormik } from 'formik';

export function useReport() {
  const formikReportBug = useFormik({
    initialValues: {
      page: '',
      message: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      inset: 'initial',
      border: 'none',
      background: '#312e38',
      overflow: 'auto',
      borderRadius: '4px',
      outline: 'none',
      padding: '0px',
      height: '65vh',
      width: '25rem',
      alignItems: 'center',
      justifyContent: 'center',
    },
    overlay: {
      display: 'flex',
      inset: '0px',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
  };

  return {
    formikReportBug,
    modalIsOpen,
    openModal,
    closeModal,
    customStyles,
  };
}
