# NextSafar AI Context

This file is the compact AI-readable project specification for continuing the NextSafar frontend. It summarizes `docs/nextsafar.html`, the backend PDFs in `docs/`, and the current implementation state.

Use this file as the main context when asking an AI to continue the project. Keep the backend PDFs as the final source of truth for exact API payloads and errors.

## Project Goal

Build a Persian RTL bus ticket booking frontend similar to Safar724.

Main user roles:

- `user`: regular customer who searches trips, selects seats, creates bookings, pays, and views tickets.
- `owner`: company owner who manages company buses, company trips, company bookings, and booking statistics.

## Tech Stack

- Next.js `16.2.6`
- React `19.2.4`
- TypeScript
- App Router
- Tailwind CSS v4
- shadcn/ui and Radix UI
- Axios
- TanStack Query
- Zustand
- React Hook Form
- Zod
- js-cookie
- Vazirmatn font

Important repo rule:

- This project uses Next.js 16 with possible breaking changes. Before changing Next.js-specific APIs, read the relevant guide in `node_modules/next/dist/docs/`.

## Source Documents

- Main human-readable spec: `docs/nextsafar.html`
- Backend API PDFs:
  - `docs/Accounts App API Documentation.pdf`
  - `docs/Trips App API Documentation.pdf`
  - `docs/Booking_api_doc.pdf`
  - `docs/Payment App API Documentation.pdf`
  - `docs/Final Tickets App.pdf`
  - `docs/Companies App API Documentation.pdf`
  - `docs/refined_v1.pdf`
- Quick API list: `docs/key_endponits.txt`

Recommended rule:

- Use `docs/ai-context.md` for fast AI context.
- Use `docs/nextsafar.html` for full project roadmap and UX flow.
- Use the PDFs as final authority for exact request/response/error details.

## Current Implementation State

The project is not complete. It currently has the setup, auth basics, and public trip search basics.

Implemented:

- Global App Router setup in `app/`
- Persian RTL layout and providers
- React Query provider and Sonner toaster
- Auth service endpoints:
  - login
  - register user
  - register owner
  - refresh token
- Auth schemas:
  - `loginSchema`
  - `registerUserSchema`
  - `registerOwnerSchema`
- Cookie-based token storage in `store/auth.store.ts`
- Axios instance with `Authorization: Bearer <access_token>` from cookie
- Auth UI:
  - `/login`
  - `/register`
  - user register form
  - owner register form
- Public pages:
  - `/`
  - `/search`
- Trip search form:
  - `origin`
  - `destination`
  - `date`
- Trip search service:
  - `GET /api/trips/company/trips/search/`
- Trip details service method:
  - `GET /api/trips/company/trips/{id}/`
- Trip card displays:
  - origin/destination names when available
  - departure/arrival time
  - bus type
  - available seats
  - price
  - company name when available

Not implemented yet:

- `/trip/[id]` trip details page
- trip details hook
- `getSeats` service method
- booking types, schemas, service, hooks, store
- `/booking/[tripId]`
- seat selection UI
- passenger form
- create booking mutation
- `/payment/[bookingId]`
- payment service/hook
- ticket service/hook/pages
- `/tickets/[id]`
- `/user/dashboard`
- `/user/bookings`
- `/user/tickets`
- protected route guards
- `/owner/dashboard`
- `/owner/buses`
- `/owner/trips`
- `/owner/bookings`
- bus service/types/schemas
- owner trip CRUD
- constants folder

## Current File Structure

The HTML spec shows a `src/` directory, but the actual repo currently does not use `src`. Continue with the current root-level structure unless explicitly asked to reorganize.

Current important folders:

```text
app/
components/
features/
schemas/
services/
store/
types/
utils/
docs/
```

Current implemented feature folders:

```text
features/auth/
features/trips/
```

Current services:

```text
services/api.ts
services/auth.service.ts
services/trips.service.ts
```

Current types:

```text
types/auth.types.ts
types/trip.types.ts
```

Current schemas:

```text
schemas/auth.schema.ts
schemas/trip.schema.ts
```

## Architecture Rules

Follow the established local pattern:

