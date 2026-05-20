'use client';

import { forwardRef, AnchorHTMLAttributes, ReactNode } from 'react';
import { useMagnetic, MagneticOptions } from '../_hooks/useMagnetic';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  magnetic?: MagneticOptions;
}

const MagneticLink = forwardRef<HTMLAnchorElement, Props>(function MagneticLink(
  { children, magnetic, ...rest },
  _externalRef,
) {
  const ref = useMagnetic<HTMLAnchorElement>(magnetic ?? { strength: 0.4, radius: 80, scale: 1.12 });
  return (
    <a ref={ref} {...rest}>
      {children}
    </a>
  );
});

export default MagneticLink;
