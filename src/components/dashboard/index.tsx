import type { ReactElement } from 'react'
import { Grid } from '@mui/material'
import PendingTxsList from '@/components/dashboard/PendingTxs/PendingTxsList'
import Overview from '@/components/dashboard/Overview/Overview'
import CreationDialog from '@/components/dashboard/CreationDialog'
import { useRouter } from 'next/router'
import Relaying from '@/components/dashboard/Relaying'
import { FEATURES } from '@/utils/chains'
import { useHasFeature } from '@/hooks/useChains'
import { CREATION_MODAL_QUERY_PARM } from '../new-safe/create/logic'

const Dashboard = (): ReactElement => {
  const router = useRouter()
  const supportsRelaying = useHasFeature(FEATURES.RELAYING)
  const { [CREATION_MODAL_QUERY_PARM]: showCreationModal = '' } = router.query

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Overview />
        </Grid>

        <Grid item xs={12} lg={6}>
          <PendingTxsList size={4} />
        </Grid>

        {supportsRelaying ? (
          <Grid item xs={12} lg={6}>
            <Relaying />
          </Grid>
        ) : null}
      </Grid>
      {showCreationModal ? <CreationDialog /> : null}
    </>
  )
}

export default Dashboard
