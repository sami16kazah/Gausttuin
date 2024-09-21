
import Footer from '@/components/pages/Footer';
import AnimatedWrapper from '@/components/pages/AnimatedWrapper';

export default function Page() {
  return (
    <div className='w-full h-screen overflow-y-auto'>
      <p> Home Page </p>
     <AnimatedWrapper key={1}><Footer></Footer></AnimatedWrapper>
     <AnimatedWrapper key={2}><Footer></Footer></AnimatedWrapper>
     <AnimatedWrapper key={3}><Footer></Footer></AnimatedWrapper>
     <AnimatedWrapper key={4}><Footer></Footer></AnimatedWrapper>
    </div>
  );
}
