'use server'
import Footer from '@/components/pages/Footer/Footer';
import Navbar from '@/components/pages/Navbar';

export default  async function Page() {
  return (
    <>
    <Navbar></Navbar>
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Your main content goes here */}
      </main>
    <Footer />
    </div>
    </>
  );
}
