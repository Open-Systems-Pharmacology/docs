# v13 Documentation Verification Report

Verification of the **`v13`** branch of `Open-Systems-Pharmacology/docs` against the current implementation of the OSP Suite.

## Scope and method

| Source of truth | Ref | How it was used |
| --- | --- | --- |
| `Open-Systems-Pharmacology/PK-Sim` | `develop`, `src/` | `PKSimConstants.cs`, `CoreConstants.cs`, `TransportDirection.cs`, `PKSim.CLI/**` |
| `Open-Systems-Pharmacology/MoBi` | `develop`, `src/` | `AppConstants.cs`, `MoBi.CLI/**` |
| `Open-Systems-Pharmacology/OSPSuite.Core` | `develop`, `src/` | `OSPSuite.Assets/UIConstants.cs`, `OSPSuite.CLI.Core/RunOptions/**` |
| `Open-Systems-Pharmacology/InstallationValidator` | `develop`, `src/` | `Program.cs`, `Constants.cs` |
| `Open-Systems-Pharmacology/QualificationRunner` | `develop`, `src/` | `Commands/*.cs`, `RunOptions/QualificationRunOptions.cs` |
| `Open-Systems-Pharmacology/OSPSuite.ReportingEngine` | `main`, `R/` | `NAMESPACE`, `DESCRIPTION` |
| `Open-Systems-Pharmacology/QualificationPlan` | `main` | `schemas/OSP_Qualification_Plan_Schema.json` |
| `Open-Systems-Pharmacology/OSPSuite.Dimensions` | `master` | `OSPSuite.Dimensions.xml` |

Branch obtained with `git fetch origin v13`. 69 Markdown files were reviewed.

Finding classification:

* **[ERROR]** — the documentation states something that is factually wrong against the source.
* **[OUTDATED]** — correct for an earlier version, superseded in v13.
* **[GAP]** — implemented behaviour that is not documented at all.
* **[MINOR]** — editorial, structural or consistency issue.

Findings that could not be resolved against a source are explicitly marked **[UNVERIFIED]**.

---

# 1. Root-level pages

## [SUMMARY.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/SUMMARY.md)

* [ ] **[GAP]** `core-separator.md` exists in the repo but is not referenced from `SUMMARY.md`. Its entire content is a horizontal rule (`___`), so it is a leftover layout artifact.
* [ ] **[MINOR]** In the "Mechanistic Modeling of Pharmacokinetics and Dynamics" part, `Best Practices` (part-7) is listed *before* `Modeling Concepts` (part-1), so best-practice guidance precedes the conceptual introduction it builds on (`SUMMARY.md:9-23`).

## [README.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/README.md)

* [ ] **[GAP]** README describes the manual as "divided into the parts listed below" and enumerates part-1 → part-6, but **omits part-7 (Best Practices)**, which `SUMMARY.md` presents as the first section of the manual (`README.md:13-47` vs `SUMMARY.md:10-15`).

## [NEWS.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/NEWS.md)

* [ ] **[ERROR]** Unresolved authoring placeholder published in a bullet title: "**Event mapping TODO documentation link**" (`NEWS.md:163`).
* [ ] **[GAP]** 13 unresolved screenshot placeholders (`> 🖼️ **TODO (screenshot):**` / `> **TODO – PK-Sim screenshot:**`) remain in the released v13 release notes (`NEWS.md:92, 105, 124, 139, 157, 161, 165, 169, 175, 183, 187, 191, 195`).
* [ ] **[GAP]** The v13 headline feature *Events in administration protocols* links to `pk-sim-administration-protocols#simple-protocol` / `#advanced-protocol`, but those sections contain **no event documentation**; the only v13 content on that page is the `No formulation` path change.
* [ ] **[GAP]** The v13 headline feature *Compound Overwrite Parameter Sets* (`NEWS.md:12, 177-199`) is not documented anywhere in the manual — the string occurs only in `NEWS.md`.
* [ ] **[GAP]** The v13 PBBM/oral-absorption feature is undocumented in the manual body: the new Compound groups **"Advanced Intestinal Solubility"** and **"Bile Salt Micelle Partitioning"** (`NEWS.md:141`) do not appear in `part-3/pk-sim-compounds-definition-and-work-flow.md`; the three diffusion-layer-thickness options (Constant / Hintz–Johnson / Hydrodynamic) and the P-PSD formulation input (`NEWS.md:117-122`) do not appear in `part-3/pk-sim-formulations.md`.
* [ ] **[MINOR]** Link style inconsistent within the file: absolute `https://docs.open-systems-pharmacology.org/v13/...` URLs (lines 6, 20, 155, 159, 171, 210, 222, 260, 283) mixed with repo-relative links (lines 39-43, 230, 233). Commit `60e9f80` was applied only partially.
* [ ] **[MINOR]** `NEWS.md:271` states the MiKTeX dependency was removed, but `part-2/getting-started.md` never mentioned MiKTeX, so the prerequisites section was never aligned with either state.

## [copyright.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/copyright.md)

* [ ] **[MINOR]** Publication date is given only as a year ("Publication date 2026"), while `how-to-cite.md:29` instructs readers to add the publication month if named — the month is never provided.

## [how-to-contribute.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/how-to-contribute.md)

* [ ] **[ERROR]** The documented list of hint styles is incomplete. The page states the available styles are `tip`, `note`, `warning`, `info` (`:61-66`), but the repo also uses `{% hint style="danger" %}` (`part-4/converting-v12-projects-to-v13.md:75, :100`).
* [ ] **[MINOR]** The worked example is self-contradictory: the text says "using the style `note`" but the code that follows is `{% hint style="info" %}` (`:55-59`).

## [core-separator.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/core-separator.md)

* [ ] **[GAP]** Contains only a horizontal rule, no heading or content, and is unreferenced anywhere in the repo.

## [appendix.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/appendix.md)

Verified line-by-line against `OSPSuite.Dimensions.xml` (94 dimensions in the XML, 90 rows in the table).

* [ ] **[GAP]** Four dimensions defined in `OSPSuite.Dimensions.xml` are missing from the table:

  | Dimension | Base unit |
  | --- | --- |
  | `Amount per area` | `µmol/dm²` |
  | `Amount per area per time` | `µmol/dm²/min` |
  | `Area per amount per time` | `dm²/µmol/min` |
  | `Inversed area` | `1/dm²` |

* [ ] **[MINOR]** The page is titled "Appendix A." with a single section "A.1.", implying a non-existent A.2; `SUMMARY.md:98` labels the same page "Dimensions and Units".

## [references.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/references.md)

* [ ] **[MINOR]** Entry **173** is never cited from any page (numbering runs 1–173; maximum citation used is 172).
* [ ] **[MINOR]** Entries 123 and 125 carry inline HTML comments inside the heading text (`#### 123 <!-- markdown-link-check-disable-next-line -->`, `references.md:372, 378`). GitBook/GitHub slugging includes the comment text, so inbound links `references.md#123` and `references.md#125` (from `part-7/a-short-guide-to-pbpk-model-development.md:9` and `part-7/documentation.md:18`) are at risk of not resolving.
* [ ] **[MINOR]** Duplicate entries cited as if distinct: `[[124]]`, `[[142]]`, `[[154]]` are the identical Peters & Dolgos (2019) paper; `[[129]]` and `[[159]]` are both Miller et al. (2019); `[[137]]` and `[[151]]` are both Kuemmel et al.

## [factsheet.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/factsheet.md)

* [ ] **[ERROR]** Species list is wrong and outdated: 7 organisms are listed and described as "Dog (beagle and mongrale)". In v13, **Beagle and Dog are separate species entries** and **Cat and Cattle** are additionally available — 10 species in total. "mongrale" is also a misspelling of "mongrel". (`factsheet.md:26-32` vs `part-3/pk-sim-creating-individuals.md:29-40`; `PKSim.Core/CoreConstants.Species` defines `CAT`, `CATTLE`, `BEAGLE`, `MINIPIG`, `RABBIT`; icons `assets/icons/Cat.svg`, `Cattle.svg`, `Beagle.svg`, `Dog.svg` all exist.)
* [ ] **[OUTDATED]** Partition-coefficient method named **"PK-Sim 2003"**; the name in the software and in the manual body is **"PK-Sim® Standard (default)"** (`factsheet.md:82` vs `part-3/pk-sim-compounds-definition-and-work-flow.md:242`).
* [ ] **[MINOR]** "Berezhkovsky" is misspelled; the manual body and reference 5 use "Berezhkovskiy".
* [ ] **[GAP]** The "Permeability" subsection names no methods, while the manual documents three selectable cellular-permeability calculation methods (PK-Sim® Standard, Charge dependent Schmitt, Charge dependent Schmitt normalized PK-Sim®).
* [ ] **[GAP]** `### Observers` (line 119) is an empty heading with no body.
* [ ] **[MINOR]** Formulation display names do not match: factsheet says "Particle distribution", "1st order", "Zero order"; the manual and `CoreConstants.Formulation` use "Particle Dissolution", "First Order", "Zero Order".
* [ ] **[GAP]** The feature inventory predates v13 and omits both v13 headline capabilities (bile-salt-micelle/PBBM oral absorption; Compound Overwrite Parameter Sets).

---

# 2. Part 1 — Modeling Concepts

## [part-1/modeling-concepts-pbpk-modeling-systems-biology.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-1/modeling-concepts-pbpk-modeling-systems-biology.md)

* [ ] **[MINOR]** Citation formatting deviates from the manual-wide convention: `[39](../references.md#39)` renders as "39" instead of "[39]" (`:11`).

## [part-1/principles-of-pbpk-modeling.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-1/principles-of-pbpk-modeling.md)

* [ ] **[GAP]** The organ description ("vascular space, divided into plasma and (red) blood cells and the avascular space, divided into interstitial and cellular space", `:7`) omits the **endosome** subcompartment, which both `factsheet.md:209` and `part-1/modeling-concepts-modeling-of-proteins.md:9,12` describe as a standard subcompartment of the protein model.
* [ ] **[MINOR]** Two malformed citation brackets in one sentence: `[[116]](../references.md#116)` (closing bracket outside link text) and `[[120\]](../references.md#120)` (escaped bracket) (`:5`).

## [part-1/modeling-concepts-expression-data-for-pbpk-modeling.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-1/modeling-concepts-expression-data-for-pbpk-modeling.md)

* [ ] **[GAP]** The page explains relative expression and absolute reference-organ amounts but never mentions **ontogeny**, although ontogeny factors are a first-class part of the expression workflow it points to. The word does not occur anywhere in part-1.

## [part-1/modeling-concepts-modeling-of-proteins.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-1/modeling-concepts-modeling-of-proteins.md)

* [ ] **[GAP]** Not aligned with the v13 parameter rename `Kd (FcRn) in endosomal space of <container>` → `Kd (FcRn) of <container>` (`NEWS.md:35`); no parameter names are given at all, so a reader migrating scripts gets no pointer from the conceptual chapter.
* [ ] **[MINOR]** Malformed citation bracket `[[114]](../references.md#114)` (`:5`).

---

# 3. Part 2 — Getting Started

## [part-2/modules-philsophy-building-blocks.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-2/modules-philsophy-building-blocks.md)

* [ ] **[OUTDATED]** The MoBi building-block list is pre-v11: it names **"Molecule Start Values"** and **"Parameter Start Values"**, renamed to **Initial Conditions** and **Parameter Values**. It also omits the **Expression Profiles** and **Individuals** building-block types (`:23` vs `part-4/modularization-concept.md:27` and `SUMMARY.md:62-65`).
* [ ] **[OUTDATED]** The species list ("mouse, rat, minipig, dog, monkey, and rabbit") is missing **Beagle**, **Cat** and **Cattle** (`:13`).
* [ ] **[OUTDATED]** The CLI bullet describes the command-line interface as PK-Sim-only ("allows batch processing of multiple projects in PK-Sim") and links only to the PK-Sim CLI page. v13 introduced a **MoBi® command-line interface** (`MoBi.CLI/Program.cs`, verbs `snap` and `qualification`), documented at `part-4/mobi-command-line-interface.md` (`:49` vs `NEWS.md:208-210`).
* [ ] **[GAP]** The R-package list omits the new **MoBi® R interface** package introduced in v13 (`:55-58` vs `NEWS.md:212-214`).
* [ ] **[GAP]** The **Installation Validator** bullet gives no link to the tool, its repository, or any usage instructions, unlike every other bullet in the same section (`:48`).

## [part-2/getting-started.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-2/getting-started.md)

* [ ] **[ERROR]** Broken anchor in the only pointer given for installing the (Re-)Qualification Framework: `…/shared-tools-and-example-workflows/qualification#tools` — the qualification page has **no "Tools" section** (`:53`).
* [ ] **[OUTDATED]** The example installer version is `12.0.397` in a manual that documents Version 13 (`:39`).
* [ ] **[OUTDATED]** The two qualification links are **unversioned**, so from the v13 manual they resolve to whatever version is currently published as default (`:51,53`).
* [ ] **[GAP]** The requirements table states **no .NET runtime prerequisite**, although v13 moved the suite to .NET 10 (`NEWS.md:58`) — material for managed/offline installations. `.NET` does not occur anywhere in `part-2/`.
* [ ] **[GAP]** The "Installation and Update" section documents no update path despite its title, and does not link to `part-4/converting-v12-projects-to-v13.md` or `part-3/conversion-projects-from-previous-version.md`.
* [ ] **[GAP]** The **Installation Validator** — the "1-Click" way to validate an installation, with its own `InstallationValidator` executable — is not mentioned in the installation chapter at all. Repo-wide, "Installation Validator" occurs only in `part-2/modules-philsophy-building-blocks.md:48`. The tool's command-line behaviour (`InstallationValidator/Program.cs`) is documented nowhere in the manual.
* [ ] **[MINOR]** "Third Party Tools" tells the reader to contact suppliers "indicated in the section 'Trademark information'" for **Matlab®**, but that section names only Excel® and R.
* [ ] **[MINOR]** Repeated grammar error: "the core components of the Open Systems Pharmacology Suite, including PK-Sim® MoBi®" (missing "and") at `:13` and `:57`.

---

# 4. Part 3 — PK-Sim

## [part-3/pk-sim-command-line-interface.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-3/pk-sim-command-line-interface.md)

Verified against `PKSim.CLI/Program.cs` and `PKSim.CLI/Commands/*.cs`.

* [ ] **[GAP]** The `--cores` option is **not documented**. It is declared on the shared base class `PKSim.CLI/Commands/CLICommand.cs` and therefore available on **all four verbs**: *"Optional. Maximal number of cores to use … Default is the number of logical processors of the machine."* This is the primary performance-tuning knob of the CLI and it is absent from all four "Logging options" lists in the page.

## [part-3/pk-sim-creating-individuals.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-3/pk-sim-creating-individuals.md)

* [ ] **[ERROR]** Internally inconsistent species enumeration: the page lists ten species (Human, Monkey, Beagle, Dog, Minipig, Rat, Mouse, Rabbit, Cat, Cattle), but the "Animal species" subsection enumerates only "Monkey, Beagle, Dog, Minipig, Rat or Mouse" — **Rabbit, Cat and Cattle are omitted** (`:29-40`).

## [part-3/pk-sim-creating-populations.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-3/pk-sim-creating-populations.md)

* [ ] **[ERROR]** Ribbon tab name is wrong: the page says the **Population** button is in the **Create** group of the **"Modeling & Simulation" Tab** (`:31`). `PKSim.Assets/PKSimConstants.RibbonPages` defines exactly: `File`, `Working Journal`, `Modeling`, `Utilities`, `Import/Export`, `Import`, `Export`, `Run & Analyze`, `Analyze`, `Views`. **There is no "Modeling & Simulation" ribbon page in PK-Sim.** The correct tab is **Modeling** — which is what the sibling page `part-3/pk-sim-creating-individuals.md` correctly says.

## [part-3/pk-sim-simulations.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-3/pk-sim-simulations.md)

* [ ] **[ERROR]** Same wrong ribbon-tab name in three places: "Press the **Run** simulation button in the **Modeling & Simulation** ribbon" (`:243`), "clicking on **Run** in the **Modeling & Simulation** ribbon" (`:266`), "click the **Run** simulation button … in the **Modeling & Simulation** group" (`:388`). Per `PKSimConstants.RibbonPages`, the **Run** command lives on the **`Run & Analyze`** ribbon page, not on "Modeling & Simulation" (which does not exist).

## [part-3/pk-sim-expression-profile.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-3/pk-sim-expression-profile.md)

* [ ] **[ERROR]** Count/content mismatch: the section "Localizations, directions, and initial concentrations of transport proteins" states *"Four transport directions can be specified"* and then lists **five** bullets (Influx, Efflux, Bi-directional, Plasma to interstitial space, Interstitial space to plasma). The count "four" corresponds to the *transport type* set used by `PKSim.Core/Model/TransportDirection.cs` (`TransportType.Influx`, `Efflux`, `BiDirectional`, `PgpLike`), not to the bullets given.
* [ ] **[ERROR]** The same file later states the UI offers only **Efflux / Influx / Bi-Directional** (plus deprecated **Pgp-like**), contradicting the five-bullet list above. Against `TransportDirections` in `TransportDirection.cs`, the *directions* actually offered are **container-dependent**: `PLASMA_DIRECTIONS` and `BLOOD_CELLS_DIRECTIONS` have 3 members each (Influx / Efflux / Bi-directional, no Pgp), while `MUCOSA_DIRECTIONS`, `TISSUE_DIRECTIONS`, `BRAIN_TISSUE_DIRECTIONS` and `BRAIN_BBB_DIRECTIONS` have 4 (including a Pgp variant). Neither the "four" count nor the flat three/four-item list is correct.
* [ ] **[GAP]** `TransportDirectionId` additionally defines `ExcretionKidney` and `ExcretionLiver`, and dedicated blood-cell, mucosa, brain-tissue and blood–brain-barrier direction sets. None of these are documented.
* [ ] **[GAP]** Pgp-like is described as "deprecated", but `TransportType.PgpLike` is still a live branch in every `Default…DirectionFor` switch in `TransportDirection.cs`; the manual gives no statement of what "deprecated" means operationally (still selectable? read-only for legacy projects?).
* [ ] **[OUTDATED]** The page links to the **v12.0** release tag of the OSP PBPK Model Library and says "As of August 2025" in a v13 manual.

## [part-3/pk-sim-events.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-3/pk-sim-events.md)

* [ ] **[MINOR]** "Saving Events as Templates" reads "To load an existing **formulation** from the template database" — should read "event" (copy-paste from `pk-sim-formulations.md`).

## [part-3/pk-sim-formulations.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-3/pk-sim-formulations.md)

* [ ] **[GAP]** Still lists only the pre-v13 formulation types. The v13 additions announced in `NEWS.md:117-122` — the three diffusion-layer-thickness options (Constant / Hintz–Johnson / Hydrodynamic) and the **P-PSD** formulation input — are absent.

## [part-3/pk-sim-administration-protocols.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-3/pk-sim-administration-protocols.md)

* [ ] **[GAP]** The v13 feature *Events in administration protocols* (`NEWS.md:155,159`) is not documented: the page's only v13 content is the `No formulation` path change, and the word "event" occurs only in the path examples at `:53-59`. `CoreConstants.NoFormulation = "No formulation"` confirms the display name used in the page is correct.

## [part-3/pk-sim-compounds-definition-and-work-flow.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-3/pk-sim-compounds-definition-and-work-flow.md)

* [ ] **[ERROR]** Missing citation link: `:244` contains the bare text "…literature data were used 68." instead of `[[68]](../references.md#68)`.
* [ ] **[GAP]** The v13 Compound parameter groups **"Advanced Intestinal Solubility"** and **"Bile Salt Micelle Partitioning"** (`NEWS.md:141`) are not documented.
* [ ] **[GAP]** The v13 **Overwrite Parameter Sets** tab (`NEWS.md:12, 177-199`) is not documented; the page still ends at the "Advanced Parameters tab".

## [part-3/pk-sim-command-line-interface.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-3/pk-sim-command-line-interface.md)

* [ ] **[MINOR]** `part-3/pk-sim-command-line-interface.md:141,145` use unversioned `docs.open-systems-pharmacology.org/…` links that bypass the v13 namespace.

---

# 5. Part 4 — MoBi

## [part-4/mobi-command-line-interface.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-4/mobi-command-line-interface.md)

Verified against `MoBi.CLI/Program.cs`, `MoBi.CLI/Commands/CLICommand.cs`, `SnapshotRunCommand.cs`, `QualificationRunCommand.cs`.

* [ ] **[GAP]** The `--cores` option is **not documented**. Declared on `MoBi.CLI/Commands/CLICommand.cs`, so it applies to both verbs.
* [ ] **[GAP]** The `snap` verb has a long-only option **`--pksim`** (path of the PK-Sim installation folder) that is not documented. Without it, snapshot conversion of MoBi projects that reference PK-Sim modules relies on the registry lookup, which fails for portable installations.

## [part-4/setting-up-simulation.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-4/setting-up-simulation.md)

* [ ] **[ERROR]** Ribbon page named **"Modelling"** (British spelling) in two places: "the **Create** group of the **Modelling** ribbon" (`:27`) and "the **Simulation Settings** group in the **Modelling** ribbon" (`:193`). `MoBi.Assets/AppConstants.RibbonPages` defines the page as **`"Modeling"`** (American spelling). The rendered string in MoBi will not match the manual.

## [part-4/example-workflows.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-4/example-workflows.md)

* [ ] **[ERROR]** Ribbon tab named **"Modeling & Simulation"** (`:234`: "**Create** in the *Simulation* Group the *Modeling & Simulation* ribbon tab"). `AppConstants.RibbonPages` for MoBi defines: `File`, `Modeling`, `Working Journal`, `Import/Export`, `Utilities`, the `Edit <BuildingBlock>` dynamic pages, `Run & Analyze`, `Views`, `Parameter Identification`. **There is no "Modeling & Simulation" ribbon page in MoBi.**

# 6. Part 5 — Shared Tools

## [part-5/default-display-base-units.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-5/default-display-base-units.md)

* [ ] **[MINOR]** The page contains no dimension/unit table; it only states "You find an overview of all dimensions with their base units in the appendix." The table that must be audited lives in `appendix.md` (see §1) and is generated by `R/get-dimensions-and-units.R`.
* [ ] **[MINOR]** Unverifiable claim tied to a very old release: "The base units are consistent since version 3.2.1 … please refer to 'Conversion of MoBi® 3.1 projects in MoBi® 3.2'". The referenced document is named in plain text with no link and does not exist in this repository (`:33`).

## [part-5/chart-component.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-5/chart-component.md)

* [ ] **[MINOR]** Menu-item caption case does not match the source: the page writes "Edit options for selected"; `OSPSuite.Assets/UIConstants.cs:207` defines `EditAllCurvesProperties = "Edit Options for Selected"` (`:128`).
* [ ] **[MINOR]** "a new context menu item **has been added** called …" is release-note phrasing in reference documentation and gives no version (`:128`).
* [ ] **[MINOR]** Inconsistent tab naming within the page: the introduction calls the tab **Curves and Axis Options** (`:13`), the "Editing options of multiple curves" section calls it "Curves and Axis Settings" (`:128`).
* [ ] **[MINOR]** Cross-reference by title rather than link: "…is explained in 'Using Alternative X-Values'" (`:87`), while the same target is linked properly at `:326`.
* [ ] **[MINOR]** Garbled sentence in the axes table, "Default" row: "Curves added to a y-axis get this linestyle by default. This way, Linestyle in the chart, curves can be easily correlated with their y-axes." — the column name has been spliced into the sentence (`:206`).
* [ ] **[MINOR]** Typos: "To make you legends clear and readable" (should be "your") (`:173`).

## [part-5/qualification.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-5/qualification.md)

Verified against `schemas/OSP_Qualification_Plan_Schema.json` (`QualificationPlan`, `main`) and `QualificationRunner` (`develop`).

* [ ] **[OUTDATED]** `:60` states *"Currently, only PK-Sim projects are supported. MoBi projects will be supported in the mid-term future."* This is no longer true. The schema defines `Projects[].Application` with `enum: ["PKSim", "MoBi"]`, and `QualificationRunner` exposes `-m/--mobi` (`QualificationRunCommand.cs`) backed by `QualificationRunOptions.MoBiInstallationFolder`. MoBi projects **are** supported.
* [ ] **[ERROR]** The `Symbol` list at `:341` — "*Asterisk*, *Circle*, *Cross*, *Diamond*, *Point*, *Square*, *Triangle*" — does not match `definitions/symbolType`, which allows **21** values: `Circle, Square, Diamond, Asterisk, Cross, Triangle, InvertedTriangle, Plus, Star, Pentagon, Hexagon, ThinCross, ThinPlus, CircleOpen, DiamondOpen, HexagonOpen, InvertedTriangleOpen, PentagonOpen, SquareOpen, StarOpen, TriangleOpen`. In particular **`Point` is documented but is not a valid schema value**, and 15 valid values are undocumented.
* [ ] **[GAP]** The building-block/simulation `Type` list at `:216` omits **`ExpressionProfile`**. The schema's `buildingBlockOrSimulationType` is `buildingBlockType` (which includes `ExpressionProfile`) plus `Simulation`. The list at `:75` correctly includes it, so the two lists in the same file disagree.
* [ ] **[GAP]** The QualificationRunner **command-line options are documented nowhere in the manual** — the page only says where to download the tool (`:694-699`). The implemented options (`QualificationRunner/Commands/QualificationRunCommand.cs` + `CLICommand.cs`) are:

  | Option | Required | Meaning |
  | --- | --- | --- |
  | `-i, --input` | yes | JSON qualification configuration file |
  | `-o, --output` | yes | Output folder for the generated workflow files |
  | `-f, --force` | no | Delete the output folder even if it is not empty (default `false`) |
  | `-n, --name` | no | Name of the generated report qualification plan |
  | `-p, --pksim` | no | PK-Sim installation folder (else read from registry) |
  | `-m, --mobi` | no | MoBi installation folder (else read from registry) |
  | `--norun` | no | Bypass running the simulations (default `false`, i.e. simulations *are* run) |
  | `-e, --exp` | no | Also export the project files (snapshot and PK-Sim project) |
  | `-c, --cores` | no | Max. concurrent PK-Sim/MoBi CLI processes (default: logical processors) |
  | `-l, --log` | no | Log file full path |
  | `--logLevel` | no | `Debug`/`Information`/`Warning`/`Error`, default `Information` |

* [ ] **[GAP]** The schema constrains several enumerations that the page never lists: `timeUnit` (`s, min, h, day(s), week(s), month(s), year(s)`), `ageUnit`, `amountUnit`, `massUnit`, `concentrationMassUnit`, `concentrationMolarUnit`, `fractionUnit` (`""`/`%`), `dimensionAndUnit.Dimension` (`Age, Amount, Concentration (mass), Concentration (molar), Fraction, Mass, Time, Dimensionless`), `axis.Scaling` (`Linear`/`Log`) and `plotSettings.Fonts.FontFamilyName` (`Arial, Tahoma, Times New Roman, Microsoft Sans Serif`). Authors currently have to read the schema to discover these.
* [ ] **[MINOR]** Broken anchor at `:24`: `…/importing-exporting-project-data-models#exporting-project-to-snapshot-loading-project-from-snapshot`. The target heading is "Exporting Project to Snapshot / Loading Project from Snapshot", whose slug needs a **double** dash (`…snapshot--loading…`), as used correctly in `part-2/modules-philsophy-building-blocks.md:72`.
* [ ] **[MINOR]** Property naming inconsistent between prose and examples: the DDIRatioPlots and PKRatioPlots bullets say "**PKParameter**" / "**PKParameter**s" while the JSON examples and the schema use `PKParameters` (`:468, :547` vs `:431, :527`).
* [ ] **[MINOR]** The AxesSettings JSON example is not valid JSON as printed: trailing comma after the `ComparisonTimeProfile` array and no closing brace (`:239-257`).
* [ ] **[MINOR]** Several examples are truncated mid-structure (`GOFMergedPlots`, `ComparisonTimeProfilePlots`, `PKRatioPlots` at `:283-301, :379-396, :523-541`); two use indented rather than fenced `json` blocks.
* [ ] **[MINOR]** Version-pinned external example links that will drift: the `v11.0` tag of `OSP-Qualification-Reports` (`:498`) and fixed commit SHAs for observed-data examples (`:125, :129`).
* [ ] **[MINOR]** Multiple H1 headings in one page (`:1, :41, :599, :690`).

## [part-5/parameter-identification.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-5/parameter-identification.md)

* [ ] **[ERROR]** Duplicated, self-contradicting content block in "Simple Example": the instruction "Switch to the next tab **Parameters** … a list of all parameters grouped by …" appears twice in the same numbered step, first grouped by "**Simulation** and **Organ**", then by "**Organ** and **Name**" (`:76` and `:84`).
* [ ] **[ERROR]** Duplicated paragraph pair in "Defining Identification Parameters": the **Start Value** paragraph and the following **Scaling** paragraph are repeated verbatim, the second copy differing only by the added clause "which requires a **Minimum Value** > 0" (`:192-194` and `:196-198`).
* [ ] **[MINOR]** Broken sentence, missing closing parenthesis: "You can find it under Utilities/ Options (both PK-Sim and MoBi" (`:295`).
* [ ] **[MINOR]** "Configure Optimization" is `##` while the sibling workflow steps are `###`, breaking the "Overview of the workflow" chapter in two (`:53` vs `:29, :41, :45, :49, :57, :61`).
* [ ] **[MINOR]** Numbered list restarts at `1.` mid-sequence, so the rendered numbering does not match the "2., 3., 4., 5." references used later in the same section (`:71-72` vs `:76`).
* [ ] **[MINOR]** The "Predicted vs. Observed" subsection embeds three `part-3` images (`AddDeviationLines.png`, `DeviationLineDialog.png`, `TwoFoldDeviationLine.png`); the files exist, but the deviation-lines feature is documented in two places with shared assets.

## [part-5/history-manager-history-reporting.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-5/history-manager-history-reporting.md)

* [ ] **[ERROR]** Ribbon name wrong in four places: `"Modeling & Simulation" ribbon` at `:9, :69, :77, :81`. Neither `PKSimConstants.RibbonPages` nor `AppConstants.RibbonPages` (MoBi) defines such a page; the ribbon is **`Modeling`** (with `Run & Analyze` for run/analyze commands).

# 7. Part 6 — Working with R

## [part-6/introduction-ospsuite-r.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-6/introduction-ospsuite-r.md)

* [ ] **[GAP]** The page contains no R function names, arguments, or code examples — it is a four-link stub pointing at the pkgdown site. Nothing in the manual documents `loadSimulation`, `getMolecule`, `runSimulations`, `calculatePKAnalyses`, `DataCombined`, etc., although the TOC section is titled "Working with R" (`SUMMARY.md:90-94`).
* [ ] **[MINOR]** Package name rendered inconsistently: the heading and prose use "ospsuite-R", but the R package is `ospsuite` (repository `OSPSuite-R`) (`:1,3,9`).
* [ ] **[GAP]** No R version requirement is stated anywhere in part-6, so `part-2/getting-started.md`'s "R version 4.1 or higher" has no in-repo corroboration.

## [part-6/reporting-engine.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-6/reporting-engine.md)

* [ ] **[GAP]** No workflow class names (`MeanModelWorkflow`, `PopulationWorkflow`), task names or plot-configuration names are mentioned. The page is a three-link stub, so none of `OSPSuite.ReportingEngine`'s exported API is documented in the manual.
* [ ] **[MINOR]** Mentions *Qualification Reports* as the motivating use case but does not cross-link to `part-5/qualification.md`.

---

# 8. Part 7 — Best Practices

## [part-7/documentation.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-7/documentation.md)

* [ ] **[MINOR]** Anchors `../references.md#123` and `#125` target headings containing a trailing HTML comment, so the generated anchor may not be exactly `123`/`125` (`:18,20,22`).
* [ ] **[MINOR]** "the journal function in OSP" is described but not linked to `part-5/working-journal.md`.
* [ ] **[MINOR]** Stray double space / dangling sentence: "…is also provided ." (`:5`).

## [part-7/model-development.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-7/model-development.md)

* [ ] **[OUTDATED]** Cross-references use section numbers that do not exist in the current structure: "Sections '3. Model Evaluation' and '4. Model Applications'". Part 7 has no numbered sections and there is no page named "Model Applications" — the corresponding page is "Application Simulation" (`:9`).
* [ ] **[MINOR]** Both cross-references to "Model Evaluation" are plain text rather than links to `model-evaluation.md` (`:9,10`).
* [ ] **[MINOR]** Citation/description mismatch: the "Distribution" bullet claims `[[161]]`–`[[164]]` "provide the state of art of mechanistic calculation of steady state tissue:plasma partition coefficients", but `[[161]]` is Poulin et al. 2011, a dataset/benchmark paper (`:38-39`).
* [ ] **[MINOR]** Typo "QSA/PR" (should be QSAR/QSPR; "QSPR models" is used correctly two lines later) (`:7` vs `:20`).
* [ ] **[MINOR]** "adopted from" (should be "adapted from"), "Figure1" missing space (`:12,16`).

## [part-7/model-evaluation.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-7/model-evaluation.md)

* [ ] **[MINOR]** The same Kuemmel et al. paper is cited under two numbers with two different characterisations: `[[151]]` here, `[[137]]` in `application-simulation.md`.
* [ ] **[MINOR]** "Standards for Model Evaluation Metrics `[[139]],[[143]]`" cites Loisios-Konstantinidis (naproxen virtual bioequivalence) and Rimmler (cefuroxime prophylaxis); neither is a standards/metrics paper (`:26`).
* [ ] **[MINOR]** Bare (unbracketed) external URLs that bypass the repo's link conventions and are stale-prone (`:31,36`), and a legacy NCBI URL form `https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6966181/` that now redirects (`:16`).
* [ ] **[MINOR]** Broken ordered-list numbering in items 3.x and 4.x (`:19-25, :31-36`).

## [part-7/application-simulation.md](https://github.com/Open-Systems-Pharmacology/docs/blob/v13/part-7/application-simulation.md)

* [ ] **[ERROR]** Citation/description mismatch: the text describes `[[145]]` as "a comprehensive workflow of DDI module in PK-Sim … compiled as one comprehensive reference manual". Reference 145 is Türk, Hanke, Lehr (2020), *"A Physiologically-Based Pharmacokinetic Model of Trimethoprim for MATE1, OCT1, OCT2, and CYP2C8 Drug–Drug–Gene Interaction Predictions"* — a single-compound DDGI model, not a DDI-module workflow paper (`:8`).
* [ ] **[MINOR]** The pregnancy bullet says "These manuscripts provide overview…" (plural) but cites only `[[132]]`; the companion papers exist unnumbered in `references.md:327` and `:333`.
* [ ] **[MINOR]** "Organ Impairment" appears twice — as a sub-bullet under "Special Populations" and again as a top-level bullet (`:9,15`).
* [ ] **[MINOR]** Reference `[[137]]` and its full descriptive sentence are duplicated verbatim (`:26` and `:38`).
* [ ] **[MINOR]** Missing space after full stop: "…this tool.It also summarize…" (`:25`).

---

# 9. Cross-cutting issues

## 9.1 Ribbon page names (highest-impact class of errors)

Neither PK-Sim nor MoBi has a ribbon page called **"Modeling & Simulation"** or **"Modelling"**. Authoritative sets:

* **PK-Sim** (`PKSim.Assets/PKSimConstants.RibbonPages`): `File`, `Working Journal`, `Modeling`, `Utilities`, `Import/Export`, `Import`, `Export`, `Run & Analyze`, `Analyze`, `Views`.
* **MoBi** (`MoBi.Assets/AppConstants.RibbonPages`): `File`, `Modeling`, `Working Journal`, `Import/Export`, `Utilities`, `Edit Molecule`, `Edit Reaction`, `Edit Spatial Structure`, `Edit Passive Transport`, `Edit Observer`, `Edit Event`, `Edit Initial Conditions`, `Edit Parameter Values`, `Run & Analyze`, `Views`, `Parameter Identification`.

Affected locations: `part-3/pk-sim-creating-populations.md:31`; `part-3/pk-sim-simulations.md:243, 266, 388`; `part-4/example-workflows.md:234`; `part-4/setting-up-simulation.md:27, 193`; `part-5/history-manager-history-reporting.md:9, 69, 77, 81`.

## 9.2 Undocumented `--cores`

`--cores` exists on **every** CLI in the suite and is documented on **none** of them: PK-Sim (all four verbs, `PKSim.CLI/Commands/CLICommand.cs`), MoBi (both verbs, `MoBi.CLI/Commands/CLICommand.cs`), QualificationRunner (`-c, --cores`).

## 9.3 Unversioned documentation links

`part-2/getting-started.md:51,53`, `part-3/pk-sim-command-line-interface.md:141,145` and `part-5/qualification.md:125,377` use `https://docs.open-systems-pharmacology.org/<path>` without the `/v13/` segment, so from the v13 manual they resolve to whatever version is currently the published default. `NEWS.md` was partially converted to versioned links by commit `60e9f80`; the rest of the manual was not.

## 9.4 v13 features announced but not documented

| Feature (`NEWS.md`) | Expected location | Status |
| --- | --- | --- |
| Compound Overwrite Parameter Sets | `part-3/pk-sim-compounds-definition-and-work-flow.md` | absent |
| Advanced Intestinal Solubility / Bile Salt Micelle Partitioning | `part-3/pk-sim-compounds-definition-and-work-flow.md` | absent |
| Diffusion layer thickness options, P-PSD | `part-3/pk-sim-formulations.md` | absent |
| Events in administration protocols | `part-3/pk-sim-administration-protocols.md` | absent |
| MoBi R interface package | `part-2/modules-philsophy-building-blocks.md`, `part-6/` | absent |
| MoBi CLI | `part-2/modules-philsophy-building-blocks.md:49` | page exists, but part-2 still says CLI is PK-Sim-only |
| .NET 10 | `part-2/getting-started.md` requirements table | absent |
| `Kd (FcRn) of <container>` rename | `part-1/modeling-concepts-modeling-of-proteins.md` | absent |
