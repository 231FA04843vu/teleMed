import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, Stethoscope, Pill, Monitor, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { LanguageSelector } from '@/components/LanguageSelector';
import { StatusIndicator } from '@/components/StatusIndicator';
import { useApp } from '@/context/AppContext';
import { getTranslation, Language } from '@/lib/i18n';

const Index = () => {
  const navigate = useNavigate();
  const { state, setLanguage, toggleDemoMode } = useApp();
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (language: Language) => {
    setCurrentLang(language);
    setLanguage(language);
  };

  const t = (key: any) => getTranslation(key, currentLang);

  const roleCards = [
    { title: t('patientAccess'), description: 'Access healthcare from your village', icon: Heart, route: '/register?role=patient', gradient: 'bg-gradient-health' },
    { title: t('healthWorker'), description: 'ASHA worker portal for patient assistance', icon: Users, route: '/register?role=asha', gradient: 'bg-gradient-primary' },
    { title: t('doctorPortal'), description: 'RMP doctor consultation portal', icon: Stethoscope, route: '/register?role=doctor', gradient: 'bg-gradient-health' },
    { title: t('pharmacyPortal'), description: 'Manage medicine stock and availability', icon: Pill, route: '/register?role=pharmacy', gradient: 'bg-gradient-primary' }
  ];

  return (
    <div className={`min-h-screen bg-gradient-trust transition-opacity ${fadeIn ? 'fade-in opacity-100' : 'opacity-0'}`}>
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-health p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">TeleMed Nabha</h1>
              <p className="text-sm text-muted-foreground">Rural Healthcare</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <StatusIndicator isOnline={state.isOnline} />
            <LanguageSelector currentLanguage={currentLang} onLanguageChange={handleLanguageChange} />
          </div>
        </div>
      </header>

      {/* Demo Mode Toggle */}
      <div className="bg-warning/10 border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-3">
          <Monitor className="h-4 w-4" />
          <span className="text-sm font-medium">{t('demoMode')}</span>
          <Switch checked={state.demoMode} onCheckedChange={toggleDemoMode} />
          {state.demoMode && <Badge variant="outline" className="bg-warning/20">Demo Active</Badge>}
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            <MapPin className="h-3 w-3 mr-1" />
            Problem ID 25018 - Smart India Hackathon
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-health bg-clip-text text-transparent">
            {t('appTitle')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="secondary" className="text-sm py-2 px-4">173 Villages Connected</Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">Offline-First PWA</Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">India Telemedicine Compliant</Badge>
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Role</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roleCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Card key={index} className="group hover:shadow-elevated transition-all duration-300 cursor-pointer border-0" onClick={() => navigate(card.route)}>
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-xl ${card.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                    <CardDescription className="text-sm">{card.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full touch-target" variant="outline" onClick={(e) => { e.stopPropagation(); navigate(card.route); }}>
                      {t('getStarted')}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-success w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Multilingual Support</h3>
              <p className="text-sm text-muted-foreground">Punjabi, Hindi, English with easy switching</p>
            </div>
            <div className="text-center">
              <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Offline-First</h3>
              <p className="text-sm text-muted-foreground">Works without internet, syncs when online</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Compliant</h3>
              <p className="text-sm text-muted-foreground">Follows India Telemedicine Guidelines</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-card">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-4">Telemedicine Access for Rural Healthcare in Nabha</p>
          <Button variant="link" onClick={() => navigate('/compliance')}>
            View Compliance & Safety Information
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Index;
