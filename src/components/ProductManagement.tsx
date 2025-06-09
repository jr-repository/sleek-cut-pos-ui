
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash, Package, Scissors } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  status: 'available' | 'unavailable';
}

interface Service {
  id: number;
  name: string;
  price: number;
  description: string;
  duration: number; // in minutes
  category: string;
  status: 'available' | 'unavailable';
}

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Pomade Premium',
      price: 85000,
      description: 'Pomade berkualitas tinggi untuk styling rambut',
      category: 'Hair Styling',
      stock: 25,
      status: 'available'
    },
    {
      id: 2,
      name: 'Shampoo Anti Dandruff',
      price: 45000,
      description: 'Shampo khusus anti ketombe',
      category: 'Hair Care',
      stock: 15,
      status: 'available'
    },
    {
      id: 3,
      name: 'Hair Tonic',
      price: 35000,
      description: 'Tonik rambut untuk kesehatan kulit kepala',
      category: 'Hair Care',
      stock: 0,
      status: 'unavailable'
    }
  ]);

  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: 'Potong Rambut Regular',
      price: 50000,
      description: 'Potong rambut standar dengan teknik profesional',
      duration: 30,
      category: 'Haircut',
      status: 'available'
    },
    {
      id: 2,
      name: 'Potong Rambut Premium',
      price: 100000,
      description: 'Potong rambut dengan konsultasi dan styling',
      duration: 60,
      category: 'Haircut',
      status: 'available'
    },
    {
      id: 3,
      name: 'Cukur Jenggot',
      price: 35000,
      description: 'Cukur dan rapikan jenggot dengan pisau cukur',
      duration: 20,
      category: 'Beard',
      status: 'available'
    },
    {
      id: 4,
      name: 'Hair Wash',
      price: 25000,
      description: 'Cuci rambut dengan shampo berkualitas',
      duration: 15,
      category: 'Hair Care',
      status: 'available'
    }
  ]);

  const [activeTab, setActiveTab] = useState('products');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    duration: '',
    status: 'available' as 'available' | 'unavailable'
  });

  const productCategories = ['Hair Styling', 'Hair Care', 'Beard Care', 'Tools'];
  const serviceCategories = ['Haircut', 'Beard', 'Hair Care', 'Styling'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      price: '',
      description: '',
      category: '',
      stock: '',
      duration: '',
      status: 'available'
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Product | Service) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price.toString(),
      description: item.description,
      category: item.category,
      stock: 'stock' in item ? item.stock.toString() : '',
      duration: 'duration' in item ? item.duration.toString() : '',
      status: item.status
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'products') {
      const productData = {
        name: formData.name,
        price: parseInt(formData.price),
        description: formData.description,
        category: formData.category,
        stock: parseInt(formData.stock),
        status: formData.status
      };

      if (editingItem && 'stock' in editingItem) {
        setProducts(products.map(product => 
          product.id === editingItem.id 
            ? { ...product, ...productData }
            : product
        ));
      } else {
        const newProduct: Product = {
          id: Math.max(...products.map(p => p.id)) + 1,
          ...productData
        };
        setProducts([...products, newProduct]);
      }
    } else {
      const serviceData = {
        name: formData.name,
        price: parseInt(formData.price),
        description: formData.description,
        category: formData.category,
        duration: parseInt(formData.duration),
        status: formData.status
      };

      if (editingItem && 'duration' in editingItem) {
        setServices(services.map(service => 
          service.id === editingItem.id 
            ? { ...service, ...serviceData }
            : service
        ));
      } else {
        const newService: Service = {
          id: Math.max(...services.map(s => s.id)) + 1,
          ...serviceData
        };
        setServices([...services, newService]);
      }
    }
    
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    if (activeTab === 'products') {
      setProducts(products.filter(product => product.id !== id));
    } else {
      setServices(services.filter(service => service.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Produk & Layanan</h1>
          <p className="text-muted-foreground">Kelola produk dan layanan barbershop</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah {activeTab === 'products' ? 'Produk' : 'Layanan'}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit' : 'Tambah'} {activeTab === 'products' ? 'Produk' : 'Layanan'}
              </DialogTitle>
              <DialogDescription>
                {editingItem ? 'Ubah informasi' : 'Masukkan detail'} {activeTab === 'products' ? 'produk' : 'layanan'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama {activeTab === 'products' ? 'Produk' : 'Layanan'}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Harga</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {(activeTab === 'products' ? productCategories : serviceCategories).map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {activeTab === 'products' && (
                <div className="space-y-2">
                  <Label htmlFor="stock">Stok</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                  />
                </div>
              )}
              
              {activeTab === 'services' && (
                <div className="space-y-2">
                  <Label htmlFor="duration">Durasi (menit)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: 'available' | 'unavailable') => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Tersedia</SelectItem>
                    <SelectItem value="unavailable">Tidak Tersedia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingItem ? 'Update' : 'Tambah'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">
            <Package className="h-4 w-4 mr-2" />
            Produk
          </TabsTrigger>
          <TabsTrigger value="services">
            <Scissors className="h-4 w-4 mr-2" />
            Layanan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          {/* Product Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Stok Rendah</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.filter(p => p.stock < 10).length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tidak Tersedia</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.filter(p => p.status === 'unavailable').length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Nilai Stok</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(products.reduce((total, product) => total + (product.price * product.stock), 0))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Table */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Produk</CardTitle>
              <CardDescription>Kelola semua produk barbershop</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Produk</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Stok</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{formatCurrency(product.price)}</TableCell>
                      <TableCell>
                        <Badge variant={product.stock < 10 ? 'destructive' : 'default'}>
                          {product.stock}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.status === 'available' ? 'default' : 'secondary'}>
                          {product.status === 'available' ? 'Tersedia' : 'Tidak Tersedia'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleEdit(product)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          {/* Service Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Layanan</CardTitle>
                <Scissors className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{services.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Layanan Aktif</CardTitle>
                <Scissors className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{services.filter(s => s.status === 'available').length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Harga Rata-rata</CardTitle>
                <Scissors className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(services.reduce((total, service) => total + service.price, 0) / services.length)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Durasi Rata-rata</CardTitle>
                <Scissors className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(services.reduce((total, service) => total + service.duration, 0) / services.length)} min
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services Table */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Layanan</CardTitle>
              <CardDescription>Kelola semua layanan barbershop</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Layanan</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Durasi</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{service.category}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{formatCurrency(service.price)}</TableCell>
                      <TableCell>{service.duration} menit</TableCell>
                      <TableCell>
                        <Badge variant={service.status === 'available' ? 'default' : 'secondary'}>
                          {service.status === 'available' ? 'Tersedia' : 'Tidak Tersedia'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleEdit(service)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => handleDelete(service.id)}
                          >
                            <Trash className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductManagement;
