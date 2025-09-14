import { useState } from 'react';
import { 
  Stethoscope, 
  Users, 
  Video, 
  Clock,
  CheckCircle,
  Camera,
  Mic,
  PhoneOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { LanguageSelector } from '@/components/LanguageSelector';
import { StatusIndicator } from '@/components/StatusIndicator';
import { useApp } from '@/context/AppContext';
import { getTranslation, Language } from '@/lib/i18n';

const DoctorDashboard = () => {
  const { state } = useApp();
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [inCall, setInCall] = useState(false);
  const [callMode, setCallMode] = useState<'video' | 'audio'>('video');

  const t = (key: any) => getTranslation(key, currentLang);

  const patientQueue = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      age: 45,
      village: 'Nabha',
      urgency: 'high',
      symptoms: ['Chest pain', 'Shortness of breath'],
      waitTime: '5 min',
      ashaWorker: 'Priya Singh'
    },
    {
      id: '2', 
      name: 'Sunita Devi',
      age: 32,
      village: 'Bhadson',
      urgency: 'medium',
      symptoms: ['Fever', 'Headache'],
      waitTime: '12 min',
      ashaWorker: null
    },
    {
      id: '3',
      name: 'Harpreet Singh',
      age: 28,
      village: 'Kurali',
      urgency: 'low',
      symptoms: ['Cough', 'Cold'],
      waitTime: '20 min',
      ashaWorker: 'Gurjit Kaur'
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-emergency text-emergency-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const startConsultation = (patient: any) => {
    console.log('Starting consultation with:', patient.name);

    // Redirect to video.html and pass patientId as query param
    window.location.href = `/video.html?patientId=${patient.id}`;
  };

  const endCall = () => {
    setInCall(false);
    setSelectedPatient(null);
  };

  if (inCall && selectedPatient) {
    return (
      <div className="min-h-screen bg-background">
        {/* Video Call Interface */}
        <div className="h-screen flex flex-col">
          <header className="bg-card border-b p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold">{selectedPatient.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {selectedPatient.village} • Age {selectedPatient.age}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getUrgencyColor(selectedPatient.urgency)}>
                  {selectedPatient.urgency} priority
                </Badge>
                <StatusIndicator isOnline={state.isOnline} />
              </div>
            </div>
          </header>

          <div className="flex-1 bg-muted/30 relative">
            <div className="absolute inset-4 bg-black rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Video Call Active</p>
                <p className="text-sm opacity-75">
                  {callMode === 'video' ? 'Video enabled' : 'Audio only'}
                </p>
              </div>
            </div>

            <div className="absolute top-4 right-4 w-32 h-24 bg-black rounded-lg border-2 border-white">
              <div className="h-full flex items-center justify-center text-white text-xs">
                You
              </div>
            </div>

            <div className="absolute top-4 left-4">
              <Badge variant="outline" className="bg-black/50 text-white border-white/20">
                {state.isOnline ? 'Good Connection' : 'Poor Connection'}
              </Badge>
            </div>
          </div>

          <div className="bg-card border-t p-4">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={callMode === 'video' ? 'default' : 'outline'}
                size="lg"
                className="touch-target"
                onClick={() => setCallMode(callMode === 'video' ? 'audio' : 'video')}
              >
                <Camera className="h-5 w-5 mr-2" />
                {callMode === 'video' ? 'Video On' : 'Video Off'}
              </Button>
              
              <Button variant="outline" size="lg" className="touch-target">
                <Mic className="h-5 w-5 mr-2" />
                Mic
              </Button>
              
              <Button 
                variant="destructive" 
                size="lg" 
                className="touch-target"
                onClick={endCall}
              >
                <PhoneOff className="h-5 w-5 mr-2" />
                End Call
              </Button>
            </div>

            <div className="mt-4 max-w-md mx-auto">
              <Textarea 
                placeholder="Quick consultation notes..."
                className="touch-target"
                rows={3}
              />
              <Button className="w-full mt-2 touch-target">
                Save Notes & Prescribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-trust">
      <header className="border-b bg-card/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">
                  Dr. {state.user?.name || 'Doctor'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  RMP • {state.user?.village}
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
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="text-2xl font-bold">{patientQueue.length}</h3>
              <p className="text-sm text-muted-foreground">Patients in Queue</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
              <h3 className="text-2xl font-bold">12</h3>
              <p className="text-sm text-muted-foreground">Consultations Today</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
              <h3 className="text-2xl font-bold">8 min</h3>
              <p className="text-sm text-muted-foreground">Avg. Wait Time</p>
            </CardContent>
          </Card>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Users className="h-6 w-6" />
            Patient Queue
          </h2>

          <div className="space-y-4">
            {patientQueue.map((patient) => (
              <Card key={patient.id} className="hover:shadow-card transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{patient.name}</CardTitle>
                      <CardDescription>
                        {patient.village} • Age {patient.age}
                        {patient.ashaWorker && ` • Assisted by ${patient.ashaWorker}`}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getUrgencyColor(patient.urgency)}>
                        {patient.urgency}
                      </Badge>
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        {patient.waitTime}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-2">Reported Symptoms:</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {patient.symptoms.map((symptom, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => startConsultation(patient)}
                        className="touch-target"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Start Consult
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {patientQueue.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No patients in queue</h3>
                  <p className="text-muted-foreground">
                    You're all caught up! New patients will appear here.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DoctorDashboard;
