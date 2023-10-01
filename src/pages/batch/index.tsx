import type { NextPage } from 'next'
import Head from 'next/head'
import BatchPaymentsHeader from '@/components/batch-payments/BatchPaymentsHeader'
import { useBatchPaymentsApp } from '@/hooks/safe-apps/useBatchPaymentsApp'
import { Button } from '@mui/material'
import Link from 'next/link'

const buttonSx = {
  height: '58px',
  '& svg path': { fill: 'currentColor' },
}

const BatchPaymentsSafeApps: NextPage = () => {
  const batchPayments = useBatchPaymentsApp()
  if (!batchPayments?.link) return null

  return (
    <>
      <Head>
        <title>{'Batch payments safe app'}</title>
      </Head>
      <BatchPaymentsHeader />

      <main>
        <Link href={batchPayments.link} passHref style={{ width: '100%' }}>
          <Button variant="outlined" sx={buttonSx} fullWidth>
            Create batch payments
          </Button>
        </Link>
      </main>
    </>
  )
}

export default BatchPaymentsSafeApps
