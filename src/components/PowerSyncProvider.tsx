"use client";
import React, { Suspense } from "react";
import { PowerSyncDatabase, WASQLiteOpenFactory } from "@powersync/web";
import { PowerSyncContext } from "@powersync/react";
import { AppSchema } from "@/lib/schema";
import { seedDatabase } from "@/lib/seed";

const db = new PowerSyncDatabase({
  schema: AppSchema,
  database: new WASQLiteOpenFactory({
    dbFilename: "adzan_portfolio.db",
    worker: "/worker/WASQLiteDB.umd.js",
  }),
});

export default function PowerSyncProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const init = async () => {
      await db.init();
      await seedDatabase(db);
      setReady(true);
    };
    init();
  }, []);

  if (!ready)
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center text-green-500">
        Initializing Engine...
      </div>
    );

  return (
    <Suspense fallback={null}>
      <PowerSyncContext.Provider value={db}>
        {children}
      </PowerSyncContext.Provider>
    </Suspense>
  );
}
