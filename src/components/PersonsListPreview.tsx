import { Person } from "@/types/types";
import PersonPreview from "./PersonPreview";
import { JSX } from "react";

export default function PersonsListPreview({
  persons,
  title,
}: Readonly<{ persons: Person[]; title: string }>): JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold z-[1]">{title}</h1>
      <div className="overflow-x-auto">
        <div
          className={`grid gap-4`}
          style={{ gridTemplateColumns: `repeat(${persons.length}, 200px)` }}
        >
          {persons.slice(0, 100).map((person) => (
            <PersonPreview person={person} key={person.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
