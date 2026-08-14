"use client";

import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { add as addCartItem, remove as removeCartItem } from "@/features/cart/cartSlice";
import { toggle as toggleFavorite } from "@/features/favorites/favoritesSlice";
import {
  ArrowRight,
  Check,
  Heart,
  Minus,
  PackageCheck,
  Plus,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Tag,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { restaurants } from "@/data/restaurants";
import { dishes } from "@/data/dishes";
import { categories } from "@/data/categories";
import type { Dish } from "@/types/dishes";
import { Navbar } from '@/components/layout/Navbar';
import { CartItem } from '@/components/cart/CartItem';
import { FoodCard } from '@/components/food/FoodCard';
import { RestaurantCard } from '@/components/restaurant/RestaurantCard';

export default function HomePage() {
  const [tab, setTab] = useState("Discover");
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Recommended");
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const favorites = useAppSelector((state) => state.favorites);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [placed, setPlaced] = useState(false);

  const filteredRestaurants = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = restaurants.filter((restaurant) => {
      const searchable =
        `${restaurant.name} ${restaurant.cuisine}`.toLowerCase();
      const matchesQuery =
        !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesCategory =
        category === "All" ||
        restaurant.cuisine.toLowerCase().includes(category.toLowerCase());
      return matchesQuery && matchesCategory;
    });
    if (sort === "Rating")
      return [...filtered].sort((a, b) => b.rating - a.rating);
    if (sort === "Fastest")
      return [...filtered].sort(
        (a, b) => Number.parseInt(a.time) - Number.parseInt(b.time),
      );
    return filtered;
  }, [category, query, sort]);

  const addToCart = (id: number) => dispatch(addCartItem(id));
  const removeFromCart = (id: number) => dispatch(removeCartItem(id));
  const cartCount = Object.values(cart).reduce(
    (total, count) => total + count,
    0,
  );
  const subtotal = Object.entries(cart).reduce((total, [id, count]) => {
    const dish = dishes.find((item) => item.id === Number(id));
    return total + (dish?.price ?? 0) * count;
  }, 0);

  if (placed)
    return (
      <Confirmation
        onContinue={() => {
          setPlaced(false);
          setShowCart(false);
          setTab("Discover");
        }}
      />
    );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        tab={tab}
        query={query}
        cartCount={cartCount}
        onTabChange={setTab}
        onQueryChange={setQuery}
        onCartOpen={setShowCart}
      />

      {tab === "Orders" ? (
        <Orders />
      ) : tab === "Profile" ? (
        <Profile />
      ) : showCart ? (
        <CartView
          cart={cart}
          subtotal={subtotal}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onBack={() => setShowCart(false)}
          onPlace={() => setPlaced(true)}
        />
      ) : (
        <main>
          <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 md:grid-cols-[1.05fr_.95fr] md:px-8 md:py-16">
            <div className="flex flex-col gap-6">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-bold text-secondary-foreground">
                <Sparkles className="size-3.5" /> Curated for your cravings
              </div>
              <h1 className="max-w-xl text-balance text-5xl font-black leading-[.98] tracking-[-.05em] sm:text-6xl lg:text-7xl">
                Good food.
                <br />
                <span className="text-primary">Good mood.</span>
              </h1>
              <p className="max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
                Discover the best local restaurants, delivered fresh and fast to
                your door.
              </p>
              <Button
                size="lg"
                className="w-fit rounded-xl px-6"
                onClick={() => {
                  window.location.href = "/restaurants"
                }}
              >
                Explore restaurants <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
            <div className="relative min-h-72 overflow-hidden rounded-[2rem] bg-secondary shadow-sm sm:min-h-96">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85"
                alt="Colorful Indian thali with fresh food"
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-primary-foreground">
                <div>
                  <p className="text-sm opacity-90">Tonight&apos;s pick</p>
                  <p className="text-2xl font-black">The comfort bowl</p>
                </div>
                <span className="rounded-full bg-background/90 px-3 py-1.5 text-xs font-bold text-foreground">
                  From ₹189
                </span>
              </div>
            </div>
          </section>
          <section className="border-y border-border bg-card">
            <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 py-3 md:px-8">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${category === item ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
          <section
            id="restaurants"
            className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14"
          >
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-[.16em] text-primary">
                  Made for you
                </p>
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                  Top restaurants near you
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:bg-muted"
                >
                  <SlidersHorizontal className="size-4" /> Filters
                </button>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="h-9 rounded-lg border border-border bg-background px-3 text-sm font-semibold outline-none"
                >
                  <option>Recommended</option>
                  <option>Rating</option>
                  <option>Fastest</option>
                </select>
              </div>
            </div>
            {showFilters && (
              <div className="mb-6 flex flex-wrap gap-2 rounded-2xl bg-muted p-4 text-sm">
                <span className="font-bold">Popular filters:</span>
                <span className="rounded-full bg-background px-3 py-1.5">
                  Under 30 min
                </span>
                <span className="rounded-full bg-background px-3 py-1.5">
                  Rating 4.5+
                </span>
                <span className="rounded-full bg-background px-3 py-1.5">
                  Offers
                </span>
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  favorite={favorites.includes(restaurant.id)}
                  onFavorite={() => dispatch(toggleFavorite(restaurant.id))}
                />
              ))}
            </div>
            {filteredRestaurants.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
                No restaurants found. Try another search.
              </div>
            )}
          </section>
          <section className="bg-muted/60">
            <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
              <p className="mb-2 text-sm font-bold uppercase tracking-[.16em] text-primary">
                Quick bites
              </p>
              <h2 className="mb-6 text-3xl font-black tracking-tight">
                Craving something specific?
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {dishes.map((dish) => (
                  <FoodCard
                    key={dish.id}
                    dish={dish}
                    quantity={cart[dish.id] ?? 0}
                    onAdd={() => addToCart(dish.id)}
                    onRemove={() => removeFromCart(dish.id)}
                    onOpen={() => setSelectedDish(dish)}
                  />
                ))}
              </div>
            </div>
          </section>
          <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 md:grid-cols-3 md:px-8 md:py-16">
            <Feature
              icon={Zap}
              title="Lightning fast"
              copy="Hot and fresh food at your door, without the wait."
            />
            <Feature
              icon={Tag}
              title="Big on value"
              copy="Daily deals and easy savings on every order."
            />
            <Feature
              icon={Heart}
              title="Made local"
              copy="Your order supports the restaurants around you."
            />
          </section>
        </main>
      )}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-7 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
          <strong className="text-foreground">
            Food<span className="text-primary">Dash</span>
          </strong>
          <span>© 2026 FoodDash. Made for hungry humans.</span>
          <span>Fresh food, better days.</span>
        </div>
      </footer>
      {selectedDish && (
        <DishModal
          dish={selectedDish}
          quantity={cart[selectedDish.id] ?? 0}
          onClose={() => setSelectedDish(null)}
          onAdd={() => addToCart(selectedDish.id)}
          onRemove={() => removeFromCart(selectedDish.id)}
        />
      )}
    </div>
  );
}


