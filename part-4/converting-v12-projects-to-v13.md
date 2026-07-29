# Converting v12 projects to v13

Version 13 of the OSP Suite refines the [modularization concept](modularization-concept.md) introduced in v12. The organizational structure (Modules → Building Blocks → Simulations) is unchanged, and the *parameter value* and *initial condition* resolution orders are unchanged. What changed is the **merge behavior of several building-block types when modules are combined** — specifically the difference between the **"Extend"** and **"Overwrite"** merge modes.

Because these rules govern how a simulation is assembled from its modules, **a model configuration authored in v12 can produce a different simulation in v13 without any edit to the modules themselves.** This page summarizes the critical differences and describes how to migrate a v12 model configuration safely.

{% hint style="info" %}
The complete v13 merge rules are documented in [Modularization concept](modularization-concept.md#creating-simulations-from-modules-and-combination-rules). This page only describes where v13 *differs* from v12 and what to do about it.
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
| **Spatial structure** | No explicit `MoleculeProperties` rule. | `MoleculeProperties` are now **always extended** in both modes; neighborhood "neighbors are replaced" behavior clarified. |
| **Events** | For an equally-named event/application administering *different* molecules, "Extend" extended the administered molecule to **both** (a malformed event). | "Extend" keeps the **first** module's molecule; a later module's redefinition is silently dropped (see below). |

### Molecules

**v12:** Molecules were *always overwritten by name*. Any molecule defined in an Extension module completely replaced the same-named molecule from a higher module. It was not possible to add only some parameters while retaining the rest.

**v13** (see [Molecules](modularization-concept.md#molecules)):

- **Merge behavior "Extend"**
  - Molecule **type** (Drug, Enzyme, Transporter, …) is **not** changed — it is retained from the higher module.
  - **Parameters** are overwritten individually: a parameter defined in both modules takes the later module's definition, while parameters present only in the higher module are **retained**.
  - **Active transports** are **extended** (new ones added; existing ones merged).
  - **Stationary**, **calculation methods** (defaults), and **parameter type** (local/global) are overwritten.
- **Merge behavior "Overwrite"**
  - Molecule **type** is overwritten.
  - Only the parameters present in the last module are retained.
  - Active transports are **completely** replaced.

**Migration impact — high.** A v12 Extension module set to "Extend" that redefined a molecule expecting full replacement now instead *merges* into the existing molecule: leftover parameters and active transports from the base module are retained, and — critically — **the molecule type is not changed.** To reproduce the v12 result, set the module to **"Overwrite"**.

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
- In **v13** the products are **unioned**: `R` becomes `A → P1 + P2`. A reaction is only instantiated where **all** its partners are present, so `R` now appears only in the intersection of "`P1` present" and "`P2` present" — potentially **far fewer** containers, and **zero** if `P1` and `P2` never co-occur. Where it *does* survive, its stoichiometry has changed (it now produces both `P1` and `P2`).

The same trap applies to **modifiers**: if one definition carries a modifier the other lacks, the union requires that modifier to be present in the container, which can remove the reaction from every container where it previously ran. These losses are **silent** — no error is raised; the reaction simply is not created.
{% endhint %}

### Passive transports

**v12:** "Extend" was **identical to** "Overwrite". In both, the parameters list and the source/target lists were *overwritten* (so entries could be removed), the kinetic equation and operators were overwritten, and include/exclude molecule lists were extended.

**v13** (see [Passive transports](modularization-concept.md#passive-transports)):

- **Merge behavior "Extend"**
  - Kinetic **equation** is overwritten.
  - **Parameters** list is **extended**.
  - **Source** and **target** lists are **extended**; their operators are overwritten.
  - **Include/Exclude** molecule lists are extended; the **"All" checkbox** behavior is overwritten (an exclusion in the later module takes precedence).
- **Merge behavior "Overwrite"**
  - The passive transport is **completely overwritten by name**.

**Migration impact — medium.** Under v12, an "Extend" module dropped source/target/parameter entries that were not present in it. Under v13 "Extend", those entries are now **retained** from the earlier module. If the intent was replacement (including removal of entries), switch to **"Overwrite"**.

{% hint style="danger" %}
**Combining PK-Sim modules set to "Overwrite" can fail to build.** In v12, PK-Sim modules were imported with the default merge behavior **"Overwrite"**, and combining them still worked: even under "Overwrite", the molecule **include/exclude lists** of passive transports and observers were extended rather than replaced. In v13, "Overwrite" replaces those lists too, so a passive transport keeps only the molecules of the module that overwrites it.

This surfaces when combining **two large-molecule models**. The FcRn-mediated `NetMassTransfer_*` transports apply to their own module's molecules via those molecule lists; once the lists are replaced instead of combined, the molecule-specific entities the transport formulas reference are no longer created and **simulation creation fails** with errors such as:

```
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
  - Monitoring **equation** is overwritten.
  - The **operator** of the "In container with" list is overwritten.
  - The **conditions** list of "In container with" is **extended**.
  - **Include/Exclude** molecule lists are extended; the **"All" checkbox** behavior is overwritten.
- **Merge behavior "Overwrite"**
  - The observer is **completely overwritten by name**.

**Migration impact — medium.** Same pattern as passive transports.

### Spatial structure

The container/parameter/tag/neighborhood rules are essentially as in v12, with two clarifications added in v13:

- **`MoleculeProperties` are now always extended** in *both* "Extend" and "Overwrite" modes: new molecule properties from the later module are added, and a property present in both modules takes the later module's value/formula.
- For neighborhoods under **"Extend"**, v13 clarifies that **neighbors are replaced** by the later module; v12 only stated that neighborhoods are extended. (Under "Overwrite", v12 already specified that neighbors are overwritten.) Both modes now also carry a warning: if the later module defines a neighborhood with *invalid* neighbors, the earlier module's neighborhood is kept unchanged — neighborhoods cannot be removed from a model.

**Migration impact — low to medium**, depending on whether molecule-property values/formulas were relied upon to be replaced rather than merged.

### Events

The general rules are unchanged: events combine only when they are generated in the same container (by their container criteria). What changed is the **administered molecule** when two modules define an equally-named event/application for **different** molecules under merge behavior "Extend".

Observed in a controlled two-module test (module A administers molecule X, module B — later in the hierarchy — administers molecule Y under the same application name):

| Mode | v12 | v13 |
|------|-----|-----|
| **Overwrite** | administers **Y** — the last module's molecule | unchanged: administers **Y** |
| **Extend** | administers **both X and Y** — a malformed event that uses a single molecule's molecular weight | administers **X only** — the *first* module's molecule; Y is silently dropped |

Under v13 "Extend" the administered molecule is therefore *not* combined, and it follows the **opposite** precedence to parameters, where the later module wins. The current rules are documented in [Events](modularization-concept.md#events).

**Migration impact — medium.** A v12 Extension module that redefined the administered molecule of an existing application under "Extend" now has **no effect at all** — the base module's molecule is kept, silently. Note also that event combination is expected to change again in a future release.

{% hint style="warning" %}
**Avoid defining events/applications with the same name in more than one module.** Where this is unavoidable, explicitly verify **which molecule the application administers** after building the simulation.
{% endhint %}

### Unchanged

- **Parameter Values** — resolution order (Building Block → Individual → Expression Profile → PV BB, latest module wins) is unchanged.
- **Initial Conditions** — resolution order (Molecules BB → Expression Profiles → IC BBs, latest module wins) is unchanged.

## Migration steps

The goal is to confirm that a v12 model configuration produces the *same* simulation in v13, and to correct it where the new merge rules change the result.

1. **Inventory the model configuration.** List every module in the configuration, its position in the hierarchy (order of selection), and its merge mode ("Extend" / "Overwrite").

2. **Flag the affected building blocks.** For each Extension module, identify whether it redefines any **molecule, reaction, passive transport, or observer** that also exists in a module higher in the hierarchy. These are the entities whose merge result may have changed. **Also flag any event/application defined with the same name in more than one module** — especially administering *different* molecules; verify the administered molecule in the built simulation (see [Events](#events)), and prefer to avoid equally-named events across modules altogether.

3. **Establish the ground truth by comparison.** For each affected simulation, build the simulation in **both** v12 and v13 and export the result to `*.pkml`. Compare the two PKML files. This reveals exactly which entities merged differently — it is far more reliable than reasoning from the rules alone.

   {% hint style="info" %}
   A raw text diff of two PKML exports is not useful — element IDs and internal references are regenerated on every export. Compare **semantically** instead: compare entities by name and by container path, and compare counts per entity type. In particular, watch for **reactions/transports/observers whose *definitions* are identical but whose number of *instantiations* in the model tree differs** — that is the signature of the merge-rule change described above.

   Exported simulations may contain `SimulationEntitySource` provenance records (each entity traced to its origin `moduleName`, `buildingBlockType`, `sourcePath`). These do **not** affect model behavior. Their presence and count depend on the MoBi/export build rather than on model semantics — the same OSP version can export with or without them — so **do not treat them as a v12↔v13 difference; ignore them when comparing.**
   {% endhint %}

4. **Decide per module: Extend or Overwrite.**
   - If the module was meant to **fully replace** a molecule/reaction/transport/observer (the common v12 assumption), set its merge mode to **"Overwrite"**.
   - If it was meant to **add to** an existing building block, keep **"Extend"** and verify the merged result — remove any now-redundant duplicated content, and remember that reaction educts/products cannot be removed (use stoichiometry `0`).

5. **Re-verify.** Rebuild in v13 after each change and compare against the v12 PKML again, until the simulation matches the intended v12 result (or until any intentional differences are understood and documented).

6. **Simplify.** Because "Extend" now merges rather than replaces, Extension modules that previously carried *complete* redefinitions (to satisfy the old full-overwrite rule) can often be reduced to only the differences — the recommended best practice. Do this only after the configuration is verified.

{% hint style="warning" %}
When combining PBPK models with different structures, small-molecule models must still be selected **before** large-molecule models, or simulation creation fails due to missing parameters. This constraint is unchanged from v12.
{% endhint %}

## Other v13 migration notes (beyond modularization)

The merge rules above are the main modularization change, but a v12 model can also hit unrelated v13 changes during migration. The most common one seen so far:

### Low Lipophilicity values rejected by the new oral model

v13 introduces a **new oral absorption model that does not accept low (strongly negative) Lipophilicity values** (see MoBi issue [#2445](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2445)). A model migrated from v12 that assigns a low/negative Lipophilicity to a compound may fail to build or simulate in v13.

**Workaround:** raise the Lipophilicity into the accepted range.

- For molecules where Lipophilicity does **not** affect the result — e.g. large molecules (peptides/proteins) that are not distributed into tissue — this is safe and has no impact on model behavior; set it to a value within the accepted range (e.g. `0`) purely to satisfy the restriction, and revert once the issue is fixed.
- For small molecules where Lipophilicity drives partitioning/permeability, **do not** change it blindly — assess the impact on distribution first, or track the issue for a fix.
