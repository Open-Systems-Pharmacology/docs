# What's New in Version 13

This page lists the user-facing changes introduced in **Version 13** of the Open Systems Pharmacology Suite, relative to Version 12.3. Each entry links to the GitHub issue(s) where the change was tracked and, where available, to the section of this manual describing the feature.

{% hint style="info" %}
If you are migrating existing MoBi projects from v12, start with [Converting v12 MoBi projects to v13](part-4/converting-v12-projects-to-v13.md) - several merge-behavior changes described below can alter how a v12 model configuration builds in v13 **without any edit to the modules themselves**.
{% endhint %}

## Highlights

- **Refined oral absorption model** - the physiologically based biopharmaceutics modeling (PBBM) workflow is integrated into PK-Sim®, with new bile-salt-micelle and lumen parameters and rewritten intestinal solubility formulas.
- **Compound Overwrite Parameter Sets** - named collections of compound-dependent parameter overrides that can be committed from a simulation back to the Compound and re-applied in other simulations.
- **Events in administration protocols** - events can now be defined directly within PK-Sim® protocol schemas, including repetition, and visualized on the protocol timeline.
- **MoBi® command-line interface and MoBi® R interface** - batch snapshot conversion and qualification runs without the GUI, and a new R package for scripting MoBi® workflows.
- **Refined module merge behavior** - "Extend" and "Overwrite" now genuinely differ for Molecules, Reactions, Passive Transports, Observers, Events and the `MoleculeProperties` of the Spatial Structure. This is the main **breaking change** of v13.

## Breaking changes and migration

{% hint style="warning" %}
The changes in this section can make a project or model configuration created in v12 behave differently in v13, or invalidate paths stored in it. The full migration procedure is described in [Converting v12 projects to v13](part-4/converting-v12-projects-to-v13.md).
{% endhint %}

### PK-Sim

