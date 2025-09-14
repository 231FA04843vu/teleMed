// Internationalization for multilingual support

export const languages = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    rtl: false
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    rtl: false
  },
  pa: {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    rtl: false
  }
} as const;

export const translations = {
  en: {
    // Common
    welcome: 'Welcome',
    getStarted: 'Get Started',
    language: 'Language',
    offline: 'Offline',
    online: 'Online',
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    next: 'Next',
    back: 'Back',
    submit: 'Submit',
    
    // Landing page
    appTitle: 'Rural Healthcare Telemedicine',
    subtitle: 'Quality healthcare for 173 villages in Nabha',
    patientAccess: 'Patient Access',
    healthWorker: 'Health Worker',
    doctorPortal: 'Doctor Portal',
    pharmacyPortal: 'Pharmacy Portal',
    demoMode: 'Demo Mode',
    
    // Patient
    symptoms: 'Symptoms',
    checkSymptoms: 'Check Symptoms',
    requestConsult: 'Request Consultation',
    myPrescriptions: 'My Prescriptions',
    findPharmacy: 'Find Pharmacy',
    
    // Doctor
    patientQueue: 'Patient Queue',
    startConsult: 'Start Consultation',
    prescribe: 'Prescribe Medicine',
    
    // Common forms
    name: 'Name',
    age: 'Age',
    phone: 'Phone Number',
    village: 'Village',
    consent: 'I consent to telemedicine consultation',
    
    // Compliance
    complianceTitle: 'Compliance & Safety',
    identity: 'Identity Verification',
    consentCapture: 'Consent Capture',
    documentation: 'Documentation',
    prescriptionSafety: 'Prescription Safety'
  },
  hi: {
    // Common
    welcome: 'स्वागत है',
    getStarted: 'शुरू करें',
    language: 'भाषा',
    offline: 'ऑफ़लाइन',
    online: 'ऑनलाइन',
    loading: 'लोड हो रहा है...',
    save: 'सेव करें',
    cancel: 'रद्द करें',
    next: 'अगला',
    back: 'पीछे',
    submit: 'जमा करें',
    
    // Landing page
    appTitle: 'ग्रामीण स्वास्थ्य टेलीमेडिसिन',
    subtitle: 'नाभा के 173 गांवों के लिए गुणवत्तापूर्ण स्वास्थ्य सेवा',
    patientAccess: 'रोगी पहुंच',
    healthWorker: 'स्वास्थ्य कार्यकर्ता',
    doctorPortal: 'डॉक्टर पोर्टल',
    pharmacyPortal: 'फार्मेसी पोर्टल',
    demoMode: 'डेमो मोड',
    
    // Patient
    symptoms: 'लक्षण',
    checkSymptoms: 'लक्षण जांचें',
    requestConsult: 'परामर्श का अनुरोध',
    myPrescriptions: 'मेरी दवाएं',
    findPharmacy: 'फार्मेसी खोजें',
    
    // Doctor
    patientQueue: 'रोगी कतार',
    startConsult: 'परामर्श शुरू करें',
    prescribe: 'दवा लिखें',
    
    // Common forms
    name: 'नाम',
    age: 'उम्र',
    phone: 'फ़ोन नंबर',
    village: 'गांव',
    consent: 'मैं टेलीमेडिसिन परामर्श के लिए सहमति देता हूं',
    
    // Compliance
    complianceTitle: 'अनुपालन और सुरक्षा',
    identity: 'पहचान सत्यापन',
    consentCapture: 'सहमति कैप्चर',
    documentation: 'दस्तावेज़ीकरण',
    prescriptionSafety: 'प्रिस्क्रिप्शन सुरक्षा'
  },
  pa: {
    // Common
    welcome: 'ਜੀ ਆਇਆਂ ਨੂੰ',
    getStarted: 'ਸ਼ੁਰੂ ਕਰੋ',
    language: 'ਭਾਸ਼ਾ',
    offline: 'ਔਫ਼ਲਾਈਨ',
    online: 'ਔਨਲਾਈਨ',
    loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    save: 'ਸੇਵ ਕਰੋ',
    cancel: 'ਰੱਦ ਕਰੋ',
    next: 'ਅਗਲਾ',
    back: 'ਪਿੱਛੇ',
    submit: 'ਜਮ੍ਹਾਂ ਕਰੋ',
    
    // Landing page
    appTitle: 'ਪਿੰਡੀ ਸਿਹਤ ਟੈਲੀਮੈਡੀਸਿਨ',
    subtitle: 'ਨਾਭਾ ਦੇ 173 ਪਿੰਡਾਂ ਲਈ ਗੁਣਵੱਤਾ ਸਿਹਤ ਸੇਵਾ',
    patientAccess: 'ਮਰੀਜ਼ ਪਹੁੰਚ',
    healthWorker: 'ਸਿਹਤ ਕਰਮਚਾਰੀ',
    doctorPortal: 'ਡਾਕਟਰ ਪੋਰਟਲ',
    pharmacyPortal: 'ਫਾਰਮੇਸੀ ਪੋਰਟਲ',
    demoMode: 'ਡੈਮੋ ਮੋਡ',
    
    // Patient
    symptoms: 'ਲੱਛਣ',
    checkSymptoms: 'ਲੱਛਣ ਜਾਂਚੋ',
    requestConsult: 'ਸਲਾਹ ਦੀ ਬੇਨਤੀ',
    myPrescriptions: 'ਮੇਰੀਆਂ ਦਵਾਈਆਂ',
    findPharmacy: 'ਫਾਰਮੇਸੀ ਲੱਭੋ',
    
    // Doctor
    patientQueue: 'ਮਰੀਜ਼ ਕਤਾਰ',
    startConsult: 'ਸਲਾਹ ਸ਼ੁਰੂ ਕਰੋ',
    prescribe: 'ਦਵਾਈ ਲਿਖੋ',
    
    // Common forms
    name: 'ਨਾਮ',
    age: 'ਉਮਰ',
    phone: 'ਫ਼ੋਨ ਨੰਬਰ',
    village: 'ਪਿੰਡ',
    consent: 'ਮੈਂ ਟੈਲੀਮੈਡੀਸਿਨ ਸਲਾਹ ਲਈ ਸਹਿਮਤੀ ਦਿੰਦਾ ਹਾਂ',
    
    // Compliance
    complianceTitle: 'ਪਾਲਣਾ ਅਤੇ ਸੁਰੱਖਿਆ',
    identity: 'ਪਛਾਣ ਤਸਦੀਕ',
    consentCapture: 'ਸਹਿਮਤੀ ਕੈਪਚਰ',
    documentation: 'ਦਸਤਾਵੇਜ਼ੀਕਰਨ',
    prescriptionSafety: 'ਨੁਸਖਾ ਸੁਰੱਖਿਆ'
  }
};

export type Language = 'en' | 'hi' | 'pa';
export type TranslationKey = keyof typeof translations.en;

export const getTranslation = (key: TranslationKey, lang: Language = 'en'): string => {
  return translations[lang][key] || translations.en[key] || key;
};