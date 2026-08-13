# What's New in Version 13

This page lists the user-facing changes introduced in **Version 13** of the Open Systems Pharmacology Suite, relative to Version 12.3. Each entry links to the GitHub issue(s) where the change was tracked and, where available, to the section of this manual describing the feature.

{% hint style="info" %}
If you are migrating existing projects from v12, start with [Converting v12 projects to v13](part-4/converting-v12-projects-to-v13.md) — several merge-behavior changes described below can alter how a v12 model configuration builds in v13 **without any edit to the modules themselves**.
{% endhint %}

## Highlights

- **New oral absorption model** — the physiologically based biopharmaceutics modeling (PBBM) workflow is integrated into PK-Sim®, with new bile-salt-micelle and lumen parameters and rewritten intestinal solubility formulas.
- **Overwrite Parameter Sets** — named collections of compound-dependent parameter overrides that can be committed from a simulation back to the Compound and re-applied in other simulations.
- **Events in administration protocols** — events can now be defined directly within PK-Sim® protocol schemas, including repetition, and visualized on the protocol timeline.
- **MoBi® command-line interface and MoBi® R interface** — batch snapshot conversion and qualification runs without the GUI, and a new R package for scripting MoBi® workflows.
- **Refined module merge behavior** — "Extend" and "Overwrite" now genuinely differ for Molecules, Reactions, Passive Transports, Observers and Events. This is the main **breaking change** of v13.

## Breaking changes and migration

{% hint style="warning" %}
The changes in this section can make a project or model configuration created in v12 behave differently in v13. The full migration procedure is described in [Converting v12 projects to v13](part-4/converting-v12-projects-to-v13.md).
{% endhint %}

