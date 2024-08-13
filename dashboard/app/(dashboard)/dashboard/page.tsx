import NewProject from "@/components/dashboard/NewProject";

export default function page() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Projects</h2>
        <NewProject />
      </div>
    </div>
  )
}
