import { Author, Startup } from "@/sanity.types";

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };
