import React, { useState } from 'react';
import Label from '../../base/form/Label';
import { Modal, Upload as AntUpload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getBase64 } from '@core/utils/file'
import ImgCrop from 'antd-img-crop';

import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';

export interface FileUploadProps<ResponseType> extends UploadProps{
  name: string;
  label?: string;
  uploadUrl: string;
  filterBeforeSet?: (list: UploadFile<ResponseType>[]) => any;
  maxFiles?: number;
  className?: string;
  defaultValue?: UploadFile[];
  method?: UploadProps['method'];
}

function FileUpload<ResponseType>({ 
  name, 
  label, 
  uploadUrl, 
  maxFiles,
  className, 
  defaultValue,
  method = 'PATCH',
  onChange,
  ...rest
}: FileUploadProps<ResponseType>){
  
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile<ResponseType>[]>(defaultValue || []);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile<ResponseType>) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile<ResponseType>>) => {
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
          method={method}
          name={name}
          listType="picture-circle"
          {...rest}
        >
          {fileList.length >= (maxFiles || Number.MAX_SAFE_INTEGER) ? null : uploadButton}
        </AntUpload>
      </ImgCrop>

      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={name} style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default FileUpload;