function Feature({
  icon: Icon,
  title,
  copy,
}: {
  icon: typeof Zap;
  title: string;
  copy: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl bg-card p-5">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
        <Icon className="size-5" />
      </span>
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{copy}</p>
      </div>
    </div>
  );
}

function DishModal({
  dish,
  quantity,
  onClose,
  onAdd,
  onRemove,
}: {
  dish: Dish;
  quantity: number;
  onClose: () => void;
  onAdd: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/45 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={dish.name}
    >
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-card shadow-xl">
        <div className="relative aspect-video">
          <img
            src={dish.image}
            alt={dish.name}
            className="size-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/90"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="flex flex-col gap-3 p-6">
          <p className="text-xs font-bold text-primary">{dish.restaurant}</p>
          <h2 className="text-2xl font-black">{dish.name}</h2>
          <p className="text-sm leading-6 text-muted-foreground">
            {dish.description}. Made fresh to order with carefully selected
            ingredients.
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-xl font-black">₹{dish.price}</span>
            {quantity === 0 ? (
              <Button onClick={onAdd} className="rounded-xl">
                Add to cart <Plus data-icon="inline-end" />
              </Button>
            ) : (
              <div className="flex items-center gap-4 rounded-xl bg-secondary px-3 py-2 font-bold">
                <button onClick={onRemove} aria-label="Remove item">
                  <Minus className="size-4" />
                </button>
                {quantity}
                <button onClick={onAdd} aria-label="Add item">
                  <Plus className="size-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CartView({
  cart,
  subtotal,
  onAdd,
  onRemove,
  onBack,
  onPlace,
}: {
  cart: Record<number, number>;
  subtotal: number;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
  onBack: () => void;
  onPlace: () => void;
}) {
  const items = Object.entries(cart).map(([id, quantity]) => ({
    dish: dishes.find((item) => item.id === Number(id))!,
    quantity,
  }));
  const delivery = subtotal > 399 || subtotal === 0 ? 0 : 39;
  const total = subtotal + delivery;
  return (
    <main className="mx-auto min-h-[calc(100vh-64px)] max-w-5xl px-4 py-10 md:px-8">
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground"
      >
        Back to browsing
      </button>
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[.16em] text-primary">
            Your order
          </p>
          <h1 className="mb-6 text-4xl font-black tracking-tight">Your cart</h1>
          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
              <ShoppingBag className="mx-auto mb-3 size-8 text-muted-foreground" />
              <p className="font-bold">Your cart is empty</p>
              <button
                onClick={onBack}
                className="mt-2 text-sm font-bold text-primary"
              >
                Browse restaurants
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map(({ dish, quantity }) => (
                <CartItem
                  key={dish.id}
                  dish={dish}
                  quantity={quantity}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              ))}
            </div>
          )}
        </div>
        <aside className="h-fit rounded-2xl border border-border bg-card p-5">
          <h2 className="font-black">Bill details</h2>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery fee</span>
              <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
            </div>
            <div className="my-1 border-t border-border" />
            <div className="flex justify-between text-base font-black">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
          <Button
            className="mt-6 w-full rounded-xl"
            disabled={items.length === 0}
            onClick={onPlace}
          >
            Place order <ArrowRight data-icon="inline-end" />
          </Button>
        </aside>
      </div>
    </main>
  );
}

