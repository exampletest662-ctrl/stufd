'use client'

import { useMemo, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { RestaurantCard } from '@/components/restaurant/RestaurantCard'
import { categories } from '@/data/categories'
import { restaurants } from '@/data/restaurants'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggle as toggleFavorite } from '@/features/favorites/favoritesSlice'

export default function RestaurantsPage() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('Recommended')
  const [showFilters, setShowFilters] = useState(false)
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.favorites)
  const cart = useAppSelector((state) => state.cart)
  const cartCount = Object.values(cart).reduce((total, count) => total + count, 0)
  const filteredRestaurants = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const filtered = restaurants.filter((restaurant) => {
      const searchable = `${restaurant.name} ${restaurant.cuisine}`.toLowerCase()
      return (!normalizedQuery || searchable.includes(normalizedQuery)) && (category === 'All' || restaurant.cuisine.toLowerCase().includes(category.toLowerCase()))
    })
    if (sort === 'Rating') return [...filtered].sort((a, b) => b.rating - a.rating)
    if (sort === 'Fastest') return [...filtered].sort((a, b) => Number.parseInt(a.time) - Number.parseInt(b.time))
    return filtered
  }, [category, query, sort])

  return <div className="min-h-screen bg-background text-foreground">
    <Navbar tab="Discover" query={query} cartCount={cartCount} onTabChange={(tab) => { if (tab === 'Discover') window.location.href = '/' }} onQueryChange={setQuery} onCartOpen={() => { window.location.href = '/cart' }} />
    <section className="border-b border-border bg-card"><div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 py-3 md:px-8">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${category === item ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>{item}</button>)}</div></section>
    <main className="mx-auto min-h-[calc(100vh-64px)] max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 text-sm font-bold uppercase tracking-[.16em] text-primary">Made for you</p><h1 className="text-3xl font-black tracking-tight sm:text-4xl">Top restaurants near you</h1></div><div className="flex items-center gap-2"><button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:bg-muted"><SlidersHorizontal className="size-4" /> Filters</button><select value={sort} onChange={(event) => setSort(event.target.value)} className="h-9 rounded-lg border border-border bg-background px-3 text-sm font-semibold outline-none"><option>Recommended</option><option>Rating</option><option>Fastest</option></select></div></div>
      {showFilters && <div className="mb-6 flex flex-wrap gap-2 rounded-2xl bg-muted p-4 text-sm"><span className="font-bold">Popular filters:</span><span className="rounded-full bg-background px-3 py-1.5">Under 30 min</span><span className="rounded-full bg-background px-3 py-1.5">Rating 4.5+</span><span className="rounded-full bg-background px-3 py-1.5">Offers</span></div>}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredRestaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} favorite={favorites.includes(restaurant.id)} onFavorite={() => dispatch(toggleFavorite(restaurant.id))} />)}</div>
      {filteredRestaurants.length === 0 && <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">No restaurants found. Try another search.</div>}
    </main>
  </div>
}
