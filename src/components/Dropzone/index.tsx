import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiCamera } from 'react-icons/fi';

import Avvvatars from 'avvvatars-react';
import { DropzoneProps } from 'types/ComponentsProps';

import { useAuth } from 'hooks/useAuth';

import styles from './Dropzone.module.scss';

export function Dropzone({ onFileUploaded }: DropzoneProps) {
  const { user, profileAvatar } = useAuth();

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
          <p>
            <img
              src={selectedFileUrl}
              alt="Point thumbnail"
              className={styles.preview}
            />
          </p>
          <div className={styles.upload}>
            <FiCamera />
          </div>
        </div>
      ) : (
        <div className={styles.profile}>
          <p>
            {profileAvatar ? (
              <img
                src={profileAvatar}
                alt={user?.nmUsuario}
                className={styles.preview}
              />
            ) : (
              <Avvvatars value={user?.nmUsuario || ''} size={160} />
            )}
          </p>
          <div className={styles.upload}>
            <FiCamera />
          </div>
        </div>
      )}
      {isFileTooLarge && <p>O tamanho máximo é de 5MB.</p>}
    </div>
  );
}
