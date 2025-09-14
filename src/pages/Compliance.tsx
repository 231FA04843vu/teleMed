import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  CheckCircle, 
  FileText, 
  UserCheck, 
  Heart,
  AlertTriangle,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LanguageSelector } from '@/components/LanguageSelector';
import { StatusIndicator } from '@/components/StatusIndicator';
import { useApp } from '@/context/AppContext';
import { getTranslation, Language } from '@/lib/i18n';

const Compliance = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const [currentLang, setCurrentLang] = useState<Language>('en');

  const t = (key: any) => getTranslation(key, currentLang);

  const complianceItems = [
    {
      title: 'Patient Identity Verification',
      description: 'Proper verification of patient identity before consultation',
      icon: UserCheck,
      status: 'implemented',
      details: [
        'Phone number verification during registration',
        'Name and village confirmation at consultation start',
        'ASHA worker assistance for patient identification',
        'Photo capture capability for remote verification'
      ]
    },
    {
      title: 'Informed Consent Capture',
      description: 'Explicit consent for telemedicine consultation',
      icon: FileText,
      status: 'implemented',
      details: [
        'Multi-language consent forms (Punjabi, Hindi, English)',
        'Explicit consent checkboxes before registration',
        'Recording consent acknowledgment in patient records',
        'Clear explanation of telemedicine limitations'
      ]
    },
    {
      title: 'Documentation & Audit Trail',
      description: 'Complete documentation of all consultations',
      icon: Shield,
      status: 'implemented',
      details: [
        'Timestamped consultation records',
        'Symptom and diagnosis documentation',
        'Prescription records with doctor details',
        'Audio/video call logs for audit purposes'
      ]
    },
    {
      title: 'Prescription Safety & Compliance',
      description: 'Safe prescribing following Indian regulations',
      icon: Heart,
      status: 'implemented',
      details: [
        'No Schedule X drugs (narcotic/psychotropic substances)',
        'Clear categorization: List O (OTC), List A, List B medicines',
        'Prescription validity and dosage guidelines',
        'Drug interaction and contraindication alerts'
      ]
    },
    {
      title: 'Continuity of Care',
      description: 'Ensuring proper follow-up and care continuity',
      icon: CheckCircle,
      status: 'partial',
      details: [
        'Patient history and previous consultation records',
        'Follow-up appointment scheduling',
        'Referral system to higher centers when needed',
        'Emergency contact and escalation protocols'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'bg-success text-success-foreground';
      case 'partial': return 'bg-warning text-warning-foreground';
      case 'pending': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'implemented': return 'Implemented';
      case 'partial': return 'Partially Implemented';
      case 'pending': return 'In Development';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-trust">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{t('complianceTitle')}</h1>
          
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our telemedicine platform adheres to India's Telemedicine Practice Guidelines 
            issued by the Medical Council of India and Board of Governors.
          </p>

          <Badge className="bg-success/10 text-success border-success/20 text-sm py-2 px-4">
            <CheckCircle className="h-4 w-4 mr-2" />
            MCI Guidelines Compliant
          </Badge>
        </div>

        {/* Compliance Items */}
        <section className="space-y-6 mb-12">
          {complianceItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-health p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                        <CardDescription className="text-base">
                          {item.description}
                        </CardDescription>
                      </div>
                    </div>
                    
                    <Badge className={getStatusColor(item.status)}>
                      {getStatusText(item.status)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="ml-16">
                    <h4 className="font-medium mb-3">Implementation Details:</h4>
                    <ul className="space-y-2">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* Regulatory Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Regulatory Framework</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Guidelines Followed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <ExternalLink className="h-3 w-3" />
                    Telemedicine Practice Guidelines (MCI 2020)
                  </li>
                  <li className="flex items-center gap-2">
                    <ExternalLink className="h-3 w-3" />
                    Digital Information Security in Healthcare Act
                  </li>
                  <li className="flex items-center gap-2">
                    <ExternalLink className="h-3 w-3" />
                    Drugs and Cosmetics Act, 1940
                  </li>
                  <li className="flex items-center gap-2">
                    <ExternalLink className="h-3 w-3" />
                    Information Technology Act, 2000
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Limitations & Disclaimers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li>• Emergency cases require immediate physical consultation</li>
                  <li>• No prescriptions for Schedule X substances</li>
                  <li>• First consultation should ideally be in-person</li>
                  <li>• Telemedicine supplements, not replaces, traditional care</li>
                  <li>• Internet connectivity affects service quality</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <Card className="border-primary bg-primary/5">
            <CardHeader>
              <CardTitle className="text-xl">Next Steps for Production</CardTitle>
              <CardDescription>
                Additional requirements for full production deployment
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Technical Requirements:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• End-to-end encryption for all communications</li>
                    <li>• Secure biometric authentication</li>
                    <li>• HIPAA-compliant data storage</li>
                    <li>• Real-time backup and disaster recovery</li>
                    <li>• Advanced audit logging and monitoring</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Regulatory Requirements:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• State medical board approvals</li>
                    <li>• Doctor license verification system</li>
                    <li>• Pharmacy license integration</li>
                    <li>• Insurance and liability coverage</li>
                    <li>• Regular compliance audits</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Compliance;