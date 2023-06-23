import { Html5Qrcode } from "html5-qrcode";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getLocalStorage } from '@core/helpers/storage'

const CAMERA_PERMISSION_KEY = 'camera_permission_status'

interface Camera {
  id: string
  label: string
}

export interface QrCodeType {
  qr: Html5Qrcode
  cameras?: Camera[]
  loading: boolean
  error: string
  status: string
  requestPermission: () => void
}

export function useQrCode({ elmId }: { elmId: string }){

  const [qr, setQr] = useState<Html5Qrcode | null>(null)
  const [cameras, setCameras] = useState<Camera[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const storage = useMemo(() => getLocalStorage(), [])


  const setPermissionStatus = useCallback((status: string) => {
    storage.setItem(CAMERA_PERMISSION_KEY, status)
    setStatus(status)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const requestPermission = useCallback(async () => {
    try {
      setLoading(true)
      const cameras = await Html5Qrcode.getCameras()
      setCameras(cameras)
      setPermissionStatus('GRANTED')
    } catch (error) {
      setPermissionStatus('NOT_GRANTED')
      setError((error as DOMException).message)
    }
    setLoading(false)
  }, [setPermissionStatus])

  useEffect(() => {
    const permissionStatus = storage.getItem(CAMERA_PERMISSION_KEY)
    if(!permissionStatus) setPermissionStatus('NOT_REQUESTED')
    else setStatus(permissionStatus)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    (async () => {
      if(!qr) setQr(new Html5Qrcode(elmId))
      if (status && status === 'GRANTED') await requestPermission()

      setLoading(false)
    })()
  }, [qr, requestPermission, status, elmId])
  
  return {
    qr,
    cameras,
    error,
    loading,
    status,
    requestPermission,
  } as QrCodeType
}