'use client'

import { Bike, Clock3, Heart, Star } from 'lucide-react'

type Restaurant = {
  id: number
  name: string
  cuisine: string
  rating: number
  time: string
  image: string
  offer: string
}

export function RestaurantCard({ restaurant, favorite, onFavorite }: { restaurant: Restaurant; favorite: boolean; onFavorite: () => void }) {
  return <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><div className="relative aspect-[1.55] overflow-hidden"><img src={restaurant.image} alt={restaurant.name} className="size-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute bottom-3 left-3 rounded-md bg-primary px-2 py-1 text-[11px] font-extrabold text-primary-foreground">{restaurant.offer}</span><button onClick={onFavorite} className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/90" aria-label={`${favorite ? 'Remove' : 'Add'} ${restaurant.name} to favorites`}><Heart className={`size-4 ${favorite ? 'fill-primary text-primary' : ''}`} /></button></div><div className="flex flex-col gap-2 p-4"><div className="flex items-start justify-between gap-2"><div><h3 className="font-bold">{restaurant.name}</h3><p className="mt-1 text-xs text-muted-foreground">{restaurant.cuisine}</p></div><span className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-bold"><Star className="size-3 fill-primary text-primary" />{restaurant.rating}</span></div><div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="flex items-center gap-1"><Clock3 className="size-3.5" />{restaurant.time}</span><span>₹₹</span><span className="ml-auto flex items-center gap-1 text-primary"><Bike className="size-3.5" />Free delivery</span></div></div></article>
}
