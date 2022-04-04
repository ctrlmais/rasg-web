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

  return {
    formikReportBug,
  };
}
