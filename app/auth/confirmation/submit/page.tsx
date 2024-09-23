import ConfirmationSubmit from "@/components/Auth/Confitmations/Confirmation";


type Props = {
  searchParams: {
    confirmation?: string,
  },
};

export default async function page({ searchParams }: Props) {
  return <ConfirmationSubmit confirmationToken={searchParams?.confirmation} />;
}