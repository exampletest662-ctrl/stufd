import { Minus, Plus } from 'lucide-react'

type Dish = {
  id: number
  restaurant: string
  name: string
  description: string
  price: number
  image: string
  vegetarian: boolean
}

export function CartItem({ dish, quantity, onAdd, onRemove }: { dish: Dish; quantity: number; onAdd: (id: number) => void; onRemove: (id: number) => void }) {
  return <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-3"><img src={dish.image} alt={dish.name} className="size-20 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="truncate font-bold">{dish.name}</p><p className="text-sm text-muted-foreground">₹{dish.price} each</p></div><div className="flex items-center gap-3 rounded-lg bg-secondary px-3 py-2 text-sm font-bold"><button onClick={() => onRemove(dish.id)} aria-label={`Remove ${dish.name}`}><Minus className="size-4" /></button>{quantity}<button onClick={() => onAdd(dish.id)} aria-label={`Add ${dish.name}`}><Plus className="size-4" /></button></div></div>
}
