# OSP Suite Documentation Audit — `docs` branch `v13`

Audit of the documentation in the `v13` branch of `Open-Systems-Pharmacology/docs` against the current implementation of the upstream repositories.

## Scope

| # | Repository | Branch | Scope audited |
|---|---|---|---|
| 1 | `PK-Sim` | `develop` | `src` |
| 2 | `MoBi` | `develop` | `src` |
| 3 | `OSPSuite.Core` | `develop` | `src` |
| 4 | `InstallationValidator` | `develop` | `src` |
| 5 | `QualificationRunner` | `develop` | `src` |
| 6 | `OSPSuite.ReportingEngine` | `main` | `R`, `DESCRIPTION` |
| 7 | `QualificationPlan` | `main` | `schemas/OSP_Qualification_Plan_Schema.json` |
| 8 | `OSPSuite.Dimensions` | `master` | `OSPSuite.Dimensions.xml` |

Supporting repositories consulted where the docs reference them: `OSPSuite-R` (`develop`), `TLF-Library` (`develop`).

**Screenshots were explicitly excluded from this audit** at the requester's instruction.

## Legend

| Tag | Meaning |
|---|---|
| **[Outdated]** | Documented behaviour no longer matches the implementation |
| **[Missing]** | Implemented feature/option/value not documented |
| **[Incorrect]** | Documented value is factually wrong |
| **[Internal]** | Inconsistency within the documentation itself (broken link, contradiction, typo) |
| **[Gap]** | Whole area of the implementation has no documentation |

Findings marked *(verified)* were confirmed by reading the upstream source. Findings marked *(unverified)* are documentation-internal observations that could not be tied to a specific upstream artefact.

## Summary of the most significant findings

1. `part-5/qualification.md` states that only PK-Sim projects are supported by qualification plans. The current schema and the Qualification Runner both support **MoBi** projects (`Projects[].Application: "MoBi"`, `Inputs[].PKSimModule`, `qualificationrunner -m/--mobi`). **(verified)**
2. The **Qualification Runner command line is completely undocumented** — the docs only explain how to download and unzip it. **(verified)**
3. The `Symbol` enumeration in `part-5/qualification.md` lists 7 values including `Point`, which is **not** a valid value; the schema defines 21 values. **(verified)**
4. `PKParameters` in DDI-Ratio and PK-Ratio plots is documented as a subset of `{AUC, CMAX}` / `{AUC, CL}`; the schema allows **32** PK parameters. **(verified)**
5. The `--cores` CLI option exists in both the PK-Sim and MoBi CLI and is documented in neither. **(verified)**
6. `part-2/modules-philsophy-building-blocks.md` still uses the **v12 building-block names** *Molecule Start Values* / *Parameter Start Values*. **(verified)**
7. Four dimensions present in `OSPSuite.Dimensions.xml` are missing from the Appendix A.1 table. **(verified)**
8. `part-6` consists of three pure link stubs; the R ecosystem has grown substantially (`ospsuite.plots`, `ospsuite.utils`, `rSharp`, MoBi R interface) with no coverage. **(verified)**

---

# 1. Root-level pages

## 1.1 `README.md`

- **[Internal]** The page is a short landing page and contains no version statement. Nothing in it could be contradicted by the upstream code. *(unverified)*

## 1.2 `SUMMARY.md`

- **[Internal]** `core-separator.md` exists in the repository but is not referenced anywhere in `SUMMARY.md`, so it is orphaned from the rendered book. *(unverified)*
- **[Missing]** There is no table-of-contents entry for the **Qualification Runner** or the **Installation Validator** as tools in their own right, even though both are shipped, separately installable components with their own command lines. *(verified — see §5.8 and §1.5)*

## 1.3 `NEWS.md`

- **[Internal]** 14 unresolved `TODO (screenshot)` placeholders remain in the file. These are visible in the rendered documentation. *(unverified)*
- **[Internal]** The release notes announce features (PBBM workflow, *Overwrite Parameter Sets*, protocol-driven events) for which **no corresponding chapter content exists in Part 3**. Either the features are described only in the release notes or the Part 3 chapters were not updated. *(unverified)*
- **[Internal]** Relative documentation links were converted to absolute links (commit `60e9f80`); a small number of anchors in this file still point at headings that no longer exist in the target pages. *(unverified)*

## 1.4 `appendix.md`

Verified line-by-line against `OSPSuite.Dimensions/master/OSPSuite.Dimensions.xml` (94 `<Dimension>` entries) by parsing the XML and diffing the A.1 table.

- **Good news:** all 90 dimensions listed in the table have the **correct base unit and correct default display unit**. There are **zero mismatches** and **zero dimensions listed that no longer exist**.
- **[Missing]** Four dimensions defined in `OSPSuite.Dimensions.xml` are absent from the A.1 table: *(verified)*

  | Dimension | Base unit | Default display unit |
  |---|---|---|
  | `Amount per area` | `µmol/dm²` | `µmol/cm²` |
  | `Amount per area per time` | `µmol/dm²/min` | `µmol/cm²/h` |
  | `Area per amount per time` | `dm²/µmol/min` | `dm²/µmol/min` |
  | `Inversed area` | `1/dm²` | `1/cm²` |

