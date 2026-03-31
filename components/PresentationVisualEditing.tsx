"use client";

import { useEffect, useState } from "react";
import { VisualEditing } from "next-sanity";
import { isMaybePresentation } from "@sanity/presentation-comlink";

const PRESENTATION_HANDSHAKE_TIMEOUT_MS = 3000;

function buildDisableDraftModeUrl() {
  const redirectTo = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const searchParams = new URLSearchParams({ redirect: redirectTo });

  return `/api/draft-mode/disable?${searchParams.toString()}`;
}

export default function PresentationVisualEditing() {
  const [isPresentationSession, setIsPresentationSession] = useState(false);

  useEffect(() => {
    if (!isMaybePresentation()) {
      window.location.replace(buildDisableDraftModeUrl());
      return;
    }

    let handshakeConfirmed = false;

    const handleMessage = (event: MessageEvent) => {
      const data = event.data;

      if (
        !data ||
        typeof data !== "object" ||
        !("domain" in data) ||
        !("from" in data) ||
        data.domain !== "sanity/channels" ||
        data.from !== "presentation"
      ) {
        return;
      }

      handshakeConfirmed = true;
      window.clearTimeout(timeoutId);
      setIsPresentationSession(true);
    };

    const timeoutId = window.setTimeout(() => {
      if (!handshakeConfirmed) {
        window.location.replace(buildDisableDraftModeUrl());
      }
    }, PRESENTATION_HANDSHAKE_TIMEOUT_MS);

    window.addEventListener("message", handleMessage);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  if (!isPresentationSession) {
    return null;
  }

  return <VisualEditing />;
}
