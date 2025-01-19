import Image from "next/image";
import Link from "next/link";
import { Person } from "@/types/types";
import { JSX } from "react";

export default function PersonPreview({
  person,
}: {
  person: Person;
}): JSX.Element {
  return (
    <Link
      href={`/persons/${person.id}`}
      key={person.id}
      className="relative group overflow-hidden"
    >
      {person.profile_path && (
        <Image
          src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
          alt={person.name}
          width={500}
          height={750}
          className="w-full h-auto"
        />
      )}
      <div className="absolute h-full w-full bottom-0 bg-black bg-opacity-50 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 flex flex-col justify-end p-4 transition-all duration-500">
        <h2 className="text-lg font-semibold">{person.name}</h2>
        <p>
          {isNaN(new Date(person.birthday).getTime())
            ? ""
            : new Date(person.birthday).toLocaleDateString("fr-FR")}
        </p>
        <div className="flex items-center mt-2">
          {Array.from({ length: 5 }, (_, index) => (
            <svg
              key={index}
              className={`w-4 h-4 ${
                index < Math.round(person.popularity / 2)
                  ? "text-yellow-400"
                  : "text-gray-400"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.392 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.392-2.46a1 1 0 00-1.175 0l-3.392 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
            </svg>
          ))}
          <span className="ml-2 text-sm">{person.popularity.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