- **[Internal]** The table header reads *"Deviating default display unit"*, but the column is in fact filled for **every** row, including all the rows where the default display unit equals the base unit (e.g. `Amount | µmol | µmol`). Either the header or the content should be corrected.
- **[Internal]** The `Fraction` row has two empty cells (`Fraction |  |`). This is *technically correct* — `<Dimension name="Fraction" baseUnit="">` genuinely has the empty string as its base unit — but it renders as a defect. A footnote explaining that the base unit of `Fraction` is dimensionless would resolve this. *(verified)*

## 1.5 `factsheet.md`

- **[Outdated]** The list of pre-parameterized organisms is *Human, Monkey, Dog (beagle and mongrale), Minipig, Rat, Mouse, Rabbit*. `PKSim.Core/CoreConstants.Species` defines `HUMAN, RAT, MOUSE, RABBIT, CAT, CATTLE, BEAGLE, MINIPIG`. **`Cat` and `Cattle` are missing from the fact sheet.** *(verified)*
- **[Incorrect]** "mongrale" is a misspelling of "mongrel". *(verified)*
- **[Incorrect]** The fact sheet nests *beagle* under *Dog*, whereas PK-Sim treats `Beagle` as its own species constant. *(verified)*
- **[Outdated]** The protein-expression section cites **UniGene** (`https://ftp.ncbi.nlm.nih.gov/repository/UniGene/`) and **ArrayExpress** (`http://www.ebi.ac.uk/microarray-as/ae/`). UniGene was retired by NCBI in 2019 and the quoted ArrayExpress URL no longer resolves (ArrayExpress moved into BioStudies). *(unverified — external services)*
- **[Incorrect]** "PK-Sim 2003" appears where "PK-Sim Standard" is meant. *(unverified)*
- **[Incorrect]** "Berezhkovsky" is misspelled (correct: *Berezhkovskiy*). *(unverified)*

## 1.6 `references.md`

- No implementation-derived findings. Reference `[122]` (CKD disease state) is correctly resolved from `part-3/pk-sim-creating-individuals.md`.

## 1.7 `how-to-cite.md`, `how-to-contribute.md`, `copyright.md`

- No implementation-derived findings.

## 1.8 `core-separator.md`

- **[Internal]** Not referenced from `SUMMARY.md` (see §1.2).

## 1.9 `R/get-dimensions-and-units.R`

- **[Internal]** The script uses the `%||%` operator without loading `rlang` (or requiring R ≥ 4.4, where `%||%` became a base function). On older R it will fail. *(unverified)*
- **[Outdated]** The script generates the Appendix A.1 table from `system.file("lib", "OSPSuite.Dimensions.xml", package = "ospsuite")`. Since the generated table is 4 dimensions short of the current XML (§1.4), the script output committed to `appendix.md` predates the current `OSPSuite.Dimensions` master. *(verified)*

---

# 2. Part 1 — Modeling concepts

Part 1 is conceptual/scientific background. It describes PBPK theory rather than software behaviour, so almost nothing in it is directly falsifiable against the source repositories.

## 2.1 `part-1/principles-of-pbpk-modeling.md`

- No implementation-derived findings.

## 2.2 `part-1/modeling-concepts-pbpk-modeling-systems-biology.md`

- No implementation-derived findings.

## 2.3 `part-1/modeling-concepts-pk-and-pd-modeling.md`

- No implementation-derived findings.

## 2.4 `part-1/modeling-concepts-pd-and-reaction-network-modeling.md`

- No implementation-derived findings.

## 2.5 `part-1/modeling-concepts-expression-data-for-pbpk-modeling.md`

- **[Outdated]** As in `factsheet.md`, the described expression-data sources (UniGene, ArrayExpress) are retired external services. *(unverified)*

## 2.6 `part-1/modeling-concepts-modeling-of-proteins.md`

- No implementation-derived findings.

---

# 3. Part 2 — Getting started and philosophy

## 3.1 `part-2/getting-started.md`

- **[Outdated]** Line 57: *"interfaces are available for MS Excel®, Matlab®, and R. For purchasing and installation options, please contact the suppliers indicated in the section 'Trademark information.'"* The OSP Suite is fully open source; there are no suppliers to contact and no commercial interfaces to purchase. The MoBi Toolbox for MATLAB is no longer part of the current suite offering. *(verified — no MATLAB toolbox component in the current `MoBi/develop/src` tree)*
- **[Outdated]** The installer example is pinned to version `12.0.397`, which is a v12 build number in a v13 branch. *(unverified)*
- **[Missing]** No mention of the **Installation Validator** as a post-install step, even though `part-2/modules-philsophy-building-blocks.md` introduces it as a tool. *(verified)*

## 3.2 `part-2/modules-philsophy-building-blocks.md`

This is the highest-density page of terminology defects in the documentation.

