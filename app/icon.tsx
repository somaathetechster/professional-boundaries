// app/icon.tsx
import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Generate the favicon
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00FF41', // System Neon
          borderRadius: '20%',
          border: '1px solid #333'
        }}
      >
        PB
      </div>
    ),
    { ...size }
  );
}