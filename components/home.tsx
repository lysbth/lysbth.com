'use client';

import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Loader } from './loader';
import { Postcard, type PostcardProps } from './postcard';

/** The home page: the opening animation, then the postcard comes in. */
export function Home(props: PostcardProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <Loader onDone={() => setRevealed(true)} />
      <Postcard {...props} revealed={revealed} />
    </MotionConfig>
  );
}
