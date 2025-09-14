import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, User, Key, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { LanguageSelector } from '@/components/LanguageSelector';
import { StatusIndicator } from '@/components/StatusIndicator';
import { useApp } from '@/context/AppContext';
import { getTranslation, Language } from '@/lib/i18n';
import { User as UserType } from '@/types';

const villages = [
  'Nabha', 'Bhadson', 'Banur', 'Kurali', 'Derabassi', 'Zirakpur',
  'Mohali', 'Kharar', 'Morinda', 'Samrala', 'Khanna', 'Doraha'
];

const Registration = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { state, setUser } = useApp();
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const role = searchParams.get('role') || 'patient';

  const [isLogin, setIsLogin] = useState(false); // Toggle login/register

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    village: '',
    sex: '',
    password: '',
    consent: false
  });

  const t = (key: any) => getTranslation(key, currentLang);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // Login
      try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: formData.phone, password: formData.password, role }),
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
          alert('Login successful');
          switch (role) {
            case 'patient': navigate('/patient'); break;
            case 'doctor': navigate('/doctor'); break;
            case 'asha': navigate('/asha'); break;
            default: navigate('/patient');
          }
        } else {
          alert(data.message || 'Login failed');
        }
      } catch (err) {
        console.error(err);
        alert('Something went wrong');
      }
    } else {
      // Registration
      try {
        const res = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, role }),
        });
        const data = await res.json();
        if (res.ok) {
          alert('Registration successful! Please login now.');
          setIsLogin(true);
        } else {
          alert(data.message || 'Registration failed');
        }
      } catch (err) {
        console.error(err);
        alert('Something went wrong');
      }
    }
  };

  const getRoleTitle = () => {
    if (isLogin) {
      switch (role) {
        case 'patient': return t('patientAccess') + ' Login';
        case 'doctor': return t('doctorPortal') + ' Login';
        case 'asha': return t('healthWorker') + ' Login';
        default: return 'Login';
      }
    } else {
      switch (role) {
        case 'patient': return t('patientAccess');
        case 'doctor': return t('doctorPortal');
        case 'asha': return t('healthWorker');
        default: return 'Registration';
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-trust">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <div className="flex items-center gap-4">
            <StatusIndicator isOnline={state.isOnline} />
            <LanguageSelector currentLanguage={currentLang} onLanguageChange={setCurrentLang} />
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="shadow-elevated">
            <CardHeader className="text-center">
              <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {isLogin ? <Key className="h-8 w-8 text-white" /> : <User className="h-8 w-8 text-white" />}
              </div>
              <CardTitle className="text-2xl">{getRoleTitle()}</CardTitle>
              <CardDescription>
                {isLogin ? 'Login to access telemedicine services' : 'Register to access telemedicine services'}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Registration fields */}
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('name')} *</Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    </div>

                    {role === 'patient' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="age">{t('age')} *</Label>
                          <Input
                            id="age"
                            type="number"
                            required
                            min="1"
                            max="120"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sex">Sex *</Label>
                          <Select onValueChange={(value) => setFormData({ ...formData, sex: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="village">{t('village')} *</Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, village: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your village" />
                        </SelectTrigger>
                        <SelectContent>
                          {villages.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* Phone + Password */}
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phone')} *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t('password')} *</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                  />
                </div>

                {/* Consent checkbox moved below phone & password */}
                {!isLogin && (
                  <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium text-sm">Telemedicine Consent</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          As per India's Telemedicine Practice Guidelines
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={formData.consent}
                        onCheckedChange={(checked) => setFormData({ ...formData, consent: !!checked })}
                        className="mt-1"
                      />
                      <Label className="text-sm leading-relaxed">
                        {t('consent')} and understand the limitations of telemedicine consultations.
                      </Label>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!formData.phone || !formData.password || (!isLogin && (!formData.name || !formData.village || !formData.consent))}
                >
                  {isLogin ? t('login') : t('getStarted')}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Registration;
