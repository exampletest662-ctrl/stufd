'use client'

import { Home, PackageCheck, Search, ShoppingBag, UserRound, Utensils } from 'lucide-react'

type NavbarProps = {
  tab: string
  query: string
  cartCount: number
  onTabChange: (tab: string) => void
  onQueryChange: (query: string) => void
  onCartOpen: (open: boolean) => void
}

export function Navbar({ tab, query, cartCount, onTabChange, onQueryChange, onCartOpen }: NavbarProps) {
  const handleTabChange = (nextTab: string) => {
    onTabChange(nextTab)
    onCartOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 lg:px-8">
        <button className="flex shrink-0 items-center gap-2" onClick={() => handleTabChange('Discover')} aria-label="FoodDash home">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground"><Utensils className="size-5" /></span>
          <span className="text-xl font-black tracking-tight">Food<span className="text-primary">Dash</span></span>
        </button>
        <div className="ml-2 hidden items-center gap-2 border-l border-border pl-5 text-sm md:flex"><span className="size-2 rounded-full bg-primary" />Delivering to <strong>Home</strong></div>
        <div className="relative ml-auto hidden w-full max-w-sm md:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search dishes or restaurants" className="h-10 w-full rounded-xl bg-muted pl-10 pr-4 text-sm outline-none ring-primary transition focus:ring-2" />
        </div>
        <nav className="hidden items-center gap-1 lg:flex">
          <NavButton icon={Home} label="Discover" active={tab === 'Discover'} onClick={() => handleTabChange('Discover')} />
          <NavButton icon={PackageCheck} label="Orders" active={tab === 'Orders'} onClick={() => handleTabChange('Orders')} />
          <NavButton icon={UserRound} label="Profile" active={tab === 'Profile'} onClick={() => handleTabChange('Profile')} />
        </nav>
        <button className="relative grid size-10 place-items-center rounded-xl border border-border hover:bg-muted" onClick={() => onCartOpen(true)} aria-label={`Cart with ${cartCount} items`}>
          <ShoppingBag className="size-5" />
          {cartCount > 0 && <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{cartCount}</span>}
        </button>
      </div>
    </header>
  )
}

function NavButton({ icon: Icon, label, active, onClick }: { icon: typeof Home; label: string; active: boolean; onClick: () => void }) {
  return <button onClick={onClick} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${active ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><Icon className="size-4" />{label}</button>
}
