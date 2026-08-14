import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Dish = {
  id: number
  restaurant: string
  name: string
  description: string
  price: number
  image: string
  vegetarian: boolean
}

export function FoodCard({ dish, quantity, onAdd, onRemove, onOpen }: { dish: Dish; quantity: number; onAdd: () => void; onRemove: () => void; onOpen: () => void }) {
  return <article className="overflow-hidden rounded-2xl border border-border bg-card"><button className="block w-full text-left" onClick={onOpen}><div className="relative aspect-[1.15] overflow-hidden"><img src={dish.image} alt={dish.name} className="size-full object-cover transition hover:scale-105" /><span className={`absolute left-3 top-3 size-4 rounded-sm border-2 border-card ${dish.vegetarian ? 'bg-primary' : 'bg-destructive'}`} /></div><div className="flex flex-col gap-1 p-4"><h3 className="font-bold">{dish.name}</h3><p className="line-clamp-2 min-h-10 text-xs leading-5 text-muted-foreground">{dish.description}</p><p className="mt-1 font-black">₹{dish.price}</p></div></button><div className="px-4 pb-4">{quantity === 0 ? <Button variant="outline" className="h-9 w-full rounded-lg" onClick={onAdd}>Add to cart <Plus data-icon="inline-end" /></Button> : <div className="flex h-9 items-center justify-between rounded-lg bg-secondary px-3 text-sm font-bold"><button onClick={onRemove} aria-label="Remove item"><Minus className="size-4" /></button><span>{quantity}</span><button onClick={onAdd} aria-label="Add item"><Plus className="size-4" /></button></div>}</div></article>
}
