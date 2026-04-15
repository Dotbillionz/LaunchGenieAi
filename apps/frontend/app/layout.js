export const metadata = {
  title: 'CrownOps Executive Console',
  description: 'Fintech and blockchain command center'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Inter, Arial, sans-serif', background: '#05070f', color: '#f5f7ff' }}>
        {children}
      </body>
    </html>
  );
}
