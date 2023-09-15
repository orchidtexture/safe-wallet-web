import React, { type ReactElement, useCallback } from 'react'
import { useRouter } from 'next/router'
import ListItem from '@mui/material/ListItem'
import { ImplementationVersionState } from '@safe-global/safe-gateway-typescript-sdk'

import {
  SidebarList,
  SidebarListItemButton,
  SidebarListItemIcon,
  SidebarListItemText,
} from '@/components/sidebar/SidebarList'
import { dashboardNavItem, defiNavItems, fiatNavItems, paymentsNavItems, settingsNavItem } from './config'
import useSafeInfo from '@/hooks/useSafeInfo'
import { AppRoutes } from '@/config/routes'
import useTxQueue from '@/hooks/useTxQueue'
import { Divider, Typography } from '@mui/material'

const getSubdirectory = (pathname: string): string => {
  return pathname.split('/')[1]
}

const Navigation = (): ReactElement => {
  const router = useRouter()
  const { safe } = useSafeInfo()
  const currentSubdirectory = getSubdirectory(router.pathname)
  const hasQueuedTxs = Boolean(useTxQueue().page?.results.length)

  // Indicate whether the current Safe needs an upgrade
  settingsNavItem.badge = safe.implementationVersionState === ImplementationVersionState.OUTDATED

  // Route Transactions to Queue if there are queued txs, otherwise to History
  const getRoute = useCallback(
    (href: string) => {
      if (href === AppRoutes.transactions.history && hasQueuedTxs) {
        return AppRoutes.transactions.queue
      }
      return href
    },
    [hasQueuedTxs],
  )

  const isDashboardSelected = currentSubdirectory === getSubdirectory(dashboardNavItem.href)
  const isSettingsSelected = currentSubdirectory === getSubdirectory(settingsNavItem.href)

  return (
    <SidebarList>
      <ListItem disablePadding selected={isDashboardSelected}>
        <SidebarListItemButton
          selected={isDashboardSelected}
          href={{ pathname: getRoute(dashboardNavItem.href), query: { safe: router.query.safe } }}
        >
          {dashboardNavItem.icon && (
            <SidebarListItemIcon badge={dashboardNavItem.badge}>{dashboardNavItem.icon}</SidebarListItemIcon>
          )}
          <SidebarListItemText bold>{dashboardNavItem.label}</SidebarListItemText>
        </SidebarListItemButton>
      </ListItem>
      <Divider />
      <Typography gutterBottom>Payments</Typography>
      {paymentsNavItems.map((item) => {
        const isSelected = currentSubdirectory === getSubdirectory(item.href)

        return (
          <ListItem key={item.href} disablePadding selected={isSelected}>
            <SidebarListItemButton
              selected={isSelected}
              href={{ pathname: getRoute(item.href), query: { safe: router.query.safe } }}
            >
              {item.icon && <SidebarListItemIcon badge={item.badge}>{item.icon}</SidebarListItemIcon>}
              <SidebarListItemText bold>{item.label}</SidebarListItemText>
            </SidebarListItemButton>
          </ListItem>
        )
      })}
      <Divider />
      <Typography gutterBottom>Fiat</Typography>
      {fiatNavItems.map((item) => {
        const isSelected = currentSubdirectory === getSubdirectory(item.href)

        return (
          <ListItem key={item.href} disablePadding selected={isSelected}>
            <SidebarListItemButton
              selected={isSelected}
              href={{ pathname: getRoute(item.href), query: { safe: router.query.safe } }}
            >
              {item.icon && <SidebarListItemIcon badge={item.badge}>{item.icon}</SidebarListItemIcon>}
              <SidebarListItemText bold>{item.label}</SidebarListItemText>
            </SidebarListItemButton>
          </ListItem>
        )
      })}
      <Divider />
      <Typography gutterBottom>DeFi</Typography>
      {defiNavItems.map((item) => {
        const isSelected = currentSubdirectory === getSubdirectory(item.href)

        return (
          <ListItem key={item.href} disablePadding selected={isSelected}>
            <SidebarListItemButton
              selected={isSelected}
              href={{ pathname: getRoute(item.href), query: { safe: router.query.safe } }}
            >
              {item.icon && <SidebarListItemIcon badge={item.badge}>{item.icon}</SidebarListItemIcon>}
              <SidebarListItemText bold>{item.label}</SidebarListItemText>
            </SidebarListItemButton>
          </ListItem>
        )
      })}
      <Divider />
      <ListItem disablePadding selected={isSettingsSelected}>
        <SidebarListItemButton
          selected={isSettingsSelected}
          href={{ pathname: getRoute(settingsNavItem.href), query: { safe: router.query.safe } }}
        >
          {settingsNavItem.icon && (
            <SidebarListItemIcon badge={settingsNavItem.badge}>{settingsNavItem.icon}</SidebarListItemIcon>
          )}
          <SidebarListItemText bold>{settingsNavItem.label}</SidebarListItemText>
        </SidebarListItemButton>
      </ListItem>
    </SidebarList>
  )
}

export default React.memo(Navigation)
