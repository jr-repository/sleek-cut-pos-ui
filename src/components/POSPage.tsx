
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Plus, Minus, Trash, User, CreditCard, PrinterIcon } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'product' | 'service';
}

interface Transaction {
  items: CartItem[];
  customer: string;
  barberman: string;
  paymentMethod: string;
  subtotal: number;
  total: number;
  date: string;
}

const POSPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState('');
  const [selectedBarberman, setSelectedBarberman] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null);

  const products = [
    { id: 'p1', name: 'Pomade Premium', price: 85000, type: 'product' as const },
    { id: 'p2', name: 'Shampoo Anti Dandruff', price: 45000, type: 'product' as const },
    { id: 'p3', name: 'Hair Tonic', price: 35000, type: 'product' as const },
  ];

  const services = [
    { id: 's1', name: 'Potong Rambut Regular', price: 50000, type: 'service' as const },
    { id: 's2', name: 'Potong Rambut Premium', price: 100000, type: 'service' as const },
    { id: 's3', name: 'Cukur Jenggot', price: 35000, type: 'service' as const },
    { id: 's4', name: 'Hair Wash', price: 25000, type: 'service' as const },
  ];

  const barbermen = ['Ahmad Rivaldi', 'Budi Santoso', 'Charlie Wibowo', 'Dani Prasetyo'];
  const paymentMethods = ['Tunai', 'Kartu Debit', 'Kartu Kredit', 'E-Wallet', 'Transfer Bank'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const addToCart = (item: { id: string; name: string; price: number; type: 'product' | 'service' }) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setCustomer('');
    setSelectedBarberman('');
    setSelectedPaymentMethod('');
  };

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const total = subtotal; // Could add tax or discount here

  const handlePayment = () => {
    if (!customer || !selectedBarberman || !selectedPaymentMethod || cart.length === 0) {
      return;
    }

    const transaction: Transaction = {
      items: [...cart],
      customer,
      barberman: selectedBarberman,
      paymentMethod: selectedPaymentMethod,
      subtotal,
      total,
      date: new Date().toLocaleString('id-ID')
    };

    setLastTransaction(transaction);
    setShowReceipt(true);
    clearCart();
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Point of Sale</h1>
          <p className="text-muted-foreground">Sistem transaksi barbershop</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1">
            <ShoppingCart className="h-4 w-4 mr-2" />
            {cart.reduce((total, item) => total + item.quantity, 0)} item
          </Badge>
          <Button variant="outline" onClick={clearCart} disabled={cart.length === 0}>
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Products & Services */}
        <div className="lg:col-span-2 space-y-6">
          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle>Layanan</CardTitle>
              <CardDescription>Pilih layanan yang diinginkan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => addToCart(service)}
                  >
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-muted-foreground">{formatCurrency(service.price)}</p>
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Products */}
          <Card>
            <CardHeader>
              <CardTitle>Produk</CardTitle>
              <CardDescription>Pilih produk yang akan dibeli</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => addToCart(product)}
                  >
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{formatCurrency(product.price)}</p>
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cart & Checkout */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Nama Customer</Label>
                <Input
                  id="customer"
                  placeholder="Masukkan nama customer"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="barberman">Barberman</Label>
                <Select value={selectedBarberman} onValueChange={setSelectedBarberman}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih barberman" />
                  </SelectTrigger>
                  <SelectContent>
                    {barbermen.map((barberman) => (
                      <SelectItem key={barberman} value={barberman}>
                        {barberman}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment">Metode Pembayaran</Label>
                <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih metode pembayaran" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Cart */}
          <Card>
            <CardHeader>
              <CardTitle>Keranjang</CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Keranjang kosong</p>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{formatCurrency(item.price)}</p>
                        <Badge variant="outline" className="text-xs">
                          {item.type === 'product' ? 'Produk' : 'Layanan'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Total & Payment */}
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4" 
                onClick={handlePayment}
                disabled={!customer || !selectedBarberman || !selectedPaymentMethod || cart.length === 0}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Bayar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Receipt Dialog */}
      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Struk Pembayaran</DialogTitle>
            <DialogDescription>Transaksi berhasil</DialogDescription>
          </DialogHeader>
          
          {lastTransaction && (
            <div className="space-y-4" id="receipt">
              <div className="text-center">
                <h3 className="font-bold">BARBERSHOP POS</h3>
                <p className="text-sm text-muted-foreground">Struk Transaksi</p>
              </div>
              
              <Separator />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tanggal:</span>
                  <span>{lastTransaction.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Customer:</span>
                  <span>{lastTransaction.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span>Barberman:</span>
                  <span>{lastTransaction.barberman}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pembayaran:</span>
                  <span>{lastTransaction.paymentMethod}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-1">
                {lastTransaction.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(lastTransaction.subtotal)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>{formatCurrency(lastTransaction.total)}</span>
                </div>
              </div>
              
              <div className="text-center text-xs text-muted-foreground">
                Terima kasih atas kunjungan Anda!
              </div>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button onClick={printReceipt} className="flex-1">
              <PrinterIcon className="h-4 w-4 mr-2" />
              Cetak
            </Button>
            <Button variant="outline" onClick={() => setShowReceipt(false)}>
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default POSPage;
