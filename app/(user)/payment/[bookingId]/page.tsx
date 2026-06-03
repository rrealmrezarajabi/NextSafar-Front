import { PaymentClient } from "@/features/payment/components/PaymentClient";

interface PaymentPageProps {
  params: Promise<{
    bookingId: string;
  }>;
}

export default async function PaymentPage({ params }: PaymentPageProps) {
  const { bookingId } = await params;

  return <PaymentClient bookingId={bookingId} />;
}
