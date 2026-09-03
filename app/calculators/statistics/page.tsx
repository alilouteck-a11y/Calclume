import {
  CategoryCollectionPage,
  createCategoryPageMetadata,
} from "@/components/category/CategoryCollectionPage";

export const metadata = createCategoryPageMetadata("statistics");

/** Thin route wrapper — shared category architecture owns the UI. */
export default function StatisticsCalculatorsPage() {
  return <CategoryCollectionPage categoryId="statistics" />;
}
