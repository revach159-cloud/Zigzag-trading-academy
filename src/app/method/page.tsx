import type { Metadata } from "next";
import { MethodHub } from "@/components/content/method-view";

export const metadata: Metadata = {
  title: "מתודולוגיית ZigZag",
};

export default function MethodPage() {
  return <MethodHub />;
}
