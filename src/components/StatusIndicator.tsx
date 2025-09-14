import { Wifi, WifiOff, Circle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface StatusIndicatorProps {
  isOnline: boolean;
  lastSyncTime?: Date;
  className?: string;
}

export function StatusIndicator({ isOnline, lastSyncTime, className = "" }: StatusIndicatorProps) {
  const formatLastSync = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Badge 
        variant={isOnline ? "secondary" : "outline"}
        className={`gap-1 ${isOnline ? '' : 'offline-indicator'}`}
      >
        {isOnline ? (
          <>
            <Circle className="h-2 w-2 fill-success" />
            <Wifi className="h-3 w-3" />
            Online
          </>
        ) : (
          <>
            <Circle className="h-2 w-2 fill-warning" />
            <WifiOff className="h-3 w-3" />
            Offline
          </>
        )}
      </Badge>
      
      {lastSyncTime && (
        <span className="text-xs text-muted-foreground">
          Last sync: {formatLastSync(lastSyncTime)}
        </span>
      )}
    </div>
  );
}