- **Administrations without a formulation are nested under a "No formulation" container.** Every administration created in PK-Sim® now produces the same tree structure in the simulation, and therefore in MoBi®: an application that needs no formulation - **Intravenous Bolus** and **Intravenous Infusion** - is placed under a formulation container named `No formulation`, exactly as an oral administration is placed under its formulation. The protocol hierarchy always has the same depth. **Application parameter paths change accordingly:**

  ```text
  v12   Events|iv 5 mg|Application_1|ProtocolSchemaItem|Infusion time
  v13   Events|iv 5 mg|No formulation|Application_1|ProtocolSchemaItem|Infusion time
  ```

  Applications *with* a formulation already had this intermediate level and are unaffected.

  **Snapshots** written with v12 or earlier are converted on load - the `No formulation` element is inserted into the stored application parameter paths, so committed values are preserved. The snapshot format version is now 13. **Projects are not converted:** the simulations they contain are not rebuilt, so they keep their v12 structure and their stored paths stay valid. As soon as such a simulation is re-created or re-configured in v13, every path stored *outside* the simulation has to be updated - parameter identifications and sensitivity analyses that reference application parameters, R scripts, and MoBi® extension modules or formulas that address application parameters by path. ([PK-Sim #3462](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3462), [PK-Sim #3656](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3656), [Core #2941](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2941))
- **Parameter rename: `Kd (FcRn) in endosomal space of container` → `Kd (FcRn) of container`.** The old name was misleading: the parameter takes the endosomal `Kd (FcRn)` only in endosomal containers, and the plasma/interstitial `Kd (FcRn)` in plasma and interstitial containers. It is a read-only parameter created in the simulation, so no project conversion is needed - but any path referring to the old name (R scripts, parameter identifications, sensitivity analyses, MoBi® formulas) must be updated. The Compound building block parameters `Kd (FcRn) in endosomal space` and `Kd (FcRn) in plasma/interstitial` are **not** renamed. ([PK-Sim #1097](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/1097), [PK-Sim #2543](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/2543))

### MoBi

- **"Extend" and "Overwrite" merge modes now genuinely differ.** In v12, Molecules, Reactions, Passive Transports and Observers were always fully overwritten by name regardless of the module's merge mode. In v13, "Extend" merges the later module's content into the earlier one, while "Overwrite" reproduces the old v12 full-replacement behavior. The complete v13 rules are documented in [Modularization concept](part-4/modularization-concept.md#creating-simulations-from-modules-and-combination-rules); the differences to v12 and their migration impact are summarized in [Converting v12 projects to v13](part-4/converting-v12-projects-to-v13.md#what-changed-by-building-block). ([Core #2807](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2807), [Core #2640](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2640), [Core #2603](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2603), [Core #2848](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2848), [Core #2811](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2811))
- **`MoleculeProperties` of the spatial structure now follow the module's merge behavior.** In v12 they were always merged, whatever the merge mode was set to. In v13, "Extend" merges them - a property present in both modules takes the later module's value or formula - while "Overwrite" **replaces** the accumulated container, so only the properties defined in the overwriting module survive. An overwriting module that contributes an *empty* `MoleculeProperties` container therefore clears the accumulated properties; since MoBi® still adds an empty container to every newly created spatial structure, delete it in modules set to "Overwrite" that are not meant to clear anything. See [Spatial structure](part-4/converting-v12-projects-to-v13.md#spatial-structure). ([Core #2944](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2944), [MoBi #2472](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2472), [MoBi #2498](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2498))
- **Neighborhoods can be removed, and unresolvable neighbors now fail the build.** A later module that redefines a neighborhood **without neighbors** removes it from the simulation (with a warning) - in v12 a neighborhood could not be removed at all. A neighborhood whose neighbors are not present in the final model structure now **fails simulation creation** instead of being silently skipped. See [Spatial structure](part-4/converting-v12-projects-to-v13.md#spatial-structure).
- **PK-Sim® modules are created with merge behavior "Extend" by default.** Because v13 "Overwrite" now also replaces the molecule include/exclude lists of passive transports and observers, combining two large-molecule PK-Sim® modules under the old "Overwrite" default fails simulation creation (`... references an entity with path '<Molecule>-FcRn_Complex|Is small molecule' that cannot be found`). Modules newly created in v13 default to "Extend"; **modules carried over from v12 keep "Overwrite" and must be switched manually**. See the detailed explanation under [Passive transports](part-4/converting-v12-projects-to-v13.md#passive-transports). ([PK-Sim #3635](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3635))
- **Changed event combination under "Extend".** When two modules define an equally-named event or application administering different molecules, v12 "Extend" produced a malformed event administering both; in v13 the administered molecule is taken from the later module, consistent with the precedence of other overwritten properties (early v13 builds took it from the *first* module; fixed in [Core #2917](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2917)). See [Events](part-4/converting-v12-projects-to-v13.md#events).
- **Under "Extend", the later module also wins for the event start condition and for transport properties.** The start condition equation, the "One Time" flag, and — for a transport inside an event or application — the kinetic formula, the source/target criteria and the "Create/Plot process rate parameter" flags are now taken from the extending module, with the source/target criteria extended exactly as for passive transports. Early v13 builds silently kept all of these from the earlier module, so a redefinition in an extending module had no effect. ([Core #2943](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2943))
- **PK-Sim® modules embed their PK-Sim® snapshot.** A module created in v13 carries everything needed to re-create it in a later PK-Sim® version - this is what makes the *next* migration straightforward. v12 modules do not contain a snapshot, which is why re-creating them in v13 is a manual step.
- **Building-block renames in created simulations:** `Reaction` → `Reactions` and `Observer` → `Observers`.

### R

- **Individuals created with v13 cannot be used in v12** (`createIndividual` in the R packages). ([Core #2794](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2794))

### Common

- **Platform update:** PK-Sim®, MoBi® and the shared core now run on .NET 10. ([PK-Sim #3535](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3535), [MoBi #2386](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2386), [Core #2859](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2859))


## New features

### PK-Sim®: Mechanistic Oral Absorption & PBBM Framework 

**Scientific basis:** Vrenken et al., *Eur. J. Pharm. Sci.* 2025 - [Part 1: in vitro](https://doi.org/10.1016/j.ejps.2025.107164) & [Part 2: in vivo](https://doi.org/10.1016/j.ejps.2025.107189)

#### What's new at a glance

| Tool | What it does |
|---|---|
| **Updated dissolution model** | Noyes–Whitney dissolution with **separate transport of free and micelle-bound drug** plus hydrodynamic diffusion-layer thickness |
| **Upgraded PBPK framework** | **Dynamic luminal pH and bile salt concentrations** (with population variability) feeding the new dissolution model |

Three headline capabilities:

- **Bile-salt micellar solubilization** - apparent (biorelevant) solubility is now computed per GI segment from bile salt concentration and compound-specific micelle/water partition coefficients, instead of a single FaSSIF/FeSSIF reference value.
- **Hydrodynamic dissolution** - the diffusion layer thickness can now vary dynamically with luminal fluid velocity and viscosity via a Reynolds/Schmidt/Sherwood (Ranz–Marshall) formulation, in addition to the classic constant-thickness and Hintz–Johnson options.
- **Dynamic, meal- and water-responsive lumen** - gastric and upper-intestinal pH and bile salt concentrations now change over time in response to water and food intake, and carry population variability.

---

#### New physiology: solubility & the luminal environment

##### Bile-salt micellar solubilization

Apparent solubility ($S_{br}$) in each luminal segment ($j$) is now built up from aqueous solubility plus micellar partitioning of both the neutral and ionized species ([Part 2, Eq. 3](https://doi.org/10.1016/j.ejps.2025.107189)):

$S_{br,j}(t) = \left( \frac{C_{BS,j}(t)\,S_0}{C_{H_2O}}\,K_{m:w,\text{neutral}} + S_0 \right) + \left( \frac{C_{BS,j}(t)\,S_{i,j}(t)}{C_{H_2O}}\,K_{m:w,\text{ionized}} + S_{i,j}(t) \right)$

Aqueous solubility follows PK-Sim's built-in Henderson–Hasselbalch relationship, with the **solubility gain per charge (SG)** and **micelle/water partition coefficients (Km:w)** now informed directly from *in vitro* data by the [OSP Solubility Toolbox](https://doi.org/10.1016/j.ejps.2025.107164). Separating pH and bile-salt effects avoids over-predicting solubility in low-bile-salt segments (stomach, large intestine).

> 🖼️ **TODO (screenshot):** Add a screenshot of the Compound building block parameter list in PK-Sim showing the new micelle/water partition coefficient and Critical Micellar Concentration parameters.

##### Dynamic luminal pH and bile salts

Solubility-relevant parametrization of the lumen is no longer static. New empirical models capture temporal dynamics ([Part 2](https://doi.org/10.1016/j.ejps.2025.107189); all equation numbers below refer to the original publication):

- **Gastric pH after water** - a fluid-dilution model; pH rises with the water bolus and returns to baseline as volume normalizes (Eq. 16).
- **Gastric pH after a meal** - a refitted exponential decay (Eq. 17; α = 1.72×10⁻², initial fed pH ≈ 4.85).
- **Duodenal / upper-jejunal pH after a meal** - a 2nd-order polynomial dip and recovery (Eq. 18).
- **Bile salt concentration after a meal** - a linear decline back to the fasted level (Eq. 19; fed CBS ≈ 13.9 mM).

Fasted-state luminal pH values were also refreshed from a comprehensive literature review, and **population variability was added** to both pH and bile salt concentrations for all segments from stomach to rectum ([Part 2, Table 2](https://doi.org/10.1016/j.ejps.2025.107189)).

> 🖼️ **TODO (screenshot):** Add a PK-Sim chart/plot screenshot illustrating simulated dynamic gastric pH and bile salt concentration profiles over time after a meal or water intake event.

---

#### New dissolution model

The extended, film-theory dissolution model tracks **two parallel diffusional transports** - one for unbound API, one for micelle-bound API - from the particle surface to the bulk ([Part 2, Eq. 4](https://doi.org/10.1016/j.ejps.2025.107189)):

$\frac{dm_{solid,i,j}}{dt} = -A_{i,j}(t) \left( \frac{D_u}{h_{u,i,j}(t)}\left(S_{u,surf,j}-C_{u,bulk,j}\right) + \frac{D_b}{h_{b,j}(t)}\left(S_{b,surf,j}-C_{b,bulk,j}\right) \right)\Psi(t)$

Key mechanics:
- Spherical particles binned into up to 20 size classes; bound-API diffusion coefficient from the **Stokes–Einstein** equation using the FaSSIF micelle radius (rₘ = 2.72×10⁻⁶ cm).
- **Three diffusion-layer-thickness (h) options**, user-selectable per formulation:
  1. **Constant** (30 µm, default)
  2. **Hintz–Johnson** - h = particle radius, capped at an adjustable maximum
  3. **Hydrodynamic model** - h derived from the **Sherwood number** via the **Ranz–Marshall** correlation using **Reynolds** and **Schmidt** numbers (Eqs. 7–12)
- An **absolute surface integration factor (Ψ)** damps particle regrowth under supersaturation (Eq. 13).
- Formulations are described with a **product particle-size distribution (P-PSD)** informed from *in vitro* dissolution, replacing empirical Weibull functions.

> 🖼️ **TODO (screenshot):** Add a screenshot of the Formulation building block dialog in PK-Sim showing the new diffusion-layer-thickness options (Constant / Hintz–Johnson / Hydrodynamic Model) and P-PSD input.

---

#### Notable definition changes

The **luminal pH** parameters were upgraded from static values to dynamic definitions:

| Segment | pH parameter | Change |
|---|---|---|
| Stomach | pH in fasted state | VALUE → **FORMULA** |
| Duodenum | pH | VALUE → **FORMULA** |
| Upper Jejunum | pH | VALUE → **FORMULA** |
| Lower Jejunum, Upper/Lower Ileum, Caecum, Colon (Asc./Trans./Desc./Sigmoid) | pH | VALUE → **DISTRIBUTION** |

> 🖼️ **TODO (screenshot):** Add a screenshot of the PK-Sim Individual building block parameter tree showing the new/modified bile salt and luminal pH parameters (basal, fasted, post-meal).

The new compound parameters are grouped in two new (advanced) Compound building block groups, **Advanced Intestinal Solubility** and **Bile Salt Micelle Partitioning**. ([PK-Sim #3404](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3404))

---

#### References

- Vrenken P., Vertzoni M., Frechen S., Solodenko J., Meyer M., Muenster U., Dallmann A. *Development of a novel PBBM framework using the Open Systems Pharmacology Suite, Part 1: in vitro modeling of vericiguat.* European Journal of Pharmaceutical Sciences 212 (2025) 107164. [doi:10.1016/j.ejps.2025.107164](https://doi.org/10.1016/j.ejps.2025.107164)
- Vrenken P., Vertzoni M., Frechen S., Solodenko J., Meyer M., Muenster U., Dallmann A. *Development of a novel PBBM framework using the Open Systems Pharmacology Suite, Part 2: in vivo pharmacokinetic modeling of vericiguat.* European Journal of Pharmaceutical Sciences 212 (2025) 107189. [doi:10.1016/j.ejps.2025.107189](https://doi.org/10.1016/j.ejps.2025.107189)
- Open Systems Pharmacology - Oral-PBBM-Workflow repository: [github.com/Open-Systems-Pharmacology/Oral-PBBM-Workflow](https://github.com/Open-Systems-Pharmacology/Oral-PBBM-Workflow)

### PK-Sim®: Events in administration protocols

Events - e.g., meal intake, gallbladder emptying - can now be defined directly within the administration protocol building blocks, including repetition. This means that recurring events, such as meals, no longer need to be entered individually in each simulation.  

- [**Simple Protocols**](https://docs.open-systems-pharmacology.org/working-with-pk-sim/pk-sim-documentation/pk-sim-administration-protocols#simple-protocol) - one optional event with a configurable offset relative to administration is supported, covering cases such as dosing before or after a meal. 

> **TODO – PK-Sim screenshot:** Simple Protocol configuration showing the optional event offset relative to administration.

- [**Advanced Protocols**](https://docs.open-systems-pharmacology.org/working-with-pk-sim/pk-sim-documentation/pk-sim-administration-protocols#advanced-protocol) - the protocol schema supports event entries alongside administration entries, allowing events to follow the same repetition pattern as the protocol itself. 

> **TODO – PK-Sim screenshot:** Advanced Protocol schema with an **event** entry highlighted.

- **Event mapping TODO documentation link** - event placeholders are mapped to PK-Sim® event building blocks during the _Administration_ step of simulation configuration, together with the other protocol-related mappings. The same administration protocol can be reused with different event mappings across simulations. 

> **TODO – PK-Sim screenshot:** Protocol mapping step showing how an event placeholder is mapped to a PK-Sim event building block.

- **Protocol preview** - administrations and events are shown on the same timeline.

> **TODO – PK-Sim screenshot:** Protocol preview with administrations and events displayed on the same timeline.

- **Uniform application structure** - every administration is now nested under a formulation container in the simulation tree. Administrations that need no formulation - **Intravenous Bolus** and **Intravenous Infusion** - are placed under a container named `No formulation`, so all administrations created in PK-Sim® have the same tree structure in MoBi®. This changes application parameter paths; see [Breaking changes](#pk-sim) above. ([PK-Sim #3462](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3462))

- **Compatibility** - the _Events_ tab in the simulation configuration dialog is still available. Standalone events and existing simulations that use the previous event workflow continue to work with protocol-based events.

> **TODO – PK-Sim screenshot:** Events tab or legacy workflow view showing continued compatibility with standalone events.

### PK-Sim®: Compound Overwrite Parameter Sets

You can now commit compound-dependent simulation parameters that **are not part of a compound building block** (e.g., permeabilities or partition coefficients) and were modified in a simulation back to the compound as a named **Overwrite Parameter Set**, which can be re-applied in other simulations and projects.

- **Committing simulation parameters to the compound** - a new "Commit Simulation Parameters to Compound" action is available for each compound used in a simulation. This action opens a dialog listing all changed parameters, which can be deselected here. Then, either a new "Overwrite Parameter Set" can be created with its own name, or an existing one can be updated.

> 🖼️ **TODO:** Screenshot of the "Commit simulation parameters to compounds" dialog, showing parameters grouped by compound with checkboxes and name/dropdown options.

- **Uncommitted-changes indicator** - an orange status indicator on a compound within a simulation indicates uncommitted, compound-related parameter changes. These changes are saved with the project, so the indicator is retained when the project is reopened.

> 🖼️ **TODO:** Screenshot of the simulation tree/toolbar showing the new orange "uncommitted changes" indicator next to the existing red compound-change indicator.

- **Overwrite Parameter Sets tab** - compound building blocks have a new tab positioned after "Advanced Parameters" with a master-detail view of all "Overwrite Parameter Sets" of the compound. Parameter values, units, and metadata can be inspected and edited. Individual parameters or entire sets can be deleted. One set can be marked as the default.

> 🖼️ **TODO:** Screenshot of the new "Overwrite Parameter Sets" tab in the Compound editor, showing the master-detail layout with a list of sets and parameter grid.

- **Applying an Overwrite Parameter Set in a Simulation** - when adding or configuring a compound in a simulation, select an Overwrite Parameter Set from the dropdown menu. "\<None\>" uses the original formula-based values of the simulation parameters dependent on the compound, while any other selection applies the saved values of the chosen set. If the compound has a default set, it is preselected. Parameters applied from a set behave like normal compound parameters.

> 🖼️ **TODO:** Screenshot of the compound configuration panel in a simulation, showing the Overwrite Parameter Set selection dropdown with "None" and named sets.

- **Metadata** - optional metadata, such as species or disease state, can be stored in each Overwrite Parameter Set.
- If a saved parameter path within an Overwrite Parameter Set cannot be resolved when the simulation is created, an error message will appear
- **MoBi®** - Overwrite Parameter Sets are merged into the standard `ParameterValues` building block during simulation creation, so existing MoBi® workflows are not affected.

### Other PK-Sim® improvements

- **Subfolders for building blocks** - building blocks of one type, including Expression Profiles, can be organized into subfolders in the project explorer. ([PK-Sim #1435](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/1435))
- **Load building blocks from a snapshot into an existing project** - Building Blocks can now be loaded into the open project instead of only as a new project, simplifying e.g. the assembly of multi-compound projects from separate snapshots ([PK-Sim #2023](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/2023)). Loading of simulations into an existing project is not supported yet ([PK-Sim #3324](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3324)).
- **One administration protocol for several compounds** - the same protocol can be re-used for more than one compound in a simulation. ([PK-Sim #3603](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3603))
- **Observed data in simulation comparisons** - when comparing simulations, the observed data used in the individual simulations is added to the comparison chart automatically. ([PK-Sim #3096](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3096))

### MoBi®: Command-line interface

MoBi® now ships a command-line interface for running workflows without the GUI - batch conversion between `*.mbp3` projects and JSON snapshots (`snap`) and validation/execution of qualification workflows (`qualification`). See [Command-Line Interface](part-4/mobi-command-line-interface.md). ([MoBi #2460](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2460), [MoBi #2449](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2449), [MoBi #2447](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2447))

### MoBi®: R interface

A new R package exposes MoBi® functionality for scripting, comparable to the existing `ospsuite` package for PK-Sim®: creating modules, loading and exporting building blocks as PKML, working with Individuals, Expression Profiles, Parameter Values and Initial Conditions, snapshot management, and calculation-method overrides. ([MoBi #2209](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2209))

### MoBi®: Multiple analyses per simulation

A MoBi® simulation can now hold multiple charts/analyses, as in PK-Sim®, with a shared context menu (Clone, Remove, Remove All, Rename). Existing projects are converted on load. ([MoBi #1709](https://github.com/Open-Systems-Pharmacology/MoBi/issues/1709), [MoBi #2314](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2314), [MoBi #2315](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2315), [Core #2928](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2928))

### Find References

When editing a simulation, MoBi® can list all formulas that reference a selected parameter, with interactive drill-down. See [Find References](part-4/tools.md#find-references). ([MoBi #608](https://github.com/Open-Systems-Pharmacology/MoBi/issues/608))

### Combined `AND`/`OR` container criteria

Container criteria (in passive transports, observers, events, sum formulas, …) can now combine `AND` and `OR` operators in one condition; v12 allowed only a single operator per condition. ([MoBi #2205](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2205), [Core #2845](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2845))

### Other MoBi® improvements

- **Excluding molecules from a passive transport** defined in another module is now possible through the [changed merge behavior](part-4/modularization-concept.md#passive-transports) of include/exclude molecule lists; previously, removing an included molecule had no effect and adding it to the exclude list raised an error. ([MoBi #2051](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2051))
- **Batch update of simulations** - several simulations can be updated from changed building blocks in one action instead of one at a time. ([MoBi #2189](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2189))
- **Calculation-method selection at simulation creation** - partition-coefficient and cellular-permeability calculation methods can be chosen when creating a simulation and overridden per molecule. ([MoBi #1427](https://github.com/Open-Systems-Pharmacology/MoBi/issues/1427), [Core #2798](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2798))
- **Snapshot and project loading** - simulations can be loaded from a MoBi® snapshot, and projects can be opened without loading their simulations. ([MoBi #2402](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2402), [MoBi #1908](https://github.com/Open-Systems-Pharmacology/MoBi/issues/1908))
- The formula and paths of a transport can be shown inside the simulation. ([MoBi #2391](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2391))
- The formula string editor shows the unit the formula evaluates to. ([MoBi #2250](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2250))

### Shared components (PK-Sim® and MoBi®) improvements

#### Charting

- Manual control of the axis **major tick interval** and **minor tick count**. ([Core #2888](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2888))
- **Chart templates** can be applied to curve charts other than time profiles. ([Core #2431](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2431))
- Additional **legend positions** (e.g. bottom right/left inside the chart). ([Core #2880](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2880))
- Line thickness can be entered freely, including for multiple curves at once. ([Core #2884](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2884), [Core #2874](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2874))
- **Link data to simulations** - observed data can take the same color as the simulation results it is linked to. ([Core #2120](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2120), [Core #2720](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2720))
- Fixes: "Color observed data by folder" works for partial selections, curve colors no longer change on close/reopen, clearer representation of 0 on logarithmic axes, and correct dimension handling in Axis Settings for merged dimensions. ([Core #2866](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2866), [Core #2752](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2752), [Core #2903](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2903), [Core #2891](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2891))

#### Solver and numerics

- Parameters evaluating to `NaN` or infinity at simulation start are detected and reported. ([Core #2760](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2760))
- The check for negative molecule amounts can be switched on/off globally and per simulation. ([Core #2693](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2693), [Core #1496](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/1496))

#### Parameter Identification and Sensitivity Analysis

- Parameter selection can be filtered to **user-defined parameters** only. ([Core #2740](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2740))
- Simulation errors occurring during a Sensitivity Analysis are surfaced in the results. ([Core #2868](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2868))
- Unified plot colors across Parameter Identification views; a cancelled identification reports its number of evaluations; options remain accessible on small screens. ([Core #2399](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2399), [Core #2814](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2814), [Core #2739](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2739))
- "Transfer results to Simulation" works together with "Use as factor". ([Core #2754](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2754), [Core #2398](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2398))
- The objective function minimized during Parameter Identification is now formally documented - see [Objective function and Total Error](part-5/parameter-identification.md#objective-function-and-total-error).

#### Observed data

- Observed data with non-monotonically increasing or duplicate x-values is accepted. ([Core #796](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/796), [Core #1863](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/1863))
- The import can record an `OutputPath` as metadata, and import error messages are more specific. ([Core #2787](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2787), [Core #2648](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2648), [Core #2650](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2650))

#### Working journal, history and comparisons

- The project **history can be exported to CSV**. ([Core #2714](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2714))
- The building-block comparison shows the **module name** of each compared building block. ([Core #2745](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2745))
- The MiKTeX dependency was removed from the installation. ([Core #2800](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2800))

#### Miscellaneous

- The chart preview option is remembered per project. ([Core #2767](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2767))
- Initial conditions default to the value `0` instead of "not available". ([Core #2743](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2743))
- Distributed parameters keep their distribution when their value is overwritten. ([Core #2838](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2838))
- Performance improvement for projects containing expression profiles of proteins not used in the model. ([Core #2646](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2646))
- Security and maintenance: dependency vulnerabilities fixed. ([Core #2894](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2894))

### Command line and R

- The **PK-Sim® command-line interface** is now fully documented, covering the `run`, `snap`, `export` and `qualification` workflows with all options and exit codes. See [Command-Line Interface](part-3/pk-sim-command-line-interface.md).
- The new **MoBi® command-line interface** and **MoBi® R interface** are described above.
- R-relevant changes in the shared core: simulations with mixed individual and population lists can be run in one call ([Core #2897](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2897)), and populations can be created from a CSV string ([Core #2779](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2779)).
- Fixes for loading simulations from snapshots via R and for gestational-age units in `createIndividual`. ([PK-Sim #3592](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3592), [PK-Sim #3574](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3574), [PK-Sim #3549](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3549))

## Fixed issues

### PK-Sim®

- Model adjustments for the new oral absorption model: the particle dissolution formulas guard against zero diffusion-layer thickness and zero liquid volume, low **Lipophilicity** values are accepted again, and `Partition coefficient (bile salt micelle/water) ionized` - which can only be calculated in the simulation - no longer shows as "Error" in the Compound building block. ([PK-Sim #3475](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3475), [PK-Sim #3669](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3669), [PK-Sim #3655](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3655))
- Simulations of the protein model with a lymph flow of zero or a very small value no longer fail - the two-pore transport link kinetics is guarded against the resulting `NaN`/infinity. ([PK-Sim #3308](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3308))
- Renaming a molecule in an Expression Profile no longer corrupts the project or orphans population variability. ([PK-Sim #3514](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3514), [PK-Sim #3639](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3639))
- Renaming a compound parameter alternative no longer breaks simulations using it. ([PK-Sim #3638](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3638))
- Simulations can be created from individuals with overwritten distributed parameters. ([PK-Sim #3511](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3511))
- Snapshot export handles table ontogenies. ([PK-Sim #3534](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3534))
- Exported files and hyperlinks open automatically again after export. ([PK-Sim #3397](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3397))
- The user-settings dialog respects **Cancel**, and color settings adapt to darker GUI skins. ([PK-Sim #1296](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/1296), [PK-Sim #1872](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/1872))

### MoBi®

- Renaming a molecule also renames tags containing the molecule name in reactions; renaming a cloned expression profile fixes the contained parameter paths. ([MoBi #2389](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2389), [MoBi #2427](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2427))
- Creating global and local parameters in `MoleculeProperties` works correctly again. ([MoBi #2432](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2432), [MoBi #2428](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2428))
- "Possible referenced objects" shows all reaction parameters, and the path element `Events` is no longer lost in parameter paths. ([MoBi #2429](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2429), [MoBi #2436](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2436))
- Committing simulation changes to a building block no longer duplicates charts; chart editor width is preserved. ([MoBi #2325](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2325), [MoBi #2415](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2415))
- SBML import no longer crashes on certain models. ([MoBi #2258](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2258))
- Configuring a simulation from two modules sharing a molecule no longer fails. ([MoBi #2298](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2298))
