import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Sadaqo — Kampanye Donasi Masjid dalam 5 Menit';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #065f46 0%, #10b981 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle geometric pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.07,
            backgroundImage:
              'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Logo row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '32px',
          }}
        >
          {/* Moon icon box */}
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px',
            }}
          >
            ☽
          </div>
          <span
            style={{
              fontSize: '48px',
              fontWeight: '800',
              color: 'white',
              letterSpacing: '-1px',
            }}
          >
            Sadaqo
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: '22px',
            color: 'rgba(255,255,255,0.75)',
            margin: '0 0 12px 0',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            fontWeight: '500',
          }}
        >
          Sedekah yang Sahih.
        </p>

        {/* Main headline */}
        <h1
          style={{
            fontSize: '52px',
            fontWeight: '800',
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.15,
            margin: '0 0 40px 0',
            maxWidth: '900px',
          }}
        >
          Kampanye Donasi Masjid dalam 5 Menit
        </h1>

        {/* Feature pills */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {['Gratis untuk mulai', 'Setiap transaksi tercatat publik', '800K+ Masjid Indonesia'].map(
            (item) => (
              <div
                key={item}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: '100px',
                  padding: '10px 22px',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: '500',
                }}
              >
                ✓ {item}
              </div>
            )
          )}
        </div>

        {/* URL strip */}
        <p
          style={{
            position: 'absolute',
            bottom: '28px',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '18px',
            margin: 0,
          }}
        >
          sadaqo.id
        </p>
      </div>
    ),
    { ...size }
  );
}
