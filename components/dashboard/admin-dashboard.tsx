"use client";

import {
  BarChart3,
  Boxes,
  CalendarCheck,
  Edit3,
  ImagePlus,
  PackageCheck,
  Plus,
  Search,
  Tag,
  Trash2,
  UploadCloud,
  Wand2
} from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  categories,
  getInventoryStatus,
  products as initialProducts,
  type InventoryStatus,
  type Product,
  type ProductCategory
} from "@/lib/catalog";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const tabs = ["Analytics", "Products", "Orders", "Appointments", "Customers", "Coupons"] as const;
const productStatuses: InventoryStatus[] = ["Available", "Reserved", "Sold", "In boutique only"];
const storageKey = "pfv_admin_products";
type Tab = (typeof tabs)[number];

const orders = [
  {
    id: "PFV-1051",
    customer: "Helena M.",
    email: "helena@example.com",
    total: 128000,
    payment: "Stripe paid",
    status: "Paid",
    pickup: "Today"
  },
  {
    id: "PFV-1050",
    customer: "Sophie R.",
    email: "sophie@example.com",
    total: 54000,
    payment: "Reservation",
    status: "Reserved",
    pickup: "Tomorrow"
  },
  {
    id: "PFV-1049",
    customer: "Nadia K.",
    email: "nadia@example.com",
    total: 22000,
    payment: "Card",
    status: "Completed",
    pickup: "Collected"
  }
];

const appointments = [
  {
    id: "APT-210",
    client: "Claire B.",
    service: "Private styling",
    date: "May 18, 2026",
    time: "14:30",
    status: "Confirm"
  },
  {
    id: "APT-209",
    client: "Maya S.",
    service: "Designer bag viewing",
    date: "May 19, 2026",
    time: "11:00",
    status: "Requested"
  },
  {
    id: "APT-208",
    client: "Amelia R.",
    service: "Pickup appointment",
    date: "May 20, 2026",
    time: "16:00",
    status: "Confirmed"
  }
];

