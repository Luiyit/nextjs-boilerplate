import React, { useState } from 'react';
import Label from '../../base/form/Label';
import { Modal, Upload as AntUpload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getBase64 } from '@core/utils/file'
import ImgCrop from 'antd-img-crop';

import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';

export interface FileUploadProps<ResponseType = any> extends UploadProps{
  name: string;
  uploadUrl: string;
  label?: string;
  modalTitle?: string;
  performResponse?: (list: UploadFile<ResponseType>[]) => any;
  maxFiles?: number;
  className?: string;
  defaultValue?: UploadFile[];
  method?: UploadProps['method'];
}

function FileUpload<ResponseType>({ 
  name, 
  label,
  modalTitle, 
  uploadUrl, 
  maxFiles,
  className, 
  defaultValue,
  onChange,
  ...rest
}: FileUploadProps<ResponseType>){
  
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile<ResponseType>[]>(defaultValue || []);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile<ResponseType>) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile<ResponseType>>) => {
    console.log("ON CHANGE")
    const { fileList } = info;
    setFileList(fileList)
    onChange?.(info)
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
        <Label label={label} name={name} />
      )}

      <ImgCrop aspect={1}>
        <AntUpload
          className={className}
          action={uploadUrl}
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          name={name}
          {...rest}
        >
          {fileList.length >= (maxFiles || Number.MAX_SAFE_INTEGER) ? null : uploadButton}
        </AntUpload>
      </ImgCrop>

      <Modal open={previewOpen} title={modalTitle} footer={null} onCancel={handleCancel}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={label} style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default FileUpload;