- **"Extend" and "Overwrite" merge modes now genuinely differ.** In v12, Molecules, Reactions, Passive Transports and Observers were always fully overwritten by name regardless of the module's merge mode. In v13, "Extend" merges the later module's content into the earlier one, while "Overwrite" reproduces the old v12 full-replacement behavior. The complete v13 rules are documented in [Modularization concept](part-4/modularization-concept.md#creating-simulations-from-modules-and-combination-rules); the differences to v12 and their migration impact are summarized in [Converting v12 projects to v13](part-4/converting-v12-projects-to-v13.md#what-changed-by-building-block). ([Core #2807](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2807), [Core #2640](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2640), [Core #2603](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2603), [Core #2848](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2848), [Core #2811](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2811))
- **`MoleculeProperties` of the spatial structure are extended in both merge modes.** A molecule property present in two modules takes the later module's value or formula; no merge-mode setting reverses this. Neighborhoods cannot be removed by a later module, and a neighborhood redefinition with invalid neighbors silently keeps the earlier definition. See [Spatial structure](part-4/converting-v12-projects-to-v13.md#spatial-structure).
- **PK-Sim® modules are created with merge behavior "Extend" by default.** Because v13 "Overwrite" now also replaces the molecule include/exclude lists of passive transports and observers, combining two large-molecule PK-Sim® modules under the old "Overwrite" default fails simulation creation (`... references an entity with path '<Molecule>-FcRn_Complex|Is small molecule' that cannot be found`). Modules newly created in v13 default to "Extend"; **modules carried over from v12 keep "Overwrite" and must be switched manually**. See the detailed explanation under [Passive transports](part-4/converting-v12-projects-to-v13.md#passive-transports). ([PK-Sim #3635](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3635))
- **Changed event combination under "Extend".** When two modules define an equally-named event or application administering different molecules, v12 "Extend" produced a malformed event administering both; in v13 the administered molecule is taken from the later module, consistent with the precedence of other overwritten properties (early v13 builds took it from the *first* module; fixed in [Core #2917](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2917)). See [Events](part-4/converting-v12-projects-to-v13.md#events).
- **PK-Sim® modules embed their PK-Sim® snapshot.** A module created in v13 carries everything needed to re-create it in a later PK-Sim® version — this is what makes the *next* migration straightforward. v12 modules do not contain a snapshot, which is why re-creating them in v13 is a manual step.
- **Building-block renames in created simulations:** `Reaction` → `Reactions` and `Observer` → `Observers`.
- **The new oral absorption model rejects low (strongly negative) Lipophilicity values.** A v12 model using such values may fail to build or simulate; see the [workaround](part-4/converting-v12-projects-to-v13.md#low-lipophilicity-values-rejected-by-the-new-oral-model). ([MoBi #2445](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2445))
- **Individuals created with v13 cannot be used in v12** (`createIndividual` in the R packages). ([Core #2794](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2794))
- **Platform update:** PK-Sim®, MoBi® and the shared core now run on .NET 10. ([PK-Sim #3535](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3535), [MoBi #2386](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2386), [Core #2859](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2859))

## PK-Sim®

### New oral absorption model (PBBM)

The physiologically based biopharmaceutics modeling workflow, previously available as a beta prototype, is integrated into PK-Sim® ([PK-Sim #3353](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3353)). User-visible consequences:

- New per-compound **bile-salt-micelle** parameters (critical micellar concentration, partition coefficient bile-salt-micelle/water, …).
- New parameters in each `Lumen` compartment (aqueous solubility, fluid velocity and viscosity, micellar diffusion, …).
- **Rewritten intestinal `Solubility` formulas** — these are numerically relevant for any oral administration, not cosmetic.

### Overwrite Parameter Sets

A new concept attached to Compounds ([PK-Sim #3422](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3422)): an Overwrite Parameter Set is a named collection of compound-dependent simulation-parameter values that can be committed from a simulation back to the compound and re-used.

- Compounds get a new **Overwrite Parameter Sets** tab where sets can be viewed, edited and deleted. ([PK-Sim #3429](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3429), [PK-Sim #3435](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3435))
- Changed compound-dependent simulation parameters are tracked and can be **committed** back to their compounds via a dedicated dialog. An **orange status indicator** marks simulations with uncommitted changes. ([PK-Sim #3430](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3430), [PK-Sim #3432](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3432), [PK-Sim #3505](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3505), [PK-Sim #3431](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3431))
- When configuring a simulation, one Overwrite Parameter Set per compound can optionally be selected; it is applied automatically during model construction. ([PK-Sim #3433](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3433), [PK-Sim #3434](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3434), [PK-Sim #3458](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3458))
- When such a simulation is opened in MoBi®, the overridden values appear as regular entries of the Parameter Values building block — no separate handling is needed. ([PK-Sim #3437](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3437))

### Events in administration protocols

Events are integrated into the protocol system using a placeholder mechanism, analogous to formulation placeholders ([PK-Sim #3424](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3424)). Previously, recurring events (e.g. meals three times a day over a week) had to be entered manually one by one in the simulation.

- **Advanced Protocols** can contain event entries in their schemas, inheriting the schema's repetition behavior. ([PK-Sim #3459](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3459), [PK-Sim #3460](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3460))
- **Simple Protocols** support a single optional event with a (possibly negative) time offset relative to the administration. ([PK-Sim #3463](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3463), [PK-Sim #3614](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3614))
- Event placeholders are mapped to actual event building blocks when configuring the simulation, and events can be created directly from the simulation configuration. ([PK-Sim #3461](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3461), [PK-Sim #3484](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3484), [PK-Sim #3493](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3493))
- The protocol preview chart shows administrations and events on a unified timeline, and infusions are visualized with their duration. ([PK-Sim #3464](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3464), [PK-Sim #3273](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3273))
- Simulations created with the event mechanism of earlier versions remain supported. ([PK-Sim #3466](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3466))

### Other PK-Sim® improvements

- **Subfolders for building blocks** — building blocks of one type, including Expression Profiles, can be organized into subfolders in the project explorer. ([PK-Sim #1435](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/1435))
- **Load building blocks from a snapshot into an existing project** — Building Blocks can now be loaded into the open project instead of only as a new project, simplifying e.g. the assembly of multi-compound projects from separate snapshots ([PK-Sim #2023](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/2023)). Loading of simulations into an existing project is not supported yet ([PK-Sim #3324](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3324)).
- **One administration protocol for several compounds** — the same protocol can be re-used for more than one compound in a simulation. ([PK-Sim #3603](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3603))
- **Observed data in simulation comparisons** — when comparing simulations, the observed data used in the individual simulations is added to the comparison chart automatically. ([PK-Sim #3096](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3096))

### PK-Sim® fixes

- Renaming a molecule in an Expression Profile no longer corrupts the project or orphans population variability. ([PK-Sim #3514](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3514), [PK-Sim #3639](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3639))
- Renaming a compound parameter alternative no longer breaks simulations using it. ([PK-Sim #3638](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3638))
- Simulations can be created from individuals with overwritten distributed parameters. ([PK-Sim #3511](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3511))
- Snapshot export handles table ontogenies. ([PK-Sim #3534](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3534))
- Exported files and hyperlinks open automatically again after export. ([PK-Sim #3397](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3397))
- The user-settings dialog respects **Cancel**, and color settings adapt to darker GUI skins. ([PK-Sim #1296](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/1296), [PK-Sim #1872](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/1872))

## MoBi®

### Command-line interface

MoBi® now ships a command-line interface for running workflows without the GUI — batch conversion between `*.mbp3` projects and JSON snapshots (`snap`) and validation/execution of qualification workflows (`qualification`). See [Command-Line Interface](part-4/mobi-command-line-interface.md). ([MoBi #2460](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2460), [MoBi #2449](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2449), [MoBi #2447](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2447))

### R interface for MoBi®

A new R package exposes MoBi® functionality for scripting, comparable to the existing `ospsuite` package for PK-Sim®: creating modules, loading and exporting building blocks as PKML, working with Individuals, Expression Profiles, Parameter Values and Initial Conditions, snapshot management, and calculation-method overrides. ([MoBi #2209](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2209))

### Multiple analyses per simulation

A MoBi® simulation can now hold multiple charts/analyses, as in PK-Sim®, with a shared context menu (Clone, Remove, Remove All, Rename). Existing projects are converted on load. ([MoBi #1709](https://github.com/Open-Systems-Pharmacology/MoBi/issues/1709), [MoBi #2314](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2314), [MoBi #2315](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2315), [Core #2928](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2928))

### Find References

When editing a simulation, MoBi® can list all formulas that reference a selected parameter, with interactive drill-down. See [Find References](part-4/tools.md#find-references). ([MoBi #608](https://github.com/Open-Systems-Pharmacology/MoBi/issues/608))

### Combined `AND`/`OR` container criteria

Container criteria (in passive transports, observers, events, sum formulas, …) can now combine `AND` and `OR` operators in one condition; v12 allowed only a single operator per condition. ([MoBi #2205](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2205), [Core #2845](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2845))

### Other MoBi® improvements

- **Excluding molecules from a passive transport** defined in another module is now possible through the [changed merge behavior](part-4/modularization-concept.md#passive-transports) of include/exclude molecule lists; previously, removing an included molecule had no effect and adding it to the exclude list raised an error. ([MoBi #2051](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2051))
- **Batch update of simulations** — several simulations can be updated from changed building blocks in one action instead of one at a time. ([MoBi #2189](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2189))
- **Calculation-method selection at simulation creation** — partition-coefficient and cellular-permeability calculation methods can be chosen when creating a simulation and overridden per molecule. ([MoBi #1427](https://github.com/Open-Systems-Pharmacology/MoBi/issues/1427), [Core #2798](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2798))
- **Snapshot and project loading** — simulations can be loaded from a MoBi® snapshot, and projects can be opened without loading their simulations. ([MoBi #2402](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2402), [MoBi #1908](https://github.com/Open-Systems-Pharmacology/MoBi/issues/1908))
- The formula and paths of a transport can be shown inside the simulation. ([MoBi #2391](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2391))
- The formula string editor shows the unit the formula evaluates to. ([MoBi #2250](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2250))

### MoBi® fixes

- Renaming a molecule also renames tags containing the molecule name in reactions; renaming a cloned expression profile fixes the contained parameter paths. ([MoBi #2389](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2389), [MoBi #2427](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2427))
- Creating global and local parameters in `MoleculeProperties` works correctly again. ([MoBi #2432](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2432), [MoBi #2428](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2428))
- "Possible referenced objects" shows all reaction parameters, and the path element `Events` is no longer lost in parameter paths. ([MoBi #2429](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2429), [MoBi #2436](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2436))
- Committing simulation changes to a building block no longer duplicates charts; chart editor width is preserved. ([MoBi #2325](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2325), [MoBi #2415](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2415))
- SBML import no longer crashes on certain models. ([MoBi #2258](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2258))
- Configuring a simulation from two modules sharing a molecule no longer fails. ([MoBi #2298](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2298))

## Shared components (PK-Sim® and MoBi®)

### Charting

- Manual control of the axis **major tick interval** and **minor tick count**. ([Core #2888](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2888))
- **Chart templates** can be applied to curve charts other than time profiles. ([Core #2431](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2431))
- Additional **legend positions** (e.g. bottom right/left inside the chart). ([Core #2880](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2880))
- Line thickness can be entered freely, including for multiple curves at once. ([Core #2884](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2884), [Core #2874](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2874))
- **Link data to simulations** — observed data can take the same color as the simulation results it is linked to. ([Core #2120](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2120), [Core #2720](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2720))
- Fixes: "Color observed data by folder" works for partial selections, curve colors no longer change on close/reopen, clearer representation of 0 on logarithmic axes, and correct dimension handling in Axis Settings for merged dimensions. ([Core #2866](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2866), [Core #2752](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2752), [Core #2903](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2903), [Core #2891](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2891))

### Solver and numerics

- Parameters evaluating to `NaN` or infinity at simulation start are detected and reported. ([Core #2760](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2760))
- The check for negative molecule amounts can be switched on/off globally and per simulation. ([Core #2693](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2693), [Core #1496](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/1496))

### Parameter Identification and Sensitivity Analysis

- Parameter selection can be filtered to **user-defined parameters** only. ([Core #2740](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2740))
- Simulation errors occurring during a Sensitivity Analysis are surfaced in the results. ([Core #2868](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2868))
- Unified plot colors across Parameter Identification views; a cancelled identification reports its number of evaluations; options remain accessible on small screens. ([Core #2399](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2399), [Core #2814](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2814), [Core #2739](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2739))
- "Transfer results to Simulation" works together with "Use as factor". ([Core #2754](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2754), [Core #2398](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2398))
- The objective function minimized during Parameter Identification is now formally documented — see [Objective function and Total Error](part-5/parameter-identification.md#objective-function-and-total-error).

### Observed data

- Observed data with non-monotonically increasing or duplicate x-values is accepted. ([Core #796](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/796), [Core #1863](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/1863))
- The import can record an `OutputPath` as metadata, and import error messages are more specific. ([Core #2787](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2787), [Core #2648](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2648), [Core #2650](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2650))

### Working journal, history and comparisons

- The project **history can be exported to CSV**. ([Core #2714](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2714))
- The building-block comparison shows the **module name** of each compared building block. ([Core #2745](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2745))
- The MiKTeX dependency was removed from the installation. ([Core #2800](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2800))

### Miscellaneous

- The chart preview option is remembered per project. ([Core #2767](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2767))
- Initial conditions default to the value `0` instead of "not available". ([Core #2743](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2743))
- Distributed parameters keep their distribution when their value is overwritten. ([Core #2838](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2838))
- Performance improvement for projects containing expression profiles of proteins not used in the model. ([Core #2646](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2646))
- Security and maintenance: dependency vulnerabilities fixed. ([Core #2894](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2894))

## Command line and R

- The **PK-Sim® command-line interface** is now fully documented, covering the `run`, `snap`, `export` and `qualification` workflows with all options and exit codes. See [Command-Line Interface](part-3/pk-sim-command-line-interface.md).
- The new **MoBi® command-line interface** and **MoBi® R interface** are described [above](#mobi).
- R-relevant changes in the shared core: simulations with mixed individual and population lists can be run in one call ([Core #2897](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2897)), and populations can be created from a CSV string ([Core #2779](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2779)).
- Fixes for loading simulations from snapshots via R and for gestational-age units in `createIndividual`. ([PK-Sim #3592](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3592), [PK-Sim #3574](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3574), [PK-Sim #3549](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3549))

## Known issues

{% hint style="warning" %}
This list reflects the state at publication of this page and may change — check the linked issues for the current status.
{% endhint %}

| Issue | Description |
|---|---|
| [MoBi #2445](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2445) | The new oral absorption model rejects low (strongly negative) Lipophilicity values; see the [workaround](part-4/converting-v12-projects-to-v13.md#low-lipophilicity-values-rejected-by-the-new-oral-model). |
| [Core #2918](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2918), [MoBi #2472](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2472) | Neighborhoods cannot be removed from a model, and `MoleculeProperties` are extended even under "Overwrite"; both behaviors are under review. |
| [Core #2128](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2128) | A planned rework of application definitions will change how events are combined in a future release. |
| [PK-Sim #3606](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3606), [MoBi #2439](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2439) | Errors can occur when loading snapshots across tools. |
| [MoBi #2442](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2442) | The comparison of Individual building blocks is not informative. |
| [PK-Sim #3640](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3640) | After project conversion, an old simulation cannot be reconfigured. |
| [PK-Sim #3641](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3641) | Progress popups show scrollbars at 125% font scaling. |
| [PK-Sim #3506](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3506) | Molecules can be given names that clash with model elements. |
