import { describe, expect, it } from "vitest";
import { AREAS } from "./areas";
import { BUILDINGS } from "./buildings";
import { GEOGRAPHY_BANDS } from "./geography";
import { JOURNAL_ARTICLES } from "./journal";

const launchRoutes = [
  "/",
  "/journal",
  "/buy",
  "/rent",
  "/sell",
  "/explore",
  "/geography",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/journal/miami-worldcenter-new-downtown-gravity",
  "/area/edgewater",
  "/building/missoni-baia",
];

describe("The Aura Miami site data", () => {
  it("has area, building, and journal content for core routes", () => {
    expect(AREAS.length).toBeGreaterThanOrEqual(10);
    expect(BUILDINGS.length).toBeGreaterThan(AREAS.length);
    expect(JOURNAL_ARTICLES.length).toBeGreaterThanOrEqual(6);
  });

  it("includes launch-critical pages and generated building dossiers", () => {
    expect(AREAS.some((area) => area.slug === "edgewater")).toBe(true);
    expect(BUILDINGS.some((building) => building.slug === "missoni-baia")).toBe(true);
    expect(BUILDINGS.some((building) => building.slug === "oceana-bal-harbour")).toBe(true);
  });

  it("uses unique slugs for generated navigation", () => {
    const areaSlugs = new Set(AREAS.map((area) => area.slug));
    const buildingSlugs = new Set(BUILDINGS.map((building) => building.slug));
    const journalSlugs = new Set(JOURNAL_ARTICLES.map((article) => article.slug));

    expect(areaSlugs.size).toBe(AREAS.length);
    expect(buildingSlugs.size).toBe(BUILDINGS.length);
    expect(journalSlugs.size).toBe(JOURNAL_ARTICLES.length);
  });

  it("tracks launch-critical routes for deployment QA", () => {
    expect(launchRoutes).toContain("/privacy");
    expect(launchRoutes).toContain("/terms");
    expect(launchRoutes).toContain("/rent");
    expect(launchRoutes).toContain("/explore");
    expect(launchRoutes).toContain("/geography");
    expect(launchRoutes).toContain("/about");
    expect(launchRoutes).toContain("/contact");
    expect(launchRoutes.every((route) => route.startsWith("/"))).toBe(true);
  });

  it("has search intelligence metadata on launch areas", () => {
    const balHarbour = AREAS.find((area) => area.slug === "bal-harbour");
    const brickell = AREAS.find((area) => area.slug === "brickell");
    const southOfFifth = AREAS.find((area) => area.slug === "south-of-fifth");

    expect(balHarbour?.aliases).toContain("Bal Harbor");
    expect(brickell?.aliases).toContain("Brickel");
    expect(southOfFifth?.aliases).toContain("SoFi");
  });

  it("assigns visual treatment metadata to every area", () => {
    expect(AREAS.every((area) => area.image && area.imagePosition)).toBe(true);
    expect(AREAS.every((area) => area.visualTone)).toBe(true);
  });

  it("adds AURA building profile data to every building dossier", () => {
    expect(BUILDINGS.every((building) => building.profile)).toBe(true);
    expect(
      BUILDINGS.every((building) => (building.profile?.bestFor.length ?? 0) >= 3),
    ).toBe(true);
    expect(
      BUILDINGS.every((building) => (building.profile?.dueDiligence.length ?? 0) >= 3),
    ).toBe(true);
  });

  it("keeps geography atlas links aligned with live area pages", () => {
    const areaSlugs = new Set(AREAS.map((area) => area.slug));
    const atlasSlugs = GEOGRAPHY_BANDS.flatMap((band) =>
      band.areas.map((area) => area.slug).filter(Boolean),
    );

    expect(atlasSlugs.every((slug) => areaSlugs.has(slug))).toBe(true);
    expect(atlasSlugs).toContain("indian-creek");
  });
});
