import { useState, useEffect } from 'react';
import { 
  Pill, 
  Package, 
  Upload, 
  Edit3, 
  Plus,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { LanguageSelector } from '@/components/LanguageSelector';
import { StatusIndicator } from '@/components/StatusIndicator';
import { useApp } from '@/context/AppContext';
import { getTranslation, Language } from '@/lib/i18n';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const PharmacyDashboard = () => {
  const { state } = useApp();
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStock, setEditingStock] = useState<string | null>(null);
  const [stockData, setStockData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const t = (key: any) => getTranslation(key, currentLang);

  // Fetch medicines from backend
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await fetch(`${API_URL}/medicines`);
        const data = await res.json();
        setStockData(data);
      } catch (err) {
        console.error("Error fetching medicines:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines();
  }, []);

  const getStockStatus = (quantity: number, minStock: number) => {
    if (quantity === 0) return { status: 'out', color: 'bg-emergency text-emergency-foreground' };
    if (quantity <= minStock) return { status: 'low', color: 'bg-warning text-warning-foreground' };
    return { status: 'good', color: 'bg-success text-success-foreground' };
  };

  const getListTypeColor = (listType: string) => {
    switch (listType) {
      case 'O': return 'bg-success/10 text-success border-success/20';
      case 'A': return 'bg-warning/10 text-warning border-warning/20';
      case 'B': return 'bg-emergency/10 text-emergency border-emergency/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getListTypeText = (listType: string) => {
    switch (listType) {
      case 'O': return 'Over Counter';
      case 'A': return 'Prescription A';
      case 'B': return 'Prescription B';
      default: return listType;
    }
  };

  const filteredStock = stockData.filter(item =>
    item.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateStock = async (id: string, newQuantity: number) => {
    try {
      const res = await fetch(`${API_URL}/medicines/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity })
      });
      const updated = await res.json();
      setStockData(prev => prev.map(item => item._id === id ? updated : item));
    } catch (err) {
      console.error("Error updating stock:", err);
    }
    setEditingStock(null);
  };

  const stats = {
    totalItems: stockData.length,
    lowStock: stockData.filter(item => {
      const status = getStockStatus(item.quantity, item.minStock);
      return status.status === 'low' || status.status === 'out';
    }).length,
    lastUpdated: stockData.length > 0 ? Math.max(...stockData.map(item => new Date(item.lastUpdated).getTime())) : Date.now()
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading medicines...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-trust">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-health p-2 rounded-lg">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">
                  {state.user?.name || 'Pharmacy'} Portal
                </h1>
                <p className="text-sm text-muted-foreground">
                  Medicine Stock Management • {state.user?.village}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <StatusIndicator 
                isOnline={state.isOnline} 
                lastSyncTime={new Date(stats.lastUpdated)}
              />
              <LanguageSelector 
                currentLanguage={currentLang}
                onLanguageChange={setCurrentLang}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <Package className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="text-2xl font-bold">{stats.totalItems}</h3>
              <p className="text-sm text-muted-foreground">Total Medicines</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <AlertTriangle className="h-8 w-8 text-warning mx-auto mb-2" />
              <h3 className="text-2xl font-bold">{stats.lowStock}</h3>
              <p className="text-sm text-muted-foreground">Low/Out of Stock</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <Clock className="h-8 w-8 text-success mx-auto mb-2" />
              <h3 className="text-2xl font-bold">
                {new Date(stats.lastUpdated).toLocaleDateString()}
              </h3>
              <p className="text-sm text-muted-foreground">Last Updated</p>
            </CardContent>
          </Card>
        </div>

        {/* Search + Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 touch-target"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="touch-target">
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
            
            <Button className="touch-target">
              <Plus className="h-4 w-4 mr-2" />
              Add Medicine
            </Button>
          </div>
        </div>

        {/* Stock Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Medicine Stock
            </CardTitle>
            <CardDescription>
              Manage your pharmacy inventory and stock levels
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {filteredStock.map((item) => {
                const stockStatus = getStockStatus(item.quantity, item.minStock);
                const isEditing = editingStock === item._id;
                
                return (
                  <Card key={item._id} className="border">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-lg">{item.genericName}</h3>
                            <Badge className={getListTypeColor(item.listType)} variant="outline">
                              {getListTypeText(item.listType)}
                            </Badge>
                            <Badge className={stockStatus.color}>
                              {stockStatus.status === 'out' ? 'Out of Stock' :
                               stockStatus.status === 'low' ? 'Low Stock' : 'In Stock'}
                            </Badge>
                          </div>
                          
                          <div className="text-sm text-muted-foreground mb-3">
                            <span className="font-medium">{item.brandName}</span> • {item.strength}
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm">
                            <div>
                              <span className="text-muted-foreground">Current Stock: </span>
                              {isEditing ? (
                                <div className="inline-flex items-center gap-2">
                                  <Input
                                    type="number"
                                    defaultValue={item.quantity}
                                    className="w-20 h-8"
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        const newQuantity = parseInt((e.target as HTMLInputElement).value);
                                        updateStock(item._id, newQuantity);
                                      }
                                      if (e.key === 'Escape') {
                                        setEditingStock(null);
                                      }
                                    }}
                                    autoFocus
                                  />
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => {
                                      const input = document.querySelector(`input[defaultValue="${item.quantity}"]`) as HTMLInputElement;
                                      if (input) {
                                        updateStock(item._id, parseInt(input.value));
                                      }
                                    }}
                                  >
                                    <CheckCircle className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : (
                                <span className="font-medium">{item.quantity}</span>
                              )}
                            </div>
                            
                            <div>
                              <span className="text-muted-foreground">Min Stock: </span>
                              <span className="font-medium">{item.minStock}</span>
                            </div>
                            
                            <div>
                              <span className="text-muted-foreground">Expiry: </span>
                              <span className="font-medium">{item.expiryDate}</span>
                            </div>
                            
                            <div>
                              <span className="text-muted-foreground">Updated: </span>
                              <span className="font-medium">
                                {new Date(item.lastUpdated).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {!isEditing && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingStock(item._id)}
                              className="touch-target"
                            >
                              <Edit3 className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {filteredStock.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No medicines found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm ? 'Try a different search term' : 'Add your first medicine to get started'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PharmacyDashboard;
