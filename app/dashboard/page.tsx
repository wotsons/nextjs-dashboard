import { Suspense } from 'react';
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData, fetchLatestInvoices, fetchRevenue } from '@/app/lib/data';
import { CardSkeleton, RevenueChartSkeleton, LatestInvoicesSkeleton } from '@/app/ui/skeletons';

// Loading skeleton components
function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

// Separate component for cards to enable individual loading
async function Cards() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

// Separate component for revenue chart
async function RevenueChartWrapper() {
  const revenue = await fetchRevenue();
  return <RevenueChart revenue={revenue} />;
}

// Separate component for latest invoices
async function LatestInvoicesWrapper() {
  const latestInvoices = await fetchLatestInvoices();
  return <LatestInvoices latestInvoices={latestInvoices} />;
}

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className={`${lusitana.className} text-3xl font-bold text-gray-900 md:text-4xl`}>
            Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Overview of your business metrics and recent activity
          </p>
        </header>

        {/* Cards Section */}
        <section aria-labelledby="metrics-heading" className="mb-8">
          <h2 id="metrics-heading" className="sr-only">
            Key Metrics
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Suspense fallback={<CardsSkeleton />}>
              <Cards />
            </Suspense>
          </div>
        </section>

        {/* Charts Section */}
        <section aria-labelledby="charts-heading" className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <h2 id="charts-heading" className="sr-only">
            Revenue and Invoices Charts
          </h2>
          
          {/* Revenue Chart */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Revenue Overview
            </h3>
            <Suspense fallback={<RevenueChartSkeleton />}>
              <RevenueChartWrapper />
            </Suspense>
          </div>

          {/* Latest Invoices */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Latest Invoices
            </h3>
            <Suspense fallback={<LatestInvoicesSkeleton />}>
              <LatestInvoicesWrapper />
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
}