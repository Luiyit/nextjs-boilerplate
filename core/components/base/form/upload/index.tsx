import React, { useState } from 'react';
import Error from '../Error';
import Label from '../Label';
import { Modal, Upload as AntUpload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useFormContext } from 'react-hook-form';
import { getBase64 } from '@core/utils/file'

import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import type { ControllerProps } from '../types';

export interface InputProps extends ControllerProps {
  uploadUrl: string;
  filterBeforeSet?: (list: UploadFile[]) => any;
  maxFiles?: number;
}

/**
 * TODO: DefaultValue will be an array of image data or ids to fetch file internally
 */

function FileUpload({ name, label, uploadUrl, filterBeforeSet, fieldData, rules, maxFiles }: InputProps){

  const { setValue } = useFormContext();;
  const { field, fieldState } = fieldData
  const { value } = field
  
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>(value || []);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const getFormValue = (newFileList: UploadFile[]) => {
    let value = [...newFileList];

    if(typeof filterBeforeSet === 'function')
      value = filterBeforeSet(newFileList);
    
    if(value.length > 0) return value;
    return null;
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    const value = getFormValue(newFileList);
    setValue(name, value, { shouldValidate: true });
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  
  return (
    <>
      {label && (
        <Label label={label} name={name} isRequired={rules?.hasOwnProperty('required')} />
      )}

      <AntUpload
        action={uploadUrl}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= (maxFiles || Number.MAX_SAFE_INTEGER) ? null : uploadButton}
      </AntUpload>

      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={name} style={{ width: '100%' }} src={previewImage} />
      </Modal>

      <Error message={fieldState?.error?.message} />
    </>
  );
};

export default FileUpload;