- **[Outdated]** The MoBi building-block list reads *"Molecules, Reactions, Spatial Structures, Passive Transports, Observers, Events, **Molecule Start Values, Parameter Start Values**, and Observed Data."* In v13 these building blocks were renamed. `MoBi.Assets/AppConstants.cs` contains **0** occurrences of `MoleculeStartValues`/`ParameterStartValues` and **22** occurrences each of `InitialConditions` and `ParameterValues`. The correct v13 names are **Initial Conditions** and **Parameter Values**. *(verified)*
- **[Missing]** The MoBi building-block list omits **Expression Profiles**, which is a first-class MoBi building block in v13 (`ExpressionProfile` appears 9× in `MoBi.Assets/AppConstants.cs`, and the repo contains `part-4/expression-profiles-bb.md`). *(verified)*
- **[Missing]** The PK-Sim building-block list (*Individuals, Populations, Compounds, Formulations, Administration Protocols, Events, Observers, Observed Data*) omits **Expression Profiles**, which is a PK-Sim building block in v13 and has its own chapter `part-3/pk-sim-expression-profile.md`. *(verified)*
- **[Outdated]** The species list *"(mouse, rat, minipig, dog, monkey, and rabbit)"* omits **Cat** and **Cattle**, both of which are defined in `PKSim.Core/CoreConstants.Species`. *(verified)*
- **[Incomplete]** The *Command-Line Interface* bullet says the CLI *"allows batch processing of multiple projects in PK-Sim"* and links only to `part-3/pk-sim-command-line-interface.md`. **MoBi also ships a CLI** (`MoBi/develop/src/MoBi.CLI`, documented in `part-4/mobi-command-line-interface.md`), and the **Qualification Runner** is a third command-line tool. *(verified)*
- **[Missing]** The R-package list covers `ospsuite`, `tlf`, `ospsuite.reportingengine` and `ospsuite.parameteridentification` but omits **`ospsuite.plots`** and **`ospsuite.utils`**, which are now direct `Imports` of `ospsuite` (`ospsuite.plots >= 1.3.0`, `ospsuite.utils >= 1.10.0`). *(verified)*
- **[Missing]** No mention of **`rSharp`**, which replaced `rClr` as the .NET bridge and is now a hard dependency of both `ospsuite` and `ospsuite.reportingengine`. This is a breaking installation change for readers coming from v12. *(verified)*
- **[Outdated]** The Installation Validator bullet is the only mention of that tool in the entire documentation. *(verified)*

---

# 4. Part 3 — Working with PK-Sim®

## 4.1 `part-3/pk-sim-quick-guide.md`

- No implementation-derived findings established. Verification of the guided workflow against the current PK-Sim UI was not completed.

## 4.2 `part-3/pk-sim-projects.md`

- No implementation-derived findings established.

## 4.3 `part-3/pk-sim-creating-individuals.md`

- **[Outdated]** The species drop-down list is documented as ten entries: *Human, Monkey, Beagle, Dog, Minipig, Rat, Mouse, Rabbit, Cat, Cattle*. `PKSim.Core/CoreConstants.Species` defines exactly eight constants: `HUMAN, RAT, MOUSE, RABBIT, CAT, CATTLE, BEAGLE, MINIPIG` — **`Monkey` and `Dog` are not among them**. The species catalogue is ultimately held in the PK-Sim database rather than in the constants class, so this needs confirmation against the shipped database, but the discrepancy should be checked: if `Monkey`/`Dog` are still offered, the constants class is incomplete; if they are not, the docs list two species that no longer exist. *(partially verified)*
- **[Internal]** Line 95 repeats a reduced animal-species list — *"Monkey, Beagle, Dog, Minipig, Rat or Mouse"* — which contradicts the ten-entry list 60 lines earlier by omitting **Rabbit, Cat and Cattle**. Whichever list is right, the two lists inside the same file disagree. *(verified — internal contradiction)*
- **[Internal]** The breed-specific notes below line 104 describe only monkey, dog, minipig and rat. No guidance is given for the `Cat`, `Cattle` or `Rabbit` species. *(verified)*
- The **Disease State / Chronic Kidney Disease** section is present and cites reference `[122]`; this matches the v13 feature set.

## 4.4 `part-3/pk-sim-creating-populations.md`

- No implementation-derived findings established.

## 4.5 `part-3/pk-sim-expression-profile.md`

- **[Internal]** This chapter exists, but `part-2/modules-philsophy-building-blocks.md` does not list Expression Profiles as a PK-Sim building block (see §3.2). *(verified)*

## 4.6 `part-3/pk-sim-compounds-definition-and-work-flow.md`

- No implementation-derived findings established.

## 4.7 `part-3/pk-sim-compounds-defining-inhibition-induction-processes.md`

- No implementation-derived findings established. `PKSim.Core/CoreConstants.ProcessClasses` defines `ENZYMATIC, INHIBITION, INDUCTION, NONE, SPECIFIC_BINDING, TRANSPORT`, consistent with the chapter structure. *(verified)*

## 4.8 `part-3/pk-sim-formulations.md`

- No implementation-derived findings established.

## 4.9 `part-3/pk-sim-administration-protocols.md`

- No implementation-derived findings established.

## 4.10 `part-3/pk-sim-events.md`

- No implementation-derived findings established.

## 4.11 `part-3/pk-sim-simulations.md`

- No implementation-derived findings established.

## 4.12 `part-3/pk-sim-options.md`

- No implementation-derived findings established. The *"Warn for non-finite quantities"* option was documented in commit `34258cb` and is current.

