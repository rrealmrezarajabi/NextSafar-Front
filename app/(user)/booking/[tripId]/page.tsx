import { BookingClient } from "@/features/booking/components/BookingClient";

interface BookingPageProps {
  params: Promise<{
    tripId: string;
  }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { tripId } = await params;

  return <BookingClient tripId={tripId} />;
}
