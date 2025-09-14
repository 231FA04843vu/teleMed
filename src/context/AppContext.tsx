import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AppState } from '@/types';
import { languages, Language } from '@/lib/i18n';

interface AppContextType {
  state: AppState;
  setUser: (user: User | null) => void;
  setLanguage: (language: Language) => void;
  toggleDemoMode: () => void;
  updateOnlineStatus: (isOnline: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type Action =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_ONLINE_STATUS'; payload: boolean }
  | { type: 'TOGGLE_DEMO_MODE' }
  | { type: 'ADD_TO_SYNC_QUEUE'; payload: any };

const initialState: AppState = {
  user: null,
  language: languages.en,
  isOnline: navigator.onLine,
  demoMode: false,
  syncQueue: []
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: languages[action.payload] };
    case 'SET_ONLINE_STATUS':
      return { ...state, isOnline: action.payload };
    case 'TOGGLE_DEMO_MODE':
      return { ...state, demoMode: !state.demoMode };
    case 'ADD_TO_SYNC_QUEUE':
      return { ...state, syncQueue: [...state.syncQueue, action.payload] };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => dispatch({ type: 'SET_ONLINE_STATUS', payload: true });
    const handleOffline = () => dispatch({ type: 'SET_ONLINE_STATUS', payload: false });

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const setUser = (user: User | null) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const setLanguage = (language: Language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  const toggleDemoMode = () => {
    dispatch({ type: 'TOGGLE_DEMO_MODE' });
  };

  const updateOnlineStatus = (isOnline: boolean) => {
    dispatch({ type: 'SET_ONLINE_STATUS', payload: isOnline });
  };

  return (
    <AppContext.Provider value={{
      state,
      setUser,
      setLanguage,
      toggleDemoMode,
      updateOnlineStatus
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}