- Pages in `app/` should mostly compose route-level UI.
- API calls belong in `services/`.
- TanStack Query hooks belong in `features/<domain>/hooks/`.
- Reusable feature UI belongs in `features/<domain>/components/`.
- Shared primitive UI belongs in `components/ui/`.
- Layout/navigation belongs in `components/layout/`.
- API response and payload types belong in `types/`.
- Zod form schemas belong in `schemas/`.
- Client auth state belongs in `store/auth.store.ts`.
- Future booking draft state can go in `store/booking.store.ts`.

Avoid calling `axios` directly inside pages/components. Use service functions and hooks.

## Auth

Token strategy:

- Backend returns `access` and `refresh` tokens in JSON.
- Backend does not set cookies.
- Frontend must store tokens in cookies:
  - `access_token`
  - `refresh_token`
- Do not store tokens in `localStorage` or `sessionStorage`.
- Axios should send `Authorization: Bearer <access_token>`.

Auth endpoints:

```text
POST /api/accounts/user/register/
POST /api/accounts/owner/register/
POST /api/accounts/account/login
POST /api/accounts/refresh-token/
GET  /api/accounts/me/
```

Register user payload:

```json
{
  "first_name": "Ali",
  "last_name": "Ahmadi",
  "phone": "09123456789",
  "email": "ali@example.com",
  "password": "StrongP@ssw0rd"
}
```

Register user response:

```json
{
  "refresh": "jwt-refresh-token",
  "access": "jwt-access-token",
  "user": {
    "id": 5,
    "first_name": "Ali",
    "last_name": "Ahmadi",
    "phone": "09123456789",
    "email": "ali@example.com",
    "role": "user"
  }
}
```

Register owner payload:

```json
{
  "first_name": "Mohammad",
  "last_name": "Rezaei",
  "phone": "09987654321",
  "email": "mohammad@travelco.com",
  "password": "CompanyP@ss123",
  "company_name": "Pars Travel Co."
}
```

Register owner response:

```json
{
  "refresh": "jwt-refresh-token",
  "access": "jwt-access-token",
  "owner": {
    "id": 3,
    "first_name": "Mohammad",
    "last_name": "Rezaei",
    "phone": "09987654321",
    "email": "mohammad@travelco.com",
    "role": "owner"
  }
}
```

Login payload:

```json
{
  "phone": "09123456789",
  "password": "StrongP@ssw0rd"
}
```

Login response:

```json
{
  "access": "jwt-access-token",
  "refresh": "jwt-refresh-token",
  "account": {
    "id": 5,
    "first_name": "Ali",
    "last_name": "Ahmadi",
    "role": "user"
  }
}
```

Refresh payload:

```json
{
  "refresh": "jwt-refresh-token"
}
```

Refresh response:

```json
{
  "access": "new-jwt-access-token"
}
```

Current-user endpoint:

```text
GET /api/accounts/me/
Authorization: Bearer <jwt_token>
```

Regular user response:

```json
{
  "id": 5,
  "first_name": "Ali",
  "last_name": "Ahmadi",
  "phone": "09123456789",
  "email": "ali@example.com",
  "role": "user",
  "company_name": null
}
```

Owner response:

```json
{
  "id": 3,
  "first_name": "Mohammad",
  "last_name": "Rezaei",
  "phone": "09987654321",
  "email": "mohammad@travelco.com",
  "role": "owner",
  "company_name": "Pars Travel Co."
}
```

Role redirect after auth:

- `role = user` -> `/user/dashboard`
- `role = owner` -> `/owner/dashboard`

Protected route rules:

- User-only:
  - `/user/*`
  - `/booking/*`
  - `/payment/*`
- Owner-only:
  - `/owner/*`

## Trips

Trip status values:

```ts
type TripStatus = "scheduled" | "cancelled" | "completed";
```

Trip fields:

```ts
interface Trip {
  id: number;
  bus: number;
  origin_city: number | string;
  destination_city: number | string;
  origin_city_name?: string;
  destination_city_name?: string;
  departure: string;
  arrival: string;
  price: string;
  status: TripStatus;
  company: number;
  company_name?: string;
  bus_type: string;
  available_seats: number;
}
```

Confirmed by backend:

- Trip output may include both city IDs and city names:
  - `origin_city`
  - `origin_city_name`
  - `destination_city`
  - `destination_city_name`
- Use `origin_city_name` and `destination_city_name` for display when present.
- Search can use city name or city ID.
- There is no required city-list API for MVP.
- Autocomplete can be added later but is not a blocker.

Trip endpoints:

```text
GET    /api/trips/company/trips/
POST   /api/trips/company/trips/
GET    /api/trips/company/trips/{id}/
PUT    /api/trips/company/trips/{id}/
PATCH  /api/trips/company/trips/{id}/
DELETE /api/trips/company/trips/{id}/
GET    /api/trips/company/trips/search/
GET    /api/trips/company/trips/{id}/seats/
```

Access rules:

- Listing, retrieving single trip, and searching are public.
- Creating/updating/deleting trips is owner-only.
- Owners can only manage trips belonging to their company.

Search endpoint:

```text
GET /api/trips/company/trips/search/?origin=Tehran&destination=Shiraz&date=2026-06-15
```

Search query params:

- `origin`: city name or ID, optional
- `destination`: city name or ID, optional
- `date`: `YYYY-MM-DD`, optional

Search response:

```json
[
  {
    "id": 12,
    "bus": 5,
    "origin_city": 1,
    "origin_city_name": "Tehran",
    "destination_city": 2,
    "destination_city_name": "Shiraz",
    "departure": "2026-06-15T08:00:00Z",
    "arrival": "2026-06-15T12:00:00Z",
    "price": "450000.00",
    "status": "scheduled",
    "company": 3,
    "company_name": "Pars Travel Co.",
    "bus_type": "VIP",
    "available_seats": 42
  }
]
```

Important search edge case:

- The Trips PDF says no results may return `404` with `{ "message": "No Trip Found" }`.
- The current UI treats empty arrays as "no trips" but treats errors as failure.
- Recommended improvement: normalize search `404 / No Trip Found` to `[]` in `tripsService.search` or the hook.

Create trip payload:

```json
{
  "bus": 5,
  "origin_city": 1,
  "destination_city": 2,
  "departure": "2026-06-15T08:00:00Z",
  "arrival": "2026-06-15T12:00:00Z",
  "price": 450000
}
```

Create/update validation:

- Origin and destination cannot be the same.
- Arrival must be after departure.
- Bus must have at least 10 seats.
- Bus must belong to authenticated owner's company.
- `company` is auto-assigned from the authenticated owner.
- `status` defaults to `scheduled`.

Available seats caveat:

- The Trips PDF says `available_seats = bus seat count - paid bookings`.
- It also says pending bookings do not reduce `available_seats`.
- The Booking PDF and `refined_v1.pdf` confirm that a `pending_payment` booking locks selected seats atomically.
- Therefore: for seat selection, do not rely only on `available_seats`. Always use `GET /api/trips/company/trips/{id}/seats/`.

## Public User Flow

System flow:

1. User opens `/`.
2. User searches with origin, destination, and date.
3. App navigates to `/search?origin=...&destination=...&date=...`.
4. `/search` calls trip search endpoint and displays trip cards.
5. User clicks a trip card.
6. App navigates to `/trip/[id]`.
7. User clicks continue/select seats.
8. App navigates to `/booking/[tripId]`.
9. User selects seats and fills passenger data.
10. App creates booking with `POST /api/bookings/`.
11. App navigates to `/payment/[bookingId]`.
12. User pays through fake gateway.
13. Backend creates tickets.
14. App navigates to `/tickets/[id]` for one ticket or `/user/tickets` for multiple tickets.

Implemented public pages:

- `/`
- `/search`

Next public page to implement:

- `/trip/[id]`

Trip details page:

- Route: `/trip/[id]`
- API: `GET /api/trips/company/trips/{id}/`
- Show complete trip details:
  - origin city name
  - destination city name
  - departure date/time
  - arrival date/time
  - price
  - bus type
  - available seats
  - company name if available
  - status
- CTA: "ادامه و انتخاب صندلی"
- CTA target: `/booking/{tripId}`

## Seats

Seat endpoint:

```text
GET /api/trips/company/trips/{id}/seats/
```

Seat response:

