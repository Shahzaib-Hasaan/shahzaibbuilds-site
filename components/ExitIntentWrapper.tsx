'use client';

import { useState, useEffect } from 'react';
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

  useExitIntent({
    enabled: isEnabled,
    onExitIntent: () => setShowModal(true),
  });

  return (
    <ExitIntentModal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    />
  );
}
