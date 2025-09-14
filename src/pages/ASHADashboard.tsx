import { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Heart, 
  Thermometer, 
  Activity,
  Upload,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LanguageSelector } from '@/components/LanguageSelector';
import { StatusIndicator } from '@/components/StatusIndicator';
import { useApp } from '@/context/AppContext';
import { getTranslation, Language } from '@/lib/i18n';

const ASHADashboard = () => {
  const { state } = useApp();
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'overview' | 'register' | 'vitals'>('overview');

  const t = (key: any) => getTranslation(key, currentLang);

  // Mock data
  const todayStats = {
    registrations: 3,
    consultations: 7,
    pendingSync: 2
  };

  const recentPatients = [
    {
      id: '1',
      name: 'Manjit Kaur',
      age: 45,
      village: 'Nabha',
      status: 'consultation_pending',
      symptoms: ['Fever', 'Cough'],
      registeredAt: '2 hours ago'
    },
    {
      id: '2',
      name: 'Raman Singh',
      age: 58,
      village: 'Nabha',
      status: 'vitals_recorded',
      symptoms: ['Blood pressure check'],
      registeredAt: '4 hours ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'consultation_pending': return 'bg-warning text-warning-foreground';
      case 'vitals_recorded': return 'bg-success text-success-foreground';
      case 'completed': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'consultation_pending': return 'Awaiting Doctor';
      case 'vitals_recorded': return 'Vitals Recorded';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-trust">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-health p-2 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">
                  ASHA {state.user?.name || 'Worker'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Health Worker • {state.user?.village}
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

      {/* Tab Navigation */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'register', label: 'Register Patient', icon: UserPlus },
              { id: 'vitals', label: 'Record Vitals', icon: Heart }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 border-b-2 transition-colors touch-target ${
                    activeTab === tab.id 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6 text-center">
                  <UserPlus className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">{todayStats.registrations}</h3>
                  <p className="text-sm text-muted-foreground">Patients Registered Today</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Heart className="h-8 w-8 text-success mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">{todayStats.consultations}</h3>
                  <p className="text-sm text-muted-foreground">Consultations Assisted</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Upload className="h-8 w-8 text-warning mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">{todayStats.pendingSync}</h3>
                  <p className="text-sm text-muted-foreground">Pending Sync</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Patients */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Recent Patients</h2>
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <Card key={patient.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{patient.name}</CardTitle>
                          <CardDescription>
                            {patient.village} • Age {patient.age} • {patient.registeredAt}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(patient.status)}>
                          {getStatusText(patient.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-sm mb-2">Symptoms:</h4>
                          <div className="flex flex-wrap gap-2">
                            {patient.symptoms.map((symptom, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {patient.status === 'consultation_pending' && (
                            <Button size="sm">
                              Join Consultation
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Register Patient Tab */}
        {activeTab === 'register' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Register New Patient
              </CardTitle>
              <CardDescription>
                Help patients register for telemedicine services
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Patient Name *</Label>
                    <Input id="name" type="text" required className="touch-target" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input id="age" type="number" required className="touch-target" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" required className="touch-target" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="village">Village</Label>
                    <Input id="village" defaultValue={state.user?.village} className="touch-target" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symptoms">Chief Complaints/Symptoms</Label>
                  <Textarea 
                    id="symptoms" 
                    placeholder="Describe the main health concerns..."
                    className="touch-target"
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full touch-target">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register Patient
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Record Vitals Tab */}
        {activeTab === 'vitals' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5" />
                Record Patient Vitals
              </CardTitle>
              <CardDescription>
                Record basic vital signs for consultation
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="patient-select">Select Patient</Label>
                  <select className="w-full border border-input rounded-md px-3 py-2 touch-target">
                    <option value="">Choose a patient...</option>
                    {recentPatients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name} - {patient.village}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature (°F)</Label>
                    <Input id="temperature" type="number" step="0.1" placeholder="98.6" className="touch-target" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pulse">Pulse Rate (bpm)</Label>
                    <Input id="pulse" type="number" placeholder="72" className="touch-target" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bp">Blood Pressure</Label>
                    <Input id="bp" placeholder="120/80" className="touch-target" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input id="weight" type="number" step="0.1" className="touch-target" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Any additional observations..."
                    className="touch-target"
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full touch-target">
                  <Heart className="h-4 w-4 mr-2" />
                  Save Vitals
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ASHADashboard;