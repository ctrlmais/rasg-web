import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiCamera } from 'react-icons/fi';

import Avvvatars from 'avvvatars-react';
import { DropzoneProps } from 'types/IComponents';

import { useAuth } from 'hooks/useAuth';

import styles from './Dropzone.module.scss';

const Dropzone: React.FC<DropzoneProps> = ({ onFileUploaded }) => {
  const { user } = useAuth();
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded],
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div className={styles.dropzone} {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {selectedFileUrl ? (
        <div className={styles.profile}>
          <p>
            <img src={selectedFileUrl} alt="Point thumbnail" className={styles.preview} />
          </p>
          <div className={styles.upload}>
            <FiCamera />
          </div>
        </div>
      ) : (
        <div className={styles.profile}>
          <p>
            {user?.user_metadata.picture || user?.user_metadata.avatar_url ? (
              <img
                src={user?.user_metadata.picture || user?.user_metadata.avatar_url}
                alt="Perfil"
                className={styles.preview}
              />
            ) : (
              <Avvvatars value={user?.user_metadata.name || ''} size={160} />
            )}
          </p>
          <div className={styles.upload}>
            <FiCamera />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
