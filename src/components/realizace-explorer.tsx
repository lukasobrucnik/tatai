"use client";

import { useState } from "react";
import type { Project } from "@/lib/data";
import { Tag } from "./ui/tag";
import { ProjectCard } from "./ui/project-card";
import { Reveal } from "./reveal";

type Filter = "vse" | "strechy" | "domy";

export function RealizaceExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("vse");
  const filtered = filter === "vse" ? projects : projects.filter((p) => p.pillar === filter);

  return (
    <>
      <div className="flex flex-wrap gap-3 mt-12 pt-6 border-t border-border-hairline">
        <Tag interactive active={filter === "vse"} onClick={() => setFilter("vse")}>
          Vše ({projects.length})
        </Tag>
        <Tag interactive active={filter === "strechy"} onClick={() => setFilter("strechy")}>
          Střechy ({projects.filter((p) => p.pillar === "strechy").length})
        </Tag>
        <Tag interactive active={filter === "domy"} onClick={() => setFilter("domy")}>
          Domy ({projects.filter((p) => p.pillar === "domy").length})
        </Tag>
      </div>

      <div className="grid grid-cols-3 gap-(--grid-gap) items-start mt-16 max-lg:grid-cols-2! max-sm:grid-cols-1!">
        {filtered.map((p) => (
          <Reveal key={p.slug}>
            <ProjectCard project={p} index={String(projects.indexOf(p) + 1).padStart(2, "0")} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
