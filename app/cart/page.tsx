'use client'

import { useMemo } from 'react'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/Navbar'
import { CartItem } from '@/components/cart/CartItem'
import { dishes } from '@/data/dishes'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { add as addCartItem, remove as removeCartItem } from '@/features/cart/cartSlice'

export default function CartPage() {
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cart)
  const items = useMemo(() => Object.entries(cart).map(([id, quantity]) => ({ dish: dishes.find((item) => item.id === Number(id))!, quantity })), [cart])
  const cartCount = Object.values(cart).reduce((total, count) => total + count, 0)
  const subtotal = items.reduce((total, { dish, quantity }) => total + dish.price * quantity, 0)
  const delivery = subtotal > 399 || subtotal === 0 ? 0 : 39
  const total = subtotal + delivery

  return <div className="min-h-screen bg-background text-foreground"><Navbar tab="Discover" query="" cartCount={cartCount} onTabChange={(tab) => { if (tab === 'Discover') window.location.href = '/' }} onQueryChange={() => undefined} onCartOpen={() => undefined} /><main className="mx-auto min-h-[calc(100vh-64px)] max-w-5xl px-4 py-10 md:px-8"><button onClick={() => { window.location.href = '/restaurants' }} className="mb-8 text-sm font-bold text-muted-foreground hover:text-foreground">Back to browsing</button><div className="grid gap-8 lg:grid-cols-[1fr_340px]"><div><p className="mb-2 text-sm font-bold uppercase tracking-[.16em] text-primary">Your order</p><h1 className="mb-6 text-4xl font-black tracking-tight">Your cart</h1>{items.length === 0 ? <div className="rounded-2xl border border-dashed border-border p-12 text-center"><ShoppingBag className="mx-auto mb-3 size-8 text-muted-foreground" /><p className="font-bold">Your cart is empty</p><button onClick={() => { window.location.href = '/restaurants' }} className="mt-2 text-sm font-bold text-primary">Browse restaurants</button></div> : <div className="flex flex-col gap-3">{items.map(({ dish, quantity }) => <CartItem key={dish.id} dish={dish} quantity={quantity} onAdd={(id) => dispatch(addCartItem(id))} onRemove={(id) => dispatch(removeCartItem(id))} />)}</div>}</div><aside className="h-fit rounded-2xl border border-border bg-card p-5"><h2 className="font-black">Bill details</h2><div className="mt-5 flex flex-col gap-3 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal}</span></div><div className="flex justify-between"><span className="text-muted-foreground">Delivery fee</span><span>{delivery === 0 ? 'Free' : `₹${delivery}`}</span></div><div className="my-1 border-t border-border" /><div className="flex justify-between text-base font-black"><span>Total</span><span>₹{total}</span></div></div><Button className="mt-6 w-full rounded-xl" disabled={items.length === 0}>Place order <ArrowRight data-icon="inline-end" /></Button></aside></div></main></div>
}