## 4.13 `part-3/importing-exporting-project-data-models.md`

- No implementation-derived findings established.

## 4.14 `part-3/conversion-projects-from-previous-version.md`

- No implementation-derived findings established.

## 4.15 `part-3/pk-sim-command-line-interface.md`

Fully verified against `PK-Sim/develop/src/PKSim.CLI`.

**Confirmed accurate:**
- `Program.cs` registers exactly four verbs: `JsonRunCommand` (`run`), `SnapshotRunCommand` (`snap`), `ExportRunCommand` (`export`), `QualificationRunCommand` (`qualification`). The documented verb list is complete and correct.
- `run`: `-i/--input` (required), `-o/--output` (required), `--forAll` (default `false`) — all correct.
- `snap`: `-i`, `-o`, `-s/--snapshot`, `-p/--project` — all correct.
- `export`: `-p/--project` (required), `-o/--output` (required), `-s/--simulations`, `-r/--run` (default `false`) — all correct.
- `qualification`: `-i/--input` (required), `-v/--validate`, `-r/--run`, `-e/--exp` — all correct.
- Export-format flags on `run`/`export`: `-c/--csv`, `-x/--xml`, `-j/--json`, `-k/--pkml`, `-e/--excel`. The note that JSON and Excel export are *"individual simulations only"* matches the source help text `"Available for individual simulation only"`.
- Exit codes `0` / non-zero — correct (`ExitCodes.Success = 0`, `ExitCodes.Error = 1`).

**Findings:**
- **[Missing]** The `--cores` option is not documented for any verb. It is declared on the shared CLI base command and applied in `Program.cs` via `command.ApplyCoresTo(IoC.Resolve<ICoreUserSettings>())`. Help text: *"Optional. Maximum number of cores (1 or more) to use for parallel work such as model construction and simulation runs. Default is the number of processors minus one."* This is a performance-relevant option for exactly the batch workloads this page is about. *(verified)*
- **[Incorrect]** `-l, --log` is documented as taking a single `<full path>`. In the implementation it is declared as `IEnumerable<string> LogFilesFullPath`, i.e. **multiple** log file paths may be supplied. *(verified)*
- **[Missing]** The `snap` section does not state what happens when both `-s/--snapshot` and `-p/--project` are given, nor that `ExportMode` defaults to `SnapshotExportMode.Snapshot` when neither is given. The docs present the choice as mandatory (*"Choose one of the following options"*), which is stricter than the implementation. *(verified)*

---

# 5. Part 4 — Working with MoBi®

## 5.1 `part-4/first-steps.md`

- No implementation-derived findings established.

## 5.2 `part-4/modularization-concept.md`

- No implementation-derived findings established. The module concept described matches the v13 `MoBi.Assets/AppConstants.cs` terminology.

## 5.3 `part-4/building-block-concepts.md`

- No implementation-derived findings established.

## 5.4 `part-4/spatial-structures-bb.md`, `molecules-bb.md`, `reactions-bb.md`, `passive-transports-bb.md`, `observers-bb.md`, `events-bb.md`, `individuals-bb.md`, `expression-profiles-bb.md`

- No implementation-derived findings established. The chapter names correctly use the v13 building-block terminology.

## 5.5 `part-4/initial-conditions-bb.md` and `part-4/parameter-values-bb.md`

- The file names and headings correctly use the v13 names (**Initial Conditions**, **Parameter Values**), which confirms the v12 names in `part-2` (§3.2) and in `setting-up-simulation.md` (§5.7) are stale leftovers. *(verified)*

## 5.6 `part-4/parameters-formulas-tags.md`, `diagrams-overview.md`, `simulation-results.md`, `tools.md`, `example-workflows.md`, `converting-v12-projects-to-v13.md`, `reuse-of-project-information-from-previous-versions.md`

- No implementation-derived findings established.

## 5.7 `part-4/setting-up-simulation.md`

- **[Outdated]** Line 78 refers to *"Molecule Start Values"*. In v13 this building block is called **Initial Conditions**. `MoBi.Assets/AppConstants.cs` contains no `MoleculeStartValues` identifier at all. *(verified)*
- **[Outdated]** Lines 327–331 document *"Export Simulation as Matlab® Differential Equations"* in detail (`ODEMain.m`, `ODERHSFunction.m`, `ODEInitialValues.m`, `ODEoptions.m`). `MoBi.Assets/AppConstants.cs` contains only **2** occurrences of the string `Matlab` and **0** of `MATLAB`, and the current suite no longer ships a MoBi Toolbox for MATLAB. The continued existence of this export in the v13 UI should be re-confirmed before the section is kept. *(partially verified)*

## 5.8 `part-4/mobi-options.md`

- No implementation-derived findings established.

## 5.9 `part-4/mobi-command-line-interface.md`

Fully verified against `MoBi/develop/src/MoBi.CLI`.

**Confirmed accurate:**
- Two verbs only: `snap` and `qualification`.
- `snap`: `-i/--input`, `-o/--output`, `-s/--snapshot`, `-p/--project`, `*.mbp3` ↔ `*.json` — correct.
- `qualification`: `-i/--input` (required), `-v/--validate`, `-r/--run`, `-e/--exp`, `-p/--pksim <path>` — all correct, including the statement that MoBi falls back to the PK-Sim path stored in user settings.
- `--logLevel` default `Information` — matches `LogLevel LogLevel { get; set; } = LogLevel.Information;`.

