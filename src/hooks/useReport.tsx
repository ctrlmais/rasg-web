import { useFormik } from 'formik';

export function useReport() {
  const formikReportBug = useFormik({
    initialValues: {
      page: '',
      message: '',
    },
    onSubmit: () => {},
  });

  return {
    formikReportBug,
  };
}
