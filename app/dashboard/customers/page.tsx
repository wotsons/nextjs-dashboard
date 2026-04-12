import CustomersTable from "@/app/ui/customers/table";
import { CustomersTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Page(props: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";

  return (
    <div className="w-full">
      <Suspense key={query} fallback={<CustomersTableSkeleton />}>
        <CustomersTable query={query} />
      </Suspense>
    </div>
  );
}