const customers = [
  { name: "Helena M.", email: "helena@example.com", ltv: 248000, segment: "Collector" },
  { name: "Sophie R.", email: "sophie@example.com", ltv: 94000, segment: "VIP" },
  { name: "Nadia K.", email: "nadia@example.com", ltv: 62000, segment: "New" }
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("Analytics");
  const [items, setItems] = useState<Product[]>(initialProducts);
  const [query, setQuery] = useState("");
  const [saving, setSaving] = useState(false);
  const [copyGenerating, setCopyGenerating] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return;

    try {
      setItems(JSON.parse(stored) as Product[]);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((product) =>
      [product.name, product.designer, product.category, product.status]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [items, query]);

  const totalInventoryValue = items.reduce((total, product) => total + product.price * product.inventory, 0);
  const lowStock = items.filter((product) => product.inventory <= 1).length;
  const reservedPieces = items.filter((product) => getInventoryStatus(product) === "Reserved").length;

  const uploadImage = async (file: File) => {
    const uploadData = new FormData();
    uploadData.append("file", file);

    const response = await fetch("/api/uploads", {
      method: "POST",
      body: uploadData
    });
    const payload = (await response.json()) as { url?: string; error?: string; mode?: string };

    if (!response.ok || !payload.url) {
      throw new Error(payload.error ?? "Image upload failed.");
    }

    return {
      url: payload.url,
      mode: payload.mode
    };
  };

  const generateProductCopy = async (form: HTMLFormElement | null) => {
    if (!form || copyGenerating) return;

    const formData = new FormData(form);
    setCopyGenerating(true);
    setFormMessage("");

    try {
      const response = await fetch("/api/ai/vivienne", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "product-copy",
          product: {
            name: String(formData.get("name") ?? ""),
            designer: String(formData.get("designer") ?? ""),
            category: String(formData.get("category") ?? ""),
            condition: String(formData.get("condition") ?? ""),
            size: String(formData.get("size") ?? ""),
            status: String(formData.get("status") ?? ""),
            price: String(formData.get("price") ?? "")
          }
        })
      });
      const payload = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || !payload.reply) {
        throw new Error(payload.error ?? "Vivienne could not write the description.");
      }

      const description = form.elements.namedItem("description") as HTMLTextAreaElement | null;
      if (description) {
        description.value = payload.reply;
        description.dispatchEvent(new Event("input", { bubbles: true }));
      }

      setFormMessage("Vivienne wrote a luxury product description.");
    } catch (error) {
      setFormMessage(error instanceof Error ? error.message : "Vivienne could not write the description.");
    } finally {
      setCopyGenerating(false);
    }
  };

  const onAddProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setFormMessage("");

    try {
      const form = new FormData(event.currentTarget);
      const name = String(form.get("name"));
      const price = Number(form.get("price"));
      const status = String(form.get("status")) as InventoryStatus;
      const imageFile = form.get("imageFile");
      const pastedImageUrl = String(form.get("imageUrl") ?? "").trim();
      let imageUrl = pastedImageUrl || initialProducts[0].images[0];

      if (imageFile instanceof File && imageFile.size > 0) {
        const upload = await uploadImage(imageFile);
        imageUrl = upload.url;
        setFormMessage(upload.mode === "demo" ? "Demo image used. Add Cloudinary keys for live uploads." : "Image uploaded.");
      }

      const product: Product = {
        ...initialProducts[0],
        id: crypto.randomUUID(),
        slug: slugify(name),
        name,
        designer: String(form.get("designer")),
        category: String(form.get("category")) as ProductCategory,
        collection: "Paris Edit",
        price: Math.round(price * 100),
        description:
          String(form.get("description")).trim() ||
          "New boutique piece awaiting final editorial polish, condition notes, and styling recommendations.",
        images: [imageUrl, ...initialProducts[0].images.slice(1, 3)],
        condition: String(form.get("condition")) || "Excellent vintage condition",
        size: String(form.get("size") ?? "").trim() || undefined,
        status,
        inventory: status === "Sold" ? 0 : Number(form.get("inventory")),
        featured: false,
        badges: [status === "Sold" ? "Sold" : "New arrival"],
        tags: ["admin created", "boutique inventory"]
      };

      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: product.name,
          designer: product.designer,
          category: product.category,
          price,
          inventory: product.inventory,
          imageUrl,
          size: product.size,
          status: product.status,
          description: product.description
        })
      });

      setItems((current) => [product, ...current]);
      event.currentTarget.reset();
      setFormMessage((current) => current || "Product added to the boutique inventory preview.");
    } catch (error) {
      setFormMessage(error instanceof Error ? error.message : "Product could not be saved.");
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = (id: string) => {
    setItems((current) => current.filter((product) => product.id !== id));
  };

  const editProduct = (id: string) => {
    const currentProduct = items.find((product) => product.id === id);
    if (!currentProduct) return;

    const nextPrice = window.prompt("Update price in EUR", String(currentProduct.price / 100));
    if (!nextPrice) return;

    const nextStatus = window.prompt(
      "Update status: Available, Reserved, Sold, In boutique only",
      getInventoryStatus(currentProduct)
    ) as InventoryStatus | null;

    setItems((current) =>
      current.map((product) =>
        product.id === id
          ? {
              ...product,
              price: Math.round(Number(nextPrice) * 100),
              status: productStatuses.includes(nextStatus as InventoryStatus) ? (nextStatus as InventoryStatus) : product.status,
              inventory: nextStatus === "Sold" ? 0 : product.inventory
            }
          : product
      )
    );
  };

  return (
    <section className="container luxury-section">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="editorial-kicker text-xs text-gold-500">Admin Dashboard</p>
          <h1 className="luxury-page-title mt-4 font-serif">Boutique operations.</h1>
          <p className="luxury-lead mt-6 max-w-2xl text-muted-foreground">
            Manage inventory, uploads, orders, styling appointments, customers, coupons, and conversion analytics.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      {activeTab === "Analytics" && (
        <div className="mt-10 grid gap-4 xs:grid-cols-2 lg:grid-cols-4">
          {[
            [BarChart3, "Revenue", "EUR 48.2k", "+18% month over month"],
            [Boxes, "Inventory value", formatCurrency(totalInventoryValue), `${lowStock} low-stock pieces`],
            [CalendarCheck, "Appointments", "12", "Private styling requests"],
            [Tag, "Reserved", String(reservedPieces), "Pieces awaiting pickup"]
          ].map(([Icon, label, value, detail]) => (
            <div key={label as string} className="rounded-md border bg-card p-6">
              <Icon className="h-5 w-5 text-gold-500" aria-hidden="true" />
              <p className="mt-5 text-sm text-muted-foreground">{label as string}</p>
              <p className="mt-2 font-serif text-4xl">{value as string}</p>
              <p className="mt-2 text-xs text-muted-foreground">{detail as string}</p>
            </div>
          ))}
          <div className="rounded-md border bg-card p-6 md:col-span-4">
            <h2 className="font-serif text-4xl">Sales analytics</h2>
            <div className="mt-6 grid h-72 grid-cols-7 items-end gap-2 md:gap-3">
              {[54, 68, 48, 83, 74, 92, 88].map((height, index) => (
                <div key={index} className="flex h-full flex-col justify-end gap-2">
                  <div className="rounded-t-md bg-gradient-to-t from-gold-700 to-gold-300" style={{ height: `${height}%` }} />
                  <span className="text-center text-xs text-muted-foreground">D{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Products" && (
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(300px,390px)_minmax(0,1fr)]">
          <form onSubmit={onAddProduct} className="h-fit rounded-md border bg-card p-6">
            <div className="flex items-center gap-3">
              <ImagePlus className="h-5 w-5 text-gold-500" aria-hidden="true" />
              <h2 className="font-serif text-4xl">Add product</h2>
            </div>
            <div className="mt-6 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product name</Label>
                <Input id="name" name="name" required placeholder="Vintage silk scarf" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="designer">Designer</Label>
                <Input id="designer" name="designer" required placeholder="French Vintage" />
              </div>
              <div className="grid gap-2 xs:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price in EUR</Label>
                  <Input id="price" name="price" required type="number" min="1" placeholder="320" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="inventory">Inventory</Label>
                  <Input id="inventory" name="inventory" required type="number" min="0" defaultValue="1" />
                </div>
              </div>
              <div className="grid gap-2 xs:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <select id="category" name="category" className="min-h-11 rounded-md border bg-background/70 px-4 text-sm">
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <select id="status" name="status" className="min-h-11 rounded-md border bg-background/70 px-4 text-sm">
                    {productStatuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid gap-2 xs:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="size">Size</Label>
                  <Input id="size" name="size" placeholder="EU 38 / One size" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Input id="condition" name="condition" defaultValue="Excellent vintage condition" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="imageFile">Upload image</Label>
                <Input id="imageFile" name="imageFile" type="file" accept="image/*" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input id="imageUrl" name="imageUrl" placeholder="/images/fashion/photo-1594223274512-ad4803739b7c.jpg" />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="description">Description</Label>
                  <button
                    type="button"
                    onClick={(event) => void generateProductCopy(event.currentTarget.form)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-gold-500 transition hover:text-gold-300"
                  >
                    <Wand2 className="h-3.5 w-3.5" aria-hidden="true" />
                    {copyGenerating ? "Vivienne writing..." : "Ask Vivienne"}
                  </button>
                </div>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="rounded-md border bg-background/70 px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Write a premium product description with styling notes."
                />
              </div>
              {formMessage && <p className="text-sm text-muted-foreground">{formMessage}</p>}
              <Button type="submit" disabled={saving}>
                {saving ? <UploadCloud className="mr-2 h-4 w-4 animate-pulse" aria-hidden="true" /> : <Plus className="mr-2 h-4 w-4" aria-hidden="true" />}
                {saving ? "Saving product..." : "Add product"}
              </Button>
            </div>
          </form>

          <div className="rounded-md border bg-card p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="font-serif text-4xl">Inventory management</h2>
              <label className="relative md:w-72">
                <span className="sr-only">Search inventory</span>
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search inventory" className="pl-10" />
              </label>
            </div>
            <div className="mt-6">
              <table className="responsive-table-card text-left text-sm">
                <thead className="text-muted-foreground">
                  <tr className="border-b">
                    <th className="py-3 font-medium">Product</th>
                    <th className="py-3 font-medium">Status</th>
                    <th className="py-3 font-medium">Inventory</th>
                    <th className="py-3 text-right font-medium">Price</th>
                    <th className="py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((product) => (
                    <tr key={product.id} className="border-b last:border-0">
                      <td data-label="Product" className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-14 w-11 overflow-hidden rounded border bg-muted">
                            <Image src={product.images[0]} alt={product.name} fill sizes="44px" className="object-cover" />
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.designer} · {product.category}</p>
                          </div>
                        </div>
                      </td>
                      <td data-label="Status" className="py-4">{getInventoryStatus(product)}</td>
                      <td data-label="Inventory" className="py-4">{product.inventory}</td>
                      <td data-label="Price" className="py-4 text-right">{formatCurrency(product.price)}</td>
                      <td data-label="Actions" className="py-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => editProduct(product.id)}
                            aria-label={`Edit ${product.name}`}
                          >
                            <Edit3 className="h-4 w-4" aria-hidden="true" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteProduct(product.id)} aria-label={`Delete ${product.name}`}>
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Orders" && (
        <SimpleTable
          title="Orders management"
          headers={["Order", "Customer", "Payment", "Status", "Pickup", "Total"]}
          rows={orders.map((order) => [
            order.id,
            `${order.customer} · ${order.email}`,
            order.payment,
            order.status,
            order.pickup,
            formatCurrency(order.total)
          ])}
        />
      )}

      {activeTab === "Appointments" && (
        <SimpleTable
          title="Styling appointments"
          headers={["Request", "Client", "Service", "Date", "Time", "Status"]}
          rows={appointments.map((appointment) => [
            appointment.id,
            appointment.client,
            appointment.service,
            appointment.date,
            appointment.time,
            appointment.status
          ])}
        />
      )}

      {activeTab === "Customers" && (
        <SimpleTable
          title="Customer management"
          headers={["Name", "Email", "Segment", "LTV"]}
          rows={customers.map((customer) => [customer.name, customer.email, customer.segment, formatCurrency(customer.ltv)])}
        />
      )}

      {activeTab === "Coupons" && (
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(300px,360px)_minmax(0,1fr)]">
          <form className="h-fit rounded-md border bg-card p-6">
            <h2 className="font-serif text-4xl">Coupon engine</h2>
            <div className="mt-6 grid gap-4">
              <Input placeholder="PARIS10" aria-label="Coupon code" />
              <Input placeholder="10" type="number" min="1" aria-label="Discount percentage" />
              <Button type="button">
                <PackageCheck className="mr-2 h-4 w-4" aria-hidden="true" />
                Create coupon
              </Button>
            </div>
          </form>
          <SimpleTable
            title="Active coupons"
            headers={["Code", "Discount", "Use case", "Status"]}
            rows={[
              ["PARIS10", "10%", "Newsletter welcome", "Active"],
              ["VIPPRIVATE", "15%", "VIP appointment", "Active"],
              ["PICKUP", "5%", "In-store pickup", "Paused"]
            ]}
          />
        </div>
      )}
    </section>
  );
}

function SimpleTable({ title, headers, rows }: { title: string; headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="mt-10 rounded-md border bg-card p-6">
      <h2 className="font-serif text-4xl">{title}</h2>
      <div className="mt-6">
        <table className="responsive-table-card text-left text-sm">
          <thead className="text-muted-foreground">
            <tr className="border-b">
              {headers.map((header) => (
                <th key={header} className="py-3 font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`${title}-${rowIndex}`} className="border-b last:border-0">
                {row.map((cell, cellIndex) => (
                  <td key={`${headers[cellIndex]}-${rowIndex}`} data-label={headers[cellIndex]} className="py-4">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