```json
[
  {
    "id": 1,
    "number": 1,
    "status": "available"
  },
  {
    "id": 2,
    "number": 2,
    "status": "reserved"
  }
]
```

Seat statuses:

```ts
type SeatStatus = "available" | "reserved" | "unavailable" | "selected";
```

Meaning:

- `available`: selectable
- `reserved`: already booked or locked
- `unavailable`: not selectable
- `selected`: local UI-only status for the current user's selected seats

Important rules:

- Seat state must be read from the dedicated seats endpoint.
- If create booking fails because of seat conflict, refetch seats.
- Backend confirms booking creation is atomic.
- When user A creates a `pending_payment` booking for seat 5, user B cannot book seat 5 for the same trip.

## Booking

Booking statuses:

```ts
type BookingStatus = "pending_payment" | "paid" | "canceled" | "expired";
```

Meaning:

- `pending_payment`: booking created, expires after 10 minutes
- `paid`: payment successful, final booking
- `canceled`: user or owner canceled before payment
- `expired`: 10 minutes passed without payment

Rules:

- Only regular users can create bookings.
- Company owners cannot create bookings.
- Number of `seat_ids` must match number of passengers.
- Each selected seat must be available and belong to the trip bus.
- Each passenger must include all required fields.
- Booking expires after 10 minutes.
- Paid bookings cannot be canceled.
- Expired bookings cannot be paid or canceled.
- Direct PUT/PATCH/DELETE on `/api/bookings/{id}/` is forbidden.
- Use `/api/bookings/{id}/cancel/` for cancellation.

Booking endpoints:

```text
POST  /api/bookings/
GET   /api/bookings/
GET   /api/bookings/{id}/
PATCH /api/bookings/{id}/cancel/
GET   /api/bookings/stats/
```

Create booking payload:

```json
{
  "trip": 12,
  "seat_ids": [1, 3],
  "passengers": [
    {
      "first_name": "Ali",
      "last_name": "Ahmadi",
      "national_code": "1234567890",
      "phone": "09123456789"
    },
    {
      "first_name": "Reza",
      "last_name": "Ahmadi",
      "national_code": "1234567891",
      "phone": "09123456788"
    }
  ]
}
```

Create booking response:

```json
{
  "id": 55,
  "user": 5,
  "expires_at": "2026-05-30T08:10:00Z",
  "status": "pending_payment",
  "total_price": "900000.00",
  "trip": 12
}
```

List bookings query params:

- `status`: `pending_payment`, `paid`, `canceled`, `expired`
- `from_date`: `YYYY-MM-DD`
- `to_date`: `YYYY-MM-DD`
- pagination params if supported

Role-based list behavior:

- Regular user sees own bookings.
- Owner sees bookings for trips belonging to their company.

Cancel booking:

```text
PATCH /api/bookings/{id}/cancel/
```

Cancel response:

```json
{
  "message": "Booking cancelled successfully",
  "booking_id": 55,
  "status": "canceled",
  "cancelled_by": "user"
}
```

Booking stats response:

```json
{
  "total_bookings": 15,
  "paid_bookings": 8,
  "pending_bookings": 3,
  "cancelled_bookings": 2,
  "expired_bookings": 2,
  "total_revenue": "3600000.00"
}
```

Recommended booking files:

```text
types/booking.types.ts
schemas/booking.schema.ts
services/booking.service.ts
features/booking/components/SeatMap.tsx
features/booking/components/PassengerForm.tsx
features/booking/hooks/useTripSeats.ts
features/booking/hooks/useCreateBooking.ts
store/booking.store.ts
app/(user)/booking/[tripId]/page.tsx
```

## Payment

Payment is fake gateway only for MVP.

Payment endpoint:

```text
POST /api/payments/pay/
```

Access:

- Regular user only.
- Company owners cannot make payments.
- User must own the booking.

Payment payload:

```json
{
  "booking_id": 55,
  "method": "fake_gateway"
}
```

Payment rules:

- Booking status must be `pending_payment`.
- Booking must not be expired.
- Booking must not already have successful payment.
- Booking must have passengers.
- Method must be `fake_gateway`.
- Payment creation, booking update, and ticket generation are atomic.
- One payment per booking.
- One ticket is generated per passenger.

