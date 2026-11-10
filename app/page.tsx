import { Home } from '@/components/home';

export default function Page() {
  return (
    <Home
      domain="LysbTh.com"
      message={
        <>
          Portfolio coming soon.
          <br />
          open for job opportunities
        </>
      }
      email="hello@lysbth.com"
      tagline="Graphic design · Rotterdam"
    />
  );
}
