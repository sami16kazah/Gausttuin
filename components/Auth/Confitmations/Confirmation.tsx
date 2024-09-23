import Link from 'next/link';
import Navbar from '../../pages/Navbar';
import Footer from '../../pages/Footer/Footer';

type Props = {
  confirmationToken?: string;
};

export function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-zinc-100 rounded-sm px-4 py-8 mb-8'>{children}</div>
  );
}

export default async function ConfirmationSubmit({ confirmationToken }: Props) {
  if (!confirmationToken || confirmationToken === '') {
    return (
      <Wrapper>
        <h2 className='font-bold text-lg mb-4'>Error</h2>
        <p>Token is not valid.</p>
      </Wrapper>
    );
  }

  // send email validation request to strapi and wait for the response.
  try {
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/email-confirmation?confirmation=${confirmationToken}`
    );
    if (!strapiResponse.ok) {
      let error = '';
      const contentType = strapiResponse.headers.get('content-type');
      if (contentType === 'application/json; charset=utf-8') {
        const data = await strapiResponse.json();
        error = data.error.message;
      } else {
        error = strapiResponse.statusText;
      }
      return (
        <Wrapper>
          <h2 className='font-bold text-lg mb-4'>Error</h2>
          <p>Error: {error}</p>
        </Wrapper>
      );
    }
    // success, do nothing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return (
      <Wrapper>
        <h2 className='font-bold text-lg mb-4'>Error</h2>
        <p>{error.message}</p>
      </Wrapper>
    );
  }

  return (
    <>
    <Navbar></Navbar>
    <Wrapper>
      
      <h2 className='font-bold text-lg mb-4'>Email confirmed.</h2>
      <p>
        Your email was successfully verified. You can now{' '}
        <Link href='/auth/signin' className='underline'>
          login
        </Link>
        .
      </p>
    </Wrapper>
    <Footer></Footer>
    </>
  );
}