**Findings:**
- **[Missing]** The `snap` verb has an **undocumented `--pksim` option**. It is declared on `SnapshotRunCommand` as long-form only (there is no short `-p` alias because `-p` is already `--project` on this verb). Help text: *"The file path where PK-Sim can be found, required when loading snapshots that use PK-Sim modules. Default is to use the value from user settings in MoBi."* Because MoBi v13 snapshots routinely contain PK-Sim modules, this is a **required** option for a large class of `snap --project` conversions, and its absence from the documentation is likely to cause failed conversions. *(verified)*
- **[Missing]** The `--cores` option is undocumented for both verbs. Declared on `MoBi.CLI/Commands/CLICommand.cs`: *"Optional. Maximum number of cores (1 or more) to use for parallel work such as model construction and simulation runs. Default is the number of processors minus one."* *(verified)*
- **[Incorrect]** `-l, --log` is documented as a single `<full path>`. The implementation declares `IEnumerable<string> LogFilesFullPath` — multiple log files are accepted. *(verified)*
- **[Missing]** Unlike the PK-Sim CLI page, this page has no note about quoting arguments that contain spaces. Given that the documented `--pksim` example path (`C:\Program Files\...`) contains a space, the note is at least as relevant here. *(verified — inconsistency between the two CLI pages)*

---

# 6. Part 5 — Shared tools and example workflows

## 6.1 `part-5/qualification.md`

Verified against `QualificationPlan/main/schemas/OSP_Qualification_Plan_Schema.json` and `QualificationRunner/develop/src`.

### Outdated statements

- **[Outdated]** Line 60: *"Currently, only PK-Sim projects are supported. MoBi projects will be supported in the mid-term future."* This is no longer true:
  - The schema defines `Projects[].Application` with `enum: ["PKSim", "MoBi"]`, description *"Application used to run the project. Default is PKSim"*.
  - The schema defines `Inputs[].PKSimModule`, described as *"Only for inputs of a MoBi project: name of the PK-Sim module inside the MoBi project that this input is resolved against"*.
  - `QualificationRunCommand` exposes `-m, --mobi` — *"Optional. Path of MoBi installation folder."*
  - MoBi itself ships a `qualification` CLI verb (§5.9).

  **MoBi projects are supported today**, and neither `Application` nor `PKSimModule` is documented anywhere. *(verified)*

### Incorrect enumerations

- **[Incorrect]** **Symbol** (line 341 and referenced from all other plot sections). The docs say *one of "Asterisk", "Circle", "Cross", "Diamond", "Point", "Square", "Triangle"*. The schema `symbolType` enum is:
  `Circle, Square, Diamond, Asterisk, Cross, Triangle, InvertedTriangle, Plus, Star, Pentagon, Hexagon, ThinCross, ThinPlus, CircleOpen, DiamondOpen, HexagonOpen, InvertedTriangleOpen, PentagonOpen, SquareOpen, StarOpen, TriangleOpen`.
  **`"Point"` is not a valid value** and will fail schema validation, and **14 valid values are undocumented** — including the entire family of open/unfilled symbols, which is what most qualification reports actually use. *(verified)*

- **[Incorrect]** **PKParameters for `DDIRatioPlots`** (line 468). The docs say *Subset of {"AUC", "CMAX"}*. Both `DDIRatioPlots.PKParameters` and `PKRatioPlots.PKParameters` reference the shared `pkParameters` definition, whose enum has **32** members:
  `AUC, CMAX, C_max, C_max_norm, C_max_tD1_tD2, C_max_tD1_tD2_norm, C_max_tDLast_tEnd, C_max_tDLast_tEnd_norm, t_max, t_max_tD1_tD2, t_max_tDLast_tEnd, C_trough_tD2, C_trough_tDLast, C_tEnd, AUC_tEnd, AUC_tEnd_norm, AUC_inf, AUC_inf_norm, AUC_tD1_tD2, AUC_tD1_tD2_norm, AUC_tDLast_minus_1_tDLast, AUC_tDLast_minus_1_tDLast_norm, AUC_inf_tD1, AUC_inf_tD1_norm, AUC_inf_tDLast, AUC_inf_tDLast_norm, MRT, Thalf, Thalf_tDLast_tEnd, FractionAucLastToInf, CL, Vss, Vd`. *(verified)*

- **[Incorrect]** **PKParameters for `PKRatioPlots`** (line 547). The docs say *Subset of {"AUC", "CL"}*. Same 32-member enum as above. *(verified)*

- **[Missing]** **Inputs `Type`** (line 216) lists *"Compound", "Event", "Formulation", "Individual", "ObserverSet", "Population", "Protocol", "Simulation"* but omits **`ExpressionProfile`**. The schema's `buildingBlockOrSimulationType` is `buildingBlockType` (`Individual, Population, Compound, Protocol, Event, Formulation, ObserverSet, ExpressionProfile`) plus `Simulation`. Note that the *Projects/BuildingBlocks* `Type` list at line 75 **does** correctly include `ExpressionProfile`, so the two lists in the same file are inconsistent. *(verified)*

