type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

type MainNavItem = NavItem

type SidebarNavItem = NavItem

type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

type MarketingConfig = {
  mainNav: MainNavItem[]
}

type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}

type User = {
  stripeCustomerId: string
  stripeSubscriptionId: string
}

type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }

