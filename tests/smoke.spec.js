// Smoke tests: every case study, dialog and key interaction still works, with no console errors.
const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

const CASES = [
  { slug: "widex", label: "Case study: Widex", locked: true },
  { slug: "swisscard", label: "Case study: Swisscard" },
  { slug: "nrth", label: "Case study: NRTH" },
  { slug: "codefu", label: "Case study: CodeFu" },
];
const PASSWORD = "widex2024";

let errors;
test.beforeEach(async ({ page }) => {
  errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/loaded/);
});
test.afterEach(() => expect(errors).toEqual([]));

async function unlock(page) {
  await expect(page.locator("#pwOverlay")).toBeVisible();
  await page.fill("#pwInput", PASSWORD);
  await page.keyboard.press("Enter");
}

for (const c of CASES) {
  test(`opens and closes the ${c.slug} case study`, async ({ page }) => {
    await page.getByRole("listitem", { name: c.label }).click();
    if (c.locked) await unlock(page);
    await expect(page.locator("#caseView")).toHaveClass(/open/);
    await expect(page).toHaveURL(new RegExp(`#${c.slug}$`));
    await expect(page.locator("#caseBody .cs-results")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#caseView")).not.toHaveClass(/open/);
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  });
}

test("a shared link opens its case study", async ({ page }) => {
  await page.goto("/#swisscard");
  await expect(page.locator("#caseView")).toHaveClass(/open/);
  await expect(page.locator("#caseTitle")).toContainText("Shaping a user-friendly mobile flow");
});

test("a wrong password is rejected and the gate offers an email", async ({ page }) => {
  await page.getByRole("listitem", { name: "Case study: Widex" }).click();
  await page.fill("#pwInput", "nope");
  await page.keyboard.press("Enter");
  await expect(page.locator("#pwError")).toBeVisible();
  await expect(page.getByRole("link", { name: "Email me for access" })).toHaveAttribute("href", /^mailto:/);
});

test("about, testimonial and work-history dialogs open and close", async ({ page }) => {
  for (const [tile, dialog] of [
    ['[aria-label="Intro card"]', "#aboutOverlay"],
    [".tile.testimonial", "#tmOverlay"],
    ['[aria-label="Work history"]', "#whOverlay"],
    ['[aria-label="Speaking"]', "#spOverlay"],
  ]) {
    await page.locator(tile).first().click();
    await expect(page.locator(dialog)).toHaveClass(/open/);
    await page.keyboard.press("Escape");
    await expect(page.locator(dialog)).toBeHidden();
  }
});

test("every piece of text is filled in from the content files", async ({ page }) => {
  const empty = await page.$$eval("[data-t]", (els) =>
    els.filter((e) => !e.textContent.trim()).map((e) => e.dataset.t),
  );
  expect(empty).toEqual([]);
  await expect(page.locator("#grid .tile")).toHaveCount(14);
});

test("filters bring matching tiles first", async ({ page }) => {
  await page.locator('.tabs button[data-f="testimonials"]').click();
  await expect(page.locator("#grid .tile").first()).toHaveClass(/testimonial/);
  await expect(page.locator("#grid .tile.dim").first()).toBeAttached();
});

test("the page never scrolls sideways", async ({ page }) => {
  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(width).toBeLessThanOrEqual(page.viewportSize().width);
});

test("no serious accessibility issues on the home page", async ({ page }) => {
  await expect(page.locator(".sk")).toHaveCount(0); /* wait for the loading placeholders to fade out */
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(results.violations.filter((v) => ["serious", "critical"].includes(v.impact))).toEqual([]);
});

test("the logo and the day/night switch work inside a case study", async ({ page }) => {
  await page.goto("/#swisscard");
  await expect(page.locator("#caseView")).toHaveClass(/open/);
  const before = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  await page.locator("#themeSw").click();
  await expect
    .poll(() => page.evaluate(() => getComputedStyle(document.body).backgroundColor))
    .not.toBe(before);
  await expect(page.locator("#caseView")).toHaveClass(/open/);
  await page.locator("#brand").click();
  await expect(page.locator("#caseView")).not.toHaveClass(/open/);
});

test("the browser Back button closes an open case study", async ({ page }) => {
  await page.getByRole("listitem", { name: "Case study: NRTH" }).click();
  await expect(page.locator("#caseView")).toHaveClass(/open/);
  await page.goBack();
  await expect(page.locator("#caseView")).not.toHaveClass(/open/);
  await expect(page).toHaveURL(/localhost:4173\/$/);
});

test("the theme choice is remembered", async ({ page }) => {
  await page.locator("#themeSw").click();
  const theme = await page.evaluate(() => document.documentElement.dataset.theme);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
});

test("the lightbox steps through a case study's screenshots", async ({ page }) => {
  await page.getByRole("listitem", { name: "Case study: Swisscard" }).click();
  await page.locator("#caseBody .cs-shot").first().click();
  await expect(page.locator(".lb")).toHaveClass(/open/);
  const first = await page.locator(".lb img").getAttribute("src");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".lb img")).not.toHaveAttribute("src", first);
  await expect(page.locator(".lb-count")).toHaveText(/^2 \/ \d+$/);
  await page.keyboard.press("Escape");
  await expect(page.locator(".lb")).not.toHaveClass(/open/);
});

test("quick scan hides the long copy, keeps the screens and shows both reading times", async ({ page }) => {
  await page.goto("/#nrth");
  await expect(page.locator("#caseView")).toHaveClass(/open/);
  const full = Number((await page.locator('[data-time="full"]').textContent()).match(/\d+/)[0]);
  const scan = Number((await page.locator('[data-time="scan"]').textContent()).match(/\d+/)[0]);
  expect(scan).toBeLessThan(full);
  await page.locator('#caseMode button[data-mode="scan"]').click();
  await expect(page.locator("#caseBody .scan-hide").first()).toBeHidden();
  await expect(page.locator("#caseBody .cs-shot").first()).toBeVisible();
  await page.locator('#caseMode button[data-mode="full"]').click();
  await expect(page.locator("#caseBody .scan-hide")).toHaveCount(0);
});

test("contact links come from the config and external ones open in a new tab", async ({ page }) => {
  const linkedin = page.locator(".ft-links a").nth(1);
  await expect(linkedin).toHaveAttribute("href", /linkedin\.com/);
  await expect(linkedin).toHaveAttribute("target", "_blank");
  await expect(page.locator(".ft-links a").first()).toHaveAttribute("href", /^mailto:/);
});
