# Modularization Concept in MoBi

Starting with version 12 the OSP Suite introduces a new modularization concept for building models in MoBi. This new concept allows users to create, share, and reuse models more efficiently by breaking them down into smaller, manageable components called **modules**.

This section provides an overview of the modularization concept and is especially suited for users familiar with previous versions of MoBi. It explains the advantages of using modules, how to create and manage them, and the rules that govern module combination.

An example workflow illustrating how to use the modularization concept in practice can be found [here](example-workflows.md#modularization-use-case---adding-a-tumor-to-a-pbpk-model).

## MoBi project structure

The new concept introduces changes in how model structures are organized and combined into simulations. While OSP Suite \<V12 had two major layers of organization of a MoBi project – **Building Blocks (BB)** that are combined into **Simulations**, the new modularization concept extends the structure to **Modules**, **Building Blocks**, and **Simulations**.

A MoBi project contains a set of:

- PK-Sim modules
    - A module created from a PK-Sim PBPK model. As a best practice, a PK-Sim module should not be modified. Instead, all changes/extensions to the model should be done in the so-called Extension modules (see below). A PK-Sim module is converted into an Extension module when edited by the user. A PK-Sim module carries its snapshot, so it can be re-created in PK-Sim.
- Extension modules
    - Editable modules that contain any changes to the model structure made by the user.
- Individuals
- Expression Profiles
- Simulations, which are combinations of (0-n) PK-Sim modules, (0-n) Extension modules, (0-1) Individual, and (0-n) Expression Profiles. At least one module (PK-Sim or Extension) must be selected to create a simulation.

Every module consists of [building blocks](building-block-concepts.md), with BB types **Spatial Structures (SS)** (0-1), **Molecules** (0-1), **Reactions** (0-1), **Passive Transports (PT)** (0-1), **Observers** (0-1), **Events** (0-1), **Parameter Values (PV)** (0-n), and **Initial Conditions (IC)** (0-n). Every module includes no or exactly one BB of each type, except for PV and IC BBs, of which multiple can be present in one module.

{% hint style="info" %}
For convenient organization of the project, modules can be grouped in folders in the Modules Explorer.
{% endhint %}

### PK-Sim modules
A project in MoBi can be based on a PBPK model exported from PK-Sim. Such a model will be present as a **PK-Sim module** in MoBi containing *all of the BB types*. PK-Sim modules cannot be edited by default. If the user decides to edit a PK-Sim module, the PK-Sim module will be converted to an Extension module. A project can contain multiple or no PK-Sim modules.

Export of a PK-Sim model to MoBi creates one PK-Sim module, one individual, and (0-n) expression profile BBs. The PK-Sim snapshot of the module is stored with the module and allows the PK-Sim module to be recreated.

### Extension modules
Each MoBi project may contain any number of **Extension modules**. An Extension module can add or modify any part of the default PK-Sim model structure - spatial structures, molecules, reactions, etc.

When adding new containers (e.g., adding a new organ) or molecules in an Extension module, it is important to keep in mind that molecules will only be created in containers if entries for the molecule-container combination is present in *any* IC BB used in the simulation. Therefore, when adding a molecule or a container in an Extension module, the IC BB should be extended accordingly.

*Creation* of new modules can be performed from scratch ("Create new module" creates a module with empty BBs) or by cloning modules ("Clone module"). Modules can be saved as a `*.pkml` file, and BBs in a module can be loaded from `*.pkml` files.

## Location of (individual) parameters

Compared to the previous versions, v12 introduces some changes in how and where individual parameters are stored when a PBPK model is imported in MoBi.

- All parameters of the spatial structure that are **present in all species** and have the **same value or the same formula in all species and individuals** are stored directly in the spatial structures BB with the fixed value or an explicit formula. Example: `Organism|Thickness (endothelium)` (constant value) or `Organism|Weight of blood organs` (sum formula).

- Parameters that are present only for certain species (e.g., `Organism|Lumen|Duodenum|Thickness_p1` is only present in the human species, but not in rat, `Organism|Lumen|Duodenum|Default thickness of gut wall` is present in the rat but not in human), **or** have different species-specific values (`Organism|Acidic phospholipids (blood cells) [mg/g] - RR`) **or** vary within a population (e.g., `Organism|Fat|Volume`) are **not** located in the spatial structures BB, but only in the individual. Such parameters are added to the simulation structure during the simulation creation step.

For convenience, parameters that are defined in the individuals can be shown in the spatial structure editor by selecting an individual in the "Show parameters from individual" box.

![Spatial structure view with an individual selected](../assets/images/part-4/modularization-concept-spatial-structure-individual-parameters.png)

The parameters that are defined in the individual are shown with grey background and cannot be edited in the spatial structure editor. You will notice that some parameters have a  `NaN` value. These parameters are defined by an equation that cannot be evaluated at this time, e.g., because they depend on other parameters that are also defined in the individual. The values of these parameters will be calculated after the simulation creation.

## Parameter values building block

Another important change (compared to the previous versions): the PV BB should only contain values for parameters that are different from those stored in other BBs. In most cases, the PV BB will be empty when a PK-Sim model is imported into MoBi. An exception is when the user has modified parameter values in the PK-Sim simulation that are not part of any PK-Sim BB (e.g., intestinal permeability of Midazolam in the [Midazolam PBPK model](https://github.com/Open-Systems-Pharmacology/OSP-PBPK-Model-Library/tree/master/Midazolam).) These "Simulation parameters" are transferred in the PV BB.

## Creating simulations from modules and combination rules

Multiple modules can be combined to create a simulation. For simplicity, a specific combination of modules is called **model configuration**. When creating a simulation from modules, the Extension modules will *extend* or *overwrite* the previous modules. The user can select multiple PK-Sim modules, or PK-Sim modules in combination with Extension modules, or only the Extension module(s). The selection of the modules results in a *hierarchy* of the modules, where the order of module selection determines the order of overwrite/extend actions. I.e., multiple PK-Sim modules are always extended to a common PK-Sim module, the selected Extension module 1 extends/overwrites the common PK-Sim module, the selected Extension module 2 overwrites/extends the combination of the common PK-Sim module and the Extension module 1, and so on.

If a model configuration contains a PK-Sim module, the user must select an **Individual** and might include **Expression Profiles**. For each module that contains at least one IC or PV BB, the user can select one (or none) IC and/or PV BB.

During simulation creation, the modules are combined to a common model structure. Entities are combined (extended or overwritten) by their absolute path (for containers in the spatial structure, parameters, and molecule values) or by their names (for neighborhoods, passive transports, molecules, etc). The result is a simulation which represents the combination of the selected modules.

There are two types of combination behavior that can be defined for a module - **overwrite** or **extend**. The following sections describe how different building blocks are merged and what are the differences between the **overwrite** and the  **extend** modes, if any.

### Spatial structure

#### Merge behavior "Extend"
When combining modules `A` and `B` (with the hierarchy `A <- B`), all containers and parameters from module `B` will be added to module `A`. I.e., if module `A` has a container `Organism|Container 1` with two sub-containers `Container 2` and `Container 3` (absolute paths: `Organism|Container 1|Container 2` and `Organism|Container 1|Container 3`), and module `B` has a container `Organism|Container 1` without any sub-containers, the final model will contain `Organism|Container 1` with parameters defined in both modules, and with the sub-containers `Organism|Container 1|Container 2` and `Organism|Container 1|Container 3`.

- **MoleculeProperties** are always extended. That means that new molecule properties from module `B` will be added to the existing ones in module `A`. If module `B` has a molecule property that is also present in module `A`, the property (its constant value or formula) from module `B` will be used. (TODO https://github.com/Open-Systems-Pharmacology/MoBi/issues/2472)
- **Parameters** are always overwritten. If both modules have a parameter `Organism|Container 1|Param`, the parameter from module `B` will be used. This applies to all properties of the parameter (value, formula, unit, tags etc).
- **Container types** (physical or logical) will be overwritten. If "Organism|Container 1" is "physical" in module "A" and "logical" in module "B", the container will be "logical" in the final model.
- **Tags** will be extended. If "Organism|Container 1" has a tag "Tag A" in module "A" and a tag "Tag B" in module "B", in the final model, "Organism|Container 1" will have tags "Tag A" and "Tag B".
- **Neighborhoods** are extended (e.g., addition of new parameters, tags). Neighbors are replaced. If module `A` defines a neighborhood `N1` between `Organism|Container 1` and `Organism|Container 2`, and module `B` defines a neighborhood `N1` between `Organism|Container 2` and `Organism|Container 3`, the final model will contain a neighborhood `N1` between `Organism|Container 2` and `Organism|Container 3`.

{% hint style="warning" %}
If module `B` defines the neighborhood `N1` with invalid neighbors (so it cannot be created), the neighborhood from module `A` will be used as is! It is not possible to remove neighborhoods from the model. (TODO https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/pull/2919)
{% endhint %}

#### Merge behavior "Overwrite"
When combining modules `A` and `B` (with the hierarchy `A <- B`), all containers from module `B` will overwrite the containers with the same path in module `A`. When overwriting, all descendants of a container are removed if not present in the module that overwrites (i.e., replacement of the whole tree structure). I.e., if module `A` has a container `Organism|Container 1` with two sub-containers `Container 2` and `Container 3` (absolute paths: `Organism|Container 1|Container 2` and `Organism|Container 1|Container 2`), and module `B` has a container `Organism|Container 1` without any sub-containers, the final model will contain `Organism|Container 1` without the sub-containers `Container 2` and `Container 3`. `Organism|Container 1` will only have parameters that are defined in module `B`, but not in module `A`.

- **MoleculeProperties** are always extended. That means that new molecule properties from module `B` will be added to the existing ones in module `A`. If module `B` has a molecule property that is also present in module `A`, the property (its constant value or formula) from module `B` will be used. (TODO https://github.com/Open-Systems-Pharmacology/MoBi/issues/2472)
- **Parameters** will be overwritten by their absolute path. If both modules have a parameter `Organism|Container 1|Param`, the parameter from module `B` will be used.
- **Container types** (physical or logical) will be overwritten. If "Organism|Container 1" is "physical" in module "A" and "logical" in module "B", the container will be "logical" in the final model.
- Container (including neighborhoods) **Tags** will be overwritten. If `Organism|Container 1` has a tag "Tag A" in module `A` and a tag "Tag B" in module `B`, in the final model, `Organism|Container 1` will only have tag "Tag B".
- **Formulas** are never overwritten (also not in the "overwrite" mode). Meaning, if module `B` defines a formula with the same name as a formula in module `A`, the updated formula will only be used for the parameters defined in module `B`, but not for other parameters that use this formula.
- **Neighborhoods** will be overwritten by their names. Their parameters, tags, and neighbors will be overwritten.

{% hint style="warning" %}
If module `B` defines the neighborhood `N1` with invalid neighbors (so it cannot be created), the neighborhood from module `A` will be used as is! It is not possible to remove neighborhoods from the model. (TODO https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/pull/2919)
{% endhint %}

### Molecules

The list of available molecules is always extended. If module `A` has molecule `MolA` and module `B` has molecule `MolB`, the final model will contain both `MolA` and `MolB`, disregarding the merge behavior.

#### Merge behavior "Extend"

- **Molecule type** (Drug, Enzyme, Transporter, etc.) is always overwritten. If module `A` defined molecule `MolA` as Drug, and module `B` defined molecule `MolA` as Enzyme, the molecule `MolA` will be of type Enzyme in the final model.
- **Stationary**: the property is always overwritten.
- **Calculation methods**: The defaults are always overwritten. Be aware that calculation methods only apply to non-stationary molecules.
- **Parameters** are extended. If both modules have a parameter `MolA|Param`, the parameter from module `B` will be used. This applies to all properties of the parameter (value, formula, unit, tags etc). New parameters can be added.
- **Parameter type** (local/global) is always overwritten.
- **Active Transports** are extended. New transports are added, existing are extended using the merge behavior (parameters added, properties overwritten, etc).

#### Merge behavior "Overwrite"

- **Molecule type** (Drug, Enzyme, Transporter, etc.) is always overwritten. If module `A` defined molecule `MolA` as Drug, and module `B` defined molecule `MolA` as Enzyme, the molecule `MolA` will be of type Enzyme in the final model.
- **Stationary**: the property is always overwritten.
- **Calculation methods**: The defaults are always overwritten. Be aware that calculation methods only apply to non-stationary molecules.
- **Parameters** are overwritten. Only parameters existent in the last module will be present in the simulation. New parameters cannot be added.
- **Parameter type** (local/global) is always overwritten.
- **Active Transports**: The molecule is completely overwritten. This implies that only active transports defined in the latest module will be present in the simulation.

### Reactions

#### Merge behavior "Extend"

- **Educts**, **Products**, and **Modifiers** are  extended. New educts/products/modifiers can be added, but existing cannot be removed. A workaround to exclude an educt or a product of being affected by the reaction is to set its stoichiometry to 0.

- **Stoichiometry** values are overwritten.

- **Equation** in the Properties tab is overwritten.

- **Parameters** list is extended. That means that new parameters are added, but existing parameters are overwritten.

- **Container criteria** are extended, the **Operator** is overwritten.

- **Create process rate parameter** property is overwritten.

- **Plot process rate parameter** property is overwritten.

#### Merge behavior "Overwrite"

Reactions are completely overwritten by name.

### Passive transports

#### Merge behavior "Extend"

- The equation in the **Kinetic** tab is overwritten.

- The **Parameters** list is extended.

- The **Operator** (and/or) for the "Source" and "Target" lists are overwritten.

- **Source** and **Target** lists are extended.

- **Include/Exclude** molecule lists for molecules are extended. However, the behavior of the **All checkbox** is overwritten.
  - Example: `Module A` includes `MolA` and `MolB`, `Module B` has "Calculate for All" checked and `MolB` excluded. The final model will include only `MolA`, even if `MolB` is specified in the include list of `Module A`. The exclusion list of `Module B` takes precedence.

#### Merge behavior "Overwrite"

Passive transports are completely overwritten by name.

### Observers

#### Merge behavior "Extend"

- The equation in the **Monitoring** tab is overwritten.

- The **Operator** of the "In container with" list is overwritten.

- The **Conditions** list of the "In container with" list is extended.

- **Include/Exclude** molecule lists for molecules are extended. However, the behavior of the **All checkbox** is overwritten.
  - Example: `Module A` includes `MolA` and `MolB`, `Module B` has "Calculate for All" checked and `MolB` excluded. The final model will include only `MolA`, even if `MolB` is specified in the include list of `Module A`. The exclusion list of `Module B` takes precedence.

#### Merge behavior "Overwrite"

Observers are completely overwritten by name.

### Events

Events are combined **by name**: when multiple modules define an event with the same name, these definitions are merged into a single event definition *before* the simulation is created, following the rules below. The merged event is then created in every container that matches the resulting container criteria.

#### Merge behavior "Extend"

The tree structure of the event is extended. This means:

- **Container criteria** from both modules are combined, while the **Operator** (and/or) is overwritten by the module that is lower in the hierarchy.

- **Parameters** list is extended. If the same parameter is defined in multiple modules, the parameter from the module that is lower in the hierarchy is used.

- **Administered molecule** is overwritten.

For each event:

- **Event start condition** equation: Changes are not applied! (TODO https://github.com/Open-Systems-Pharmacology/MoBi/issues/2478)
- **Event start condition - "One Time" checkbox**: Changes are not applied! (TODO https://github.com/Open-Systems-Pharmacology/MoBi/issues/2478)
- The list of **Assignments** is extended.
- New nodes (events, containers, etc.) are added.

#### Merge behavior "Overwrite"

The event definition from the module that is lower in the hierarchy completely replaces the definition from the higher modules.

- **Container criteria** list is overwritten.

- **Parameters** list is overwritten. Only parameters defined in the module that is lower in the hierarchy are used.

- **Administered molecule** is overwritten.

- All subnodes of the event (e.g., **ProtocolSchemaItem**, **Application_StartEvent**) are overwritten.

For each event:

- **Event start condition** equation is overwritten.
- **Event start condition - "One Time" checkbox** is overwritten.
- The list of **Assignments** is overwritten.

### Parameter values

The final values or formulas of the parameters in a simulation are determined in the following order:

1. **Values defined in the building block:** first, the value defined in the BB where the parameter is defined. For example, the value of `CYP3A4|Reference concentration` is set to 1 µmol/l in the Molecules BB. If a simulation is created using only this Molecules BB and no Expression Profile or PV BB is selected, the value will be 1 µmol/l.

2. **Values defined in the individual.** If an individual is selected, the values from the individual are applied. When applying an individual to a PK-Sim module only, the parameters defined in the individual are not present in the spatial structure of the PK-Sim module. **These parameters are added to the model when the simulation is created.**

    One special case occurs when an extension module explicitly defines a parameter in the spatial structure that is also present in the individual. In this case, the value from the individual will overwrite the value (or formula) defined in the extension module. To overwrite parameters defined in an individual (e.g. defining the volume of an organ as an age-dependent table rather than a constant value), define this parameter in the 'Parameter Values' section of an extension module.

3. **Values defined in an Expression Profile.** If an expression profile is selected, the values from the expression profile are applied. For example, `CYP3A4|Reference concentration` is set to 1 µmol/l in the Molecules BB, and 4.32 µmol/l in the Expression Profile. If a simulation is created with the module with the Molecules BB and the Expression Profile, the value will be 4.32 µmol/l (overriding the value from the Molecules BB).

4. **Values defined in PV BBs.** If a module containing a PV BB is selected, the values from the PV BB are applied. If multiple modules contain PV BBs with entries for the same parameters, the value from the latest module is selected. For example, if the Extension module contains an entry for `CYP3A4 Reference concentration`with a value of 2 µmol/l and a simulation is created using the Molecules BB module with a value of 1 µmol/l, the Expression Profile module with a value of 4.32 µmol/l and the PV BB module with a value of 2 µmol/l, the value in the simulation will be 2 µmol/l.

### Initial conditions

The final start values or formulas for molecules in a simulation are determined in the following order:

1. **Values defined in the Molecules BB**. Start values as defined in the Molecules BB.
2. **Values defined in the Expression Profiles.** For proteins, values (including the formulas for start values) that are defined in the Expression Profile of the protein.
3. **Values defined in the IC BBs.** If multiple modules have IC BBs with entries for the same molecules, the value from the latest module is selected. If an IC BB have entries for the same molecule/container combination as an Expression Profile, the values from the IC BB will be applied.

## Commit/update changes

The workflow of committing changes from a simulation to a building block and updating a simulation with changes from a building block has been changed.

### Updating a simulation with changes from a building block

If a building block used in a simulation is changed after the creation of the simulation, the simulation will automatically be marked as "outdated". To update the simulation with the changes from the building block, simply right-click on the simulation and select "Update from Building Blocks". This will invoke re-creating the simulation from the building blocks, applying any changes made to **all** building blocks since the simulation was created. Any changes to parameter or start values made in the simulation will be lost!

It is no longer possible to update only selected building blocks.

### Committing changes from a simulation to a building block

Changes to parameter or start values made in a simulation can be committed to the building block (BB) the parameter/start value belongs to. To do so, right-click on the simulation and select "Commit to building blocks".

Changes to parameters values are committed to the selected Parameter Values (PV) building block of the last module in the simulation configuration. If the last module does not contain a PV BB, or no PV BB has been selected for this module, new PV BB will be created.

{% hint style="warning" %}
When committing changes made to a simulation created from PK-Sim module(s) only, the last PK-Sim module will be converted to an extension module. To avoid this, create a new extension module that should contain the changes. Then create the simulation with the extension module.
{% endhint %}

Changes to initial conditions (IC) of molecules are handled similarly. They are committed to the selected IC BB of the last module in the simulation configuration. If the last module does not contain an IC BB, or no IC BB has been selected for this module, a new IC BB will be created.

Structural changes made to building blocks (e.g., adding/removing reactions, molecules, compartments, etc.) cannot be reverted by committing an "outdated" version of the building blocks from a simulation. Only changes to parameter values and initial conditions can be committed.

## Best practices

The OSP software is best suited for the development of complex quantitative systems pharmacology/toxicology (QSP/T) models based on the physiologically-based kinetics (PBK) modeling framework. With the introduction of the modularization concept, development of such models is even more efficient, transparent, and sustainable. To get the most out of the new concept, the following best practices should be considered.

- Consider having a separate PK-Sim module for each compound, if the compounds are not interacting with each other. This allows flexible combination of modeled compounds in MoBi simulations.
- For **drug-drug interaction (DDI)** models, however, the compounds should be included in the same PK-Sim module, and the interactions should be defined in PK-Sim.

{% hint style="warning" %}
Combining two PK-Sim modules does not automatically create interactions between the compounds in the two modules, even if one of the compounds is a perpetrator of a DDI. The interactions must be defined in PK-Sim, and the compounds must be included in the same PK-Sim module.
{% endhint %}

- PK-Sim modules should never be modified. Any modification and/or extensions should be implemented as separate modules.
- An extension module should be defined as generic as possible. I.e., it should be compatible with any PK-Sim module with minimal adjustments, if possible.
- Avoid duplication of information across modules - only implement the differences to other modules!
- It is possible to combine PBPK models with different model structures (i.e., combine a model for small molecules with a model for large molecules). In this case, it is important that the models for small molecules are selected before the models for large molecules. Otherwise, simulation creation will fail due to missing parameters.

## Project conversion

To get the full advantage of the new modularization concept with the support of individuals and expression profiles in MoBi, you will require a PBPK model created with PK-Sim V12. For PK-Sim project created with previous version, the project must be re-created from a snapshot. Open your project in PK-Sim V12, export it to snapshot, and then re-load from snapshot (see documentation). After this, all simulations in the project will have the new structure and sending them to MoBi will properly transfer the individuals and expression profiles.

- When loading a simulation from a `*.pkml` file, one module will be created containing the entire model.
- When opening a MoBi project created with previous versions:
    - If the project contains exactly one building block (BB) of each type (i.e., spatial structure BB, one reactions BB, one molecules BB, etc.), a single module will be created containing all the building blocks.
    - If the project contains multiple building blocks of the same type, a module will be created for each building block.

Due to the new structure of simulation configuration, changes in parameter values or initial conditions made in the simulations created with previous versions of MoBi cannot be committed to building blocks. When opening a project created with previous versions of MoBi, the simulations will be marked as "outdated", and a warning will be shown.
