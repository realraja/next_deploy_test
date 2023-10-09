'use client'

import { RingLoader } from "react-spinners"

export default function PageLevelLoader({ text, color, loading, size }) {
    return (
      <span className="flex gap-1 items-center">
        {text}
        <RingLoader
          color={color}
          loading={loading}
          size={size || 10}
          data-testid="loader"
        />
      </span>
    );
  }