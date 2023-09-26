import { useRouter } from 'next/router'
import type { SafeAppData } from '@safe-global/safe-gateway-typescript-sdk'
import type { UrlObject } from 'url'
import { AppRoutes } from '@/config/routes'
import { SAFE_APPS_BATCH_PAYMENTS } from '@/config/constants'

export const useBatchPaymentsApp = (): { app?: SafeAppData; link: UrlObject } | undefined => {
  const router = useRouter()
  const appUrl = SAFE_APPS_BATCH_PAYMENTS

  return {
    link: {
      pathname: AppRoutes.apps.open,
      query: { safe: router.query.safe, appUrl },
    },
  }
}
