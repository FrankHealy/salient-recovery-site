export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif', padding: '4rem', maxWidth: '600px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b7280', marginBottom: '1rem' }}>
          404
        </p>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1C1C1C' }}>
          Page not found
        </h1>
        <p style={{ color: '#555', marginBottom: '2rem' }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <a href="/en" style={{ color: '#1e3c66', textDecoration: 'underline' }}>
          Return to home
        </a>
      </body>
    </html>
  )
}
