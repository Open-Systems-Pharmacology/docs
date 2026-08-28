# Converting v12 projects to v13

Version 13 of the OSP Suite refines the [modularization concept](modularization-concept.md) introduced in v12. The organizational structure (Modules → Building Blocks → Simulations) is unchanged, and the *parameter value* and *initial condition* resolution orders are unchanged. What changed is the **merge behavior of several building-block types when modules are combined** — specifically the difference between the **"Extend"** and **"Overwrite"** merge modes.

Because these rules govern how a simulation is assembled from its modules, **a model configuration created in v12 can produce a different simulation in v13 without any edit to the modules themselves.** This page summarizes the critical differences and describes how to migrate a v12 model configuration safely. Independently of the merge rules, a few **paths inside PK-Sim modules changed** in v13 — see [Changed paths in PK-Sim modules](#changed-paths-in-pk-sim-modules).

{% hint style="info" %}
The complete v13 merge rules are documented in [Modularization concept](modularization-concept.md#creating-simulations-from-modules-and-combination-rules). This page only describes where v13 *differs* from v12 and what to do about it. For the complete list of changes introduced in v13, see [What's New in Version 13](../NEWS.md).
{% endhint %}

## The one thing to understand first

In v12, several building-block types were **always fully overwritten by name**, regardless of whether a module's merge mode was "Extend" or "Overwrite". For these types, "Extend" and "Overwrite" were effectively the same operation.

In v13, this is no longer true:

- **"Extend"** now genuinely *extends* these building blocks — merging the contents of the later module into the earlier one, rather than replacing them wholesale.
- **"Overwrite"** is now the mode that reproduces the old v12 full-replacement behavior.

So the single most important migration question for each Extension module is:

> **Did this module rely on "Extend" behaving like a full overwrite? If so, it may now need to be set to "Overwrite" to reproduce the v12 result.**

Switch to "Overwrite" only where full replacement was actually the intent. Where the module was genuinely meant to *add to* an existing building block, the new "Extend" behavior is what you want — and the module may need cleanup (see the per-type notes below).

## What changed, by building block

The table below summarizes the behavioral changes. Only **Parameter Values** and **Initial Conditions** are fully unchanged between v12 and v13.

| Building block | v12 | v13 |
|---|---|---|
| **Molecules** | Always overwritten by name in **both** modes. A molecule redefined in an Extension module had to contain *all* required parameters. | **Extend** and **Overwrite** now differ (see below). |
| **Reactions** | Always overwritten by name in **both** modes. | **Extend** and **Overwrite** now differ (see below). |
| **Passive transports** | "Extend" was **identical to** "Overwrite". | "Extend" and "Overwrite" are now distinct. |
| **Observers** | "Extend" was **identical to** "Overwrite". | "Extend" and "Overwrite" are now distinct. |
| **Spatial structure** | `MoleculeProperties` were **always merged**, whatever the merge mode. | `MoleculeProperties` now follow the merge behavior: **extended** under "Extend", **replaced** under "Overwrite". Neighborhood "neighbors are replaced" behavior clarified. A neighborhood can now be **removed** by redefining it without neighbors; a neighborhood with unresolvable neighbors now **fails the simulation creation**. |
| **Events** | Equally-named events were created **separately** per module based on each module's container criteria; they merged only when they landed in the same container. For an equally-named event/application administering *different* molecules, "Extend" extended the administered molecule to **both** (a malformed event). | Equally-named events are merged **by name across modules before creation** — "Overwrite" replaces the whole definition including the container criteria; "Extend" combines the criteria conditions and overwrites the operator (see below). The administered molecule is **overwritten** by the later module in both modes. |

### Molecules

**v12:** Molecules were *always overwritten by name*. Any molecule defined in an Extension module completely replaced the same-named molecule from a higher module. It was not possible to add only some parameters while retaining the rest.

**v13** (see [Molecules](modularization-concept.md#molecules)):

- **Merge behavior "Extend"**
  - **Parameters** are overwritten individually: a parameter defined in both modules takes the later module's definition, while parameters present only in the higher module are **retained**.
  - **Active transports** are **extended**: new ones are added, and for an active transport process defined in both modules the parameters are merged, the source/target criteria are extended, and the kinetic equation, the source/target **operators**, the process-rate-parameter properties and the transporter molecule's **transport name** are overwritten — the same rules as for passive transports (see [Molecules](modularization-concept.md#molecules)).
  - Molecule **type** (Drug, Enzyme, Transporter, …), **stationary**, **calculation methods** (defaults), and **parameter type** (local/global) are overwritten — the later module wins, as in v12.
- **Merge behavior "Overwrite"**
  - Only the parameters present in the last module are retained.
  - Active transports are **completely** replaced.
  - The molecule properties listed above are overwritten as well, exactly as under "Extend".

**Migration impact — high.** A v12 Extension module set to "Extend" that redefined a molecule expecting full replacement now instead *merges* into the existing molecule: leftover parameters and active transports from the base module are retained, and an active transport's source/target criteria end up as the union of both definitions rather than only the later module's. To reproduce the v12 result, set the module to **"Overwrite"**.

The molecule *properties* are the exception — type, stationary, calculation methods and parameter type are overwritten by the later module in both modes, so they need no migration attention. What changes between v12 and v13 is the treatment of the molecule's **parameters** and **active transports**.

### Reactions

**v12:** Reactions were *always overwritten by name*, in both modes.

**v13** (see [Reactions](modularization-concept.md#reactions)):

- **Merge behavior "Extend"**
  - **Educts, products, modifiers** are extended — new ones can be added but **existing ones cannot be removed** (set a stoichiometry to `0` to exclude an educt/product from the reaction).
  - **Stoichiometry** values and the **equation** are overwritten.
  - **Parameters** list is extended (new added, existing overwritten).
  - **Container criteria** are extended; the **operator** is overwritten.
  - "Create/Plot process rate parameter" properties are overwritten.
- **Merge behavior "Overwrite"**
  - The reaction is **completely overwritten by name**.

**Migration impact — high.** As with molecules, a v12 "Extend" reaction redefinition now merges instead of replacing. Note especially that **educts/products/modifiers cannot be removed** by an extending module — the v12 assumption that a redefinition fully replaces the reactant set no longer holds. Use **"Overwrite"** to reproduce full replacement.

{% hint style="danger" %}
**Worked example — silent loss of reactions.** Suppose a base module defines a reaction `R` (educt `A` → product `P1`) and an Extension module set to "Extend" *redefines* `R` as `A → P2`, intending to replace it.

- In **v12** the extension's definition wins by name: `R` is `A → P2` and is created in every container where `A` and `P2` are present.
- In **v13** the products are **combined into the union of both definitions**: `R` becomes `A → P1 + P2`. A reaction is only instantiated where **all** its partners are present, so `R` now appears only in the intersection of "`P1` present" and "`P2` present" — potentially **far fewer** containers, and **zero** if `P1` and `P2` never co-occur. Where it *does* survive, its stoichiometry has changed (it now produces both `P1` and `P2`).

The same trap applies to **modifiers**: if one definition carries a modifier the other lacks, the union requires that modifier to be present in the container, which can remove the reaction from every container where it previously ran. These losses are **silent** — no error is raised; the reaction simply is not created.
{% endhint %}

### Passive transports

**v12:** "Extend" was **identical to** "Overwrite". In both, the parameters list and the source/target lists were *overwritten* (so entries could be removed), the kinetic equation and operators were overwritten, and include/exclude molecule lists were extended.

**v13** (see [Passive transports](modularization-concept.md#passive-transports)):

- **Merge behavior "Extend"**
  - Kinetic **equation** is overwritten.
  - **Parameters** list is **extended**.
  - **Source** and **target** lists are **extended**; their operators are overwritten.
  - **Include/Exclude** molecule lists are extended; the **"All" checkbox** state is overwritten. Since the checkbox decides which of the two lists is evaluated, a later module that checks "All" widens the transport to every molecule except the excluded ones — see [Passive transports](modularization-concept.md#passive-transports).
- **Merge behavior "Overwrite"**
  - The passive transport is **completely overwritten by name**.

**Migration impact — medium.** Under v12, an "Extend" module dropped source/target/parameter entries that were not present in it. Under v13 "Extend", those entries are now **retained** from the earlier module. If the intent was replacement (including removal of entries), switch to **"Overwrite"**.

{% hint style="danger" %}
**Combining PK-Sim modules set to "Overwrite" can fail to build.** In v12, PK-Sim modules were imported with the default merge behavior **"Overwrite"**, and combining them still worked: even under "Overwrite", the molecule **include/exclude lists** of passive transports and observers were extended rather than replaced. In v13, "Overwrite" replaces those lists too, so a passive transport keeps only the molecules of the module that overwrites it.

This surfaces when combining **two large-molecule models**. The FcRn-mediated `NetMassTransfer_*` transports apply to their own module's molecules via those molecule lists; once the lists are replaced instead of combined, the molecule-specific entities the transport formulas reference are no longer created and **simulation creation fails** with errors such as:

```text
Transport 'NetMassTransfer_InterstitialToEndosomal' references an entity with path
'<Molecule>-FcRn_Complex|Is small molecule' that cannot be found
```

Because of this, **v13 changes the default merge behavior of PK-Sim modules to "Extend"** ([PK-Sim #3635](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3635)), so PK-Sim modules newly created in v13 combine correctly out of the box. The default is applied when the module is created from a PK-Sim simulation; it does **not** retroactively change modules already stored in a project. The failure therefore affects **model configurations carried over from v12**, whose modules still carry the old "Overwrite" default.

**Fix:** set the affected PK-Sim modules' merge behavior to **"Extend"** (in MoBi, or `module$mergeBehavior <- "Extend"` in the `ospsuite` R package). With the modules extended rather than overwritten, the molecule lists combine and the simulation builds.

Only the **first** module in the hierarchy has nothing to merge into, so its mode has no effect. The mode of every module selected after it matters — with more than two modules, check them all rather than only the last.

In a controlled test with two large-molecule PK-Sim modules, the **v13 "Extend" build reproduced the v12 "Overwrite" (default) result exactly** — identical reactions, molecules, and observers (only benign v13 calculation-method and `Snapshot` serialization metadata differ). In other words, "Extend" in v13 recovers the effective v12 combination behavior.
{% endhint %}

### Observers

**v12:** "Extend" was **identical to** "Overwrite".

**v13** (see [Observers](modularization-concept.md#observers)):

- **Merge behavior "Extend"**
  - Monitoring **equation** is overwritten, and so is the observer's **dimension**.
  - The **operator** of the "In container with" list is overwritten.
  - The **conditions** list of "In container with" is **extended**.
  - **Include/Exclude** molecule lists are extended; the **"All" checkbox** state is overwritten. As for passive transports, a later module that checks "All" widens the observer to every molecule except the excluded ones — see [Observers](modularization-concept.md#observers).
- **Merge behavior "Overwrite"**
  - The observer is **completely overwritten by name**.

**Migration impact — medium.** Same pattern as passive transports.

### Spatial structure

The container/parameter/tag/neighborhood rules are essentially as in v12, with the following clarifications and changes in v13:

- **`MoleculeProperties` now follow the module's merge behavior.** In v12 they were always merged, whatever the merge mode was set to — an exemption dating from before a merge behavior could be chosen per module. In v13:
  - Under **"Extend"** they are merged, exactly as in v12: new molecule properties from the later module are added, and a property present in both modules takes the later module's value/formula.
  - Under **"Overwrite"** the later module's `MoleculeProperties` container **replaces** the accumulated one, like any other container: only the properties defined in the overwriting module survive.

  This applies to the `MoleculeProperties` container at the **top level** of the spatial structure (next to `Neighborhoods`) and to a top-level `MoleculeProperties` container inserted through a `Parent path`. A `MoleculeProperties` container *inside* an organ or other container is unchanged: it is replaced together with its parent subtree under "Overwrite".
- For neighborhoods under **"Extend"**, v13 clarifies that **neighbors are replaced** by the later module; v12 only stated that neighborhoods are extended. (Under "Overwrite", v12 already specified that neighbors are overwritten.) In addition, two behaviors changed in both modes:
  - A neighborhood referencing a neighbor that is not present in the final model structure now **fails the simulation creation with an error**. In v12, such a neighborhood was silently skipped (the earlier module's same-named neighborhood, if any, was kept unchanged).
  - A neighborhood can now be **removed**: a later module that redefines it **without neighbors** removes the same-named neighborhood from the simulation, in both merge modes, with a warning during simulation creation. In v12, neighborhoods could not be removed from a model.

{% hint style="warning" %}
**An empty `MoleculeProperties` container in an "Overwrite" module clears the accumulated properties.** Under "Overwrite", an empty container is a valid instruction to remove everything the earlier modules contributed — including PK-Sim® molecule properties such as `Fraction unbound (plasma)`.

In v13, MoBi® does not create `MoleculeProperties` containers on its own, so this can only happen where one was added deliberately: a new Spatial Structure building block has no top-level `MoleculeProperties`, and a newly created container does not get one either. A container that should not replace anything can therefore simply be deleted from the module — or the module can be set to "Extend". ([MoBi #2512](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2512), [MoBi #2498](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2498), [MoBi #2514](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2514))
{% endhint %}

**Migration impact — low to medium.** For modules set to "Extend", nothing changes: `MoleculeProperties` merge as they did in v12. For modules set to "Overwrite", the v12 result was a merge and the v13 result is a replacement — check every such module for a `MoleculeProperties` container and switch it to "Extend", or delete the container from the module, if the v12 merge was what you wanted. A v12 module carried over into v13 may still contain a `MoleculeProperties` container that was created automatically by the v12 user interface and never filled. Note also that a v12 configuration containing a neighborhood with unresolvable neighbors — previously skipped with a warning — now **fails to build**: fix the neighbor references, or redefine the neighborhood without neighbors if the intent was to drop it.

### Events

Three things changed for events: how equally-named events are **combined across modules** (including their container criteria), the **administered molecule** under "Extend", and which **properties of the event and of its transports** the later module wins under "Extend".

**Container criteria.** In v12, equally-named events from different modules were created **separately**, each based on its own module's container criteria, and merged only when they happened to be generated in the same container. In v13, equally-named events are merged **on the definition level, by name, before the simulation is created**:

- **Overwrite**: the later module's event definition replaces the earlier one entirely — *including the container criteria*. The earlier module's event is no longer created anywhere, even in containers that only its own criteria matched.
- **Extend**: the container criteria **conditions** of both modules are combined, while the **operator** (and/or) is overwritten by the later module. The merged event — carrying the combined content, e.g. parameters from both modules — is created in *every* container matching the merged criteria.

Migration-relevant consequences: under "Extend" with the operator `AND` (the default) and criteria tags coming from different modules, the merged criteria may match **no container**, and the event is **silently not created** in the simulation. Under "Overwrite", an event the earlier module created in its own location **disappears** from the simulation. The current rules are documented in [Events](modularization-concept.md#events).

**Administered molecule.** What also changed is the administered molecule when two modules define an equally-named event/application for **different** molecules under merge behavior "Extend" (module A administers molecule X, module B — later in the hierarchy — administers molecule Y under the same application name):

| Mode | v12 | v13 |
|------|-----|-----|
| **Overwrite** | administers **Y** — the last module's molecule | unchanged: administers **Y** |
| **Extend** | administers **both X and Y** — a malformed event that uses a single molecule's molecular weight | administers **Y only** — the administered molecule is overwritten by the later module, like the other overwritten event properties |

Under v13 "Extend" the administered molecule is therefore *not* combined but **overwritten** — the malformed double administration of v12 can no longer occur.

**Start condition and transport properties.** Under "Extend", the later module now also wins for the properties that an event and its transports store on themselves rather than as child entities:

| Property | Under "Extend" |
|---|---|
| Event **start condition** equation | overwritten by the later module |
| Event start condition **"One Time"** checkbox | overwritten |
| **Kinetic** formula of a transport in the event/application | overwritten |
| **Source**/**target** criteria of that transport | conditions extended, operator overwritten — as for [passive transports](#passive-transports) |
| **"Create process rate parameter"** / **"Plot process rate parameter"** | overwritten |
| **Parameters** of the event and of its transports | extended; a parameter defined in both modules is taken from the later module (unchanged) |

**Migration impact — medium to high.** A v12 configuration in which two modules defined an equally-named event with **different container criteria** — relying on the events being created separately — now produces a different result: under "Overwrite" only the later module's event exists, and under "Extend" the event may end up in more containers than before or (with the operator `AND`) in none at all. A v12 configuration that relied on the (malformed) double administration under "Extend" now administers only the later module's molecule. Note also that event combination is expected to change again in a future release through the planned [application definition rework](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2128).

{% hint style="warning" %}
**Avoid defining events/applications with the same name in more than one module.** Where this is unavoidable, explicitly verify **which molecule the application administers** after building the simulation.
{% endhint %}

### Unchanged

- **Parameter Values** — resolution order (Building Block → Expression Profile → Individual → PV BB, latest module wins) is unchanged.
- **Initial Conditions** — resolution order (Molecules BB → Expression Profiles → IC BBs, latest module wins) is unchanged.

## Changed paths in PK-Sim modules

Two changes in v13 are independent of the merge rules but break **paths** that point into a PK-Sim module. Both surface as soon as a simulation is built from a PK-Sim module re-created in v13.

### The `No formulation` container in applications

In v13, every administration created by PK-Sim® is nested under a formulation container. Administrations that need no formulation — **Intravenous Bolus** and **Intravenous Infusion** — are placed under a container named `No formulation`, so the protocol hierarchy always has the same depth and all administrations look the same in MoBi®. Administrations *with* a formulation already had this level and are unaffected.

```text
v12   Events|iv 5 mg|Application_1|ProtocolSchemaItem|Infusion time
v13   Events|iv 5 mg|No formulation|Application_1|ProtocolSchemaItem|Infusion time
```

What has to be adjusted after re-creating a PK-Sim module in v13:

- **Formulas** in Extension modules that reference an application parameter through an absolute path.
- **Parameter Values** and **Initial Conditions** building blocks with entries pointing at an application parameter.
- **Parameter identifications** and **sensitivity analyses** whose identified/varied parameters include application parameters such as `Infusion time`. A path that no longer resolves is reported as a warning, and the stored value is dropped.
- **R scripts** and any other automation that addresses application parameters by path.

{% hint style="info" %}
**Snapshots are converted, projects are not.** Loading a v12-or-earlier *snapshot* inserts the `No formulation` element into stored application parameter paths automatically (the snapshot format version is now 13). A v12 *project* is not converted: the simulations it contains are not rebuilt, so they keep the v12 structure and their stored paths remain valid until the simulation is re-created or re-configured in v13. ([PK-Sim #3462](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3462), [PK-Sim #3656](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3656), [Core #2941](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2941))
{% endhint %}

### Renamed parameter `Kd (FcRn) of container`

The molecule-property parameter `Kd (FcRn) in endosomal space of container` — created in the `MoleculeProperties` of the plasma, interstitial and endosomal containers of a large-molecule model — is now called **`Kd (FcRn) of container`**. The old name was misleading: the parameter refers to the endosomal `Kd (FcRn)` only in endosomal containers, and to the plasma/interstitial `Kd (FcRn)` elsewhere. It is a read-only parameter created in the simulation, so nothing in a building block stores it — but formulas, parameter identifications, sensitivity analyses and R scripts that address it by path must use the new name. The Compound building block parameters `Kd (FcRn) in endosomal space` and `Kd (FcRn) in plasma/interstitial` are **not** renamed. ([PK-Sim #1097](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/1097), [PK-Sim #2543](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/2543))

## Migration steps

The goal is to arrive at a v13 model configuration whose every difference from the v12 original is **understood and intended**. Two distinct sources of difference have to be separated: the v13 **PK-Sim PBPK model structure**, whose changes you generally *want* to adopt, and the new **merge rules**, whose effects are usually unintended and must be corrected. The steps below deal with them in that order.

1. **Inventory the model configuration.** List every module in the configuration, its position in the hierarchy (order of selection), and its merge mode ("Extend" / "Overwrite"). Note which of them are **PK-Sim modules** and which are MoBi **Extension modules**, and record the PK-Sim version each PK-Sim module was created with.

2. **Re-create all PK-Sim modules in PK-Sim v13.** Do this *before* any merge-mode work — everything downstream is built on these modules, so changing them later means redoing the comparisons.

   A PK-Sim module created in v12 is a v12 artefact: it carries the v12 PBPK model structure and the v12 physiological and molecular database. Simply carrying it into a v13 project keeps all of that, and none of the v13 improvements are applied — the same reasoning as for [PK-Sim projects](../part-3/importing-exporting-project-data-models.md#exporting-project-to-snapshot--loading-project-from-snapshot). Each PK-Sim module must therefore be re-created in PK-Sim v13, re-imported into the MoBi project in place of the old one (**preserving each simulation's module order**), and **every** simulation that uses it rebuilt.

   - If the original **PK-Sim project or snapshot still exists**, export it to a snapshot and load that snapshot in PK-Sim v13. All v12 → v13 conversions are applied on load. This is the recommended path and requires no manual re-entry of inputs.
   - If **neither exists**, the module has to be rebuilt by hand in PK-Sim v13. Origin data, compound parameters, expression profiles, applications and calculation methods can be read off the v12 module, but which PK-Sim *input choice* produced a given value generally cannot — those inputs must come from the original project or from your notes.

   {% hint style="info" %}
   Starting with v13, a PK-Sim module **embeds its PK-Sim snapshot**, so a v13 module carries everything needed to re-create itself. v12 modules do not, which is why this step is manual today. **Export a PK-Sim snapshot and store it alongside the model** as part of this migration — it is what makes the next migration straightforward.
   {% endhint %}

   After re-importing, check the **merge behavior** of the new PK-Sim modules before rebuilding — see the note on [combining PK-Sim modules](#passive-transports) above.

3. **Compare simulations built from the PK-Sim modules only.** Before looking at the full model configuration, build a simulation containing **only** the PK-Sim modules — the v12 module in v12 and the re-created v13 module in v13 — and compare the two exports.

   Every difference found here originates from **changes in the PK-Sim PBPK model structure**, not from the modularization merge rules. Establishing that list separately is what allows you to attribute the *remaining* differences in the full configuration to merge behavior instead of guessing which of the two causes is responsible.

   Differences commonly seen at this step, which come from the new v13 oral absorption model and the building-block renaming rather than from anything in your model:

   - additional per-compound **bile-salt-micelle** parameters (critical micellar concentration, partition coefficient bile-salt-micelle/water, …)
   - additional per-`Lumen`-compartment parameters (aqueous solubility, fluid velocity and viscosity, micellar diffusion, …)
   - **rewritten intestinal `Solubility` formulas** — these are *not* cosmetic and are numerically relevant for any oral administration
   - building-block renames `Reaction` → `Reactions` and `Observer` → `Observers`
   - an additional `No formulation` container between the protocol and the application for administrations that need no formulation, and the renamed parameter `Kd (FcRn) of container` — both change **paths**, see [Changed paths in PK-Sim modules](#changed-paths-in-pk-sim-modules)

4. **Flag the affected building blocks.** Work through **every module after the first** — the first has nothing to merge into — and identify whether it redefines any **molecule, reaction, passive transport, or observer** that also exists in a module higher in the hierarchy. These are the entities whose merge result may have changed. Also flag:

   - **Spatial structures that contain a `MoleculeProperties` container** — at the top level or in a container — in a module set to "Overwrite". In v13, `MoleculeProperties` are replaced under "Overwrite" instead of merged as in v12, so such a module drops the molecule properties contributed by earlier modules, and an *empty* container drops all of them. A v12 module may carry a container that the v12 user interface created automatically and that was never filled. Also flag spatial structures that redefine a **neighborhood** (see [Spatial structure](#spatial-structure)).
   - **Events/applications defined with the same name in more than one module**, especially those with *different container criteria* or administering *different* molecules. Equally-named events are now merged before creation, so check the resulting container criteria and operator; build the simulation and verify that the event is created in the intended containers and which molecule it actually administers (see [Events](#events)); prefer to avoid equally-named events across modules altogether.

5. **Establish the ground truth by comparison.** Now for the **full** model configuration: build each affected simulation in **both** v12 and v13 and export the result to `*.pkml`. Compare the two PKML files, discounting the PK-Sim-only differences already catalogued in step 3. What remains reveals exactly which entities merged differently — it is far more reliable than reasoning from the rules alone.

   {% hint style="info" %}
   A raw text diff of two PKML exports is not useful — element IDs and internal references are regenerated on every export. Compare **semantically** instead: compare entities by name and by container path, and compare counts per entity type. In particular, watch for **reactions/transports/observers whose *definitions* are identical but whose number of *instantiations* in the model tree differs** — that is the signature of the merge-rule change described above.

   Exported simulations may contain `SimulationEntitySource` provenance records (each entity traced to its origin `moduleName`, `buildingBlockType`, `sourcePath`). These do **not** affect model behavior. Their presence and count depend on the MoBi/export build rather than on model semantics — the same OSP version can export with or without them — so **do not treat them as a v12↔v13 difference; ignore them when comparing.**
   {% endhint %}

6. **Decide per module: Extend or Overwrite.** The first module in the hierarchy has nothing to merge into, so its mode has no effect — make this decision for **every module selected after it**, not only the last one.
   - If the module was meant to **fully replace** a molecule/reaction/transport/observer (the common v12 assumption), set its merge mode to **"Overwrite"**.
   - If it was meant to **add to** an existing building block, keep **"Extend"** and verify the merged result — remove any now-redundant duplicated content, and remember that reaction educts/products cannot be removed (use stoichiometry `0`).
   - **Spatial structures.** Under "Extend", a neighborhood is *extended* — parameters and tags of the later module are added — but its **neighbors are replaced**; under "Overwrite", the whole neighborhood is replaced, parameters and tags included. In either mode, a neighborhood can be *removed* by redefining it **without neighbors**, and a redefinition with neighbors that cannot be resolved fails the simulation creation with an error. `MoleculeProperties` are merged under "Extend" (the v12 result) and replaced under "Overwrite". If a module has to be set to "Overwrite" for its other content but its `MoleculeProperties` should not replace anything, delete the `MoleculeProperties` container from it — or split the module.
   - **Events.** If a module was meant to add a *separate* application/event, give it a distinct name instead of relying on the merge mode — in v13 an equally-named event no longer creates a separate instance: "Overwrite" removes the earlier module's event entirely, and "Extend" merges the container criteria (conditions combined, operator from the later module), which with the operator `AND` can result in the event not being created at all. A redefined administered molecule is overwritten by the later module in both modes.

7. **Re-verify.** Rebuild in v13 after each change and compare against the v12 PKML again, until the simulation matches the intended v12 result (or until any intentional differences are understood and documented).

8. **Simplify.** Because "Extend" now merges rather than replaces, Extension modules that previously carried *complete* redefinitions (to satisfy the old full-overwrite rule) can often be reduced to only the differences — the recommended best practice. Do this only after the configuration is verified.

{% hint style="warning" %}
When combining PBPK models with different structures, small-molecule models must still be selected **before** large-molecule models, or simulation creation fails due to missing parameters. This constraint is unchanged from v12.
{% endhint %}