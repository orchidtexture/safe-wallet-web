import type { ReactElement, ReactNode } from 'react'

import PageHeader from '@/components/common/PageHeader'
import css from '@/components/common/PageHeader/styles.module.css'
import BatchPaymentsNavigation from '@/components/batch-payments/BatchPaymentsNavegation'

const BatchPaymentsHeader = ({ children }: { children?: ReactNode }): ReactElement => {
  return (
    <PageHeader
      title="Batch payments"
      action={
        <div className={css.pageHeader}>
          <div className={css.navWrapper}>
            <BatchPaymentsNavigation />
          </div>
          {children && <div className={css.actionsWrapper}>{children}</div>}
        </div>
      }
    />
  )
}

export default BatchPaymentsHeader