function Orders() {
  return (
    <main className="mx-auto min-h-[calc(100vh-64px)] max-w-5xl px-4 py-10 md:px-8">
      <p className="mb-2 text-sm font-bold uppercase tracking-[.16em] text-primary">
        Your activity
      </p>
      <h1 className="text-4xl font-black tracking-tight">Orders</h1>
      <div className="mt-8 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-black">Saffron Street</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Butter Chicken, Paneer Tikka · ₹648
            </p>
          </div>
          <span className="rounded-full bg-secondary px-3 py-1.5 text-xs font-bold text-primary">
            Delivered
          </span>
        </div>
        <div className="mt-6 flex items-center gap-3 text-sm">
          <Check className="size-5 text-primary" />
          Delivered on 12 Aug 2026
        </div>
      </div>
    </main>
  );
}

function Profile() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <main className="mx-auto min-h-[calc(100vh-64px)] max-w-5xl px-4 py-10 md:px-8">
      <p className="mb-2 text-sm font-bold uppercase tracking-[.16em] text-primary">
        Your account
      </p>
      <h1 className="text-4xl font-black tracking-tight">Profile</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="grid size-14 place-items-center rounded-full bg-secondary text-xl font-black text-primary">
              {user?.initials ?? ""}
            </div>
            <div>
              <p className="font-black">{user?.name ?? "Guest"}</p>
              <p className="text-sm text-muted-foreground">{user?.email ?? ""}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="font-bold">Saved address</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Home · 12, Palm Grove, Indiranagar, Bengaluru
          </p>
        </div>
      </div>
    </main>
  );
}

function Confirmation({ onContinue }: { onContinue: () => void }) {
  return (
    <main className="grid min-h-[calc(100vh-64px)] place-items-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-secondary text-primary">
          <PackageCheck className="size-10" />
        </div>
        <p className="mt-6 text-sm font-bold uppercase tracking-[.16em] text-primary">
          Order confirmed
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">
          Your food is on its way.
        </h1>
        <p className="mt-4 leading-7 text-muted-foreground">
          Order #FD-2841 is being prepared at Saffron Street. You can expect it
          at your door in about 25–30 minutes.
        </p>
        <Button className="mt-7 rounded-xl" onClick={onContinue}>
          Continue browsing
        </Button>
      </div>
    </main>
  );
}
