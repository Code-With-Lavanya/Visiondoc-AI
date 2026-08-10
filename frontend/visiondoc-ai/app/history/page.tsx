import type { Metadata } from "next";
import { CircleCheck, Clock, FileImage, CircleX } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DUMMY_HISTORY } from "@/lib/dummy-data";
import { formatDateTime } from "@/lib/utils";

export const metadata: Metadata = {
  title: "History | VisionDoc AI",
};

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Analysis History
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A record of previous chest X-ray analyses. This is sample data —
          VisionDoc AI does not persist analyses to an account yet.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Recent Analyses</CardTitle>
          <Badge variant="muted">Preview data</Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {DUMMY_HISTORY.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <FileImage className="h-4.5 w-4.5 text-muted-foreground" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {item.fileName}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatDateTime(item.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pl-13 sm:pl-0">
                  <span className="text-xs text-muted-foreground">
                    {item.totalDetections} detection
                    {item.totalDetections === 1 ? "" : "s"}
                  </span>
                  {item.status === "completed" ? (
                    <Badge variant="success" className="gap-1">
                      <CircleCheck className="h-3 w-3" />
                      Completed
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="gap-1">
                      <CircleX className="h-3 w-3" />
                      Failed
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
