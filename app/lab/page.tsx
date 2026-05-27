import type { Metadata } from "next";
import { LabClient } from "@/components/lab/LabClient";

export const metadata: Metadata = {
  title: "Lab — Kevin Logan",
  description:
    "An interactive portfolio room experience. Late at night. The monitor is still on.",
};

export default function LabPage() {
  return <LabClient />;
}