Payment response:

```json
{
  "payment": {
    "id": 12,
    "booking": 55,
    "amount": "900000.00",
    "tracking_code": "aB3dE5fG7h...",
    "status": "success",
    "paid_at": "2026-05-30T10:15:32Z"
  },
  "ticket_ids": [98, 99]
}
```

After successful payment:

- If one ticket ID is returned, navigate to `/tickets/{id}`.
- If multiple ticket IDs are returned, navigate to `/user/tickets`.

Recommended payment files:

```text
types/payment.types.ts
services/payment.service.ts
features/payment/hooks/usePayBooking.ts
features/payment/components/PaymentBox.tsx
app/(user)/payment/[bookingId]/page.tsx
```

## Tickets

Ticket endpoints:

```text
GET /api/tickets/
GET /api/tickets/{id}/
```

Access:

- Regular user sees own tickets.
- Owner sees tickets for company trips.

Ticket response shape:

```json
{
  "id": 98,
  "booking_id": 55,
  "passenger": {
    "first_name": "Ali",
    "last_name": "Ahmadi",
    "national_code": "1234567890"
  },
  "trip": {
    "id": 12,
    "origin_city": "Tehran",
    "destination_city": "Shiraz",
    "departure": "2026-06-15T08:00:00Z",
    "arrival": "2026-06-15T12:00:00Z"
  },
  "seat_number": 1,
  "ticket_code": "aB3dE5fG7h...",
  "issued_at": "2026-05-30T10:15:32Z"
}
```

Recommended ticket files:

```text
types/ticket.types.ts
services/tickets.service.ts
features/tickets/hooks/useTickets.ts
features/tickets/hooks/useTicketDetails.ts
features/tickets/components/TicketCard.tsx
app/(user)/tickets/[id]/page.tsx
app/(user)/user/tickets/page.tsx
```

## User Panel

Routes:

```text
/user/dashboard
/user/bookings
/user/tickets
```

User dashboard:

- Summary of user info.
- Count of bookings.
- Count of tickets.
- Count of pending bookings.
- Recent tickets.

User bookings:

- API: `GET /api/bookings/`
- Optional filters: status/date/pagination
- Cancel pending bookings with `PATCH /api/bookings/{id}/cancel/`

User tickets:

- API: `GET /api/tickets/`

## Owner Panel

Routes:

```text
/owner/dashboard
/owner/buses
/owner/trips
/owner/bookings
```

Owner dashboard:

- API: `GET /api/bookings/stats/`
- Shows company booking stats.

Owner buses:

- API base: `/api/companies/company/buses/`
- CRUD company buses.

Owner trips:

- API base: `/api/trips/company/trips/`
- CRUD company trips.

Owner bookings:

- API: `GET /api/bookings/`
- Shows bookings for company trips.
- Can cancel pending company bookings.

## Buses

Bus endpoints:

```text
GET    /api/companies/company/buses/
POST   /api/companies/company/buses/
GET    /api/companies/company/buses/{id}/
PUT    /api/companies/company/buses/{id}/
PATCH  /api/companies/company/buses/{id}/
DELETE /api/companies/company/buses/{id}/
```

Access:

- Owner-only.
- Owners can only access buses belonging to their company.
- Regular users cannot access bus endpoints.

Bus fields:

```ts
interface Bus {
  id: number;
  company: number;
  type: string;
  seat_count: number;
  created_at?: string;
}
```

Create bus payload:

```json
{
  "type": "Luxury",
  "seat_count": 48
}
```

Bus rules:

- `company` is auto-assigned from authenticated owner.
- `seat_count` should be at least 10.
- Bus type is not strictly enumerated by serializer.
- Buses with existing trips cannot be deleted.
- Updating `seat_count` may affect future trips.

## Suggested Types To Add

Trip types already exist. Add these as needed.

```ts
export type SeatStatus = "available" | "reserved" | "unavailable" | "selected";

export interface Seat {
  id: number;
  number: number;
  status: SeatStatus;
}

export interface PassengerPayload {
  first_name: string;
  last_name: string;
  national_code: string;
  phone: string;
}

export type BookingStatus = "pending_payment" | "paid" | "canceled" | "expired";

export interface CreateBookingPayload {
  trip: number;
  seat_ids: number[];
  passengers: PassengerPayload[];
}
```

