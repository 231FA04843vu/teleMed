import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Search, 
  Video, 
  FileText, 
  MapPin, 
  Clock,
  AlertTriangle,
  Pill,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { LanguageSelector } from '@/components/LanguageSelector';
import { StatusIndicator } from '@/components/StatusIndicator';
import { useApp } from '@/context/AppContext';
import { getTranslation, Language } from '@/lib/i18n';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [searchDrug, setSearchDrug] = useState('');
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [mockPrescriptions, setMockPrescriptions] = useState([
    {
      id: '1',
      date: '2024-01-15',
      doctor: 'Dr. Singh',
      medicines: ['Paracetamol 500mg', 'Amoxicillin 250mg'],
      status: 'active'
    }
  ]);

  const [pharmacyResults, setPharmacyResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const t = (key: any) => getTranslation(key, currentLang);

  useEffect(() => {
    if (searchDrug.length >= 2) {
      fetchAutocompleteSuggestions(searchDrug);
    } else {
      setAutocompleteSuggestions([]);
    }
  }, [searchDrug]);

  const fetchAutocompleteSuggestions = async (query: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`
      );
      const result = await response.json();
      setAutocompleteSuggestions(result);
    } catch (error) {
      console.error('Error fetching autocomplete:', error);
    }
  };

  const fetchPharmacies = async (location: string) => {
    if (!location) {
      alert('Please enter or select a location.');
      return;
    }

    setIsLoading(true);

    const query = encodeURIComponent(`pharmacy in ${location}`);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=20`;

    try {
      const response = await fetch(url, {
        headers: { "Accept": "application/json" }
      });
      const result = await response.json();

      if (result.length > 0) {
        const mappedResults = result.map((entry: any) => ({
          pharmacyName: entry.display_name.split(',')[0] || 'Unnamed Pharmacy',
          address: entry.display_name,
          latitude: entry.lat,
          longitude: entry.lon
        }));

        setPharmacyResults(mappedResults);
      } else {
        setPharmacyResults([]);
        alert('No pharmacies found for this location.');
      }
    } catch (error) {
      console.error('Error fetching pharmacies:', error);
      alert('Failed to fetch pharmacy data.');
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLocationPharmacies = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

        try {
          const res = await fetch(url, { headers: { "Accept": "application/json" } });
          const data = await res.json();
          const address = data.address.city || data.address.town || data.address.village || '';
          setSelectedLocation(address);
          setSearchDrug(address);
          fetchPharmacies(address);
        } catch (error) {
          console.error('Error fetching current location:', error);
        }
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const quickActions = [
    {
      title: t('checkSymptoms'),
      description: 'AI-powered symptom checker',
      icon: Activity,
      color: 'bg-primary',
      action: () => { window.location.href = '/links.html'; }
    },
    {
      title: t('requestConsult'),
      description: 'Book video consultation',
      icon: Video,
      color: 'bg-secondary',
      action: () => { window.location.href = '/video.html'; }
    },
    {
      title: t('myPrescriptions'),
      description: 'Write and save a prescription note',
      icon: FileText,
      color: 'bg-success',
      action: () => {
        const note = prompt('Enter prescription note:');
        if (note) {
          const newEntry = {
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
            doctor: 'Self-entered',
            medicines: [note],
            status: 'active'
          };
          setMockPrescriptions([newEntry, ...mockPrescriptions]);
        }
      }
    },
    {
      title: t('findPharmacy'),
      description: 'Find nearby pharmacies',
      icon: MapPin,
      color: 'bg-warning',
      action: getCurrentLocationPharmacies
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-trust">
      <header className="border-b bg-card/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-health p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">
                  Welcome, {state.user?.name || 'Patient'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {state.user?.village} • Patient Portal
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <StatusIndicator isOnline={state.isOnline} />
              <LanguageSelector 
                currentLanguage={currentLang}
                onLanguageChange={setCurrentLang}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {!state.isOnline && (
          <Card className="mb-6 border-warning bg-warning/10">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <div>
                  <h3 className="font-medium">Offline Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    You can still access saved data. New consultations will sync when online.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card 
                  key={index}
                  className="group hover:shadow-elevated transition-all cursor-pointer"
                  onClick={action.action}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`w-12 h-12 mx-auto rounded-xl ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription className="text-sm">{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-8">
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Prescriptions
            </h2>

            <div className="space-y-4">
              {mockPrescriptions.map((prescription) => (
                <Card key={prescription.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{prescription.doctor}</CardTitle>
                      <Badge variant={prescription.status === 'active' ? 'secondary' : 'outline'}>
                        {prescription.status}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {prescription.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {prescription.medicines.map((medicine, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <Pill className="h-3 w-3 text-muted-foreground" />
                          {medicine}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {mockPrescriptions.length === 0 && (
                <Card>
                  <CardContent className="py-8 text-center">
                    <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No prescriptions yet</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Find Pharmacy
            </h2>

            <Card className="mb-4">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Input
                    placeholder="Type location (e.g., Guntur)..."
                    value={searchDrug}
                    onChange={(e) => {
                      setSearchDrug(e.target.value);
                      setSelectedLocation('');
                    }}
                    className="touch-target"
                  />

                  {autocompleteSuggestions.length > 0 && (
                    <ul className="border rounded max-h-60 overflow-auto">
                      {autocompleteSuggestions.map((suggestion: any, idx: number) => (
                        <li
                          key={idx}
                          className="p-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSearchDrug(suggestion.display_name);
                            setSelectedLocation(suggestion.display_name);
                            setAutocompleteSuggestions([]);
                          }}
                        >
                          {suggestion.display_name}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex gap-4">
                    <Button 
                      className="flex-1 touch-target"
                      onClick={() => fetchPharmacies(searchDrug || selectedLocation)}
                      disabled={isLoading}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      {isLoading ? 'Searching...' : 'Search Stock'}
                    </Button>

                    <Button 
                      variant="outline"
                      className="flex-none"
                      onClick={getCurrentLocationPharmacies}
                    >
                      Use My Location
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {pharmacyResults.length > 0 ? (
                pharmacyResults.map((pharmacy: any, idx: number) => (
                  <Card key={idx}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{pharmacy.pharmacyName}</CardTitle>
                        <Badge variant="secondary">
                          Pharmacy
                        </Badge>
                      </div>
                      <CardDescription>{pharmacy.address}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Updated just now
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`https://www.openstreetmap.org/?mlat=${pharmacy.latitude}&mlon=${pharmacy.longitude}&zoom=15`, '_blank')}
                        >
                          Get Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      {isLoading ? 'Loading pharmacies...' : 'No pharmacies found'}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
