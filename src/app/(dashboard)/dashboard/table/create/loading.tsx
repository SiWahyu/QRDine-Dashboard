import { FormSkeleton } from "@/components/skeletons/form-skeleton";

export default function Loading() {
  return <FormSkeleton pageTitle="Create Table" fields={1} />;
}
