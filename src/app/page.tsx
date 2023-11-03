"use client";
import React from "react";

import { recordings } from "@/lib/data";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getWeeksBetweenDates } from "@/lib/utils/get-weeks-between-dates";
import { cn } from "@/lib/utils";

export default function Home() {
  let [recs, setRecs] = React.useState(() => {
    let now = new Date();
    let week = getWeeksBetweenDates(new Date("2023-08-14"), now) + 1;
    let recs = recordings.filter((rec) => rec.week === week);
    return recs;
  });

  let [week, setWeek] = React.useState(() => {
    let now = new Date();
    let week = getWeeksBetweenDates(new Date("2023-08-14"), now) + 1;
    return week;
  });

  let [copiedUrl, setCopiedUrl] = React.useState("");

  React.useEffect(() => {
    setRecs(recordings.filter((rec) => rec.week === week));
  }, [week]);

  React.useEffect(() => {
    if (copiedUrl) {
      setTimeout(() => {
        setCopiedUrl("");
      }, 1000);
    }
  }, [copiedUrl]);

  return (
    <main className="flex h-screen flex-col container pt-8 pb-4">
      <h1 className="text-5xl font-bold text-center mb-8">
        Grabaciones de UTEC
      </h1>
      <p className="font-mono text-center">
        Clases de Anthony (@cuevantn). Proof of concept. v0.
      </p>
      <div className="flex justify-between my-8">
        <div className="flex space-x-4 items-center px-4">
          <Label htmlFor="week">Semana</Label>
          <Input
            id="week"
            type="number"
            value={week}
            onChange={(e) => setWeek(Number(e.target.value))}
            min={1}
            max={16}
            className="w-16 h-9"
          />
        </div>
        <div className="space-x-2">
          <Button
            onClick={() => setWeek((week) => week - 1)}
            variant="outline"
            size="sm"
            disabled={week === 1}
          >
            Anterior
          </Button>
          <Button
            onClick={() => setWeek((week) => week + 1)}
            variant="outline"
            size="sm"
            disabled={week === 16}
          >
            Siguiente
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Curso</TableHead>
            <TableHead>Profesor</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recs.map(({ course, start, url, sessionType, teacher }) => (
            <TableRow key={url}>
              <TableCell>
                {course.name} ({sessionType})
              </TableCell>
              <TableCell>{teacher.name}</TableCell>
              <TableCell>
                {start.toLocaleString("es-PE", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  timeZone: "America/Lima",
                })}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2 justify-end">
                  <a
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                        size: "icon",
                      }),
                      "rounded-full"
                    )}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </a>
                  <Button
                    className={cn("rounded-full")}
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      navigator.clipboard.writeText(url);
                      setCopiedUrl(url);
                    }}
                  >
                    {copiedUrl === url ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                      >
                        <path d="m12 15 2 2 4-4" />
                        <rect
                          width="14"
                          height="14"
                          x="8"
                          y="8"
                          rx="2"
                          ry="2"
                        />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                      >
                        <rect
                          width="14"
                          height="14"
                          x="8"
                          y="8"
                          rx="2"
                          ry="2"
                        />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                    )}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </main>
  );
}