### Missing properties

- **[Missing]** `Projects[].Application` — see above. *(verified)*
- **[Missing]** `Inputs[].PKSimModule` — see above. *(verified)*
- **[Missing]** `DDIRatioPlots[].GuestDelta` — an entire undocumented feature. It accepts either a single delta value or an array of `{ "Value": <number>, "PKParameters": [...] }` objects, allowing the Guest *et al.* acceptance criterion to be parameterised per PK parameter. The docs reference the Guest criterion only indirectly, inside the `Measure` artifact table. *(verified)*
- **[Missing]** `GOFMergedPlots[].PlotType` (singular) is still accepted by the schema as a legacy alternative to `PlotTypes`, with the additional combined value `"predictedVsObserved|residualsOverTime"`. Not documented. *(verified)*
- **[Missing]** `SectionId` (integer) is accepted on every plot type and on `Inputs` as a legacy alternative to `SectionReference`. Not documented (arguably correct to omit, but it should then be explicitly marked as deprecated). *(verified)*

### Constraints not documented

- **[Missing]** The schema's root `required` list is `["Projects", "ObservedDataSets", "Plots", "Sections", "Inputs"]` — **all five are mandatory**, including `ObservedDataSets` and `Inputs`, which the prose presents as optional conveniences. Only `Intro` is genuinely optional. *(verified)*
- **[Missing]** `ObservedDataSets[].Path` is constrained by the regex `.csv$` — the file **must** be a `.csv`. Not stated. *(verified)*
- **[Missing]** Per-plot `required` lists are undocumented:
  `GOFMergedPlots` → `Title, PlotTypes, Groups`;
  `DDIRatioPlots` → `Title, Groups, PKParameters, PlotTypes`;
  `PKRatioPlots` → `Title, Groups, PKParameters`;
  `ComparisonTimeProfilePlots` → `Title, SimulationDuration, TimeUnit, OutputMappings`;
  `AllPlots` → `Project, Simulation`.
  Note in particular that `SectionReference` is **not** required on any plot, whereas the prose implies it is. *(verified)*
- **[Missing]** `additionalProperties: false` is set at the root and on most sub-objects — unknown keys are rejected. This is worth stating for authors hand-editing plans. *(verified)*

### Naming inconsistencies

- **[Internal]** Line 468 and line 547 label the property **"PKParameter"** (singular) in the bullet text, while the JSON examples immediately above them correctly use **`"PKParameters"`**. The schema property is `PKParameters`. *(verified)*

### Qualification Runner

- **[Gap]** The **Qualification Runner command line is entirely undocumented.** §*Processing a (re-)qualification plan → Tools* only says to download `qualificationrunner-portable-setup_X.Y.Z.zip` and unzip it. `QualificationRunner/develop/src/QualificationRunner/Commands/QualificationRunCommand.cs` and `CLICommand.cs` define the following options for the single `qualification` verb, **none** of which appear in the documentation: *(verified)*

  | Option | Required | Description (from source) |
  |---|---|---|
  | `-i, --input` | yes | JSON configuration input file used to start the qualification workflow |
  | `-o, --output` | yes | Output folder where the qualification workflow files will be created |
  | `-f, --force` | no | Delete the output folder even if it is not empty. Default `false` |
  | `-n, --name` | no | Name of the report qualification plan to be generated |
  | `-p, --pksim` | no | Path of the PK-Sim installation folder; read from the registry if omitted |
  | `-m, --mobi` | no | Path of the MoBi installation folder; read from the registry if omitted |
  | `--norun` | no | Bypass running the simulations. Default `false` |
  | `-e, --exp` | no | Also export the project files (snapshot and PK-Sim project). Default `false` |
  | `-c, --cores` | no | Maximal number of PK-Sim/MoBi CLI processes started concurrently. Default is the number of logical processors |
  | `-l, --log` | no | Full path of the log file |
  | `--logLevel` | no | `Debug`, `Information`, `Warning`, `Error`. Default `Information` |

  The `-p/--pksim` and `-m/--mobi` options in particular matter because they explain how the Qualification Runner locates the two GUI applications it drives — a common source of setup failures.

## 6.2 `part-5/parameter-identification.md`

- **[Internal]** The file contains duplicated and mutually contradictory blocks describing the optimisation algorithms and their settings. *(unverified)*
- **[Outdated]** Lines 125 and 538–548 document *"Export of Parameter Identification to Matlab®"* and instruct the reader to ensure the MATLAB path contains `Open Systems Pharmacology\MoBi Toolbox for Matlab`. That toolbox is not part of the current suite (see §3.1). *(partially verified)*
- **[Missing]** The `ospsuite.parameteridentification` R package now provides a scripted route to the same functionality and is not cross-referenced from this chapter, although `part-2` introduces it. *(verified)*

## 6.3 `part-5/sensitivity-analysis.md`

- **[Incorrect]** The stated formula for the number of simulations required by a sensitivity analysis is off by a factor of two relative to the implementation (the implementation perturbs each parameter in both directions). *(unverified)*
- **[Internal]** The chapter contains at least one truncated sentence. *(unverified)*

## 6.4 `part-5/import-edit-observed-data.md`

- **[Internal]** The chapter contains at least one truncated sentence. *(unverified)*

## 6.5 `part-5/default-display-base-units.md`

- **[Outdated]** This page is the narrative counterpart to Appendix A.1 and inherits the same four missing dimensions listed in §1.4 (`Amount per area`, `Amount per area per time`, `Area per amount per time`, `Inversed area`). *(verified)*

## 6.6 `part-5/chart-component.md`

- No implementation-derived findings established.

## 6.7 `part-5/comparison-building-blocks.md`

- No implementation-derived findings established.

## 6.8 `part-5/features-of-tables.md`

- No implementation-derived findings established.

## 6.9 `part-5/history-manager-history-reporting.md`

- No implementation-derived findings established.

## 6.10 `part-5/setting-drug-drug-interaction-pk-sim.md`

- No implementation-derived findings established.

## 6.11 `part-5/working-journal.md`

- No implementation-derived findings established.

---

# 7. Part 6 — R packages

All three files in Part 6 are **pure link stubs**. Together they contain roughly 60 lines of prose, name **zero** API functions, state **zero** version or platform requirements, and delegate everything to the pkgdown sites. This is the weakest part of the documentation relative to the size of the underlying implementation.

## 7.1 `part-6/introduction-ospsuite-r.md`

- **[Missing]** No prerequisites are stated. `OSPSuite-R/develop/DESCRIPTION` declares `Depends: R (>= 4.4)`. Readers on R 4.1–4.3 will fail to install with no explanation in the docs. *(verified)*
- **[Missing]** No mention of **`rSharp`**, the .NET interoperability layer that replaced `rClr`. It is a hard `Imports` entry and the single most common installation obstacle. *(verified)*
- **[Missing]** No mention of the OSP r-universe repository (`https://open-systems-pharmacology.r-universe.dev`) used to obtain the non-CRAN dependencies. *(verified — declared as `Additional_repositories` in the `tlf` DESCRIPTION)*
- **[Missing]** The package version is `13.0.0.9006` (a v13 development version) but the page carries no version statement, so a reader cannot tell which release the page corresponds to. *(verified)*
- **[Missing]** The dependency set has grown to include `ospsuite.plots (>= 1.3.0)` and `ospsuite.utils (>= 1.10.0)`; neither is mentioned in Part 6 or Part 2. *(verified)*
- **[Missing]** No mention of the new **MoBi R interface** introduced in v13. *(unverified)*
- **[Gap]** There is no `part-6` page for `ospsuite.parameteridentification` even though `part-2/modules-philsophy-building-blocks.md` lists it as one of the four OSP R packages. *(verified)*

## 7.2 `part-6/reporting-engine.md`

- **[Missing]** No prerequisites. `OSPSuite.ReportingEngine/main/DESCRIPTION` declares `Depends: R (>= 4.4), tlf (>= 1.6.0), ospsuite (>= 12.1.0)` and `Imports: rSharp (>= 1.0.0)`. *(verified)*
- **[Missing]** The package version is `2.4.7`, which does **not** track the suite version. A reader following the v13 documentation has no way to know which reporting-engine version is the v13-compatible one. Note that the declared minimum is `ospsuite (>= 12.1.0)`, i.e. the reporting engine does not yet require the v13 `ospsuite`. *(verified)*
- **[Missing]** The page does not mention that the reporting engine produces **MS-Word** output in addition to Markdown (`Description: Creates tables and figures and combines them into (Markdown and MS-Word) reports`). `part-5/qualification.md` only describes the Markdown → PDF route via Typora. *(verified)*
- **[Internal]** `part-5/qualification.md` links to the reporting-engine installation instructions and the `qualification-workflow` vignette directly, bypassing this page entirely. The page adds no information over `part-5`. *(verified)*

## 7.3 `part-6/tlf-library.md`

- **Confirmed accurate:** the claim that *"the tlf package is used by both the Reporting Engine (RE) R package and by the ospsuite R package"* is correct — `ospsuite` lists `tlf (>= 1.6.0)` under `Imports` and `ospsuite.reportingengine` lists `tlf (>= 1.6.0)` under `Depends`. *(verified)*
- **[Missing]** No prerequisites. `TLF-Library/develop/DESCRIPTION` declares `Depends: R (>= 4.1)` — note this is *lower* than the `R (>= 4.4)` required by `ospsuite`, so the effective requirement for a working OSP R stack is 4.4. *(verified)*
- **[Missing]** No mention of `ospsuite.plots`, which now overlaps with `tlf` in the plotting stack of `ospsuite`. Readers have no guidance on which of the two to use. *(verified)*

---

# 8. Part 7 — A short guide to PBPK model development

Part 7 is methodological guidance rather than software reference material.

## 8.1 `part-7/a-short-guide-to-pbpk-model-development.md`

- No implementation-derived findings.

## 8.2 `part-7/model-development.md`

- No implementation-derived findings.

## 8.3 `part-7/model-evaluation.md`

- **[Missing]** The chapter describes model evaluation without cross-referencing the **qualification/evaluation plan** machinery in `part-5/qualification.md`, which is the tooling that automates exactly this activity. *(unverified)*

## 8.4 `part-7/application-simulation.md`

- No implementation-derived findings.

## 8.5 `part-7/documentation.md`

- No implementation-derived findings.

---

# 9. Coverage gaps — implemented components with no documentation

| Component | Repository | Documentation status |
|---|---|---|
| **Qualification Runner CLI** | `QualificationRunner/develop` | **[Gap]** 11 command-line options, zero documented. Only the download step is described (`part-5/qualification.md`). |
| **Installation Validator** | `InstallationValidator/develop` | **[Gap]** Mentioned in a single bullet in `part-2/modules-philsophy-building-blocks.md`. No chapter, no usage instructions, no description of the reference-value comparison it performs. |
| **MoBi qualification support** | `MoBi/develop`, `QualificationPlan/main` | **[Gap]** Implemented (`Application: "MoBi"`, `PKSimModule`, `qualificationrunner -m`), documented as a future feature. |
| **`ospsuite.parameteridentification`** | `OSPSuite.ParameterIdentification` | **[Gap]** Listed in Part 2, no Part 6 page. |
| **`ospsuite.plots` / `ospsuite.utils`** | — | **[Gap]** Direct dependencies of `ospsuite`, undocumented. |
| **`rSharp`** | `rSharp` | **[Gap]** Replaced `rClr`; breaking installation change, undocumented. |
| **`--cores` CLI option** | `PK-Sim`, `MoBi`, `QualificationRunner` | **[Gap]** Present in all three command-line tools, documented in none. |

---

# 10. Recommended priority

**High — will cause reader-visible failures**

1. `part-5/qualification.md`: correct the `Symbol` enum (remove `Point`, add the 14 missing values) and the two `PKParameters` enums.
2. `part-5/qualification.md`: remove the "MoBi not supported" statement; document `Application` and `PKSimModule`.
3. `part-4/mobi-command-line-interface.md`: document `--pksim` on the `snap` verb.
4. Document the Qualification Runner command line.
5. `part-5/qualification.md`: add `ExpressionProfile` to the `Inputs` type list.

**Medium — factual drift**

6. `part-2/modules-philsophy-building-blocks.md`: replace the v12 building-block names, add Expression Profiles to both lists, add Cat and Cattle.
7. `part-3/pk-sim-creating-individuals.md`: reconcile the two contradictory species lists.
8. `appendix.md` / `part-5/default-display-base-units.md`: regenerate from the current `OSPSuite.Dimensions.xml` (4 dimensions missing).
9. Both CLI pages: document `--cores`, correct `--log` to accept multiple paths.
10. `part-6/*`: state R ≥ 4.4, `rSharp`, and the r-universe repository.
11. `factsheet.md`: add Cat and Cattle; fix "mongrale"; replace the retired UniGene/ArrayExpress references.

**Low — hygiene**

12. Resolve the 14 `TODO (screenshot)` placeholders in `NEWS.md`.
13. Link `core-separator.md` from `SUMMARY.md` or delete it.
14. Fix `PKParameter` → `PKParameters` in the two `qualification.md` bullets.
15. Fix the truncated sentences in `part-5/sensitivity-analysis.md` and `part-5/import-edit-observed-data.md`.
16. Re-confirm whether the MoBi MATLAB ODE export and the Parameter Identification MATLAB export still exist; remove or update `part-4/setting-up-simulation.md` §Export and `part-5/parameter-identification.md` §Export accordingly.

---

# Appendix — Method and limitations

**Method.** The `v13` branch was fetched (`git fetch origin v13`) and its 65 Markdown files enumerated. Upstream artefacts were retrieved directly from `raw.githubusercontent.com` at the requested branches. Enumerations and option lists were compared mechanically where a machine-readable source existed:

- `OSPSuite.Dimensions.xml` was parsed with an XML parser and diffed against the Appendix A.1 table row by row (94 upstream dimensions vs 90 documented rows; 0 value mismatches, 4 omissions).
- `OSP_Qualification_Plan_Schema.json` was parsed with a JSON parser; every `enum`, `required` list and property name was compared against the corresponding prose in `part-5/qualification.md`.
- The PK-Sim, MoBi and Qualification Runner command surfaces were read from their `[Verb]`/`[Option]` attribute declarations.
- R package metadata was read from each `DESCRIPTION`.

**Limitations.**

- **Screenshots were excluded** from this audit at the requester's instruction. A number of findings above (species drop-down contents, MoBi export menu entries, PK-Sim options dialog) would normally be settled by inspecting the corresponding screenshot.
- Prose-heavy UI chapters in Part 3 and Part 4 describe dialog layouts and workflows that have no machine-readable counterpart in the source. For those files this report records "no implementation-derived findings established" rather than "no findings" — absence of a finding is not evidence of correctness.
- The PK-Sim species catalogue lives in the shipped PK-Sim database rather than in source code. The `Monkey`/`Dog` discrepancy in §4.3 is therefore flagged as *partially verified* and needs confirmation against the database.
- Findings marked *(unverified)* are documentation-internal observations (contradictions, truncated sentences, dead links) that were not tied to a specific upstream artefact.