## Suggested Schemas To Add

```ts
export const passengerSchema = z.object({
  first_name: z.string().min(1, "نام الزامی است"),
  last_name: z.string().min(1, "نام خانوادگی الزامی است"),
  national_code: z.string().min(10, "کد ملی معتبر نیست").max(10, "کد ملی معتبر نیست"),
  phone: z.string().min(10, "شماره موبایل معتبر نیست"),
});

export const busSchema = z.object({
  type: z.string().min(1, "نوع اتوبوس الزامی است"),
  seat_count: z.coerce.number().min(10, "حداقل ظرفیت ۱۰ صندلی است"),
});
```

## Suggested Constants

Add later when useful:

```text
constants/routes.ts
constants/queryKeys.ts
constants/bookingStatus.ts
```

Route constants:

```ts
export const ROUTES = {
  home: "/",
  search: "/search",
  login: "/login",
  register: "/register",
  userDashboard: "/user/dashboard",
  userBookings: "/user/bookings",
  userTickets: "/user/tickets",
  ownerDashboard: "/owner/dashboard",
  ownerBuses: "/owner/buses",
  ownerTrips: "/owner/trips",
  ownerBookings: "/owner/bookings",
};
```

Query key constants:

```ts
export const QUERY_KEYS = {
  trips: ["trips"],
  trip: (id: string | number) => ["trip", id],
  tripSeats: (id: string | number) => ["trip-seats", id],
  bookings: ["bookings"],
  booking: (id: string | number) => ["booking", id],
  bookingStats: ["booking-stats"],
  tickets: ["tickets"],
  ticket: (id: string | number) => ["ticket", id],
  buses: ["buses"],
};
```

## MVP Scope

Must have:

- Home page and search
- Search results
- Trip details
- Login
- Register user
- Register owner
- Logout
- Seat selection
- Passenger form
- Create booking
- Payment through fake gateway
- Ticket display
- User bookings
- User tickets
- Cancel pending booking
- Owner buses CRUD
- Owner trips CRUD
- Owner company bookings
- Owner booking stats

Not required for MVP:

- Real payment gateway
- Forgot password
- SMS/email verification
- Admin panel
- City autocomplete

## Recommended Development Order

Phase 1: Setup

- Already mostly done.

Phase 2: Auth

- Mostly done.
- Still needed:
  - `/api/accounts/me/` service
  - session restore
  - role guards/protected routes

Phase 3: Public Trip Flow

- Done:
  - home search
  - search results
- Next:
  - trip details page `/trip/[id]`
  - trip details hook
  - normalize search 404 to empty results

Phase 4: Booking Flow

- add seat endpoint
- add seat map
- add passenger schema/form
- add booking service
- add booking store if needed
- create booking
- navigate to payment

Phase 5: Payment and Tickets

- payment page
- fake gateway payment mutation
- ticket list/details

Phase 6: User Panel

- dashboard
- bookings
- tickets

Phase 7: Owner Panel

- dashboard stats
- buses CRUD
- trips CRUD
- company bookings

## Immediate Next Step

The next best implementation task is:

```text
Build /trip/[id] trip details page.
```

Recommended changes:

- Add `features/trips/hooks/useTripDetails.ts`.
- Export it from `features/trips/index.ts`.
- Add route `app/(public)/trip/[id]/page.tsx`.
- Use `tripsService.getById(id)`.
- Display all trip details.
- Use `origin_city_name` and `destination_city_name` when available.
- Add CTA to `/booking/{trip.id}`.
- Handle loading, error, and missing data states.

After that:

```text
Add seats support with GET /api/trips/company/trips/{id}/seats/
```

## Notes For AI Agents

- Read existing code before editing.
- Follow existing style and file organization.
- Keep edits scoped to the requested feature.
- Do not reorganize the project into `src/` unless explicitly requested.
- Do not use `localStorage` for auth tokens.
- Do not rely on `available_seats` for seat map availability.
- Use the dedicated seats endpoint for booking.
- For Next.js 16 behavior, check `node_modules/next/dist/docs/` before changing Next-specific code.
