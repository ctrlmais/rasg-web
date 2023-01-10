import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiPlus } from 'react-icons/fi';

import { DropzoneProps } from 'types/ComponentsProps';

import styles from './DropzoneServices.module.scss';

export function DropzoneServices({ onFileUploaded, image }: DropzoneProps) {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');
  const maxFileSize = 5242880; // 5MB

  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded],
  );
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
    maxSize: maxFileSize,
  });

  const isFileTooLarge =
    fileRejections.length > 0 && fileRejections[0].file.size > maxFileSize;

  return (
    <div className={styles.dropzone} {...getRootProps()}>
      <input {...getInputProps()} />

      {selectedFileUrl ? (
        <div className={styles.profile}>
          <img
            src={selectedFileUrl}
            alt="Point thumbnail"
            className={styles.preview}
          />
        </div>
      ) : (
        <div className={styles.profile}>
          {image ? (
            <img src={image} alt="Point thumbnail" className={styles.preview} />
          ) : (
            <FiPlus size={24} color="#ff9000" />
          )}
        </div>
      )}
      {isFileTooLarge && <p>O tamanho máximo é de 5MB.</p>}
    </div>
  );
}
