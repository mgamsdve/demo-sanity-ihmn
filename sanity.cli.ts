import { defineCliConfig } from "sanity/cli";

const cliConfig = {
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "missing-project-id",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  },
  typegen: {
    enabled: true,
  },
};

export default defineCliConfig(cliConfig);
