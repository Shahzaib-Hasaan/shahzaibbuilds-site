'use client';

import { useState, useEffect, useCallback } from 'react';
import ExitIntentModal from './ExitIntentModal';
import { useExitIntent } from '@/hooks/useExitIntent';
import { isEmailCaptured } from '@/lib/emailCapture';

export default function ExitIntentWrapper() {
  const [showModal, setShowModal] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable exit intent if email hasn't been captured
    setIsEnabled(!isEmailCaptured());
  }, []);

  // Stable callback reference — prevents useExitIntent effect from re-running on every render
  const handleExitIntent = useCallback(() => setShowModal(true), []);

  useExitIntent({
    enabled: isEnabled,
    onExitIntent: handleExitIntent,
  });

  return (
    <ExitIntentModal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    />
  );
}
