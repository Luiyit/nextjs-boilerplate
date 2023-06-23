import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CheckOutlined, CloseOutlined, LoadingOutlined, MenuOutlined } from '@ant-design/icons';
import { useQrCode, QrCodeType } from './use_qr_code';
import useOneEffect from '@core/hooks/use_one_effect';
import { useNotifier } from '@core/providers/notifier';
import { Button, Dropdown, MenuProps, Tag } from 'antd';
import { Wrapper, QrContainer } from './styled'
import { Html5QrcodeResult } from 'html5-qrcode';

const qrcodeRegionId = "html5qr-code-full-region";

export interface QrScannerProps {
  onCancel?: Function,
  onScan?: (decodedText: string, decodedResult: Html5QrcodeResult) => void,
  cancelOnScan?: boolean,
}

const QrScanner = ({ onCancel, onScan, cancelOnScan }: QrScannerProps) => {
  const scanningRef = useRef(false);
  const [scanning, setScanning] = useState(false);
  const [initializing, setInitializing] = useState(false);
  
  const { qr, cameras, error, status, requestPermission, loading }: QrCodeType  = useQrCode({ elmId: qrcodeRegionId });
  const { error: showError } = useNotifier();
  
  const onSuccess = useCallback(async (decodedText: string, decodedResult: Html5QrcodeResult) => {
    await qr.stop()
    setScanning(false)
    onCancel && cancelOnScan && await onCancel()
    onScan && await onScan(decodedText, decodedResult)
  }, [qr, onScan, onCancel, cancelOnScan]);

  const onError = useCallback(async (err: any) => {
    
  }, []);

  const runScanner = useCallback(async () => {
    
    if(initializing) return;

    setInitializing(true)

    const [camera] = cameras || [];
    const config = { fps: 5, aspectRatio: 1  };

    if(camera?.id){
      await qr.start(camera.id, config, onSuccess, onError);
      scanningRef.current = true;
      setScanning(true)
    }

    setInitializing(false)
  }, [initializing, onSuccess, onError, cameras, qr])
  
  useEffect(() => {
    if(status !== 'GRANTED') setInitializing(false)
  }, [status])

  useEffect(() => {
    const readyToScan = qr && !!cameras?.length
    if(!scanningRef.current && readyToScan) runScanner()  
  })

  useOneEffect(() => {
    showError(error, "Unable to start scanning, please try again later.")
  }, [error])

  const scanFromFile = async () => {
    console.error('Not implemented yet')
  }

  const cancel = async () => {
    setScanning(false)

    try {
      await qr.stop()
      scanningRef.current = false;
    } catch (_) {}

    onCancel && await onCancel()
  }

  const notRequested = status === 'NOT_REQUESTED';
  const notGranted = status === 'NOT_GRANTED';
  const granted = status === 'GRANTED';
  const showAskPermission = notGranted && !(loading || initializing);

  const items: MenuProps['items'] = [
    {
      key: 'scan',
      label: (
        <Button type="link" onClick={scanFromFile} style={{padding: 0}}>
          Scan from file
        </Button>
      ),
    },
    ...(showAskPermission && [{
      key: 'ask',
      label: (
        <Button type="link" onClick={requestPermission} style={{padding: 0}}>
          Ask permission again
        </Button>
      ),
    }] || []),
    ...(scanning && [{
      key: 'cancel',
      label: (
        <Button type="link" onClick={cancel} style={{padding: 0}} disabled={loading || initializing}>
          Cancel
        </Button>
      ),
    }] || []),
    ...(!scanning && granted && !(loading || initializing) && [{
      key: 'start_scanning',
      label: (
        <Button type="link" onClick={runScanner} style={{padding: 0}}>
          Scan QR
        </Button>
      ),
    }] || []),
  ];

  return (
    <Wrapper>
      {(loading || initializing) && (
        <div className="loading">
          <LoadingOutlined />
        </div>
      )}
      
      {notRequested && (
        <div className="grant_permission">
          <Button type="primary" onClick={requestPermission}>Grant camera permission</Button>
        </div>
      )}
      
      {notGranted && (
        <div className="not_granted"></div>
      )}

      <Dropdown menu={{ items }} placement="bottomRight" arrow>
        <Button><MenuOutlined /></Button>
      </Dropdown>
      <QrContainer id={qrcodeRegionId} />

      {notGranted && <Tag color="#cd201f"><CloseOutlined /> Permission denied</Tag>}
      {granted && <Tag color="#108ee9"><CheckOutlined /> Permission granted</Tag>}
    </Wrapper>
  )
}

export default QrScanner
