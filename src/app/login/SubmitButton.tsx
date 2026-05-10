'use client';

import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

interface Props {
  formAction: any;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  isOutline?: boolean;
}

export function SubmitButton({ formAction, className, style, children, isOutline }: Props) {
  const { pending } = useFormStatus();

  return (
    <button 
      formAction={formAction} 
      className={className || `btn ${isOutline ? 'btn-outline' : 'btn-primary'}`} 
      style={{ ...style, opacity: pending ? 0.7 : 1, cursor: pending ? 'not-allowed' : 'pointer' }}
      disabled={pending}
    >
      {pending && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}
