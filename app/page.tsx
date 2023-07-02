import Intro from "@/components/intro";
import Table from "@/components/table";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24">
      <Intro />
      <Table />
    </main>
  );
}
